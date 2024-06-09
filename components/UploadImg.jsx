import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const UploadImg = ({ onUpload, fieldName, label, initialImageUrl }) => {
	const [imageUrl, setImageUrl] = useState(initialImageUrl || "");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [previewUrl, setPreviewUrl] = useState("");

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const formData = new FormData();
			formData.append("file", file);

			if (imageUrl) {
				// Include the old image URL in the form data
				formData.append("oldImageUrl", imageUrl);
			}

			setPreviewUrl(URL.createObjectURL(file));
			setLoading(true);
			setError("");

			try {
				const response = await axios.post("/api/upload", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				const url = response.data.url;
				setImageUrl(url);
				onUpload(fieldName, url);
			} catch (error) {
				setError("Error uploading image. Please try again.");
				console.error("Error uploading image:", error);
			} finally {
				setLoading(false);
				setPreviewUrl(""); // Clear preview URL after loading
			}
		}
	};

	return (
		<div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
			<label className="block text-sm font-medium text-gray-700">{label}</label>
			<input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
			/>

			{loading && previewUrl && <img src={previewUrl} alt="Preview" className="w-full mt-2 rounded-md" />}

			{!loading && imageUrl && (
				<>
					<img src={imageUrl} alt="Uploaded" className="w-full mt-2 rounded-md" />
					<p className="text-green-500">Image uploaded</p>
				</>
			)}

			{loading && <p className="text-gray-500">Loading...</p>}

			{error && <p className="text-red-500">{error}</p>}
		</div>
	);
};

UploadImg.propTypes = {
	onUpload: PropTypes.func.isRequired,
	fieldName: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	initialImageUrl: PropTypes.string,
};

export default UploadImg;
