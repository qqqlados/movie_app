import { MovieExpanded } from '@/components/shared/movie-expanded'
import { Suspense } from 'react'

export default async function MoviePage({ params }: { params: { link: string } }) {
	const param = await params

	const [id, title] = param?.link.split('-')

	return (
		<div>
			<section>
				<ul>
					<li>Item 1</li>
					<li>Item 2</li>
					<li>Item 3</li>
				</ul>
			</section>

			<Suspense fallback={<div>Loading...</div>}>
				<MovieExpanded movieId={id} />
			</Suspense>
		</div>
	)
}
