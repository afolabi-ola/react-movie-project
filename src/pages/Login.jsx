import { Link } from 'react-router';
import AuthFormLayout from '../components/layout/AuthFormLayout';
import Field from '../components/layout/Field';
import SubmitButton from '../components/ui/SubmitButton';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <AuthFormLayout
      eyebrow={'Welcome Back'}
      title={'Sign in to your account'}
      footer={
        <>
          <span>Don't have an account?</span>{' '}
          <Link to={'/signup'} className='text-indigo-500 font-bold'>
            Create one
          </Link>
        </>
      }
    >
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <Field label={'Email'} id={'email'} error={errors.email?.message}>
          <input
            type='text'
            id='email'
            placeholder='e.g john@example.com'
            className='w-full rounded-xl bg-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
        </Field>

        <Field
          label={'Password'}
          id={'password'}
          error={errors.password?.message}
        >
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              placeholder='e.g *********'
              className='w-full rounded-xl bg-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              })}
            />
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              type='button'
              className='absolute right-4 top-1/2 -translate-y-1/2'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </Field>
        <Link
          to={'/forgot-password'}
          className='text-indigo-500 font-bold text-right w-full block'
        >
          Forgot Password?
        </Link>

        <SubmitButton isSubmitting={isSubmitting}>Sign In</SubmitButton>
      </form>
    </AuthFormLayout>
  );
}

export default Login;
