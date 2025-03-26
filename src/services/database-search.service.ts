import { axiosInstance } from '@/lib/axiosInstance'

export async function getMoviesBySearch(query: string) {
	const response = await axiosInstance.get('/search/movie?query=')

	return response.data
}
