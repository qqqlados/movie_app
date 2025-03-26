import { axiosInstance } from '@/lib/axiosInstance'

export const getTrendingMovies = async (period: 'day' | 'week') => {
	const response = await axiosInstance.get(`/trending/movie/${period}?language=en-US`)

	return response.data
}
export const getTrendingTVShows = async (period: 'day' | 'week') => {
	const response = await axiosInstance.get(`/trending/tv/${period}?language=en-US`)

	return response.data
}
export const getTrendingPeople = async (period: 'day' | 'week') => {
	const response = await axiosInstance.get(`/trending/person/${period}?language=en-US`)

	return response.data
}
