<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	import Greeting from '$lib/components/dashboard/Greeting.svelte';

	import MembersCard from '$lib/components/dashboard/MembersCard.svelte';
	import ProjectsCard from '$lib/components/dashboard/ProjectsCard.svelte';
	import BlogsCard from '$lib/components/dashboard/BlogsCard.svelte';

	import QuoteCard from '$lib/components/dashboard/QuoteCard.svelte';
	import StatusCard from '$lib/components/dashboard/StatusCard.svelte';

	import ProfileCard from '$lib/components/dashboard/ProfileCard.svelte';
	import CalendarCard from '$lib/components/dashboard/CalendarCard.svelte';
	import WeatherCard from '$lib/components/dashboard/WeatherCard.svelte';
	import SkeletonCard from '$lib/components/ui/SkeletonCard.svelte';

	let memberCount = 0;
let projectCount = 0;
let blogCount = 0;

let loading = true;

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

loading = false;

	}

	onMount(loadStats);

</script>

<div class="page">

	<!-- SEARCH BAR -->

	

	<div class="dashboard">

		<!-- GLASS PANEL -->

		<section class="glass-panel">

			<Greeting />

			<div class="stats">

	{#if loading}

		<SkeletonCard />

<SkeletonCard />

<SkeletonCard />

	{:else}

		<MembersCard value={memberCount} />

		<ProjectsCard value={projectCount} />

		<BlogsCard value={blogCount} />

	{/if}

</div>

			<div class="bottom">

				<QuoteCard/>

				<StatusCard/>

			</div>

		</section>

		<!-- RIGHT -->

		<aside class="right">

			<ProfileCard/>

			<CalendarCard/>

			<WeatherCard/>

		</aside>

	</div>

</div>

<style>

.page{

	width:100%;

	padding-top:18px;

}

.search-bar{

	width:680px;

	height:58px;

	margin:0 auto 24px auto;

	border-radius:24px;

	display:flex;

	align-items:center;

	justify-content:center;

	color:white;

	font-weight:700;

	background:rgba(255,255,255,.15);

	backdrop-filter:blur(22px);

	border:1px solid rgba(255,255,255,.28);

}

.dashboard{

	display:grid;

	grid-template-columns:1fr 300px;

	gap:24px;

	padding-left:130px;   /* Increased to leave room for sidebar */

	padding-right:40px;

	padding-bottom:30px;

	align-items:start;

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

.stats{

	display:grid;

	grid-template-columns:repeat(3,1fr);

	gap:20px;

	margin-top:40px;

}

.bottom{

	display:grid;

	grid-template-columns:1fr 1fr;

	gap:20px;

	margin-top:28px;

}

.right{

	display:flex;

	flex-direction:column;

	gap:22px;

}

@media(max-width:1200px){

.dashboard{

	grid-template-columns:1fr;

	padding-left:30px;

	padding-right:30px;

}

.right{

	order:-1;

}

}

@media(max-width:768px){

.search-bar{

	width:90%;

}

.dashboard{

	padding:16px;

}

.glass-panel{

	padding:26px;

}

.stats{

	grid-template-columns:1fr;

}

.bottom{

	grid-template-columns:1fr;

}





}

</style>