<script>
	export let blog;

	export let onEdit = () => {};
	export let onDelete = () => {};
</script>

<div class="card">

	<div class="image">

		{#if blog.image}

			<img
				src={blog.image}
				alt={blog.title}
			/>

		{:else}

			<span>IMAGE</span>

		{/if}

	</div>

	<div class="content">

		<h2>{blog.title}</h2>

		<p>{blog.description}</p>

		<div class="buttons">

			<button
				class="edit"
				onclick={onEdit}
			>
				Edit
			</button>

			<button
				class="delete"
				onclick={onDelete}
			>
				Delete
			</button>

		</div>

	</div>

</div>

<style>

.card{

	background:white;

	border-radius:24px;

	padding:14px;

	display:flex;

	flex-direction:column;

	gap:14px;

	box-shadow:0 12px 30px rgba(0,0,0,.12);

	transition:.25s;

}

.card:hover{

	transform:translateY(-5px);

}

.image{

	height:240px;

	border-radius:18px;

	background:#ddd;

	overflow:hidden;

	display:flex;

	align-items:center;

	justify-content:center;

	font-weight:700;

}

.image img{

	width:100%;
	height:100%;
	object-fit:cover;

}

h2{

	margin:0;

	font-size:2rem;

	color:#111;

}

p{

	margin:0;

	color:#444;

}

.buttons{

	display:flex;

	gap:14px;

	margin-top:8px;

}

button{

	border:none;

	padding:10px 20px;

	border-radius:999px;

	font-weight:700;

	cursor:pointer;

}

.edit{

	background:#ffd54a;

}

.delete{

	background:#ff8a8a;

}

</style>