<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	import StatCard from '$lib/components/StatCard.svelte';

	let memberCount = 0;
	let projectCount = 0;
	let blogCount = 0;

	async function loadStats() {

		const { count: members } = await supabase
			.from('members')
			.select('*', { count: 'exact', head: true });

		const { count: projects } = await supabase
			.from('projects')
			.select('*', { count: 'exact', head: true });

		const { count: blogs } = await supabase
			.from('blogs')
			.select('*', { count: 'exact', head: true });

		memberCount = members || 0;
		projectCount = projects || 0;
		blogCount = blogs || 0;
	}

	onMount(loadStats);
</script>

<div class="p-10 text-white">

	<h1 class="text-4xl font-bold mb-10">
		Dashboard
	</h1>

	<div class="grid grid-cols-3 gap-6">

		<StatCard
			title="Members"
			value={memberCount}
		/>

		<StatCard
			title="Projects"
			value={projectCount}
		/>

		<StatCard
			title="Blogs"
			value={blogCount}
		/>

	</div>

</div>