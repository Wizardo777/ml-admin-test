<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	let members = [];

	let name = '';
	let position = '';
	let type = '';
	let github = '';
	let linkedin = '';
	let facebook = '';

	let photoFile = null;
	let editingId = null;
    let search = '';

	async function loadMembers() {
		const { data } = await supabase
			.from('members')
			.select('*');

		members = data || [];
	}

	async function uploadPhoto() {

		if (!photoFile) return '';
        console.log(photoFile);

		const fileName =
			Date.now() + '-' + photoFile.name;

		const { error } = await supabase.storage
			.from('member-photos')
			.upload(fileName, photoFile);

		if (error) {
	console.error('UPLOAD ERROR:', error);
	alert(JSON.stringify(error));
	return '';
}

		const {
	data: { publicUrl }
} = supabase.storage
	.from('member-photos')
	.getPublicUrl(fileName);

console.log('PUBLIC URL:', publicUrl);

return publicUrl;
	}

	async function deleteMember(id) {

	if (!confirm('Delete this member?')) return;

	await supabase
		.from('members')
		.delete()
		.eq('id', id);

	loadMembers();
}

	function editMember(member) {

		editingId = member.id;

		name = member.name || '';
		position = member.position || '';
		type = member.type || '';

		github = member.github || '';
		linkedin = member.linkedin || '';
		facebook = member.facebook || '';
	}

	async function addMember() {

		if (!name || !position || !type) return;

		if (editingId) {

			await supabase
				.from('members')
				.update({
					name,
					position,
					type,
					github,
					linkedin,
					facebook
				})
				.eq('id', editingId);

			editingId = null;

		} else {

			const photoUrl = await uploadPhoto();
            console.log("PHOTO URL:", photoUrl);

			await supabase
				.from('members')
				.insert([
					{
						name,
						position,
						type,
						photo: photoUrl,
						github,
						linkedin,
						facebook
					}
				]);
		}

		name = '';
		position = '';
		type = '';

		github = '';
		linkedin = '';
		facebook = '';

		photoFile = null;

		loadMembers();
	}

	onMount(loadMembers);
</script>

<div class="p-10 text-white">

	<div class="flex justify-between items-center mb-8">

		<h1 class="text-4xl font-bold">
			Members
		</h1>

	</div>

	<div class="bg-zinc-900 p-6 rounded-xl mb-8">

		<div class="grid grid-cols-3 gap-4">

			<input
				type="file"
				onchange={(e) => {
					photoFile = e.target.files[0];
				}}
				class="bg-zinc-800 p-3 rounded"
			/>

			<input
				bind:value={name}
				placeholder="Name"
				class="bg-zinc-800 p-3 rounded"
			/>

			<input
				bind:value={position}
				placeholder="Position"
				class="bg-zinc-800 p-3 rounded"
			/>

			<input
				bind:value={type}
				placeholder="Type"
				class="bg-zinc-800 p-3 rounded"
			/>

			<input
				bind:value={github}
				placeholder="GitHub URL"
				class="bg-zinc-800 p-3 rounded"
			/>

			<input
				bind:value={linkedin}
				placeholder="LinkedIn URL"
				class="bg-zinc-800 p-3 rounded"
			/>

			<input
				bind:value={facebook}
				placeholder="Facebook URL"
				class="bg-zinc-800 p-3 rounded"
			/>

		</div>

		<button
			onclick={addMember}
			class="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
		>
			{editingId ? 'Update Member' : 'Save Member'}
		</button>

	</div>
    <input
	bind:value={search}
	placeholder="Search members..."
	class="w-full bg-zinc-900 p-3 rounded-xl mb-4"
    />

	<div class="bg-zinc-900 rounded-xl overflow-hidden">

		<table class="w-full">

			<thead class="bg-zinc-800">

				<tr>
					<th class="text-left p-4">Photo</th>
					<th class="text-left p-4">Name</th>
					<th class="text-left p-4">Position</th>
					<th class="text-left p-4">Type</th>
					<th class="text-left p-4">Actions</th>
				</tr>

			</thead>

			<tbody>

				{#each members.filter(
	member =>
		member.name?.toLowerCase().includes(search.toLowerCase()) ||
		member.position?.toLowerCase().includes(search.toLowerCase()) ||
		member.type?.toLowerCase().includes(search.toLowerCase())
) as member}

				<tr class="border-t border-zinc-700">

					<td class="p-4">
	<img
		src={member.photo}
		alt=""
		class="w-12 h-12 rounded-full object-cover"
	/>
</td>

					<td class="p-4">
						{member.name}
					</td>

					<td class="p-4">
						{member.position}
					</td>

					<td class="p-4">
						{member.type}
					</td>

					<td class="p-4 flex gap-2">

						<button
							onclick={() => editMember(member)}
							class="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded"
						>
							Edit
						</button>

						<button
							onclick={() => deleteMember(member.id)}
							class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
						>
							Delete
						</button>

					</td>

				</tr>

				{/each}

			</tbody>

		</table>

	</div>

</div>