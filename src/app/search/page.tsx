import { SearchContent } from '@/components/shared/search-content'
import { Filters } from '@/components/ui/filters'
import { Suspense } from 'react'
import Form from 'next/form'
import { url } from '@/constants'
import { IMovie, IMoviesSearchResponse } from '@/lib/types/movie'
import { Popover } from '@/components/ui/popover'

export default async function SearchPage({
	searchParams,
}: {
	searchParams?: { query?: string; adult?: boolean; language?: string; release_year?: string; page: number }
}) {
	const params = await searchParams

	let movieData: IMoviesSearchResponse | {} = {}

	if (params?.query) {
		movieData = await fetch(
			`${url.API_BASEURL}/search/movie?query=${params?.query}&include_adult=${params?.adult ?? 'false'}&language=${
				params?.language ?? 'en-US'
			}&release_year=${params?.release_year ?? 2025}&page=${params?.page ?? 1}`,
			{
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
				},
			}
		).then(res => res.json())
	}

	return (
		<div className='flex flex-col items-center gap-5 p-5'>
			<div className='flex gap-5 justify-center w-full'>
				<div className='max-w-[600px] w-full ml-auto'>
					<Form action={`/search`} className='flex items-center gap-5 w-full'>
						<input
							className='w-[500px] h-[40px] text-black outline outline-blue-400 outline-1 p-2 focus:outline-blue-600 focus:outline-3 transition transition-all transition-linear duration-500 rounded-xl'
							name='query'
							type='text'
							placeholder={params?.query}
						/>

						<input type='hidden' name='include_adult' value='false' />
						<input type='hidden' name='language' value='en-US' />
						<input type='hidden' name='release_date' value='2025' />
						<input type='hidden' name='page' value='1' />

						<button type='submit' className='px-5 py-2 bg-slate-300 rounded-xl cursor-pointer hover:bg-slate-400/60 transition duration-300'>
							Search
						</button>
					</Form>
				</div>

				{params && Object.values(params).length !== 0 && (
					<Popover
						hoverElement={
							<div className='px-4 py-2 bg-gray-200 text-gray-700 font-semibold text-center cursor-pointer rounded-md shadow-md hover:bg-gray-300 transition duration-200'>
								Filters
							</div>
						}
						hoverAreaWidth='20'
						popoverId='filters-popover'
					>
						<Filters moviesDto={movieData as IMoviesSearchResponse} />
					</Popover>
				)}

				<div className='w-80' />
			</div>

			<Suspense key={JSON.stringify(params)} fallback={<p>Loading...</p>}>
				<SearchContent movies={'results' in movieData ? movieData.results : []} />
			</Suspense>
		</div>
	)
}
