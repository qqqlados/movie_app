import { Select } from '@/components/ui/select'
import { url } from '@/constants'
import { IMovie, IMoviesSearchResponse } from '@/lib/types/movie'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
	pagesCount: number
	onSelectPage: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function PageSelect({ pagesCount, onSelectPage }: Props) {
	const [pages, setPages] = useState<number[]>([])

	const searchParams = useSearchParams()

	useEffect(() => {
		setPages(Array.from({ length: pagesCount }, (_, i) => i + 1))
	}, [searchParams])

	return (
		<div className='flex gap-2 items-center'>
			<label htmlFor='page-select'>Pages: </label>
			<Select onChange={onSelectPage} value={searchParams.get('page') ?? 1} name='page-select'>
				{pages.length > 0 &&
					pages?.map((variant, index) => (
						<option value={variant} key={index}>
							{variant}
						</option>
					))}
			</Select>
		</div>
	)
}
