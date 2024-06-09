import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
const InfoButton = ({ infoText, cName }) => {
	const [isHovered, setIsHovered] = useState(false);
	const defaultClass = "absolute top-0 right-0 mt-8 ml-2 bg-blue-500 text-white p-2 rounded-md w-80";
	const combinedClass = `${cName ? cName : ""} ${defaultClass}`;
	const handleMouseEnter = () => {
		setIsHovered(true);
	};
	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div className="relative inline-block">
			<button
				type="button"
				className="flex justify-center items-center px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<span className="mr-1">
					<FaQuestionCircle size={16} />
				</span>
			</button>
			{isHovered && <div className={combinedClass}>{infoText}</div>}
		</div>
	);
};
export default InfoButton;
