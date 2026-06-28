<script>
	import { fly, fade } from 'svelte/transition';

	export let message = '';
	export let type = 'success';
</script>

<div
	class="toast {type}"
	in:fly={{ y: 30, duration: 250 }}
	out:fade={{ duration: 200 }}
>

	<div class="icon">

		{#if type === 'success'}
			✓
		{:else if type === 'error'}
			✕
		{:else}
			ℹ
		{/if}

	</div>

	<div class="text">
		{message}
	</div>

</div>

<style>

.toast{

	display:flex;

	align-items:center;

	gap:14px;

	padding:16px 22px;

	border-radius:18px;

	color:white;

	font-weight:600;

	backdrop-filter:blur(22px);

	box-shadow:
	0 12px 30px rgba(0,0,0,.25);

}

.success{

	background:rgba(42,181,88,.92);

}

.error{

	background:rgba(225,65,65,.92);

}

.info{

	background:rgba(70,70,70,.92);

}

.icon{

	font-size:1.25rem;

	font-weight:700;

}

.text{

	font-size:.95rem;

}

</style>