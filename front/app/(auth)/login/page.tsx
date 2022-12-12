'use client';
import { FiGithub } from 'react-icons/fi';
import { AiOutlineGoogle } from 'react-icons/ai';

export default function LoginPage() {
	return (
		<main className='grid place-items-center h-screen'>
			<div>
				<h1 className='text-center mb-2 text-2xl'>Welcome back</h1>
				<section className='dark:border-slate-700 border-1 p-4 rounded-lg grid gap-2'>
					<ul className='flex gap-4 min-w-[400px] w-fit justify-center mx-auto text-xl dark:text-slate-400'>
						<li><button type='button' className='p-2 dark:border-slate-700 border-1 rounded-lg dark:bg-slate-800 dark:hover:text-slate-200 dark:hover:border-slate-600 transition-colors' title='Login with GitHub'><FiGithub /></button></li>
						<li><button type='button' className='p-2 dark:border-slate-700 border-1 rounded-lg dark:bg-slate-800 dark:hover:text-slate-200 dark:hover:border-slate-600 transition-colors' title='Login with Google'><AiOutlineGoogle /></button></li>
					</ul>
					<p className='text-center dark:text-slate-400'>or</p>
					<form className='grid gap-2'>
						<div className='grid'>
							<label htmlFor='login' className='dark:text-slate-400 text-sm'>Login</label>
							<input name='login' id='login' className='input' required />
						</div>
						<div className='grid'>
							<label htmlFor='password' className='dark:text-slate-400 text-sm'>Password</label>
							<input name='password' id='password' className='input' required type='password' />
						</div>
						<button type='submit'>Login</button>
					</form>
				</section>
			</div>
		</main>
	)
}
