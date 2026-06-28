<script>
	export let project;

	export let onEdit = () => {};
	export let onDelete = () => {};
</script>

<div class="card">

	<div class="image">

		{#if project.image}

			<img
				src={project.image}
				alt={project.title}
			/>

		{:else}

			<span>IMAGE</span>

		{/if}

	</div>

	<div class="content">

		<h2>{project.title}</h2>

		<p class="description">
			{project.description}
		</p>

		<div class="links">

			{#if project.github}
				<a
					href={project.github}
					target="_blank"
				>
					Github
				</a>
			{/if}

			{#if project.demo}
				<a
					href={project.demo}
					target="_blank"
				>
					Live Demo
				</a>
			{/if}

		</div>

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

	background:rgba(255,255,255,.94);

	border-radius:30px;

	padding:20px;

	border:1px solid rgba(255,255,255,.75);

	box-shadow:0 12px 35px rgba(0,0,0,.10);

	transition:
	transform .25s,
	box-shadow .25s;

}

.card:hover{

	transform:translateY(-8px);

	box-shadow:0 24px 60px rgba(0,0,0,.18);

}

.image{

	width:100%;

	height:220px;

	object-fit:cover;

	border-radius:20px;

	background:#ececec;

	margin-bottom:18px;

}

.image img{

	width:100%;

	height:100%;

	object-fit:cover;

}

.content{

	display:flex;

	flex-direction:column;

	gap:12px;

}

h2{

	margin:0;

	font-size:2rem;

	font-weight:700;

	color:#111;

}

.description{

	margin:0;

	font-size:1rem;

	color:#444;

	min-height:48px;

}

.links{

	display:flex;

	gap:12px;

	flex-wrap:wrap;

}

.links a{

	padding:7px 16px;

	border-radius:999px;

	background:#e8e8e8;

	color:#111;

	text-decoration:none;

	font-size:.9rem;

	transition:.2s;

}

.links a:hover{

	background:#dcdcdc;

}

.buttons{

	display:flex;

	gap:14px;

	margin-top:4px;

}

button{

	border:none;

	cursor:pointer;

	padding:9px 22px;

	border-radius:999px;

	font-weight:700;

	font-size:.95rem;

	transition:.2s;

}

.edit{

	background:#FFD467;

	border:none;

	border-radius:999px;

	padding:10px 22px;

	font-weight:700;

	cursor:pointer;

}

.edit:hover{

	transform:scale(1.04);

}

.delete{

	background:#FF8B8B;

	border:none;

	border-radius:999px;

	padding:10px 22px;

	font-weight:700;

	cursor:pointer;

}

.delete:hover{

	transform:scale(1.04);

}

@media(max-width:768px){

	.image{

		height:180px;

	}

	h2{

		font-size:1.5rem;

	}

}

</style>