'use client'

import { cn } from '@/lib/utils'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
}

export function Input({ className, ...props }: Props) {
	return (
		<input
			className={cn(
				'w-[500px] h-[40px] text-black outline outline-blue-400 outline-1 p-2 focus:outline-blue-600 focus:outline-3 transition transition-all transition-linear duration-500 rounded-xl',
				className
			)}
			name={props.name}
			type={props.type}
			placeholder={props.placeholder}
			onChange={props.onChange}
			value={props.value}
			autoComplete='off'
		/>
	)
}
