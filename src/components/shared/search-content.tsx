import { url } from '@/constants'
import { IMovie } from '@/lib/types/movie'
import MovieCard from './movie-card'
import Link from 'next/link'

export function SearchContent({ movies }: { movies: IMovie[] }) {
	return (
		<ul className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'>
			{movies?.length > 0 &&
				movies?.map(movie => (
					<li key={movie.id}>
						<Link href={`/movie/${movie.id}-${movie.title}`}>
							<MovieCard movie={movie} />
						</Link>
					</li>
				))}
		</ul>
	)
}
