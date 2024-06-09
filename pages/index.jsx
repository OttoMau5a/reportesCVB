
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function Home() {

	const router = useRouter();

	useEffect(() => {
		router.push({
			pathname: `/events`,

		});
	}, [])

	return (
		<>

		</>
	);
}
