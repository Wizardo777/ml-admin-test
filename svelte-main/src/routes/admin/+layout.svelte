<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {

		const admin =
			localStorage.getItem('admin');

		if (!admin) {
			goto('/auth');
		}

	});
</script>

<div class="flex min-h-screen bg-black text-white">

	<Sidebar />

	<div class="flex-1">
		<slot />
	</div>

</div>