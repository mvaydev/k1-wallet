<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { pb, type Campus, type Group, type Student } from '$lib/pb';

	if (browser && !pb.authStore.isValid) goto('/login');

	let isLoading = $state(true);
	let student = $state() as Student;
	let group = $state() as Group;
	let campus = $state() as Campus;

	async function load() {
		student = await pb.collection('student').getOne(pb.authStore.record!.id);
		group = await pb.collection('group').getOne(student.group);
		campus = await pb.collection('campus').getOne(group.campus);

		isLoading = false;
	}

	async function logout() {
		pb.authStore.clear();
		goto('/login');
	}

	load();
</script>

<div>
	{#if isLoading}
		<div class="flex h-svh items-center justify-center">
			<span class="loading loading-spinner text-accent"></span>
		</div>
	{:else}
		<div class="m-auto flex max-w-2xl flex-col space-y-2 p-4">
			<div class="stats w-full bg-base-100 shadow">
				<div class="stat">
					<div class="stat-title">Копилка</div>
					<div class="stat-value">{student.kiberon_balance} ₭</div>
				</div>
			</div>

			<div class="card bg-base-100 shadow card-lg">
				<div class="card-body">
					<h2 class="font-extrabold">ГРУППА</h2>
					<div class="flex flex-col gap-3">
						<div>
							<h3 class="stat-title">Время занятий</h3>
							<p>{group.weekday} в {group.start_time}</p>
						</div>
						<div>
							<h3 class="stat-title">Адрес</h3>
							<p>{campus.address}</p>
						</div>
						<div>
							<h3 class="stat-title">Возраст</h3>
							<p>{group.age_range}</p>
						</div>
					</div>
				</div>
			</div>

			<button class="btn w-min btn-outline btn-error" onclick={logout}>Выйти</button>
		</div>
	{/if}
</div>
