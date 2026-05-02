<script lang="ts">
	import { onMount } from 'svelte'

	import { goto } from '$app/navigation'
	import { resolve } from '$app/paths'

	let email = $state('')
	let password = $state('')
	let loading = $state(false)
	let error = $state('')

	let inputEl: HTMLInputElement

	const handleLogin = async (e: SubmitEvent) => {
		e.preventDefault()

		loading = true
		error = ''

		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})

		const result = await response.json()

		loading = false

		if (!response.ok) {
			error = result.message
			return
		}

		await goto(resolve('/dashboard'))
	}

	onMount(() => inputEl?.focus())
</script>

<h1 class="mb-6 text-3xl font-bold">Login</h1>

{#if error}
	<p class="mb-3 text-red-500">{error}</p>
{/if}

<form class="space-y-4" onsubmit={handleLogin}>
	<div>
		<label for="email" class="mb-2 block text-sm font-medium">Email</label>
		<input
			bind:this={inputEl}
			id="email"
			type="email"
			bind:value={email}
			placeholder="Masukkan email"
			class="w-full rounded-md border border-zinc-700 px-4 py-2 outline-none"
			required
		/>
	</div>

	<div>
		<label for="password" class="mb-2 block text-sm font-medium">Password</label>
		<input
			id="password"
			type="password"
			bind:value={password}
			placeholder="Masukkan password"
			class="w-full rounded-md border border-zinc-700 px-4 py-2 outline-none"
			required
		/>
	</div>

	<button type="submit" class="w-full rounded-md bg-black px-4 py-2 text-white" disabled={loading}>
		{loading ? 'Loading...' : 'Login'}
	</button>
</form>

<p class="mt-4 text-sm">
	Belum punya akun?
	<a href={resolve('/auth/register')} class="font-semibold underline">Register</a>
</p>
