<script>
	export let open = false;
	export let onClose = () => {};
</script>

{#if open}

<div class="overlay" onclick={onClose}>

	<div
		class="modal"
		onclick={(e)=>e.stopPropagation()}
	>

		<slot />

	</div>

</div>

{/if}

<style>

.overlay{

	position:fixed;

	inset:0;

	background:rgba(0,0,0,.35);

	backdrop-filter:blur(18px);

	display:flex;

	align-items:center;

	justify-content:center;

	padding:20px;

	z-index:999;

}

.modal{

	width:100%;

	max-width:420px;

	border-radius:30px;

	background:rgba(255,255,255,.18);

	backdrop-filter:blur(30px);

	border:1px solid rgba(255,255,255,.25);

	padding:26px;

	box-sizing:border-box;

}

@media(min-width:769px){

	.overlay{

		display:none;

	}

}

</style>