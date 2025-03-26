import { url } from '@/constants'
import { IMovieExpandedResponse } from '@/lib/types/movie'
import Image from 'next/image'

export async function MovieExpanded({ movieId }: { movieId: string }) {
	const movieInfo: IMovieExpandedResponse = await fetch(`${url.API_BASEURL}/movie/${movieId}${process.env.NEXT_PUBLIC_API_KEY}`).then(res =>
		res.json()
	)

	console.log(`${url.API_BASEURL}/movie/${movieId}${process.env.NEXT_PUBLIC_API_KEY}`)

	return (
		<div>
			<section className='flex gap-10'>
				<div>
					{movieInfo.poster_path && <Image src={`${url.IMAGE_POSTER_URL}/${movieInfo.poster_path}`} alt='Movie Poster' width={200} height={300} />}
				</div>
				<div className='flex flex-col gap-5 justify-start'>{movieInfo.title}</div>
			</section>

			<section></section>
		</div>
	)
}
