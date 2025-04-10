'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

type Props = {
	hoverElement: React.ReactNode
	hoverAreaWidth: string
	popoverId: string
	className?: string
	children: React.ReactNode
}

export function Popover({ hoverElement, hoverAreaWidth, popoverId, className, children }: Props) {
	const [isHovered, setIsHovered] = useState<boolean>(false)
	const [closeAnimation, setCloseAnimation] = useState<boolean | null>(null)

	useEffect(() => {
		setCloseAnimation(false)

		return () => setCloseAnimation(true)
	}, [])

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={cn('relative min-w-20 w-full', className, `w-${hoverAreaWidth}`)}
		>
			{hoverElement}

			{isHovered && (
				<div
					popover='auto'
					id={popoverId}
					className={cn(
						'absolute top-10 left-0 bg-slate-100 p-5 rounded-xl shadow-lg z-50 transition duration-400 starting:opacity-0 min-w-20 grid grid-cols-2 gap-3 w-100',
						closeAnimation && 'animate-fadeOut'
					)}
				>
					{children}
				</div>
			)}
		</div>
	)
}
