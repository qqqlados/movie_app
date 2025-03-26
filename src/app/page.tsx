import { TrendingMoviesList, TrendingPeopleList, TrendingTVShowsList } from '@/components/shared/trending-list'
import Link from 'next/link'

export default function Home() {
	return (
		<div>
			<div className='flex gap-10 items-center justify-between'>
				<Link href={'/search'}>Search Tab</Link>
			</div>
		</div>
	)
}
