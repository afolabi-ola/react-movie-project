import { Link } from 'react-router';
import AuthFormLayout from '../components/layout/AuthFormLayout';
import Field from '../components/layout/Field';
import SubmitButton from '../components/ui/SubmitButton';
import { useForm } from 'react-hook-form';

function ForgotPassword() {
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
      eyebrow={'Account recovery'}
      title={'Forgot your password?'}
      footer={
        <>
          <span>Remember your password?</span>{' '}
          <Link to='/login' className='text-indigo-500 font-bold'>
            Sign in
          </Link>
        </>
      }
    >
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        {' '}
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
        <SubmitButton isSubmitting={isSubmitting}>Send reset link</SubmitButton>
      </form>
    </AuthFormLayout>
  );
}

export default ForgotPassword;
