<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pb';

	let {
		title,
		collectionName,
		structureType,
		isDirector,
	}: {
		title: string;
		collectionName: string;
		structureType: 'group' | 'campus';
		isDirector?: boolean;
	} = $props();

	// svelte-ignore state_referenced_locally
	if (pb.authStore.isValid) goto(`/${collectionName}`);

	let isLogin = $state(true);
	const idPattern = '[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}';

	let email = $state('');
	let password = $state('');
	let fullname = $state('');
	let structureId = $state('');

	async function login() {
		if (!email || !password) return;

		await pb.collection(collectionName).authWithPassword(email, password);

		goto(`/${collectionName}`);
	}

	async function registrate() {
		if (!email || !password || !fullname) return;

		await pb.collection(collectionName).create({
			email,
			password,
			passwordConfirm: password,
			fullname,
			[structureType]: structureId,
		});
	}
</script>

<div class="flex h-svh items-center justify-center">
	<div class="card w-96 bg-base-100 shadow-sm">
		<div class="card-body">
			<h1 class="card-title self-center text-2xl font-bold text-zinc-900">{title}</h1>
			<h2 class="card-title self-center text-zinc-700">{isLogin ? 'Вход' : 'Регистрация'}</h2>

			{#if !isLogin}
				<fieldset class="fieldset">
					<legend class="fieldset-legend">ФИО</legend>
					<label for="fullname" class="validator input w-full">
						<input
							type="text"
							id="fullname"
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

			{#if !isLogin && !isDirector}
				<fieldset class="fieldset">
					<legend class="fieldset-legend"
						>{structureType == 'group' ? 'Код группы' : 'Код школы'}</legend
					>
					<label for="structure" class="validator input w-full">
						<input
							type="text"
							id="structure"
							placeholder="AB1-CDE-23F"
							pattern={idPattern}
							required
							bind:value={structureId}
						/>
					</label>
					<p class="validator-hint hidden">
						{structureType == 'group' ? 'Код группы' : 'Код школы'} не соответствует формату
					</p>
				</fieldset>
			{/if}

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
