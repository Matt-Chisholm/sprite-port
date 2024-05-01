import React, { useState, useEffect } from "react";
import { Rect, Text, Group, Image as KonvaImage } from "react-konva";

const ControlPopup = ({ visible, onClose }) => {
	const [arrowKeysImg, setArrowKeysImg] = useState(null);
	const [spaceBarImg, setSpaceBarImg] = useState(null);

	useEffect(() => {
		const loadImage = (src, setter) => {
			const img = new Image();
			img.src = src;
			img.onload = () => {
				setter(img);
			};
		};

		loadImage("assets/images/arrowkeys.png", setArrowKeysImg);
		loadImage("assets/images/spacebar.png", setSpaceBarImg);
	}, []);

	const getImageDimensions = (img, maxWidth, maxHeight) => {
		const ratio = img.width / img.height;
		let width = maxWidth;
		let height = maxWidth / ratio;

		if (height > maxHeight) {
			height = maxHeight;
			width = maxHeight * ratio;
		}

		return { width, height };
	};

	if (!visible) return null;

	const popupWidth = 400;
	const popupHeight = 250;
	const centerX = window.innerWidth / 2 - popupWidth / 2;
	const centerY = window.innerHeight / 2 - popupHeight / 2;

	return (
		<Group x={centerX} y={centerY}>
			<Rect
				width={popupWidth}
				height={popupHeight}
				fill='white'
				stroke='black'
				strokeWidth={4}
				shadowBlur={10}
			/>
			<Text
				text='Use the arrow keys to move left and right'
				x={20}
				y={30}
				fontSize={18}
				fill='black'
			/>
			{arrowKeysImg && (
				<KonvaImage
					image={arrowKeysImg}
					{...getImageDimensions(arrowKeysImg, 175, 87)}
					x={140}
					y={40}
					key='arrowKeysImg'
				/>
			)}
			<Text
				text='Use the space bar or up arrow to jump'
				x={20}
				y={120}
				fontSize={18}
				fill='black'
			/>
			{spaceBarImg && (
				<KonvaImage
					image={spaceBarImg}
					{...getImageDimensions(spaceBarImg, 175, 87)}
					x={140}
					y={140}
					key='spaceBarImg'
				/>
			)}
			<Rect
				x={280}
				y={190}
				width={100}
				height={30}
				fill='red'
				cornerRadius={5}
				onClick={onClose}
			/>
			<Text
				text='Close'
				x={305}
				y={197}
				fontSize={16}
				fill='white'
				onClick={onClose}
			/>
		</Group>
	);
};

export default ControlPopup;
