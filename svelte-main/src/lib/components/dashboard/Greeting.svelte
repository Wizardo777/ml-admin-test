<script>
	import { onMount } from 'svelte';

	export let title = "DASHBOARD";

	let name = "Profile";

	onMount(() => {

		const username = localStorage.getItem('username');

		if (username) {

			name = username;

		}

	});
</script>

<section class="greeting">

	<h1>{title}</h1>

	<p>
		Good Morning <span>{name}</span>
	</p>

</section>

<style>

.greeting{
	width:100%;
}

h1{

	margin:0;

	font-size:clamp(4rem,9vw,9rem);

	font-weight:900;

	line-height:.9;

	letter-spacing:-4px;

	color:white;

	text-transform:uppercase;

	font-family:Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;

}

p{

	margin-top:18px;

	font-size:clamp(1.3rem,2vw,3rem);

	font-weight:300;

	color:white;

}

span{

	font-weight:800;

}

@media(max-width:768px){

	h1{

		font-size:4.5rem;

		letter-spacing:-2px;

	}

	p{

		font-size:1.6rem;

		margin-top:10px;

	}

}

</style>