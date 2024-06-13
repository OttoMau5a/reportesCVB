import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { alertService } from "services";
import { clientService } from "services/personal.service";
import UploadImg from "components/UploadImg";
import Swal from "sweetalert2";

export { AddEdit };

function AddEdit(props) {
	const client = props?.client;
	const router = useRouter();
	const [logoUrl, setLogoUrl] = useState(client?.logo || "");

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		status: Yup.boolean().required("State is required"),
		logo: Yup.mixed().required("Logo is required"),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };

	if (client) {
		formOptions.defaultValues = props.client;
	}
	const { register, handleSubmit, reset, formState, setValue } = useForm(formOptions);
	const { errors } = formState;

	const handleUpload = (fieldName, url) => {
		setLogoUrl(url);
		setValue("logo", url); // Set the logo URL in the form
	};

	async function onSubmit(data) {
		alertService.clear();
		try {
			const clientData = { ...data, logo: logoUrl };

			let message;
			if (client) {
				await clientService.update(client.id, clientData);
				message = "Partner updated";
			} else {
				await clientService.create(clientData);
				message = "Partner added";
			}
			Swal.fire({
				position: "center",
				icon: "success",
				title: message,
				showConfirmButton: false,
				timer: 2000,
			});
			router.push("/partners");
		} catch (error) {
			Swal.fire({
				position: "center",
				icon: "error",
				title: error.message,
				showConfirmButton: false,
				timer: 2000,
			});
			console.error(error);
		}
	}

	return (
		<div className="flex justify-center">
			<div className="mx-auto">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-5xl">
					<div className="mt-10">
						<label className="block leading-6 text-gray-900">Name</label>
						<div className="mt-2">
							<input
								name="name"
								type="text"
								{...register("name")}
								className={`
                  block w-full max-w-md rounded-md border border-gray-300 py-2.5 px-3 
                  text-gray-900 placeholder:text-gray-400 
                  shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 
                  text-sm leading-5 ${errors.name ? "border-red-500" : ""}
                `}
							/>
							{errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
						</div>
						<div className="sm:col-span-3">
							<div className="mt-2 flex items-center">
								<input
									name="status"
									type="checkbox"
									defaultChecked={true}
									{...register("status")}
									className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 ${errors.status ? "border-red-500" : ""}`}
								/>
								<label htmlFor="checked-checkbox" className="ml-2 text-gray-900">
									Status
								</label>
								{errors.status && <p className="mt-1 text-sm text-red-500">{errors.status?.message}</p>}
							</div>
						</div>
						<div className="mt-4">
							<label className="block leading-6 text-gray-900">Logo</label>
							<div className="mt-2">
								<UploadImg onUpload={handleUpload} fieldName="logo" label="Upload Logo" initialImageUrl={logoUrl} />
								{errors.logo && <p className="mt-1 text-sm text-red-500">{errors.logo.message}</p>}
							</div>
						</div>
					</div>
					<div className="mb-4">
						<button
							type="submit"
							disabled={formState.isSubmitting}
							className="mr-2 font-bold inline-flex items-center px-10 py-2 border border-transparent rounded-full shadow-sm text-white bg-blue-800 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{formState.isSubmitting && <span className="animate-spin inline-block w-4 h-4 border border-white rounded-full mr-2"></span>}
							Save
						</button>
						<button
							onClick={() => reset(formOptions.defaultValues)}
							type="button"
							disabled={formState.isSubmitting}
							className="font-bold mr-2 inline-flex items-center px-10 py-2 border border-gray-300 rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:ml-2 mt-2 md:mt-0"
						>
							Reset
						</button>
						<Link
							href="/partners"
							className="font-bold mr-2 inline-flex items-center px-10 py-2 border border-gray-300 rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:ml-2 mt-2 md:mt-0"
						>
							Cancel
						</Link>
					</div>
				</form>
				<alert />
			</div>
		</div>
	);
}
