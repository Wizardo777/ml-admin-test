<script>
	export let value = '';
</script>

<div class="search-wrapper">

	<input
		type="text"
		bind:value
		placeholder="SEARCH BAR"
	/>

</div>

<style>

.search-wrapper{

	width:100%;

	display:flex;

	justify-content:center;

	margin:28px 0 34px;

}

input{

	width:min(640px,100%);

	padding:18px 28px;

	border:none;

	border-radius:18px;

	background:rgba(90,90,90,.82);

	backdrop-filter:blur(20px);

	color:white;

	font-size:1rem;

	font-weight:700;

	text-align:center;

	outline:none;

	transition:.25s;

}

input::placeholder{

	color:rgba(255,255,255,.9);

	letter-spacing:1px;

}

input:focus{

	background:rgba(105,105,105,.9);

	box-shadow:0 0 0 2px rgba(255,255,255,.15);

}

@media(max-width:768px){

	.search-wrapper{

		margin:22px 0;

	}

	input{

		font-size:.95rem;

		padding:16px 20px;

	}

}

</style>