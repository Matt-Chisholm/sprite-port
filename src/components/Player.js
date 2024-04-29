import React, { useState, useEffect } from "react";
import { Sprite } from "react-konva";
import spritesheet from "../assets/character/p1_spritesheet.png";

const Player = () => {
	const [image, setImage] = useState(null);
	const [animation, setAnimation] = useState("idle");
	const [position, setPosition] = useState({
		x: 50, // Initial horizontal position
		y: window.innerHeight - 70 - 97, // Initial vertical position considering tile and player height
	});
	const [yVelocity, setYVelocity] = useState(0);
	const gravity = 0.3; // Gravity effect

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
				setPosition((pos) => ({ ...pos, x: pos.x - 12 }));
				if (position.y === window.innerHeight - 70 - 97) {
					// Only change to walk if on the ground
					setAnimation("walk");
				}
			} else if (e.key === "ArrowRight") {
				setPosition((pos) => ({ ...pos, x: pos.x + 12 }));
				if (position.y === window.innerHeight - 70 - 97) {
					// Only change to walk if on the ground
					setAnimation("walk");
				}
			} else if (
				e.key === "ArrowUp" &&
				position.y === window.innerHeight - 70 - 97
			) {
				setYVelocity(-175); // Provide initial upward velocity
				setAnimation("jump");
			} else if (e.key === "ArrowDown") {
				setAnimation("duck");
			}
		};

		const handleKeyUp = (e) => {
			if (
				["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key) &&
				position.y === window.innerHeight - 70 - 97
			) {
				setAnimation("idle");
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [position.y]); // Listen for changes in vertical position

	useEffect(() => {
		const timer = setInterval(() => {
			if (yVelocity !== 0 || position.y !== window.innerHeight - 70 - 97) {
				const newYVelocity = yVelocity + gravity;
				setPosition((pos) => {
					const newY = pos.y + newYVelocity;
					if (newY >= window.innerHeight - 70 - 97) {
						return { ...pos, y: window.innerHeight - 70 - 97 }; // Prevent falling through platform
					} else {
						return { ...pos, y: newY };
					}
				});
				if (position.y === window.innerHeight - 70 - 97) {
					setYVelocity(0); // Reset velocity on ground
				} else {
					setYVelocity(newYVelocity);
				}
			}
		}, 20);

		return () => clearInterval(timer);
	}, [yVelocity, position.y]); // Ensure correct dependencies

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
