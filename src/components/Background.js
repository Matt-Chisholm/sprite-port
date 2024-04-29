import React, { useState, useEffect, useRef } from "react";
import { Image } from "react-konva";
import bg from "../assets/bg/bg.png";
import useImage from "use-image";

const Background = () => {
	const imageRef = useRef(null);
	const [image, setImage] = useState(null);

	useEffect(() => {
		loadImage();
		return () => {
			if (imageRef.current) {
				imageRef.current.removeEventListener("load", handleLoad);
			}
		};
	}, []);

	useEffect(() => {
		loadImage();
	}, [props.src]);

	function handleLoad() {
		setImage(imageRef.current);
	}

	function loadImage() {
		const img = new window.Image();
		img.src = bg;
		img.crossOrigin = "Anonymous";
		imageRef.current = img;
		imageRef.current.addEventListener("load", handleLoad);
	}

	return <image x='{props.x}' y='{props.y}' image='{image}' />;
};

export default Background;
