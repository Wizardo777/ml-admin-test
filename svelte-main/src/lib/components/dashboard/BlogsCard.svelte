<script>
	export let value = 0;
</script>

<div class="card">

	<div class="top">
		<h2>BLOGS</h2>
	</div>

	<div class="bottom">
		<p>{value}</p>
	</div>

</div>

<style>

.card{

	position:relative;

	width:100%;
	height:220px;

	padding:28px;

	display:flex;
	flex-direction:column;
	justify-content:space-between;

	background:rgba(255,255,255,.94);

	border-radius:30px;

	border:1px solid rgba(255,255,255,.45);

	box-shadow:
	0 20px 60px rgba(0,0,0,.15);

	backdrop-filter:blur(16px);

	transition:
	transform .3s ease,
	box-shadow .3s ease;

	cursor:pointer;

}

.card:hover{

	transform:translateY(-8px);

	box-shadow:
	0 30px 70px rgba(0,0,0,.25);

}

.top{

	display:flex;
	justify-content:space-between;
	align-items:flex-start;

}

h2{

	margin:0;

	font-size:3.8rem;

	line-height:.9;

	font-weight:900;

	letter-spacing:-2px;

	font-family:
	Impact,
	Haettenschweiler,
	'Arial Narrow Bold',
	sans-serif;

	color:#111;

}

.bottom{

	display:flex;
	align-items:flex-end;

}

p{

	margin:0;

	font-size:5rem;

	font-weight:900;

	line-height:1;

	color:#111;

}

@media(max-width:768px){

	.card{

		height:180px;

		padding:22px;

		border-radius:24px;

	}

	h2{

		font-size:2.8rem;

	}

	p{

		font-size:4rem;

	}

}

</style>