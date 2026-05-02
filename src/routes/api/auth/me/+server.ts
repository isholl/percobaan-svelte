import { json } from '@sveltejs/kit'

import { getDatabase } from '$lib/server'
import type { User } from '$lib/types'

export const GET = async ({ cookies }) => {
	const session = cookies.get('session')

	if (!session) {
		return json(
			{
				message: 'Unauthorized',
			},
			{
				status: 401,
			},
		)
	}

	let sessionUser

	try {
		sessionUser = JSON.parse(session)
	} catch {
		cookies.delete('session', {
			path: '/',
		})

		return json(
			{
				message: 'Session tidak valid',
			},
			{
				status: 401,
			},
		)
	}

	const users = await getDatabase<User>('users')

	const user = users.find(row => row.id === sessionUser.id)

	if (!user) {
		cookies.delete('session', {
			path: '/',
		})

		return json(
			{
				message: 'User tidak ditemukan',
			},
			{
				status: 401,
			},
		)
	}

	return json({
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
		},
	})
}
