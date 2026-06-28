<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import ProjectCard from './ProjectCard.svelte';
import ProjectForm from './ProjectForm.svelte';
import SearchBar from './SearchBar.svelte';
import AddButton from './AddButton.svelte';
import MobileProjectModal from './MobileProjectModal.svelte';
import { showToast } from '$lib/components/ui/toast';
import ConfirmModal from '$lib/components/ui/ConfirmModal.svelte';
import SkeletonCard from '$lib/components/ui/SkeletonCard.svelte';

	let projects = [];

let loading = true;

	let title = '';
	let description = '';
	let github = '';
	let demo = '';

	let imageFile = null;
	let editingId = null;
	let showDeleteModal = false;

let projectToDelete = null;
	let search = '';
	let showMobileForm = false;

	async function uploadProjectImage() {

		if (!imageFile) return '';

		const fileName =
			Date.now() + '-' + imageFile.name;

		const { error } = await supabase.storage
	      .from('project-images')
	           .upload(fileName, imageFile);

          if (error) {

	             showToast('Project image upload failed.', 'error');

	             return '';

                   }

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

loading = false;
	}

	async function saveProject() {
		const wasEditing = editingId !== null;

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

showMobileForm = false;

loadProjects();

showToast(
	wasEditing
		? 'Project updated successfully.'
		: 'Project added successfully.'
);
	}

	function editProject(project) {

		editingId = project.id;

		title = project.title || '';
		description = project.description || '';
		github = project.github || '';
		demo = project.demo || '';
	}

	function deleteProject(id) {

	projectToDelete = id;

	showDeleteModal = true;

}

async function confirmDeleteProject() {

	if (!projectToDelete) return;

	await supabase
		.from('projects')
		.delete()
		.eq('id', projectToDelete);

	showDeleteModal = false;

	projectToDelete = null;

	loadProjects();

	showToast('Project deleted successfully.');

}

	onMount(loadProjects);
</script>

<div class="projects-page">

	<div class="glass-panel">

		<div class="header">

			<div>

				<h1>PROJECTS</h1>

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

			<section class="cards">

	{#if loading}

		<SkeletonCard />
		<SkeletonCard />
		<SkeletonCard />
		<SkeletonCard />

	{:else if projects.filter(
		project =>
			project.title?.toLowerCase().includes(search.toLowerCase()) ||
			project.description?.toLowerCase().includes(search.toLowerCase())
	).length}

		{#each projects.filter(
			project =>
				project.title?.toLowerCase().includes(search.toLowerCase()) ||
				project.description?.toLowerCase().includes(search.toLowerCase())
		) as project}

			<ProjectCard

				{project}

				onEdit={() => editProject(project)}

				onDelete={() => deleteProject(project.id)}

			/>

		{/each}

	{:else}

		<div class="empty-state">

			<div class="emoji">📁</div>

			<h2>No Projects Yet</h2>

			<p>Add your first project to get started.</p>

		</div>

	{/if}

</section>

			<aside class="desktop-form">

				<ProjectForm

					bind:imageFile

					bind:title

					bind:description

					bind:github

					bind:demo

					editing={editingId!==null}

					onSave={saveProject}

				/>

			</aside>

		</div>
					<!-- MOBILE FORM -->

			<MobileProjectModal

				open={showMobileForm}

				onClose={() => {

					showMobileForm = false;

					editingId = null;

				}}

			>

				<ProjectForm

					bind:imageFile

					bind:title

					bind:description

					bind:github

					bind:demo

					editing={editingId!==null}

					onSave={saveProject}

				/>

		</MobileProjectModal>
		<ConfirmModal

	open={showDeleteModal}

	title="Delete Project"

	message="This action cannot be undone."

	onCancel={() => {

		showDeleteModal = false;

		projectToDelete = null;

	}}

	onConfirm={confirmDeleteProject}

/>

    </div>

</div>

<style>

.projects-page{

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

	margin-bottom:20px;

}

.header h1{

	margin:0;

	font-size:5rem;

	line-height:.9;

	font-weight:900;

	letter-spacing:-2px;

	font-family:
	Impact,
	Haettenschweiler,
	'Arial Narrow Bold',
	sans-serif;

	color:white;

}

.header p{

	margin-top:10px;

	font-size:1.8rem;

	color:white;

}

.layout{

	display:grid;

	grid-template-columns:1fr 380px;

	gap:28px;

	align-items:start;

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

.projects-page{

	padding:18px;

}

.glass-panel{

	padding:22px;

	border-radius:28px;

}

.header{

	flex-direction:column;

	gap:18px;

}

.header h1{

	font-size:3.8rem;

}

.header p{

	font-size:1.2rem;

}

.cards{

	grid-template-columns:1fr;

}

.desktop-form{

	display:none;

}
.mobile-add{

	display:block;

}

.empty-state{

	grid-column:1/-1;

	padding:80px 30px;

	text-align:center;

	border-radius:30px;

	background:rgba(255,255,255,.12);

	backdrop-filter:blur(20px);

	border:1px solid rgba(255,255,255,.15);

}

.emoji{

	font-size:4rem;

	margin-bottom:18px;

}

.empty-state h2{

	margin:0;

	color:white;

	font-size:2rem;

	font-weight:800;

}

.empty-state p{

	margin-top:12px;

	color:#ddd;

	font-size:1rem;

}

}

</style>