<script>
	export let onclick = () => {};
</script>

<button class="add-btn" onclick={onclick}>

	<span>+</span>

	<p>Add</p>

</button>

<style>

.add-btn{

	width:180px;

	height:58px;

	border:none;

	border-radius:999px;

	background:#57ff63;

	display:flex;

	align-items:center;

	justify-content:center;

	gap:16px;

	cursor:pointer;

	font-size:1.5rem;

	font-weight:700;

	color:black;

	box-shadow:0 10px 30px rgba(0,0,0,.2);

	transition:.25s;

}

.add-btn:hover{

	transform:translateY(-3px);

}

span{

	font-size:2.2rem;

	font-weight:300;

	line-height:1;

}

p{

	margin:0;

	font-size:1.5rem;

	font-weight:700;

}

@media(max-width:768px){

	.add-btn{

		width:170px;

		height:54px;

	}

}

</style>