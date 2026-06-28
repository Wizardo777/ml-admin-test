<script>
	import { page } from '$app/state';
	import { Package, User, FolderKanban, BookOpen } from 'lucide-svelte';

	const links = [
		{
			icon: Package,
			path: '/admin'
		},
		{
			icon: User,
			path: '/admin/members'
		},
		{
			icon: FolderKanban,
			path: '/admin/projects'
		},
		{
			icon: BookOpen,
			path: '/admin/blogs'
		}
	];

	const isActive = (path) => page.url.pathname === path;
</script>

<!-- Desktop Sidebar -->
<aside class="sidebar">

	<div class="nav">

		{#each links as link}

			<a
				href={link.path}
				class:active={isActive(link.path)}
			>
				<link.icon size={30}/>
			</a>

		{/each}

	</div>

</aside>

<!-- Mobile Bottom Navigation -->
<nav class="mobile-nav">

	{#each links as link}

		<a
			href={link.path}
			class:active={isActive(link.path)}
		>
			<link.icon size={28}/>
		</a>

	{/each}

</nav>

<style>

.sidebar{

	position:fixed;

	left:28px;

	top:50%;

	transform:translateY(-50%);

	width:68px;

	height:740px;

	display:flex;

	justify-content:center;

	align-items:center;

	border-radius:38px;

	background:rgba(255,255,255,.16);

	backdrop-filter:blur(20px);

	border:1px solid rgba(255,255,255,.28);

	box-shadow:0 20px 50px rgba(0,0,0,.30);

	z-index:200;

}

.nav{

	display:flex;

	flex-direction:column;

	gap:42px;

}

a{

	width:54px;

	height:54px;

	border-radius:50%;

	display:flex;

	align-items:center;

	justify-content:center;

	color:#111;

	text-decoration:none;

	transition:
	transform .25s,
	background .25s,
	box-shadow .25s;

}

a:hover{

	background:white;

	transform:translateY(-2px) scale(1.08);

	box-shadow:
	0 10px 24px rgba(0,0,0,.18);

}

.active{

	background:white;

	color:#111;

	transform:scale(1.08);

	box-shadow:
	0 12px 28px rgba(0,0,0,.25),
	0 0 24px rgba(92,255,99,.18);

}

.mobile-nav{

	display:none;

}

@media(max-width:768px){

	.sidebar{

		display:none;

	}

	.mobile-nav{

		position:fixed;

		left:50%;

		bottom:18px;

		transform:translateX(-50%);

		display:flex;

		gap:24px;

		padding:14px 22px;

		border-radius:28px;

		background:rgba(255,255,255,.18);

		backdrop-filter:blur(20px);

		border:1px solid rgba(255,255,255,.25);

		box-shadow:0 15px 40px rgba(0,0,0,.25);

		z-index:300;

	}

	.mobile-nav a{

		width:48px;

		height:48px;

	}

}

</style>