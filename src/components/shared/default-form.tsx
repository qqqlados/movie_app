'use client'

import { useState } from 'react'
import { Input } from '../ui/input'
import { z } from 'zod'
import { cn } from '@/lib/utils'

const initialFormState = {
	name: '',
	email: '',
	password: '',
}

const FormDataSchema = z.object({
	name: z.string().min(3).max(10),
	email: z.string().email().min(3).max(20),
	password: z.string().min(3).max(15),
})

type FormData = z.infer<typeof FormDataSchema>

export function Form() {
	const [userFormData, setUserFormData] = useState<Partial<FormData>>({})
	const [showErrors, setShowErrors] = useState(false)

	const formData = {
		...initialFormState,
		...userFormData,
	}

	const validate = () => {
		const res = FormDataSchema.safeParse(formData)

		if (res.success) {
			return undefined
		}

		return res.error.format()
	}

	const reset = () => {
		setUserFormData({})
	}

	const onSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault()

		const errors = validate()

		if (errors) {
			setShowErrors(true)
		}
	}

	const errors = showErrors ? validate() : undefined

	return (
		<form onReset={reset} onSubmit={onSubmit} className='w-120 flex flex-col justify-center align-center gap-3'>
			<Input
				type='text'
				name='name'
				placeholder='Type your name'
				value={formData.name}
				onChange={e => {
					setUserFormData(s => ({ ...s, name: e.target.value }))
				}}
				className='w-full'
			/>
			{<div className='text-red-500'>{errors?.name?._errors.join(', ')}</div>}
			<Input
				type='text'
				name='email'
				placeholder='Your email'
				value={formData.email}
				onChange={e => {
					setUserFormData(s => ({ ...s, email: e.target.value }))
				}}
				className='w-full'
			/>
			{<div className='text-red-500'>{errors?.email?._errors.join(', ')}</div>}
			<Input
				type='password'
				name='password'
				placeholder='Your password'
				value={formData.password}
				onChange={e => {
					setUserFormData(s => ({ ...s, password: e.target.value }))
				}}
				className='w-full'
			/>
			{<div className='text-red-500'>{errors?.password?._errors.join(', ')}</div>}

			<div className='flex flex-col items-center gap-3'>
				<button
					type='reset'
					className='px-4 py-2 w-full bg-gray-200 text-gray-700 font-semibold text-center cursor-pointer rounded-md shadow-md hover:bg-gray-300 transition duration-200'
				>
					Reset form
				</button>

				<button
					type='submit'
					disabled={!!errors}
					className={cn(
						'px-4 py-2 w-full bg-blue-200 text-gray-700 font-semibold text-center cursor-pointer rounded-md shadow-md hover:bg-blue-300 transition duration-200'
					)}
				>
					Submit
				</button>
			</div>
		</form>
	)
}
