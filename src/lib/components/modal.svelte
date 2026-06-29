<script lang="ts">
	import { pb } from '$lib/pb';

	let { record, collection }: { record: any; collection: string } = $props();

	const reload = () => location.reload();
	const save = () =>
		record.id
			? pb.collection(collection).update(record.id, record).then(reload)
			: pb.collection(collection).create(record).then(reload);
	const remove = () => pb.collection(collection).delete(record.id).then(reload);
	const close = () => (document.getElementById('modal') as HTMLDialogElement).close();
</script>

<dialog id="modal" class="modal">
	<div class="modal-box flex flex-col gap-3">
		{#each Object.entries(record).filter(([k]) => k !== 'id') as [key]}
			<label class="fieldset">
				<span class="fieldset-legend">{key}</span>
				<input class="input w-full" bind:value={record[key]} />
			</label>
		{/each}
		<div class="modal-action justify-start">
			<button class="btn btn-accent" onclick={save}>Сохранить</button>
			{#if record.id}<button class="btn btn-error" onclick={remove}>Удалить</button>{/if}
			<button class="btn btn-ghost" onclick={close}>Отмена</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>
