import React, { useState, useEffect } from "react";
import { Sprite } from "react-konva";
import spritesheet from "../assets/character/p1_spritesheet.png";

const Player = () => {
	const [image, setImage] = useState(null);
	const [animation, setAnimation] = useState("idle");
	// Start the player right on top of the starting tile
	const [position, setPosition] = useState({
		x: 50,
		y: window.innerHeight - 70 - 97,
	}); // 97 is player height
	const [yVelocity, setYVelocity] = useState(0);
	const gravity = 0.3; // Gravity constant

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
			if (e.key === "ArrowLeft") {
				setAnimation("walk");
				setPosition((pos) => ({ ...pos, x: pos.x - 12 }));
			} else if (e.key === "ArrowRight") {
				setAnimation("walk");
				setPosition((pos) => ({ ...pos, x: pos.x + 12 }));
			} else if (
				e.key === "ArrowUp" &&
				position.y === window.innerHeight - 70 - 97
			) {
				// Ensure jumping only if on the ground
				setYVelocity(-45);
				setAnimation("jump");
			} else if (e.key === "ArrowDown") {
				setAnimation("duck");
			}
		};

		const handleKeyUp = (e) => {
			if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
				setAnimation("idle");
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [yVelocity, position]); // Correctly specify dependencies

	useEffect(() => {
		const timer = setInterval(() => {
			if (yVelocity !== 0 || position.y !== window.innerHeight - 70 - 97) {
				const newYVelocity = yVelocity + gravity;
				setPosition((pos) => {
					const newY = pos.y + newYVelocity;
					if (newY >= window.innerHeight - 70 - 97) {
						// Prevent falling through the platform
						return { ...pos, y: window.innerHeight - 70 - 97 };
					} else {
						return { ...pos, y: newY };
					}
				});
				if (position.y === window.innerHeight - 70 - 97) {
					setYVelocity(0); // Stop moving when back on ground
				} else {
					setYVelocity(newYVelocity);
				}
			}
		}, 20);

		return () => clearInterval(timer);
	}, [yVelocity, position.y]); // Ensure dependencies are correct

	return (
		<Sprite
			x={position.x}
			y={position.y}
			image={image}
			animation={animation}
			animations={animations}
			frameRate={10}
			frameIndex={0}
		/>
	);
};

export default Player;
