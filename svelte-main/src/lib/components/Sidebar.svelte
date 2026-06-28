<script>
	function logout() {
		localStorage.removeItem('admin');
		window.location.href = '/auth';
	}

	const links = [
		{ name: 'Dashboard', path: '/admin' },
		{ name: 'Members', path: '/admin/members' },
		{ name: 'Projects', path: '/admin/projects' },
		{ name: 'Blogs', path: '/admin/blogs' }
	];
</script>

<div class="w-64 h-screen bg-zinc-900 text-white flex flex-col">

	<div class="p-6">

		<h1 class="text-2xl font-bold mb-10">
			ML Club
		</h1>

		<div class="space-y-2">

			{#each links as link}

				<a
					href={link.path}
					class="block p-3 rounded-lg hover:bg-zinc-800 transition"
				>
					{link.name}
				</a>

			{/each}

		</div>

	</div>

	<div class="mt-auto p-6 border-t border-zinc-800">

		<button
			onclick={logout}
			class="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
		>
			Logout
		</button>

	</div>

</div>