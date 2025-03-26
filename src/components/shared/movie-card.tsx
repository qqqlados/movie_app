'use client'

import { url } from '@/constants'
import { IMovie } from '@/lib/types/movie'
import { Card } from 'antd'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

export default function MovieCard({ movie }: { movie: IMovie }) {
	const { Meta } = Card

	const [loading, setLoading] = useState<boolean>(true)

	return (
		<Card
			hoverable
			style={{ minWidth: 200, minHeight: 300 }}
			className='px-5 py-0 lg:px-0'
			cover={
				<div className='relative' style={{ paddingBottom: '150%' }}>
					{movie.poster_path ? (
						<Image
							src={`${url.IMAGE_POSTER_URL}/${movie.poster_path}`}
							alt='Movie Poster'
							fill
							onLoad={() => setLoading(false)}
							className={clsx('transition-opacity duration-700 rounded-t-md object-cover', loading && 'opacity-0', !loading && 'opacity-100')}
							sizes='(max-width: 768px) 300px, (max-width: 1200px) 400px, 500px'
						/>
					) : (
						<Image
							src={'/default-image.jpg'}
							fill
							alt='Image Not Found'
							className='rounded-t-md object-cover'
							sizes='(max-width: 768px) 300px, (max-width: 1200px) 400px, 500px'
						/>
					)}
				</div>
			}
		>
			<Meta title={movie.title} description={movie.release_date} />
		</Card>
	)
}
