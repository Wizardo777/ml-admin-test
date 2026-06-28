<script>
	import Sidebar from '$lib/components/Sidebar.svelte';

	import Toast from '$lib/components/ui/Toast.svelte';
	import { toast } from '$lib/components/ui/toast';
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	

	onMount(() => {
		const admin = localStorage.getItem('admin');

		if (!admin) {
			goto('/auth');
		}
	});
</script>

<div class="dashboard-bg">

	<Sidebar />

	{#key page.url.pathname}

<main
	class="content"
	in:fade={{ duration: 250 }}
	out:fade={{ duration: 180 }}
>

	<slot />

	{#if $toast}

		<div class="toast-container">

			<Toast
				message={$toast.message}
				type={$toast.type}
			/>

		</div>

	{/if}

</main>

{/key}

</div>

<style>

:global(body){

	margin:0;

	font-family:Inter,sans-serif;

	overflow-x:hidden;

}

:global(html){

	margin:0;

}

.dashboard-bg{

	min-height:100vh;

	background-image:url("/mountain.jpg");

	background-size:cover;

	background-position:center;

	background-repeat:no-repeat;

	background-attachment:fixed;

	position:relative;

}

.content{

	min-height:100vh;

	padding-left:10px;

	padding-right:40px;

	padding-top:32px;

	padding-bottom:32px;

	box-sizing:border-box;

}

@media(max-width:768px){

	.content{

		padding:0 0 110px 0;

	}

}

@media(max-width:768px){

	.dashboard-bg{

		background-position:center;

	}

}

.toast-container{

	position:fixed;

	top:28px;

	right:28px;

	z-index:9999;

}

</style>