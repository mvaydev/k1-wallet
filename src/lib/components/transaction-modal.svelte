<script lang="ts">
	let {
		isNew,
	}: {
		isNew: boolean;
	} = $props();
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
			/>
			<p class="validator-hint hidden">Должно быть числом</p>
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend">Ученик</legend>
			<select class="select w-full" required>
				<option>Петров Сергей</option>
				<option>Семенов Андрей</option>
				<option>Иванов Иван</option>
			</select>
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend">Комментарий</legend>
			<textarea class="textarea w-full" maxlength="500"></textarea>
			<p class="label">Необязательно (макс. 500 символов)</p>
		</fieldset>

		<div class="modal-action justify-start">
			<button class="btn btn-accent">{isNew ? 'Добавить' : 'Изменить'}</button>
			{#if !isNew}
				<button class="btn btn-error">Удалить</button>
			{/if}
			<form method="dialog">
				<button class="btn btn-outline btn-error">Отмена</button>
			</form>
		</div>
	</div>
</dialog>
