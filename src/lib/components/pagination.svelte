<script lang="ts">
	let {
		active,
		total,
	}: {
		active: number;
		total: number;
	} = $props();
</script>

<div class="join">
	<button class="btn join-item" disabled={active < 2} onclick={() => active--}>«</button>
	<button class="btn join-item">Страница {active}</button>
	<button class="btn join-item" disabled={active > total - 1} onclick={() => active++}>»</button>
</div>
