import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from 'services';
import Swal from 'sweetalert2'
export default Register;
function Register() {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required'),
    lastName: Yup.string()
      .required('Last Name is required'),
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const message = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registration successful',
      showConfirmButton: false,
      timer: 2000
    })
  }
  function onSubmit(user) {
    user.status = true
    return userService.register(user)
      .then(() => {
        alertService.success(message());
        router.push('login');
      })
      .catch(alertService.error);
  }
  return (
    <>
      <div id='registerContainer'>
        <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md p-6 border rounded-lg shadow-md bg-white">
            <h1 className="mb-4 text-center">Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  {...register('firstName')}
                  className={`border rounded-md p-2 w-full ${errors.firstName ? 'border-red-500' : ''
                    }`}
                />
                {errors.firstName && (
                  <div className="text-red-500 text-sm mt-1">{errors.firstName.message}</div>
                )}
              </div>
              <div>
                <label className="block">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  {...register('lastName')}
                  className={`border rounded-md p-2 w-full ${errors.lastName ? 'border-red-500' : ''
                    }`}
                />
                {errors.lastName && (
                  <div className="text-red-500 text-sm mt-1">{errors.lastName.message}</div>
                )}
              </div>
              <div>
                <label className="block">Username</label>
                <input
                  name="username"
                  type="text"
                  {...register('username')}
                  className={`border rounded-md p-2 w-full ${errors.username ? 'border-red-500' : ''
                    }`}
                />
                {errors.username && (
                  <div className="text-red-500 text-sm mt-1">{errors.username.message}</div>
                )}
              </div>
              <div>
                <label className="block">Password</label>
                <input
                  name="password"
                  type="password"
                  {...register('password')}
                  className={`border rounded-md p-2 w-full ${errors.password ? 'border-red-500' : ''
                    }`}
                />
                {errors.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>
                )}
              </div>
              <button
                disabled={formState.isSubmitting}
                className={`bg-blue-500 text-white py-2 px-4 rounded-md w-full ${formState.isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
              >
                {formState.isSubmitting && (
                  <span className="animate-spin mr-1">
                    <svg
                      className="h-4 w-4 inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v.01M12 8V8m6.364 9.364a8 8 0 11-11.313-11.313"
                      />
                    </svg>
                  </span>
                )}
                Register
              </button>
              <Link href="/account/login" className="block text-blue-500 hover:underline text-center">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
