<script lang="ts">
	import { pb } from '$lib/pb';

	let { title, collectionName } = $props();
	let isLogin = $state(true);
	let fullname = $state('');
	let email = $state('');
	let password = $state('');

	async function login() {
		if (!email || !password) return;

		await pb.collection(collectionName).authWithPassword(email, password);
	}

	async function registrate() {
		if (!email || !password || !fullname) return;
	}
</script>

<div class="flex justify-center">
	<div class="card mt-16 w-96 bg-base-100 shadow-sm">
		<div class="card-body">
			<h1 class="card-title self-center text-2xl font-bold text-zinc-900">{title}</h1>
			<h2 class="card-title self-center text-zinc-700">{isLogin ? 'Вход' : 'Регистрация'}</h2>

			{#if !isLogin}
				<fieldset class="fieldset">
					<legend class="fieldset-legend">ФИО</legend>
					<label for="email" class="validator input w-full">
						<input
							type="text"
							id="email"
							placeholder="Иванов Иван Иванович"
							pattern="^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+( [А-ЯЁ][а-яё]+)?$"
							maxlength="150"
							required
							bind:value={fullname}
						/>
					</label>
					<p class="validator-hint hidden">Введите вашу фамилию, имя и отчество</p>
				</fieldset>
			{/if}

			<fieldset class="fieldset">
				<legend class="fieldset-legend">Почта</legend>
				<label for="email" class="validator input w-full">
					<input
						type="email"
						id="email"
						placeholder="hello@example.com"
						required
						bind:value={email}
					/>
				</label>
				<p class="validator-hint hidden">Введите правильную почту</p>
			</fieldset>

			<fieldset class="fieldset">
				<legend class="fieldset-legend">Пароль</legend>
				<label for="password" class="validator input w-full">
					<input
						type="password"
						id="password"
						required
						minlength="6"
						maxlength="32"
						bind:value={password}
					/>
				</label>
				<p class="validator-hint hidden">Пароль должен содержать от 8 до 32 символов</p>
			</fieldset>

			<div class="card-actions justify-center">
				<button class="btn w-full btn-accent" onclick={isLogin ? login : registrate}>
					{isLogin ? 'Войти' : 'Создать аккаунт'}
				</button>
			</div>

			<button
				class="btn w-full btn-link"
				onclick={() => {
					isLogin = !isLogin;
				}}
			>
				{isLogin ? 'Нет аккаунта' : 'Уже есть аккаунт'}
			</button>
		</div>
	</div>
</div>
