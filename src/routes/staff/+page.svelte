<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb, type KiberonTransaction, type Staff, type Student } from '$lib/pb';
	import Navbar from '$lib/components/navbar.svelte';
	import TransactionModal from '$lib/components/transaction-modal.svelte';

	if (
		!pb.authStore.isValid ||
		!pb.authStore.record ||
		pb.authStore.record.collectionName != 'staff'
	)
		goto('/login');

	let staff = $state() as Staff;
	let students = $state([]) as Student[];
	let tableData = $state([]) as Array<{ student_data: Student } & KiberonTransaction>;
	let isLoading = $state(true);
	let selectedTransaction: KiberonTransaction | undefined = $state();

	async function load() {
		staff = await pb.collection('staff').getOne(pb.authStore.record!.id);
		students = await pb.collection('student').getFullList();
		await loadTransactions();
		isLoading = false;
	}

	async function loadTransactions() {
		tableData = [];
		const transactions: KiberonTransaction[] = await pb
			.collection('kiberon_transaction')
			.getFullList();

		for (let t of transactions) {
			const student: Student = await pb.collection('student').getOne(t.student);
			t.created = new Intl.DateTimeFormat('ru').format(new Date(t.created));
			tableData.push({ ...t, student_data: student });
		}
	}

	function showTransactionModal() {
		document.querySelector<HTMLDialogElement>('#transaction')?.showModal();
	}

	function createTransaction() {
		selectedTransaction = undefined;
		showTransactionModal();
	}

	function editTransaction(t: KiberonTransaction) {
		selectedTransaction = t;
		showTransactionModal();
	}

	load();
</script>

<div>
	{#if isLoading}
		<div class="flex h-svh items-center justify-center">
			<span class="loading loading-spinner text-accent"></span>
		</div>
	{:else}
		<Navbar />
		<TransactionModal {selectedTransaction} {students} />

		<div class="m-auto mt-2 flex max-w-4xl flex-col gap-2">
			<button class="btn" onclick={createTransaction}>Создать транзакцию</button>

			<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
				<table class="table">
					<thead>
						<tr>
							<th>Ученик</th>
							<th>Количество</th>
							<th>Комментарий</th>
							<th>Дата</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						{#each tableData as t}
							<tr>
								<td>{t.student_data.fullname}</td>
								<td>{t.amount}</td>
								<td>{t.comment}</td>
								<td>{t.created}</td>
								<td>
									<button class="btn btn-link" onclick={() => editTransaction(t)}
										>Изменить</button
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
