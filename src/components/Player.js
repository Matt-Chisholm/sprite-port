import React, { useState, useEffect } from "react";
import { Stage, Layer, Sprite } from "react-konva";
import spritesheet from "../assets/character/p1_spritesheet.png";

const Player = () => {
	const [image, setImage] = useState(null);
	const [animation, setAnimation] = useState("idle");
	const [position, setPosition] = useState({ x: 50, y: 50 });

	useEffect(() => {
		const img = new Image();
		img.onload = () => setImage(img);
		img.src = spritesheet;
	}, []);

	const animations = {
		walk: [
			0, 0, 72, 97, 73, 0, 72, 97, 146, 0, 72, 97, 219, 0, 72, 97, 292, 0, 72,
			97, 365, 0, 72, 97, 219, 98, 72, 97, 292, 98, 72, 97, 146, 98, 72, 97, 73,
			98, 72, 97, 0, 98, 72, 97,
		],
		jump: [438, 93, 67, 94],
		idle: [67, 196, 66, 92],
		hurt: [438, 0, 69, 92],
		duck: [365, 98, 69, 71],
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			switch (e.key) {
				case "ArrowLeft":
					setAnimation("walk");
					setPosition((pos) => ({ ...pos, x: pos.x - 5 }));
					break;
				case "ArrowRight":
					setAnimation("walk");
					setPosition((pos) => ({ ...pos, x: pos.x + 5 }));
					break;
				case "ArrowUp":
					setAnimation("jump");
					break;
				case "ArrowDown":
					setAnimation("duck");
					break;
				default:
					setAnimation("idle");
			}
		};

		const handleKeyUp = () => {
			setAnimation("idle");
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	return (
		<Stage width={window.innerWidth} height={window.innerHeight}>
			<Layer>
				<Sprite
					x={position.x}
					y={position.y}
					image={image}
					animation={animation}
					animations={animations}
					frameRate={7}
					frameIndex={0}
				/>
			</Layer>
		</Stage>
	);
};

export default Player;
