<script>
	export let imageFile;

	export let title='';
	export let description='';

	export let editing=false;

	export let onSave=()=>{};
</script>

<div class="form">

	<input
		type="file"
		onchange={(e)=>imageFile=e.target.files[0]}
	/>

	<input
		bind:value={title}
		placeholder="Blog Title"
	/>

	<textarea
		rows="6"
		bind:value={description}
		placeholder="Blog Description"
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

	border-radius:30px;

	background:rgba(60,60,60,.82);

	backdrop-filter:blur(20px);

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

}

button{

	align-self:center;

	padding:14px 42px;

	border:none;

	border-radius:999px;

	background:#58ff57;

	font-weight:700;

	cursor:pointer;

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