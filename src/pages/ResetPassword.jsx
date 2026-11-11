import { Link, useNavigate, useSearchParams } from 'react-router';
import AuthFormLayout from '../components/layout/AuthFormLayout';
import Field from '../components/layout/Field';
import SubmitButton from '../components/ui/SubmitButton';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { resetPassword } from '../services/authServices';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  const password = watch('newPassword');

  const onSubmit = async (data) => {
    const res = await resetPassword(data.newPassword, token);
    setMessage(res.message);

    if (res.success) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <AuthFormLayout
      eyebrow={'Account recovery'}
      message={message}
      title={'Set new password'}
      footer={
        <>
          <span>Need to start over?</span>{' '}
          <Link to={'/forgot-password'} className='text-indigo-500 font-bold'>
            Request a new link
          </Link>
        </>
      }
    >
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <Field
          label={'New password'}
          id={'password'}
          error={errors.newPassword?.message}
        >
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              placeholder='e.g *********'
              className='w-full rounded-xl bg-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800'
              {...register('newPassword', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'New password must be at least 8 characters long',
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

        <Field
          label={'Confirm new password'}
          id={'confirm-password'}
          error={errors.confirmPassword?.message}
        >
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='confirm-password'
              placeholder='e.g *********'
              className='w-full rounded-xl bg-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800'
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                minLength: {
                  value: 8,
                  message:
                    'Confirm password must be at least 8 characters long',
                },
                validate: (value) =>
                  value === password || 'Passwords do not match',
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

        <SubmitButton isSubmitting={isSubmitting}>Reset password</SubmitButton>
      </form>
    </AuthFormLayout>
  );
}

export default ResetPassword;
