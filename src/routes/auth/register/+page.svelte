<script lang="ts">
	import { goto } from '$app/navigation'
	import { resolve } from '$app/paths'

	let name = $state('')
	let email = $state('')
	let password = $state('')
	let loading = $state(false)
	let error = $state('')

	const handleRegister = async (e: SubmitEvent) => {
		e.preventDefault()

		const response = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email, password }),
		})

		const result = await response.json()

		loading = false

		if (!response.ok) {
			error = result.message
			return
		}

		await goto(resolve('/auth/login'))
	}
</script>

<h1 class="mb-6 text-3xl font-bold">Register</h1>

{#if error}
	<p class="mb-3 text-red-500">{error}</p>
{/if}

<form class="space-y-4" onsubmit={handleRegister}>
	<div>
		<label for="name" class="mb-2 block text-sm font-medium">Nama</label>
		<input
			id="name"
			type="text"
			bind:value={name}
			placeholder="Masukkan nama"
			class="w-full rounded-md border border-zinc-700 px-4 py-2 outline-none"
			required
		/>
	</div>

	<div>
		<label for="register-email" class="mb-2 block text-sm font-medium">Email</label>
		<input
			id="register-email"
			type="email"
			bind:value={email}
			placeholder="Masukkan email"
			class="w-full rounded-md border border-zinc-700 px-4 py-2 outline-none"
			required
		/>
	</div>

	<div>
		<label for="register-password" class="mb-2 block text-sm font-medium">Password</label>
		<input
			id="register-password"
			type="password"
			bind:value={password}
			placeholder="Masukkan password"
			class="w-full rounded-md border border-zinc-700 px-4 py-2 outline-none"
			required
		/>
	</div>

	<button type="submit" class="w-full rounded-md bg-black px-4 py-2 text-white"
		>{loading ? 'Loading...' : 'Register'}</button
	>
</form>

<p class="mt-4 text-sm">
	Sudah punya akun?
	<a href={resolve('/auth/login')} class="font-semibold underline">Login</a>
</p>
