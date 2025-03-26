export interface IMovie {
	adult: boolean
	backdrop_path: string
	genre_ids: number[]
	id: number
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	release_date: string
	title: string
	video: number
	vote_average: number
	vote_count: number
}

export type IMoviesResponse = {
	page: number
	results: IMovie[]
	total_pages: number
	total_results: number
}

export type IMoviesSearchResponse = {
	page: number
	results: IMovie[]
	total_pages: number
	total_results: number
}

export interface IMovieExpandedResponse extends IMovie {
	belongs_to_collection?: string
	budget: number
	genres: { id: number; name: string }[]
	homepage: string
	imdb_id: string
	production_companies: {
		id: number
		logo_path: string
		name: string
		origin_country: string
	}[]
	production_countries: {
		iso_3166_1: string
		name: string
	}[]
	revenue: number
	runtime: number
	spoken_languages: {
		english_name: string
		iso_639_1: string
		name: string
	}[]
	status: string
	tagline: string
}

export type MovieReleaseDate = {
	certification: string
	descriptors: unknown[]
	iso_639_1: string
	note: string
	release_date: string
	type: number
}
