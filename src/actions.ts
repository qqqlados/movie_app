'use server'

import { url } from './constants'
import { Language } from './lib/types/filters'

export const fetchLanguages = async () => {
	try {
		const response = await fetch(`${url.API_BASEURL}/configuration/languages`, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
			},
			cache: 'force-cache',
		})
		if (!response.ok) throw new Error('Failed to fetch languages')

		const data: Language[] = await response.json()

		return data
	} catch (err) {
		console.log(err)

		return []
	}
}
