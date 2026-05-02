import { json } from '@sveltejs/kit'

import { getDatabase, saveDatabase } from '$lib/server'
import type { User } from '$lib/types'

export const POST = async ({ request }) => {
	const body = await request.json()

	const tableName = 'users'

	const users = await getDatabase<User>(tableName)

	const existingUser = users.find(user => user.email === body.email)

	if (existingUser) {
		return json(
			{
				message: 'Email sudah digunakan',
			},
			{
				status: 400,
			},
		)
	}

	const newUser: User = {
		id: users.length + 1,
		name: body.name,
		email: body.email,
		password: body.password,
	}

	const updatedUsers = [...users, newUser]

	await saveDatabase<User>(tableName, updatedUsers)

	return json({
		message: 'Register berhasil',
		user: newUser,
	})
}
