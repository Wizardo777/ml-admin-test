<script>

	const stats = [

		{
			count:3,
			label:'Members',
			color:'#57ff68'
		},

		{
			count:1,
			label:'Blog',
			color:'#ffb84d'
		},

		{
			count:2,
			label:'Projects',
			color:'#5ec8ff'
		}

	];

</script>

<div class="status-card">

	<h2>TODAY</h2>

	<div class="stats">

		{#each stats as stat}

			<div class="row">

				<div
					class="dot"
					style={`background:${stat.color};`}
				></div>

				<h3>+{stat.count}</h3>

				<p>{stat.label}</p>

			</div>

		{/each}

	</div>

</div>

<style>

.status-card{

	width:100%;
	height:240px;

	padding:20px;

	display:flex;
	flex-direction:column;

	background:rgba(255,255,255,.95);

	border-radius:30px;

	border:1px solid rgba(255,255,255,.45);

	backdrop-filter:blur(16px);

	box-shadow:0 20px 60px rgba(0,0,0,.15);

	transition:.3s;

}

.status-card:hover{

	transform:translateY(-6px);

	box-shadow:0 28px 70px rgba(0,0,0,.2);

}

h2{

	margin:0 0 12px;

	font-size:2rem;

	line-height:.9;

	font-family:
	Impact,
	Haettenschweiler,
	'Arial Narrow Bold',
	sans-serif;

	letter-spacing:-1px;

	color:#111;

}

.stats{

	display:flex;

	flex-direction:column;

	gap:6px;

	flex:1;

}

.row{

	display:flex;

	align-items:center;

	gap:14px;

	padding:9px 0;

	border-bottom:1px solid rgba(0,0,0,.08);

}

.row:last-child{

	border-bottom:none;

}

.dot{

	width:12px;

	height:12px;

	border-radius:50%;

	flex-shrink:0;

	box-shadow:0 0 10px rgba(0,0,0,.15);

}

h3{

	margin:0;

	font-size:1.8rem;

	font-weight:900;

	font-family:
	Impact,
	Haettenschweiler,
	'Arial Narrow Bold',
	sans-serif;

	line-height:1;

	color:#111;

	min-width:60px;

}

p{

	margin:0;

	font-size:1rem;

	font-weight:600;

	color:#555;

}

@media(max-width:768px){

	.status-card{

		display:none;

	}

}

</style>