import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import bg from "../assets/bg/bg.png";

const Background = () => {
	const [image] = useImage(bg);
	return <Image image={image} />;
};

export default Background;
