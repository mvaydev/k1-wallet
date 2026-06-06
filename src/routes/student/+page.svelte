<script lang="ts">
	import { pb } from '$lib/pb';

	let student = $state();

	async function loadStudent() {
		student = await pb.collection('student').getOne(pb.authStore.record!.id);
	}

	loadStudent();
</script>

<div class="m-auto flex max-w-2xl flex-col space-y-2 p-4">
	<div class="stats w-full bg-base-100 shadow">
		<div class="stat">
			<div class="stat-title">Копилка</div>
			<div class="stat-value">350 ₭</div>
		</div>
	</div>

	<div class="card bg-base-100 shadow card-lg">
		<div class="card-body">
			<h2 class="font-extrabold">ГРУППА</h2>
			<div class="flex flex-col gap-3">
				<div>
					<h3 class="stat-title">Время занятий</h3>
					<p>Воскресенье в 12:15</p>
				</div>
				<div>
					<h3 class="stat-title">Адрес</h3>
					<p>г.Братск, пр. Ленина, д 24</p>
				</div>
				<div>
					<h3 class="stat-title">Возраст</h3>
					<p>8-11 Лет</p>
				</div>
			</div>
		</div>
	</div>

	<button class="btn w-min btn-outline btn-error">Выйти</button>
</div>
