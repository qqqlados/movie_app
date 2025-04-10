import React from 'react'
import { Switch } from 'antd'

interface Props extends React.ButtonHTMLAttributes<HTMLInputElement> {}

export function SwitchToggle({ ...props }: Props) {
	return <Switch onClick={props.onClick} defaultChecked={props.value} defaultValue={currentValue === 'true' ? true : false} />
}
