<script>
	import { onMount } from 'svelte';

	let name = "Profile";
	const role = "Administrator";

	onMount(() => {

		const username = localStorage.getItem('username');

		if (username) {

			name = username;

		}

	});

	function logout() {

		localStorage.removeItem('admin');
		localStorage.removeItem('username');

		window.location.href = '/auth';

	}
</script>

<div class="profile-card">

	<div class="top">

		<div class="avatar"></div>

		<div class="info">

	<h3>{name}</h3>

	<p>{role}</p>

</div>

		<button
			class="logout"
			on:click={logout}
		>
			LOGOUT
		</button>

	</div>

</div>

<style>

.profile-card{

	width:100%;

	padding:22px;

	border-radius:30px;

	background:rgba(255,255,255,.18);

	backdrop-filter:blur(24px);

	border:1px solid rgba(255,255,255,.25);

	box-shadow:
	0 15px 45px rgba(0,0,0,.15);

}

.top{

	display:flex;

	align-items:center;

	justify-content:space-between;

	gap:16px;

}

.avatar{

	width:58px;

	height:58px;

	border-radius:50%;

	background:#ececec;

	flex-shrink:0;

}

.info{

	flex:1;

	display:flex;

	flex-direction:column;

	justify-content:center;

}

.info h3{

	margin:0;

	color:white;

	font-size:1.1rem;

	font-weight:700;

	line-height:1.1;

	text-transform:capitalize;

}

.info p{

	margin-top:4px;

	color:rgba(255,255,255,.75);

	font-size:.82rem;

	font-weight:500;

}

.logout{

	border:none;

	padding:10px 18px;

	border-radius:999px;

	background:#ff1c1c;

	color:white;

	font-weight:700;

	cursor:pointer;

	transition:.25s;

}

.logout:hover{

	transform:translateY(-2px);

	background:#e00000;

}

@media(max-width:768px){

.profile-card{

	padding:18px;

	border-radius:24px;

}

.avatar{

	width:54px;
	height:54px;

}

.logout{

	padding:10px 16px;

	font-size:13px;

}

}

</style>