'use client';

import { FC, memo } from 'react';
import { useFormContext } from 'react-hook-form';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
}
const TextInput: FC<TextInputProps> = memo(({ name, ...props }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<>
			<input {...register(name, { valueAsNumber: props.type === 'number' ? true : false })} {...props} />
			{errors[name]?.message && <p>{errors[name]?.message?.toString()}</p>}
		</>
	);
});

TextInput.displayName = 'TextInput';

export default TextInput;
