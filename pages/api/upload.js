import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs";

const s3 = new S3Client({
	region: process.env.REGION,
	credentials: {
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
	},
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async (req, res) => {
	const form = formidable({ multiples: true });

	form.parse(req, async (err, fields, files) => {
		if (err) {
			console.error("Form parsing error:", err);
			return res.status(500).json({ error: "Error parsing the form" });
		}

		const file = files.file;

		if (!file) {
			console.error("No file uploaded");
			return res.status(400).json({ error: "No file uploaded" });
		}

		console.log("Parsed file:", file);

		// Use the first file in case of multiple uploads
		const uploadedFile = Array.isArray(file) ? file[0] : file;

		const filePath = uploadedFile.filepath || uploadedFile.path;
		console.log("File path:", filePath);
		if (!filePath) {
			console.error("File path is missing");
			return res.status(400).json({ error: "File path is missing" });
		}

		// Check for the old image URL in the fields
		let oldImageUrl = fields.oldImageUrl;
		if (Array.isArray(oldImageUrl)) {
			oldImageUrl = oldImageUrl[0];
		}
		console.log("Received oldImageUrl:", oldImageUrl);

		// If there is an old image URL, delete the old image
		if (oldImageUrl && typeof oldImageUrl === "string") {
			const oldKey = oldImageUrl.split(".com/")[1];
			const deleteParams = {
				Bucket: process.env.S3_BUCKET_NAME,
				Key: oldKey,
			};

			try {
				await s3.send(new DeleteObjectCommand(deleteParams));
				console.log("Old image deleted successfully");
			} catch (deleteError) {
				console.error("Error deleting old image: ", deleteError);
				return res.status(500).json({ error: "Error deleting old image" });
			}
		}

		const fileContent = fs.readFileSync(filePath);

		const params = {
			Bucket: process.env.S3_BUCKET_NAME,
			Key: uploadedFile.originalFilename,
			Body: fileContent,
			ContentType: uploadedFile.mimetype,
		};

		try {
			const data = await s3.send(new PutObjectCommand(params));
			const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${uploadedFile.originalFilename}`;
			console.log("File uploaded successfully:", url);
			return res.status(200).json({ url });
		} catch (error) {
			console.error("Error uploading file: ", error);
			return res.status(500).json({ error: error.message });
		}
	});
};
