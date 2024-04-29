import { useState, useEffect } from "react";

const useImageLoader = (src) => {
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const img = new Image();
		img.src = src;
		img.onload = () => {
			setImage(img);
			setIsLoading(false);
		};
		img.onerror = (err) => {
			console.error("Failed to load image:", err);
			setError(err);
			setIsLoading(false);
		};
	}, [src]);

	return { image, isLoading, error };
};

export default useImageLoader;
