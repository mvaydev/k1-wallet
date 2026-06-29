<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pb';
	import Navbar from '$lib/components/navbar.svelte';
	import type { RecordModel } from 'pocketbase';

	if (
		!pb.authStore.isValid ||
		!pb.authStore.record ||
		pb.authStore.record.collectionName != 'director'
	)
		goto('/login');

	let isLoading = $state(false);
	let selectedTab = $state('campus') as 'campus' | 'staff' | 'group';

	const tabs = {
		campus: {
			titles: ['ID', 'Адрес', 'Вместительность'],
			fields: ['id', 'address', 'capacity'],
		},
		staff: {
			titles: ['Email', 'ФИО', 'Роль', 'Школа'],
			fields: ['email', 'fullname', 'role', 'campus'],
		},
		group: {
			titles: ['ID', 'День недели', 'Время начала', 'Возраст', 'Школа'],
			fields: ['id', 'weekday', 'start_time', 'age_range', 'campus'],
		},
	};

	let tableTitles = $derived.by(() => tabs[selectedTab].titles);
	let tableData = $state(null) as RecordModel[] | null;

	async function loadTable(tab: typeof selectedTab) {
		return await pb.collection(tab).getFullList({ fields: tabs[tab].fields.join(', ') });
	}

	$effect(() => {
		loadTable(selectedTab).then((data) => {
			tableData = data;
		});
	});
</script>

<div>
	<!-- {#if isLoading}
		<div class="flex h-svh items-center justify-center">
			<span class="loading loading-spinner text-accent"></span>
		</div>
	{:else} -->
	<Navbar />

	<div class="m-auto mt-2 flex max-w-4xl flex-col gap-2">
		<div class="flex w-full" style="justify-content: space-between;">
			<div class="tabs-box tabs">
				<input
					type="radio"
					name="tabs"
					class="tab"
					aria-label="Школы"
					value="campus"
					bind:group={selectedTab}
				/>
				<input
					type="radio"
					name="tabs"
					class="tab"
					aria-label="Сотрудники"
					value="staff"
					bind:group={selectedTab}
				/>
				<input
					type="radio"
					name="tabs"
					class="tab"
					aria-label="Группы"
					value="group"
					bind:group={selectedTab}
				/>
			</div>

			<button class="btn btn-accent">Создать</button>
		</div>

		<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
			<table class="table">
				<thead>
					<tr>
						{#each tableTitles as title}
							<th>{title}</th>
						{/each}
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						{#each tableData as row}
							{#each tabs[selectedTab].fields as key}
								<td>{row[key]}</td>
							{/each}
						{/each}
						<td>
							<button class="btn btn-link">Изменить</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- {/if} -->
</div>
