<script>
	export let photoFile;
	export let name = "";
	export let position = "";
	export let type = "";
	export let github = "";
	export let linkedin = "";
	export let facebook = "";
	export let editing = false;
	export let onSave = () => {};
</script>

<div class="form-card">

	<input
		type="file"
		onchange={(e)=>photoFile=e.target.files[0]}
	/>

	<input
		bind:value={name}
		placeholder="Name"
	/>

	<input
		bind:value={position}
		placeholder="Position"
	/>

	<input
		bind:value={type}
		placeholder="Type"
	/>

	<input
		bind:value={github}
		placeholder="Github"
	/>

	<input
		bind:value={linkedin}
		placeholder="LinkedIn"
	/>

	<input
		bind:value={facebook}
		placeholder="Facebook"
	/>

	<button onclick={onSave}>
		{editing ? "Update" : "Save"}
	</button>

</div>

<style>

.form-card{

	width:100%;

	padding:30px;

	border-radius:30px;

	background:rgba(70,70,70,.65);

	backdrop-filter:blur(25px);

	border:1px solid rgba(255,255,255,.15);

	display:flex;

	flex-direction:column;

	gap:16px;

	box-sizing:border-box;

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

input[type=file]{

	background:white;

	cursor:pointer;

}

button{

	margin-top:24px;

	align-self:center;

	width:110px;

	height:46px;

	border:none;

	border-radius:999px;

	background:#52ff72;

	color:black;

	font-size:17px;

	font-weight:700;

	cursor:pointer;

	transition:.25s;

}

button:hover{

	transform:scale(1.05);

}

@media(max-width:768px){

	.form-card{

		padding:24px;

	}

}

</style>