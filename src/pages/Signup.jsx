import { Link, useNavigate } from 'react-router';
import AuthFormLayout from '../components/layout/AuthFormLayout';
import Field from '../components/layout/Field';
import SubmitButton from '../components/ui/SubmitButton';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

function Signup() {
  const navigate = useNavigate();
  const { signupUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  console.log(errors);

  const onSubmit = async (data) => {
    const user = await signupUser(data);
    setMessage(user.message);
    if (user.success) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <AuthFormLayout
      eyebrow={'Join Movie Explorer'}
      title={'Create your account'}
      message={message}
      footer={
        <>
          <span>Already have an account?</span>{' '}
          <Link to={'/login'} className='text-indigo-500 font-bold'>
            Sign in
          </Link>
        </>
      }
    >
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <Field
          label={'Username'}
          id={'username'}
          error={errors.username?.message}
        >
          <input
            type='text'
            id='username'
            placeholder='e.g john'
            className='w-full rounded-xl bg-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800'
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters long',
              },
            })}
          />
        </Field>

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

        <SubmitButton isSubmitting={isSubmitting}>Create Account</SubmitButton>
      </form>
    </AuthFormLayout>
  );
}

export default Signup;
// Join Movie Explorer

// Create your account
