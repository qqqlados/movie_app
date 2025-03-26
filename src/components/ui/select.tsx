'use client'

type Props = { children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>

export function Select({ children, ...props }: Props) {
	return (
		<select
			onChange={props.onChange}
			value={props.value?.toString()}
			name={props.name}
			className='min-w-[100px] max-w-[120px] w-full py-2 px-1 text-center outline outline-blue-300 rounded-xl cursor-pointer'
		>
			{children}
		</select>
	)
}
