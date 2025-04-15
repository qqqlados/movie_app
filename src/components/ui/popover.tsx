'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState, useTransition } from 'react'

type Props = {
	hoverElement: React.ReactNode
	hoverAreaWidth: string
	width?: string
	popoverId: string
	className?: string
	children: React.ReactNode
}

export function Popover({ hoverElement, hoverAreaWidth, width, popoverId, className, children }: Props) {
	const [isHovered, setIsHovered] = useState<boolean>(false)

	const [isPending, startTransition] = useTransition()

	const handleMouseLeave = () => {
		startTransition(() => {
			setIsHovered(false)
		})
	}

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={handleMouseLeave}
			className={cn('relative min-w-20 w-full', className, `w-${hoverAreaWidth}`)}
		>
			{hoverElement}

			{isHovered && (
				<div
					popover='auto'
					id={popoverId}
					className={cn(
						'absolute top-10 left-0 bg-slate-100 p-5 rounded-xl shadow-lg z-50 transition duration-400 starting:opacity-0 starting:scale-y-0 origin-top min-w-20 grid grid-cols-2 gap-3 w-105 overflow-x-hidden',
						isPending && 'animate-fadeOut'
					)}
				>
					{children}
				</div>
			)}
		</div>
	)
}
