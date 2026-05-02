import { redirect } from '@sveltejs/kit'

export const load = async ({ fetch }) => {
	const response = await fetch('/api/auth/me')

	if (!response.ok) {
		throw redirect(302, '/login')
	}

	const data = await response.json()

	return {
		user: data.user,
	}
}
