<script>
	const today = new Date();

	const month = today.toLocaleString('default', {
		month: 'long'
	});

	const day = today.getDate();

	const year = today.getFullYear();

	const weekday = today.toLocaleString('default', {
		weekday: 'long'
	});
</script>

<div class="calendar-card">

	<h2>CALENDAR</h2>

	<div class="date">

		<span class="day">{day}</span>

		<div>

			<h3>{month}</h3>

			<p>{year}</p>

		</div>

	</div>

	<p class="weekday">{weekday}</p>

</div>

<style>

.calendar-card{

	padding:28px;

	border-radius:30px;

	background:rgba(255,255,255,.18);

	backdrop-filter:blur(24px);

	border:1px solid rgba(255,255,255,.2);

	color:white;

}

h2{

	margin:0 0 24px;

	font-size:1.1rem;

	font-weight:800;

	letter-spacing:1px;

}

.date{

	display:flex;

	align-items:center;

	gap:18px;

}

.day{

	font-size:4rem;

	font-weight:900;

	line-height:1;

}

h3{

	margin:0;

	font-size:1.4rem;

}

p{

	margin:4px 0 0;

}

.weekday{

	margin-top:22px;

	font-size:1rem;

	opacity:.85;

}

</style>