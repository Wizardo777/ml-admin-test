<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	import MemberCard from './MemberCard.svelte';
	import MemberForm from './MemberForm.svelte';
	import SearchBar from './SearchBar.svelte';
	import AddButton from './AddButton.svelte';
	import MobileMemberModal from './MobileMemberModal.svelte';
	import { showToast } from '$lib/components/ui/toast';
	import ConfirmModal from '$lib/components/ui/ConfirmModal.svelte';
	import SkeletonCard from '$lib/components/ui/SkeletonCard.svelte';

	let members = [];

let loading = true;

	let search = '';

	let showMobileForm = false;

	let editingId = null;
	let showDeleteModal = false;

let memberToDelete = null;

	let photoFile = null;

	let name = '';
	let position = '';
	let type = '';

	let github = '';
	let linkedin = '';
	let facebook = '';

	async function loadMembers() {

		const { data, error } = await supabase
			.from('members')
			.select('*')
			.order('id', { ascending: false });

		if (error) {

			console.error(error);
			return;

		}

		members = data || [];

loading = false;

	}

	async function uploadPhoto() {

		if (!photoFile) return '';

		const fileName =
			`${Date.now()}-${photoFile.name}`;

		const { error } = await supabase.storage
			.from('member-photos')
			.upload(fileName, photoFile);

		if (error) {

			console.error(error);
			showToast('Photo upload failed.', 'error');

			return '';

		}

		const {
			data: { publicUrl }
		} = supabase.storage
			.from('member-photos')
			.getPublicUrl(fileName);

		return publicUrl;

	}

	function clearForm() {

		editingId = null;

		name = '';
		position = '';
		type = '';

		github = '';
		linkedin = '';
		facebook = '';

		photoFile = null;

	}

	function editMember(member) {

		editingId = member.id;

		name = member.name ?? '';
		position = member.position ?? '';
		type = member.type ?? '';

		github = member.github ?? '';
		linkedin = member.linkedin ?? '';
		facebook = member.facebook ?? '';

		showMobileForm = true;

	}

	function deleteMember(id) {

	memberToDelete = id;

	showDeleteModal = true;

}

async function confirmDeleteMember() {

	if (!memberToDelete)
		return;

	await supabase
		.from('members')
		.delete()
		.eq('id', memberToDelete);

	showDeleteModal = false;

	memberToDelete = null;

	loadMembers();

	showToast('Member deleted successfully.');

}

	async function saveMember() {

		const wasEditing = editingId !== null;

		if (!name || !position || !type)
			return;

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

		}

		else {

			const photo = await uploadPhoto();

			await supabase
				.from('members')
				.insert([{

					name,
					position,
					type,

					photo,

					github,
					linkedin,
					facebook

				}]);

		}

		clearForm();

		showMobileForm = false;

		loadMembers();

showToast(
	wasEditing
		? 'Member updated successfully.'
		: 'Member added successfully.'
);

	}

	onMount(loadMembers);
</script>

<div class="members-page">

	<div class="glass-panel">

		<div class="header">

		<div>

			<h1>MEMBERS</h1>

			<p>Good Morning <b>Profile</b></p>

		</div>

		<div class="mobile-add">

	<AddButton
		onclick={() => showMobileForm = true}
	/>

</div>

	</div>

	<SearchBar
		bind:value={search}
	/>

	<div class="layout">

		<!-- LEFT -->

		<section class="cards">

	{#if loading}

		<SkeletonCard />
		<SkeletonCard />
		<SkeletonCard />
		<SkeletonCard />

	{:else if members.filter(
		member =>
			member.name?.toLowerCase().includes(search.toLowerCase()) ||
			member.position?.toLowerCase().includes(search.toLowerCase()) ||
			member.type?.toLowerCase().includes(search.toLowerCase())
	).length}

		{#each members.filter(
			member =>
				member.name?.toLowerCase().includes(search.toLowerCase()) ||
				member.position?.toLowerCase().includes(search.toLowerCase()) ||
				member.type?.toLowerCase().includes(search.toLowerCase())
		) as member}

			<MemberCard

				{member}

				onEdit={() => editMember(member)}

				onDelete={() => deleteMember(member.id)}

			/>

		{/each}

	{:else}

		<div class="empty-state">

			<div class="emoji">👥</div>

			<h2>No Members Yet</h2>

			<p>Add your first member to get started.</p>

		</div>

	{/if}

</section>

		<!-- RIGHT -->

		<aside class="desktop-form">

			<MemberForm

				bind:photoFile

				bind:name

				bind:position

				bind:type

				bind:github

				bind:linkedin

				bind:facebook

				editing={editingId !== null}

				onSave={saveMember}

			/>

		</aside>

	</div>
	

		<!-- MOBILE FORM -->

	<MobileMemberModal

		open={showMobileForm}

		onClose={() => {

			showMobileForm = false;

			clearForm();

		}}

	>

		<MemberForm

			bind:photoFile

			bind:name

			bind:position

			bind:type

			bind:github

			bind:linkedin

			bind:facebook

			editing={editingId !== null}

			onSave={saveMember}

		/>

	</MobileMemberModal>
	<ConfirmModal

	open={showDeleteModal}

	title="Delete Member"

	message="This action cannot be undone."

	onCancel={() => {

		showDeleteModal = false;

		memberToDelete = null;

	}}

	onConfirm={confirmDeleteMember}

/>

	</div>

</div>



<style>

.members-page{

	padding-left:130px;
	padding-right:30px;
	padding-top:30px;
	padding-bottom:30px;

	box-sizing:border-box;

	min-height:100vh;

}
.glass-panel{

	background:var(--glass-bg);

	backdrop-filter:blur(var(--blur));
	-webkit-backdrop-filter:blur(var(--blur));

	border:1px solid var(--glass-border);

	border-radius:var(--radius-xl);

	padding:34px;

	box-shadow:var(--glass-shadow);

}

.header{

	display:flex;

	justify-content:space-between;

	align-items:flex-start;

	margin-bottom:12px;

}

.header h1{

	margin:0;

	font-size:5rem;

	line-height:.9;

	font-weight:900;

	color:white;

	font-family:
	Impact,
	Haettenschweiler,
	'Arial Narrow Bold',
	sans-serif;

	letter-spacing:-2px;

}

.header p{

	margin-top:10px;

	font-size:1.8rem;

	color:white;

}

.layout{

	display:grid;

	grid-template-columns:1fr 360px;

	gap:24px;

	align-items:start;

	margin-top:-8px;

}

.cards{

	display:grid;

	grid-template-columns:repeat(2,1fr);

	gap:22px;

}

.desktop-form{

	position:sticky;

	top:30px;

}
.desktop-form{

	position:sticky;

	top:30px;

}

/* ADD THIS HERE */

.mobile-add{

	display:none;

}

@media(max-width:1200px){

.layout{

	grid-template-columns:1fr;

}

.desktop-form{

	position:relative;

}

}

@media(max-width:768px){

.members-page{

	padding:18px;

}

.header{

	flex-direction:column;

	align-items:flex-start;

	gap:18px;

}

.header h1{

	font-size:3.8rem;

}

.header p{

	font-size:1.3rem;

}

.cards{

	grid-template-columns:1fr;

}

.desktop-form{

	display:none;

}

/* ONLY THIS */

.mobile-add{

	display:block;

}

}

@media(max-width:1200px){

.layout{

	grid-template-columns:1fr;

}

.desktop-form{

	position:relative;

}

}

@media(max-width:768px){

.members-page{

	padding:18px;

}

.header{

	flex-direction:column;

	align-items:flex-start;

	gap:18px;

}

.header h1{

	font-size:3.8rem;

}

.header p{

	font-size:1.3rem;

}

.cards{

	grid-template-columns:1fr;

}

.desktop-form{

	display:none;

}


}

</style>