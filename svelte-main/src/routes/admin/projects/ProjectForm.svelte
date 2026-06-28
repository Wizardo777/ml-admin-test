<script>
	export let imageFile;

	export let title = '';
	export let description = '';
	export let github = '';
	export let demo = '';

	export let editing = false;

	export let onSave = () => {};
</script>

<div class="form">

	<input
		type="file"
		onchange={(e) => imageFile = e.target.files[0]}
	/>

	<input
		bind:value={title}
		placeholder="Project Title"
	/>

	<textarea
		bind:value={description}
		placeholder="Description"
		rows="5"
	/>

	<input
		bind:value={github}
		placeholder="Github"
	/>

	<input
		bind:value={demo}
		placeholder="Live Demo URL"
	/>

	<button
		onclick={onSave}
	>
		{editing ? 'Update' : 'Save'}
	</button>

</div>

<style>

.form{

	display:flex;

	flex-direction:column;

	gap:16px;

	padding:26px;

	border-radius:28px;

	background:rgba(70,70,70,.78);

	backdrop-filter:blur(22px);

	border:1px solid rgba(255,255,255,.08);

}

input,
textarea{

	width:100%;

	background:#e9e9e9;

	border:none;

	border-radius:14px;

	padding:14px 18px;

	font-size:.95rem;

	color:#111;

	transition:.2s;

}
input:focus,
textarea:focus{

	background:white;

	box-shadow:
	0 0 0 4px rgba(92,255,99,.18);

}

textarea{

	resize:none;

	min-height:120px;

	font-family:inherit;

}

input[type=file]{

	background:white;

	cursor:pointer;

}

button{

	margin-top:10px;

	align-self:center;

	border:none;

	padding:14px 42px;

	border-radius:999px;

	background:#52ff57;

	font-size:1rem;

	font-weight:700;

	cursor:pointer;

	transition:.25s;

}

button:hover{

	transform:scale(1.05);

	box-shadow:0 10px 25px rgba(82,255,87,.35);

}
.save{

	width:100%;

	margin-top:18px;

	padding:14px;

	border:none;

	border-radius:999px;

	background:#5CFF63;

	font-size:1rem;

	font-weight:700;

	cursor:pointer;

	transition:.25s;

}

</style>