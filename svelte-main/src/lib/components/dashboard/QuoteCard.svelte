<script>
	export let quote = "SOME QUOTE";
</script>

<div class="quote-card">

	<h2>{quote}</h2>

</div>

<style>

.quote-card{

	width:100%;

	height:240px;

	padding:32px;

	display:flex;

	align-items:center;

	justify-content:center;

	background:rgba(255,255,255,.95);

	border-radius:30px;

	border:1px solid rgba(255,255,255,.45);

	backdrop-filter:blur(16px);

	box-shadow:
	0 20px 60px rgba(0,0,0,.15);

	transition:
	transform .3s ease,
	box-shadow .3s ease;

}

.quote-card:hover{

	transform:translateY(-8px);

	box-shadow:
	0 30px 70px rgba(0,0,0,.22);

}

h2{

	margin:0;

	text-align:center;

	font-size:3.2rem;

	line-height:1;

	font-weight:900;

	color:#111;

	font-family:
	Impact,
	Haettenschweiler,
	'Arial Narrow Bold',
	sans-serif;

	letter-spacing:-1px;

	text-transform:uppercase;

}

@media(max-width:768px){

	.quote-card{

		display:none;

	}

}

</style>