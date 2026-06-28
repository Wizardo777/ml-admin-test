<script>
	export let onclick = () => {};
</script>

<button
	class="add-btn"
	onclick={onclick}
>
	<span class="plus">+</span>

	<span>Add</span>
</button>

<style>

.add-btn{

	display:flex;

	align-items:center;

	justify-content:center;

	gap:12px;

	padding:18px 42px;

	border:none;

	border-radius:999px;

	background:#58ff57;

	color:#111;

	font-size:2rem;

	font-weight:700;

	cursor:pointer;

	box-shadow:0 10px 30px rgba(88,255,87,.35);

	transition:.25s;

}

.add-btn:hover{

	transform:translateY(-3px) scale(1.03);

	box-shadow:0 18px 40px rgba(88,255,87,.45);

}

.plus{

	font-size:2.3rem;

	font-weight:400;

	line-height:1;

}

@media(max-width:768px){

	.add-btn{

		width:220px;

		padding:16px 24px;

		font-size:1.8rem;

	}

	.plus{

		font-size:2rem;

	}

}

</style>