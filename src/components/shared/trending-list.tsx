'use client'

import { IMovie, IMoviesResponse } from '@/lib/types/movie'
import { IPerson, IPersonResponse } from '@/lib/types/people'
import { ITVShow, ITVShowResponse } from '@/lib/types/tv'
import { getTrendingMovies, getTrendingPeople, getTrendingTVShows } from '@/services/trending.service'
import { useQuery } from '@tanstack/react-query'

export function TrendingMoviesList() {
	const { data } = useQuery<IMoviesResponse, Error, IMovie[]>({
		queryKey: ['trending_movies'],
		queryFn: () => getTrendingMovies('week'),
		select: (data: IMoviesResponse) => data.results,
		refetchOnWindowFocus: false,
	})

	return (
		<ul>
			{data?.map((movie: IMovie) => (
				<li key={movie.id}>{movie.title}</li>
			))}
		</ul>
	)
}

export function TrendingTVShowsList() {
	const { data } = useQuery<ITVShowResponse, Error, ITVShow[]>({
		queryKey: ['trending_tv_show'],
		queryFn: () => getTrendingTVShows('week'),
		select: (data: ITVShowResponse) => data.results,
		refetchOnWindowFocus: false,
	})

	// const posters = data?.map(poster => poster.profile_path)

	console.log(data)

	return (
		<ul>
			{data?.map((show: ITVShow) => (
				<li key={show.id}>{show.name}</li>
			))}
		</ul>
	)
}
export function TrendingPeopleList() {
	const { data } = useQuery<IPersonResponse, Error, IPerson[]>({
		queryKey: ['trending_tv_show'],
		queryFn: () => getTrendingPeople('week'),
		select: (data: IPersonResponse) => data.results,
		refetchOnWindowFocus: false,
	})

	return (
		<ul>
			{data?.map((person: IPerson) => (
				<li key={person.id}>{person.name}</li>
			))}
		</ul>
	)
}
