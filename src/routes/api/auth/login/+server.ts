import { json } from '@sveltejs/kit'

import { getDatabase } from '$lib/server'
import type { User } from '$lib/types'

export const POST = async ({ request, cookies }) => {
	const body = await request.json()

	const tableName = 'users'

	const users = await getDatabase<User>(tableName)

	const user = users.find(item => item.email === body.email && item.password === body.password)

	if (!user) {
		return json(
			{
				message: 'Email atau password salah',
			},
			{
				status: 401,
			},
		)
	}

	cookies.set(
		'session',
		JSON.stringify({
			id: user.id,
		}),
		{
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false,
			maxAge: 60 * 60 * 24 * 7,
		},
	)

	return json({
		message: 'Login berhasil',
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
		},
	})
}
