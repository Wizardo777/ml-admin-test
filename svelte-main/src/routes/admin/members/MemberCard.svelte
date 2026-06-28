<script>
	export let member;
	export let onEdit = () => {};
	export let onDelete = () => {};
</script>

<div class="card">

	<div class="top">

		<div class="photo">

			{#if member.photo}
				<img src={member.photo} alt={member.name} />
			{:else}
				PHOTO
			{/if}

		</div>

		<div class="info">

			<h2>{member.name}</h2>

			<p>{member.position}</p>

		</div>

	</div>

	<div class="type">
		{member.type}
	</div>

	<div class="links">

		{#if member.github}
			<a href={member.github} target="_blank">Github</a>
		{/if}

		{#if member.linkedin}
			<a href={member.linkedin} target="_blank">LinkedIn</a>
		{/if}

		{#if member.facebook}
			<a href={member.facebook} target="_blank">Facebook</a>
		{/if}

	</div>

	<div class="buttons">

		<button class="edit" onclick={onEdit}>
			edit
		</button>

		<button class="delete" onclick={onDelete}>
			delete
		</button>

	</div>

</div>

<style>

.card{

	background:rgba(255,255,255,.94);

	border-radius:30px;

	padding:24px;

	box-shadow:
	0 12px 35px rgba(0,0,0,.10);

	border:1px solid rgba(255,255,255,.75);

	transition:
	transform .25s,
	box-shadow .25s;

}

.card:hover{

	transform:translateY(-8px);

	box-shadow:
	0 24px 60px rgba(0,0,0,.18);

}

.top{

	display:flex;

	align-items:center;

	gap:18px;

}

.photo{

	width:72px;

	height:72px;

	border-radius:50%;

	background:#ddd;

	display:flex;

	align-items:center;

	justify-content:center;

	font-size:.8rem;

	font-weight:700;

	overflow:hidden;

	flex-shrink:0;

}

.photo img{

	width:100%;

	height:100%;

	object-fit:cover;

}

.info{

	display:flex;

	flex-direction:column;

}

.info h2{

	margin:0;

	font-size:2rem;

	font-weight:700;

	color:#111;

}

.info p{

	margin:0;

	color:#555;

	font-size:1rem;

}

.type{

	font-size:1.2rem;

	font-weight:600;

	color:#111;

}

.links{

	display:flex;

	gap:10px;

	flex-wrap:wrap;

}

.links a{

	background:#ddd;

	padding:6px 12px;

	border-radius:999px;

	font-size:.85rem;

	color:#222;

	text-decoration:none;

}

.buttons{

	display:flex;

	gap:16px;

	margin-top:20px;

}
.type{

	font-size:1.2rem;

	font-weight:600;

	color:#111;

	margin-top:16px;

}
.links{

	display:flex;

	gap:10px;

	flex-wrap:wrap;

	margin-top:12px;

}

button{

	border:none;

	padding:8px 24px;

	border-radius:999px;

	font-weight:600;

	cursor:pointer;

}

.edit{

	background:#FFD467;

	color:#111;

	border:none;

	border-radius:999px;

	padding:10px 22px;

	font-weight:700;

	cursor:pointer;

	transition:.2s;

}

.delete{

	background:#FF8B8B;

	color:#111;

	border:none;

	border-radius:999px;

	padding:10px 22px;

	font-weight:700;

	cursor:pointer;

	transition:.2s;

}
.edit:hover,
.delete:hover{

	transform:translateY(-2px);

}

@media(max-width:768px){

	.card{

		padding:18px;

	}

	.info h2{

		font-size:1.6rem;

	}

}



</style>