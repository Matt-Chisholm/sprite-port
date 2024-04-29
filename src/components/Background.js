import React, { useState, useEffect, useRef } from "react";
import { Image as KonvaImage } from "react-konva"; // Rename the imported Image to KonvaImage
import bg from "../assets/bg/bg.png";

const Background = () => {
	const imageRef = useRef(null);
	const [image, setImage] = useState(null);
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const img = new Image();
		img.onload = () => {
			setImage(img);
			// Calculate aspect ratios and set dimensions
			const scaleWidth = window.innerWidth / img.width;
			const scaleHeight = window.innerHeight / img.height;
			const scale = Math.max(scaleWidth, scaleHeight); // Choose the larger scale
			setDimensions({
				width: img.width * scale,
				height: img.height * scale,
			});
		};
		img.src = bg;
	}, []);

	return (
		<KonvaImage
			image={image}
			x={(window.innerWidth - dimensions.width) / 2} // Center the image horizontally
			y={(window.innerHeight - dimensions.height) / 2} // Center the image vertically
			width={dimensions.width}
			height={dimensions.height}
			ref={imageRef}
		/>
	);
};

export default Background;
