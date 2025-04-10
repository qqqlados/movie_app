import { url } from '@/constants'
import { Language } from '@/lib/types/filters'
import { useSearchParams } from 'next/navigation'
import { Select } from '@/components/ui/select'
import useSWR from 'swr'
import { fetchLanguages } from '@/actions'
import { useEffect, useState } from 'react'

type Props = {
	onSelectLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function LanguageSelect({ onSelectLanguage }: Props) {
	// const { data: languages = [], error, isLoading } = useSWR('/languages', fetchLanguages)
	const [languages, setLanguages] = useState<Language[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		setIsLoading(true)
		fetchLanguages()
			.then(setLanguages)
			.catch(console.error)
			.finally(() => setIsLoading(false))
	}, [])

	const searchParams = useSearchParams()

	let targetLanguage: Language | undefined = undefined

	if (languages.length > 0) {
		targetLanguage = languages.find((lang: Language) => {
			return lang.iso_639_1 === searchParams.get('language')
		})
	}

	function isLanguage(lang: Language | undefined): lang is Language {
		return lang != undefined
	}

	return (
		<div className='flex gap-2 items-center'>
			<>
				<label htmlFor='language-select'>Language: </label>
				<Select onChange={onSelectLanguage} value={(targetLanguage as Language)?.iso_639_1} name='language-select'>
					{isLoading && <option>Loading...</option>}

					{searchParams.get('language') === 'en-US' && <option value='en-US'>English</option>}

					{isLanguage(targetLanguage) && Object.keys(targetLanguage).length > 1 && (
						<option value={targetLanguage?.iso_639_1}>{targetLanguage?.english_name}</option>
					)}

					{languages.length > 0 &&
						languages?.map((variant: Language) => (
							<option value={variant.iso_639_1} key={variant.iso_639_1}>
								{variant.english_name}
							</option>
						))}
				</Select>
			</>
		</div>
	)
}
