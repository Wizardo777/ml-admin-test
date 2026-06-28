<script>
	import { goto } from '$app/navigation';

	let userId = '';
	let password = '';

	function login() {

		if (
	userId === 'mlclub' &&
	password === 'mlclub123'
) {
	localStorage.setItem('admin', 'true');
	localStorage.setItem('username', userId);

	goto('/admin');
}
		 else {
			alert('Invalid Credentials');
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-black text-white">

	<div class="bg-zinc-900 p-8 rounded-xl w-96">

		<h1 class="text-3xl font-bold mb-6">
			ML Club Admin
		</h1>

		<input
			bind:value={userId}
			placeholder="User ID"
			class="w-full bg-zinc-800 p-3 rounded mb-4"
		/>

		<input
			type="password"
			bind:value={password}
			placeholder="Password"
			class="w-full bg-zinc-800 p-3 rounded mb-4"
		/>

		<button
			onclick={login}
			class="w-full bg-blue-600 p-3 rounded"
		>
			Login
		</button>

	</div>

</div>