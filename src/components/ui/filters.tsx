'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { LanguageSelect } from '../Filter/Languages'
import { PageSelect } from '../Filter/Pages'
import { ReleaseDatesSelect } from '../Filter/Release_Dates'
import { IMoviesSearchResponse } from '@/lib/types/movie'
import AdultSwitchToggle from '../Filter/Adult'
import React, { useState } from 'react'

type Props = {
	moviesDto: IMoviesSearchResponse
}

export function Filters({ moviesDto }: Props) {
	const router = useRouter()

	const searchParams = useSearchParams()

	const query = searchParams.get('query') ?? ''
	const adult = searchParams.get('include_adult') ?? 'false'
	const language = searchParams.get('language') ?? 'en-US'
	const page = searchParams.get('page') ?? 1
	const releaseYear = searchParams.get('release_year') ?? 2025

	const handleSelectLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedLanguage = e.target.value

		if (selectedLanguage)
			router.push(`/search?query=${query}&include_adult=${adult}&language=${selectedLanguage}&release_year=${releaseYear}&page=${page}`)
	}

	const handleSelectPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedPage = e.target.value

		if (selectedPage)
			router.push(`/search?query=${query}&include_adult=${String(adult)}&language=${language}&release_year=${releaseYear}&page=${selectedPage}`)
	}

	const handleSelectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedYear = e.target.value

		if (selectedYear)
			router.push(`/search?query=${query}&include_adult=${String(adult)}&language=${language}&release_year=${selectedYear}&page=${page}`)
	}

	const handleToggleAdult = (value: boolean) => {
		router.push(`/search?query=${query}&include_adult=${String(value)}&language=${language}&release_year=${releaseYear}&page=${page}`)
	}

	return (
		<div className='grid grid-cols-2 gap-3 w-100'>
			<LanguageSelect onSelectLanguage={handleSelectLanguage} />

			<PageSelect pagesCount={moviesDto.total_pages} onSelectPage={handleSelectPage} />

			<ReleaseDatesSelect movies={moviesDto.results} onSelectYear={handleSelectYear} />

			<AdultSwitchToggle onToggle={handleToggleAdult} />
		</div>
	)
}
