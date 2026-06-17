<script lang="ts">
	import { pb, type KiberonTransaction, type Student } from '$lib/pb';

	let {
		selectedTransaction,
		students,
	}: {
		selectedTransaction?: KiberonTransaction;
		students: Student[];
	} = $props();

	let transaction = $derived(selectedTransaction || ({} as KiberonTransaction));
	let studentId = $derived(transaction.student);

	async function deleteTransaction() {
		await pb.collection('kiberon_transaction').delete(transaction.id);
		location.reload();
	}

	async function updateTransaction() {
		transaction.student = studentId;
		await pb.collection('kiberon_transaction').update(transaction.id, transaction);
		location.reload();
	}

	async function addTransaction() {
		transaction.student = studentId;
		await pb.collection('kiberon_transaction').create(transaction);
		location.reload();
	}
</script>

<dialog id="transaction" class="modal">
	<div class="modal-box">
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Количество киберон</legend>
			<input
				class="validator input w-full"
				type="number"
				id="amount"
				placeholder="10"
				required
				bind:value={transaction.amount}
			/>
			<p class="validator-hint hidden">Должно быть числом</p>
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend">Ученик</legend>
			<select class="select w-full" required bind:value={studentId}>
				{#each students as student}
					<option value={student.id}>{student.fullname}</option>
				{/each}
			</select>
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend">Комментарий</legend>
			<textarea class="textarea w-full" maxlength="500" bind:value={transaction.comment}
			></textarea>
			<p class="label">Необязательно (макс. 500 символов)</p>
		</fieldset>

		<div class="modal-action justify-start">
			{#if selectedTransaction}
				<button class="btn btn-outline btn-accent" onclick={updateTransaction}>
					Изменить
				</button>
				<button class="btn btn-error" onclick={deleteTransaction}>Удалить</button>
			{:else}
				<button class="btn btn-accent" onclick={addTransaction}>Добавить</button>
			{/if}
			<form method="dialog">
				<button class="btn btn-outline btn-error">Отмена</button>
			</form>
		</div>
	</div>
</dialog>
