<script>
	export let value = "";
</script>

<div class="search-wrap">

	<input
		type="text"
		bind:value
		placeholder="SEARCH BAR"
	/>

</div>

<style>

.search-wrap{

	width:100%;

	display:flex;

	justify-content:center;

	margin-bottom:30px;

}

input{

	width:100%;

	max-width:700px;

	height:56px;

	border:none;

	outline:none;

	border-radius:18px;

	background:rgba(90,90,90,.75);

	backdrop-filter:blur(18px);

	color:white;

	font-size:16px;

	font-weight:600;

	text-align:center;

	letter-spacing:.5px;

	border:1px solid rgba(255,255,255,.15);

}

input::placeholder{

	color:white;

	opacity:.9;

	font-weight:700;

}

@media(max-width:768px){

	input{

		height:52px;

		font-size:15px;

		max-width:100%;

	}

}

</style>