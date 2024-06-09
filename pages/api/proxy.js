// pages/api/proxy.js
require("dotenv").config();
import axios from "axios";

export default async function handler(req, res) {
	const { query } = req.body;

	try {
		const response = await axios.post(
			"https://api.cloudflare.com/client/v4/graphql",
			{
				query,
			},
			{
				headers: {
					"Content-Type": "application/json",
					"X-Auth-Key": process.env.X_AUTH_KEY,
					"X-Auth-Email": process.env.X_AUTH_EMAIL,
				},
			}
		);

		res.json(response.data);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Error fetching data from Cloudflare API" });
	}
}
