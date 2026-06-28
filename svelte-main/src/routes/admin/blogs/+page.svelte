<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	let blogs = [];

	let title = '';
	let author = '';
	let content = '';

	let imageFile = null;
	let editingId = null;
	let search = '';

	async function uploadBlogImage() {

		if (!imageFile) return '';

		const fileName =
			Date.now() + '-' + imageFile.name;

		await supabase.storage
			.from('blog-images')
			.upload(fileName, imageFile);

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
	}

	async function saveBlog() {

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

		loadBlogs();
	}

	function editBlog(blog) {

		editingId = blog.id;

		title = blog.title || '';
		author = blog.author || '';
		content = blog.content || '';
	}

	async function deleteBlog(id) {

		if (!confirm('Delete this blog?')) return;

		await supabase
			.from('blogs')
			.delete()
			.eq('id', id);

		loadBlogs();
	}

	onMount(loadBlogs);
</script>

<div class="p-10 text-white">

	<h1 class="text-4xl font-bold mb-8">
		Blogs
	</h1>

	<div class="bg-zinc-900 p-6 rounded-xl mb-8">

		<div class="space-y-4">

			<input
				type="file"
				onchange={(e) => imageFile = e.target.files[0]}
				class="w-full bg-zinc-800 p-3 rounded"
			/>

			<input
				bind:value={title}
				placeholder="Blog Title"
				class="w-full bg-zinc-800 p-3 rounded"
			/>

			<input
				bind:value={author}
				placeholder="Author"
				class="w-full bg-zinc-800 p-3 rounded"
			/>

			<textarea
				bind:value={content}
				placeholder="Blog Content"
				rows="8"
				class="w-full bg-zinc-800 p-3 rounded"
			></textarea>

		</div>

		<button
			onclick={saveBlog}
			class="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
		>
			{editingId ? 'Update Blog' : 'Save Blog'}
		</button>

	</div>

	<input
		bind:value={search}
		placeholder="Search blogs..."
		class="w-full bg-zinc-900 p-3 rounded-xl mb-6"
	/>

	<div class="space-y-4">

		{#each blogs.filter(
			blog =>
				blog.title?.toLowerCase().includes(search.toLowerCase()) ||
				blog.author?.toLowerCase().includes(search.toLowerCase())
		) as blog}

			<div class="bg-zinc-900 p-6 rounded-xl">

				{#if blog.image}

					<img
						src={blog.image}
						alt=""
						class="w-full h-64 object-cover rounded-lg mb-4"
					/>

				{/if}

				<h2 class="text-2xl font-bold">
					{blog.title}
				</h2>

				<p class="text-zinc-400 mb-4">
					By {blog.author}
				</p>

				<p class="text-zinc-300 whitespace-pre-wrap">
					{blog.content}
				</p>

				<div class="flex gap-2 mt-6">

					<button
						onclick={() => editBlog(blog)}
						class="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded"
					>
						Edit
					</button>

					<button
						onclick={() => deleteBlog(blog.id)}
						class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
					>
						Delete
					</button>

				</div>

			</div>

		{/each}

	</div>

</div>