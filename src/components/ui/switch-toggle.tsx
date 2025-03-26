import React from 'react'
import { Switch } from 'antd'
import { Link } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SwitchToggle({ ...props }: Props) {
	return <Switch onClick={props.onClick} defaultChecked={props.value} defaultValue={currentValue === 'true' ? true : false} />
}
