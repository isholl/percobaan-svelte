import fs from 'node:fs/promises'
import path from 'node:path'

const filePath = path.resolve('src/lib/server/db.json')

export const getDatabase = async <T>(tableName: string): Promise<T[]> => {
	try {
		const file = await fs.readFile(filePath, 'utf-8')
		const data = JSON.parse(file)

		if (!data[tableName]) {
			data[tableName] = []

			await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
		}

		return data[tableName]
	} catch {
		const defaultData = {
			[tableName]: [],
		}

		await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2), 'utf-8')

		return defaultData[tableName]
	}
}

export const saveDatabase = async <T>(tableName: string, items: T[]) => {
	let data = {}

	try {
		const file = await fs.readFile(filePath, 'utf-8')
		data = JSON.parse(file)
		// eslint-disable-next-line no-empty
	} catch {}

	const updatedData = {
		...data,
		[tableName]: items,
	}

	await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf-8')
}
