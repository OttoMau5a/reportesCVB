import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from 'services';
import Swal from 'sweetalert2';
export default Login;
function Login() {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const message = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Username or password is incorrect'
    })
  }
  function onSubmit({ username, password }) {
    alertService.clear();
    return userService.login(username, password)
      .then(() => {
        const returnUrl = router.query.returnUrl || '/';
        router.push(returnUrl);
      })
      .catch(error => {
        message()
      });
  }

  const LogoES = "/img/LogoES.png";

  return (
    <>
      <div className='container-Login '>
        <div className='flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8'>
          <div className="max-w-md w-full mx-auto p-6 border rounded-lg shadow-md bg-white">
            <img src={LogoES} alt="LogoES" />
            <h1 className="mb-4 text-center text-2xl	">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                Login
              </button>
              <Link href="/account/register" className="block text-blue-500 hover:underline text-center">
                Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
