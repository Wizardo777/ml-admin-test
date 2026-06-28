<script>
	export let open = false;
	export let onClose = () => {};
</script>

{#if open}

<div
	class="overlay"
	onclick={(e) => {
		if (e.target === e.currentTarget) onClose();
	}}
>

	<div class="modal">

		<div class="top">

			<h2>Blog</h2>

			<button
				class="close"
				onclick={onClose}
			>
				✕
			</button>

		</div>

		<div class="body">

			<slot />

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

	padding:20px;

	z-index:999;

}

.modal{

	width:min(100%,430px);

	max-height:90vh;

	overflow:auto;

	border-radius:30px;

	background:rgba(45,45,45,.95);

	backdrop-filter:blur(24px);

	border:1px solid rgba(255,255,255,.12);

	padding:24px;

	box-shadow:0 20px 60px rgba(0,0,0,.4);

}

.top{

	display:flex;

	justify-content:space-between;

	align-items:center;

	margin-bottom:20px;

}

.top h2{

	margin:0;

	color:white;

	font-size:1.5rem;

	font-weight:700;

}

.close{

	width:42px;

	height:42px;

	border:none;

	border-radius:50%;

	background:rgba(255,255,255,.12);

	color:white;

	font-size:1.2rem;

	cursor:pointer;

	transition:.2s;

}

.close:hover{

	background:white;

	color:black;

}

.body{

	display:flex;

	flex-direction:column;

	gap:18px;

}

</style>