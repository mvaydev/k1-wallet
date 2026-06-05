<script lang="ts">
	import { pb } from '$lib/pb';

	let isLogin = $state(true);
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	function toogleIsLogin() {
		isLogin = !isLogin;
	}
	async function login() {}
	async function registrate() {}
</script>

<div class="flex justify-center">
	<div class="card mt-16 w-96 bg-base-100 shadow-sm">
		<div class="card-body">
			<h1 class="card-title self-center text-2xl font-bold">Персонал</h1>
			<h2 class="card-title self-center">
				{isLogin ? 'Вход' : 'Регистрация'}
			</h2>

			<fieldset class="fieldset">
				<legend class="fieldset-legend">Почта</legend>
				<label for="email" class="validator input w-full">
					<input
						type="email"
						name="email"
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
						name="password"
						id="password"
						required
						minlength="6"
						maxlength="32"
						bind:value={password}
					/>
				</label>
				<p class="validator-hint hidden">Пароль должен содержать от 8 до 32 символов</p>
			</fieldset>

			{#if !isLogin}
				<fieldset class="fieldset">
					<legend class="fieldset-legend">Подтверждение пароля</legend>
					<label for="confirm_password" class="validator input w-full">
						<input
							type="password"
							name="confirm_password"
							id="confirm_password"
							required
							minlength="6"
							maxlength="32"
							bind:value={confirmPassword}
						/>
					</label>
					<p class="validator-hint hidden">Пароль должен содержать от 8 до 32 символов</p>
				</fieldset>
			{/if}

			<div class="card-actions justify-center">
				<button class="btn w-full btn-accent" onclick={isLogin ? login : registrate}>
					{isLogin ? 'Войти' : 'Зарегистрироваться'}
				</button>
			</div>
			<button class="btn btn-link" onclick={toogleIsLogin}>
				{isLogin ? 'Уже есть аккаунт' : 'Ещё нет аккаунта'}
			</button>
		</div>
	</div>
</div>
