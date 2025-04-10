import { Switch } from 'antd'
import { useEffect, useState } from 'react'

type Props = {
	onToggle: (e: any) => void
}

export default function AdultSwitchToggle({ onToggle }: Props) {
	const [checked, setChecked] = useState<boolean>(false)

	useEffect(() => {
		onToggle(checked)
	}, [checked])

	return (
		<div className='flex gap-2 items-center'>
			<label htmlFor='adult_switch'>Adult:</label>
			<Switch id='adult_switch' checked={checked} onChange={() => setChecked(state => !state)} />
		</div>
	)
}
