<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	let projects = [];

	let title = '';
	let description = '';
	let github = '';
	let demo = '';

	let imageFile = null;
	let editingId = null;
	let search = '';

	async function uploadProjectImage() {

		if (!imageFile) return '';

		const fileName =
			Date.now() + '-' + imageFile.name;

		await supabase.storage
			.from('project-images')
			.upload(fileName, imageFile);

		const {
			data: { publicUrl }
		} = supabase.storage
			.from('project-images')
			.getPublicUrl(fileName);

		return publicUrl;
	}

	async function loadProjects() {

		const { data } = await supabase
			.from('projects')
			.select('*');

		projects = data || [];
	}

	async function saveProject() {

		if (!title) return;

		const imageUrl =
			await uploadProjectImage();

		if (editingId) {

			const updateData = {
				title,
				description,
				github,
				demo
			};

			if (imageUrl) {
				updateData.image = imageUrl;
			}

			await supabase
				.from('projects')
				.update(updateData)
				.eq('id', editingId);

			editingId = null;

		} else {

			await supabase
				.from('projects')
				.insert([
					{
						title,
						description,
						image: imageUrl,
						github,
						demo
					}
				]);
		}

		title = '';
		description = '';
		github = '';
		demo = '';

		imageFile = null;

		loadProjects();
	}

	function editProject(project) {

		editingId = project.id;

		title = project.title || '';
		description = project.description || '';
		github = project.github || '';
		demo = project.demo || '';
	}

	async function deleteProject(id) {

		if (!confirm('Delete this project?')) return;

		await supabase
			.from('projects')
			.delete()
			.eq('id', id);

		loadProjects();
	}

	onMount(loadProjects);
</script>

<div class="p-10 text-white">

	<h1 class="text-4xl font-bold mb-8">
		Projects
	</h1>

	<div class="bg-zinc-900 p-6 rounded-xl mb-8">

		<div class="grid grid-cols-2 gap-4">

			<input
				type="file"
				onchange={(e) => imageFile = e.target.files[0]}
				class="bg-zinc-800 p-3 rounded"
			/>

			<input
				bind:value={title}
				placeholder="Project Title"
				class="bg-zinc-800 p-3 rounded"
			/>

			<input
				bind:value={github}
				placeholder="GitHub URL"
				class="bg-zinc-800 p-3 rounded"
			/>

			<input
				bind:value={demo}
				placeholder="Live Demo URL"
				class="bg-zinc-800 p-3 rounded"
			/>

			<input
				bind:value={description}
				placeholder="Description"
				class="bg-zinc-800 p-3 rounded"
			/>

		</div>

		<button
			onclick={saveProject}
			class="mt-4 bg-green-600 px-4 py-2 rounded"
		>
			{editingId ? 'Update Project' : 'Save Project'}
		</button>

	</div>

	<input
		bind:value={search}
		placeholder="Search projects..."
		class="w-full bg-zinc-900 p-3 rounded-xl mb-6"
	/>

	<div class="space-y-4">

		{#each projects.filter(
			project =>
				project.title?.toLowerCase().includes(search.toLowerCase()) ||
				project.description?.toLowerCase().includes(search.toLowerCase())
		) as project}

			<div class="bg-zinc-900 p-6 rounded-xl">

				{#if project.image}

					<img
						src={project.image}
						alt=""
						class="w-full h-48 object-cover rounded-lg mb-4"
					/>

				{/if}

				<h2 class="text-xl font-bold">
					{project.title}
				</h2>

				<p class="text-zinc-400 mt-2">
					{project.description}
				</p>

				<div class="flex gap-2 mt-4">

					<button
						onclick={() => editProject(project)}
						class="bg-yellow-600 px-3 py-1 rounded"
					>
						Edit
					</button>

					<button
						onclick={() => deleteProject(project.id)}
						class="bg-red-600 px-3 py-1 rounded"
					>
						Delete
					</button>

				</div>

			</div>

		{/each}

	</div>

</div>