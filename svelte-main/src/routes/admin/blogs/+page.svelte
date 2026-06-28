<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { showToast } from '$lib/components/ui/toast';
	import BlogCard from './BlogCard.svelte';
import BlogForm from './BlogForm.svelte';
import SearchBar from './SearchBar.svelte';
import AddButton from './AddButton.svelte';
import MobileBlogModal from './MobileBlogModal.svelte';
import ConfirmModal from '$lib/components/ui/ConfirmModal.svelte';
import SkeletonCard from '$lib/components/ui/SkeletonCard.svelte';

	let blogs = [];

let loading = true;

	let title = '';
	let author = '';
	let content = '';

	let imageFile = null;
	let editingId = null;
	let showDeleteModal = false;

let blogToDelete = null;
	let search = '';
let showMobileForm = false;

	async function uploadBlogImage() {

		if (!imageFile) return '';

		const fileName =
			Date.now() + '-' + imageFile.name;

		const { error } = await supabase.storage
	.from('blog-images')
	.upload(fileName, imageFile);

if (error){

	showToast('Blog image upload failed.', 'error');

	return '';

}

		const {
			data: { publicUrl }
		} = supabase.storage
			.from('blog-images')
			.getPublicUrl(fileName);

		return publicUrl;
	}

	async function loadBlogs() {

		const { data } = await supabase
			.from('blogs')
			.select('*')
			.order('created_at', { ascending: false });

		blogs = data || [];

loading = false;
	}

	async function saveBlog() {
		const wasEditing = editingId !== null;

		if (!title || !author) return;

		const imageUrl =
			await uploadBlogImage();

		if (editingId) {

			const updateData = {
				title,
				author,
				content
			};

			if (imageUrl) {
				updateData.image = imageUrl;
			}

			await supabase
				.from('blogs')
				.update(updateData)
				.eq('id', editingId);

			editingId = null;

		} else {

			await supabase
				.from('blogs')
				.insert([
					{
						title,
						author,
						content,
						image: imageUrl
					}
				]);
		}

		title = '';
		author = '';
		content = '';

		imageFile = null;

showMobileForm = false;

loadBlogs();

showToast(
	wasEditing
		? 'Blog updated successfully.'
		: 'Blog published successfully.'
);
	}

	function editBlog(blog) {

		editingId = blog.id;

		title = blog.title || '';
		author = blog.author || '';
		content = blog.content || '';
	}

	function deleteBlog(id) {

	blogToDelete = id;

	showDeleteModal = true;

}

async function confirmDeleteBlog() {

	if (!blogToDelete) return;

	await supabase
		.from('blogs')
		.delete()
		.eq('id', blogToDelete);

	showDeleteModal = false;

	blogToDelete = null;

	loadBlogs();

	showToast('Blog deleted successfully.');

}

	onMount(loadBlogs);
</script>

<div class="blogs-page">

	<div class="glass-panel">

		<div class="header">

			<div>

				<h1>BLOGS</h1>

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

	{:else if blogs.filter(
		blog =>
			blog.title?.toLowerCase().includes(search.toLowerCase()) ||
			blog.content?.toLowerCase().includes(search.toLowerCase())
	).length}

		{#each blogs.filter(
			blog =>
				blog.title?.toLowerCase().includes(search.toLowerCase()) ||
				blog.content?.toLowerCase().includes(search.toLowerCase())
		) as blog}

			<BlogCard

				{blog}

				onEdit={() => editBlog(blog)}

				onDelete={() => deleteBlog(blog.id)}

			/>

		{/each}

	{:else}

		<div class="empty-state">

			<div class="emoji">📝</div>

			<h2>No Blogs Yet</h2>

			<p>Publish your first blog to get started.</p>

		</div>

	{/if}

</section>

			<aside class="desktop-form">

				<BlogForm

					bind:imageFile

					bind:title

					bind:description={content}

					editing={editingId!==null}

					onSave={saveBlog}

				/>

			</aside>

		</div>

		<MobileBlogModal

			open={showMobileForm}

			onClose={() => {

				showMobileForm = false;

				editingId = null;

			}}

		>

			<BlogForm

				bind:imageFile

				bind:title

				bind:description={content}

				editing={editingId!==null}

				onSave={saveBlog}

			/>

		</MobileBlogModal>
		<ConfirmModal

	open={showDeleteModal}

	title="Delete Blog"

	message="This action cannot be undone."

	onCancel={() => {

		showDeleteModal = false;

		blogToDelete = null;

	}}

	onConfirm={confirmDeleteBlog}

/>

	</div>

</div>

<style>

.blogs-page{

	padding-left:130px;
	padding-right:30px;
	padding-top:30px;
	padding-bottom:30px;

	min-height:100vh;

	box-sizing:border-box;

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

	font-weight:900;

	line-height:.9;

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

	.blogs-page{

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