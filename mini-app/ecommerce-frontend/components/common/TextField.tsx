'use client'

import { ChangeEvent, InputHTMLAttributes } from 'react'

import { DisplayError } from '@/components'
import { FieldError, FieldPath, FieldValues, useController } from 'react-hook-form'

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
	// control: Control<T, object>
	control: any
	direction?: string
	errors?: FieldError
	name: FieldPath<T>
	label?: string
}

// ! This is document for react hook form with typescript using control separate
// !https://github.com/react-hook-form/react-hook-form/issues/4965#issuecomment-826993553

export function TextField<T extends FieldValues>({
	label,
	errors,
	name,
	type = 'text',
	control,
	direction,
	...inputProps
}: Props<T>) {
	const { field } = useController({
		name,
		control,
		rules: {
			required: true,
		},
	})

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value
		if (type === 'number' && inputValue.length !== 0) {
			field.onChange(parseInt(inputValue))
		} else {
			field.onChange(inputValue)
		}
	}

	return (
		<div>
			{label && (
				<label className='mb-3 block text-xs text-gray-700 md:min-w-max lg:text-sm' htmlFor={name}>
					{label}
				</label>
			)}
			<input
				style={{
					direction: direction === 'ltr' ? 'ltr' : undefined,
				}}
				className='block w-full rounded-md border border-gray-200 bg-zinc-50/30 px-3 py-1.5 text-base outline-none transition-colors focus:border-blue-600 lg:text-lg'
				id={name}
				type={type}
				value={field.value}
				name={field.name}
				onBlur={field.onBlur}
				onChange={onChangeHandler}
				ref={field.ref}
				{...inputProps}
			/>
			<DisplayError errors={errors} />
		</div>
	)
}
