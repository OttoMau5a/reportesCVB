import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import { userService, alertService } from 'services';
import InfoButton from 'components/InfoButton';
export { AddEdit };
function AddEdit(props) {
    console.log("props",props);
    const user = props?.user;
    console.log("user",user);
    const router = useRouter();
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .concat(user ? null : Yup.string().required('Password is required'))
            .min(6, 'Password must be at least 6 characters'),
        status: Yup.boolean()
            .required('State is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    if (user) {
        formOptions.defaultValues = props.user;
    }
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    async function onSubmit(data) {
        alertService.clear();
        try {
            let message;
            if (user) {
                await userService.update(user.id, data);
                message = 'User updated successfully'
                    ;
            } else {
                await userService.register(data);
                message = 'User added successfully'
            }
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 2000
            })
            router.push('/users');
            setTimeout(function () {
                const alertBox = document.querySelector(".bg-blue-100");
                const alertBox1 = document.querySelector(".bg-green-100");
                if (alertBox) {
                    alertBox.style.display = "none";
                }
                if (alertBox1) {
                    alertBox1.style.display = "none";
                }
            }, 5000);
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: error,
                showConfirmButton: false,
                timer: 2000
            })
            console.error(error);
        }
    }
    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-5xl">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label className="block leading-6 text-gray-900">First Name</label>
                        <div className="mt-2">
                            <input name="firstName" type="text" {...register('firstName')} className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 pl-3.5 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.firstName ? 'border-red-500' : ''}`} />
                            {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label className="block leading-6 text-gray-900">Last Name</label>
                        <div className="mt-2">
                            <input name="lastName" type="text" {...register('lastName')} className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 pl-3.5 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.lastName ? 'border-red-500' : ''}`} />
                            {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label className="block leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input name="username" type="text" {...register('username')} className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 pl-3.5 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.username ? 'border-red-500' : ''}`} />
                            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>}
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <div className='flex justify-between'>
                            <label className="block leading-6 text-gray-900">
                                Password
                            </label>
                            {user && <InfoButton infoText="Leave blank to keep the same password" />}
                        </div>
                        <div className="mt-2">
                            <input placeholder='**********' name="password" type="password" {...register('password')} className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 pl-3.5 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.password ? 'border-red-500' : ''}`} />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                    </div>
                    <div className="mt-2 flex items-center">
                        <input name="status" type="checkbox" defaultChecked={true} {...register('status')} className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 ${errors.status ? 'border-red-500' : ''}`} />
                        <label for="checked-checkbox" className="ml-2 text-gray-900">Status</label>
                        {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status?.message}</p>}
                    </div>
                </div>
                <div className="mb-4">
                    <button type="submit" disabled={formState.isSubmitting} className="inline-flex items-center px-10 py-2 border border-transparent rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {formState.isSubmitting && <span className="animate-spin inline-block w-4 h-4 border border-white rounded-full mr-2"></span>}
                        Save
                    </button>
                    <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="inline-flex items-center px-10 py-2 border border-gray-300 rounded-full shadow-sm text-black-700 bg-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:ml-2 mt-2 md:mt-0">
                        Reset
                    </button>
                    <Link href="/users" className="text-indigo-600 md:ml-2 mt-2 md:mt-0">Cancel</Link>
                </div>
            </form>
            <alert />
        </div>
    );
}