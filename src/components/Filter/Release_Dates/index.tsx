'use client'

import { Select } from '@/components/ui/select'
import { IMovie } from '@/lib/types/movie'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
	movies: IMovie[]
	onSelectYear: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function ReleaseDatesSelect({ movies, onSelectYear }: Props) {
	const [dates, setDates] = useState<number[]>([])

	const searchParams = useSearchParams()

	useEffect(() => {
		const sortedDatesList = Array.from(new Set(movies.map(movie => parseInt(movie.release_date)).filter(year => !isNaN(year)))).sort((a, b) => b - a)

		setDates(sortedDatesList)
	}, [searchParams])

	return (
		<div className='flex gap-2 items-center'>
			{dates.length == 0 ? (
				<div>Loading...</div>
			) : (
				<>
					<label htmlFor='release_year'>Release Year</label>
					<Select onChange={onSelectYear} value={searchParams.get('release_year') ?? '2025'}>
						{dates.map(date => (
							<option value={String(date)} key={date}>
								{date}
							</option>
						))}
					</Select>
				</>
			)}
		</div>
	)
}
