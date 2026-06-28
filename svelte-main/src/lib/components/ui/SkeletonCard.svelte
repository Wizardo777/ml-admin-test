<div class="skeleton"></div>

<style>

.skeleton{

	width:100%;

	height:220px;

	border-radius:30px;

	background:linear-gradient(
		90deg,
		rgba(255,255,255,.08) 25%,
		rgba(255,255,255,.20) 50%,
		rgba(255,255,255,.08) 75%
	);

	background-size:300% 100%;

	animation:shimmer 1.4s infinite;

}

@keyframes shimmer{

	0%{

		background-position:100%;

	}

	100%{

		background-position:-100%;

	}

}

</style>