<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pb';

	async function logout() {
		pb.authStore.clear();
		goto('/login');
	}
</script>

<div class="navbar justify-center bg-base-100 shadow-sm">
	<div class="flex w-full max-w-4xl">
		<div class="navbar-start">
			<a class="text-xl" href="/">K1 Wallet</a>
		</div>
		<div class="navbar-end">
			<button class="btn btn-soft btn-error" onclick={logout}>Выйти</button>
		</div>
	</div>
</div>
