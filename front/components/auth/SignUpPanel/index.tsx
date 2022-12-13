'use client';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FormEvent, useRef, useState } from 'react';
import { z, ZodError } from 'zod';

const signUpSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8, 'Passoword must contain at least 8 characters'),
	confirmPassword: z.string().min(8, 'Passoword must contain at least 8 characters'),
}).refine((val) => val.password === val.confirmPassword, {
	message: 'Passwords do not match',
	path: ['confirmPassword'],
});

type InputErrors = {
	[key: string]: string;
}

export default function SignUpPanel() {
	const formRef = useRef<HTMLFormElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const [passType, setPassType] = useState<'text' | 'password'>('password');
	const [errors, setErrors] = useState<InputErrors>({});

	const handlePasswordType = (): void => {
		setPassType((prev) => prev === 'text' ? 'password' : 'text');
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		try {
			event.preventDefault();

			const data = Object.fromEntries(new FormData(formRef.current as HTMLFormElement));

			signUpSchema.parse(data);
			setErrors({});
		} catch (e) {
			if (e instanceof ZodError) {
				setErrors(e.errors.reduce((allErrors: InputErrors, currentError) =>
					({ ...allErrors, ...{ [currentError.path[0]]: currentError.message } }),
					{}))
			}
		}
	}

	const checkPasswords = () => {
		if (!passwordRef.current || !confirmPasswordRef.current) return;

		if (confirmPasswordRef.current.value !== passwordRef.current.value) {
			setErrors((prevErrors) => ({
				...prevErrors, ...{
					confirmPassword: 'Passwords do not match'
				}
			}))
		} else {
			setErrors((prevErrors) => {
				const newErrors = { ...prevErrors };
				delete newErrors.confirmPassword;
				return newErrors;
			})
		}
	}

	return (
		<div className='max-w-md w-[90%]'>
			<h1 className='text-center mb-2 text-2xl font-semibold'>Join the team</h1>
			<section className='dark:border-slate-700 border-1 p-4 rounded-lg grid gap-2'>
				<form className='grid gap-4' ref={formRef} onSubmit={handleSubmit}>
					<div className='grid'>
						<label htmlFor='login' className='dark:text-slate-400 text-sm ml-3'>Name</label>
						<input name='name' id='name' className='auth-input' required aria-errormessage='nameError' />
						<span id='nameError' data-visible={!!errors.name} className='auth-input--error'>{errors.name}</span>
					</div>
					<div className='grid'>
						<label htmlFor='login' className='dark:text-slate-400 text-sm ml-3'>Email</label>
						<input name='email' id='email' className='auth-input' type='email' required aria-errormessage='emailError' />
						<span id='emailError' data-visible={!!errors.email} className='auth-input--error'>{errors.email}</span>
					</div>
					<div className='grid'>
						<label htmlFor='password' className='dark:text-slate-400 text-sm ml-3'>Password</label>
						<div className='flex gap-2'>
							<input
								ref={passwordRef}
								name='password'
								id='password'
								className='auth-input	w-full'
								required
								minLength={8}
								type={passType}
								aria-errormessage="passwordError"
							/>
							<button type='button' className='border-hover p-2 dark:bg-slate-800 rounded-lg' onClick={handlePasswordType}>
								{passType === 'password' ? <FiEye /> : <FiEyeOff />}
							</button>
						</div>
						<span id='passwordError' data-visible={!!errors.password} className='auth-input--error'>{errors.password}</span>
					</div>
					<div className='grid'>
						<label htmlFor='confirmPassword' className='dark:text-slate-400 text-sm ml-3'>Confirm password</label>
						<input
							ref={confirmPasswordRef}
							name='confirmPassword'
							id='confirmPassword'
							className='auth-input w-full'
							required
							type={passType}
							onChange={checkPasswords}
							aria-errormessage="confirmPasswordError"
						/>
						<span id='confirmPasswordError' data-visible={!!errors.confirmPassword} className='auth-input--error'>{errors.confirmPassword}</span>
					</div>
					<button type='submit' title='Submit sign up form' className='blue-button'>Sign up</button>
				</form>
			</section>
		</div>
	)
}
