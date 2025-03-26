'use client'

import { Input, GetProps } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

type SearchProps = GetProps<typeof Input.Search>

export function SearchInput({ ...props }: Props) {
	const { Search } = Input
	const [search, setSearch] = useState('')

	const router = useRouter()

	const handleSearch = () => {
		router.push(`/search/movie?query=${search}&include_adult=false&language=en-US&page=1`)
	}

	return (
		<>
			<Search placeholder={props.placeholder} onChange={e => setSearch(e.target.value)} onSearch={handleSearch} enterButton />
		</>
	)
}
