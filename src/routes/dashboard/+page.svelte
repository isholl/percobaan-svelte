<script>
	import { goto } from '$app/navigation'
	import { resolve } from '$app/paths'

	let loading = $state(false)

	const handleLogout = async () => {
		loading = true

		await fetch('/api/auth/logout', {
			method: 'POST',
		})

		loading = false

		await goto(resolve('/auth/login'))
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button
	type="button"
	class="rounded-md bg-black px-4 py-2 text-white"
	onclick={handleLogout}
	disabled={loading}
>
	Logout
</button>
