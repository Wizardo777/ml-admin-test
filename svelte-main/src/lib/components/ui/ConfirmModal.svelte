<script>
	export let open = false;

	export let title = 'Delete Item';

	export let message = 'This action cannot be undone.';

	export let onCancel = () => {};

	export let onConfirm = () => {};
</script>

{#if open}

<div
	class="overlay"
	onclick={(e)=>{

		if(e.target===e.currentTarget){

			onCancel();

		}

	}}
>

	<div class="modal">

		<h2>{title}</h2>

		<p>{message}</p>

		<div class="buttons">

			<button
				class="cancel"
				onclick={onCancel}
			>
				Cancel
			</button>

			<button
				class="delete"
				onclick={onConfirm}
			>
				Delete
			</button>

		</div>

	</div>

</div>

{/if}

<style>

.overlay{

	position:fixed;

	inset:0;

	background:rgba(0,0,0,.45);

	backdrop-filter:blur(10px);

	display:flex;

	align-items:center;

	justify-content:center;

	z-index:9999;

}

.modal{

	width:420px;

	background:rgba(55,55,55,.94);

	backdrop-filter:blur(24px);

	border:1px solid rgba(255,255,255,.12);

	border-radius:28px;

	padding:30px;

	box-shadow:
	0 20px 60px rgba(0,0,0,.3);

}

h2{

	margin:0;

	color:white;

	font-size:1.8rem;

}

p{

	margin:18px 0 28px;

	color:#d7d7d7;

	line-height:1.6;

}

.buttons{

	display:flex;

	justify-content:flex-end;

	gap:16px;

}

button{

	border:none;

	padding:12px 26px;

	border-radius:999px;

	font-weight:700;

	cursor:pointer;

	transition:.2s;

}

.cancel{

	background:#d9d9d9;

	color:#111;

}

.delete{

	background:#ff6767;

	color:white;

}

button:hover{

	transform:translateY(-2px);

}

</style>