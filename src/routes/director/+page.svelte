<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pb';
	import Navbar from '$lib/components/navbar.svelte';
	import Modal from '$lib/components/modal.svelte';

	if (!pb.authStore.isValid || pb.authStore.record?.collectionName !== 'director') goto('/login');

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
			titles: ['ID', 'День', 'Время', 'Возраст', 'Школа'],
			fields: ['id', 'weekday', 'start_time', 'age_range', 'campus'],
		},
	};

	let tab = $state('campus') as keyof typeof tabs;
	let data = $state<any[]>([]);
	let record = $state<any>({});

	$effect(() => {
		data = [];
		pb.collection(tab)
			.getFullList()
			.then((r) => (data = r));
	});

	function open(row?: any) {
		// Берём только редактируемые поля (без id)
		const editFields = tabs[tab].fields.filter((f) => f !== 'id');
		record = Object.fromEntries(editFields.map((f) => [f, row?.[f] ?? '']));
		if (row?.id) record.id = row.id;
		(document.getElementById('modal') as HTMLDialogElement).showModal();
	}
</script>

<Navbar />
<div class="m-auto mt-2 flex max-w-4xl flex-col gap-2">
	<div class="flex justify-between">
		<div class="tabs-box tabs">
			<input
				type="radio"
				name="tabs"
				class="tab"
				aria-label="Школы"
				value="campus"
				bind:group={tab}
			/>
			<input
				type="radio"
				name="tabs"
				class="tab"
				aria-label="Сотрудники"
				value="staff"
				bind:group={tab}
			/>
			<input
				type="radio"
				name="tabs"
				class="tab"
				aria-label="Группы"
				value="group"
				bind:group={tab}
			/>
		</div>
		<button class="btn btn-accent" onclick={() => open()}>Создать</button>
	</div>

	<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
		<table class="table">
			<thead>
				<tr>
					{#each tabs[tab].titles as t}<th>{t}</th>{/each}
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each data as row}
					<tr>
						{#each tabs[tab].fields as f}<td>{row[f] ?? '—'}</td>{/each}
						<td
							><button class="btn btn-link" onclick={() => open(row)}>Изменить</button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<Modal {record} collection={tab} />
