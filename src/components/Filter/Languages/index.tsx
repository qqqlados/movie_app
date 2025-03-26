import { url } from '@/constants'
import { Language } from '@/lib/types/filters'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Select } from '@/components/ui/select'

type Props = {
	onSelectLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void
	query?: string
}

export function LanguageSelect({ query, onSelectLanguage }: Props) {
	const [loading, setLoading] = useState<boolean>(false)
	const [languages, setLanguages] = useState<Language[]>([])

	const searchParams = useSearchParams()

	let targetLanguage: Language | {} | undefined = {}

	useEffect(() => {
		const fetchLanguages = async () => {
			try {
				setLoading(true)
				const availableLanguages = await fetch(`${url.API_BASEURL}/configuration/languages`, {
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
					},
				}).then(response => response.json())

				setLanguages(availableLanguages)
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}
		fetchLanguages()
	}, [query])

	useEffect(() => {
		if (languages.length > 0) {
			targetLanguage = languages.find(lang => {
				return lang.iso_639_1 === searchParams.get('language')
			})
		}
	}, [languages])

	return (
		<div className='flex gap-2 items-center'>
			{loading ? (
				<div>Loading...</div>
			) : (
				<>
					<label htmlFor='language-select'>Language: </label>
					<Select onChange={onSelectLanguage} value={(targetLanguage as Language)?.iso_639_1} name='language-select'>
						{searchParams.get('language') === 'en-US' && <option value='en-US'>English</option>}
						{Object.keys(targetLanguage).length > 1 && (
							<option value={(targetLanguage as Language)?.iso_639_1}>{(targetLanguage as Language)?.english_name}</option>
						)}
						{languages.length > 0 &&
							languages?.map(variant => (
								<option value={variant.iso_639_1} key={variant.iso_639_1}>
									{variant.english_name}
								</option>
							))}
					</Select>
				</>
			)}
		</div>
	)
}
