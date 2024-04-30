import React, { useState, useEffect, useCallback } from "react";
import { Sprite } from "react-konva";

const Player = ({ platforms, onGameOver, position, setPosition }) => {
	const [image, setImage] = useState(null);
	const [animation, setAnimation] = useState("idle");
	const [yVelocity, setYVelocity] = useState(0);
	const [scaleX, setScaleX] = useState(1);
	const [frameIndex, setFrameIndex] = useState(0);

	const gravity = 0.3; // Gravity effect
	const playerWidth = 72;
	const playerHeight = 97;

	useEffect(() => {
		const img = new Image();
		img.onload = () => setImage(img);
		img.src = "../assets/character/p1_spritesheet.png";
	}, []);

	const animations = {
		walk: [
			0,
			0,
			72,
			97, // p1_walk01
			73,
			0,
			72,
			97, // p1_walk02
			146,
			0,
			72,
			97, // p1_walk03
			219,
			0,
			72,
			97, // p1_walk07
			292,
			0,
			72,
			97, // p1_walk08
			365,
			0,
			72,
			97, // p1_walk10
			0,
			98,
			72,
			97, // p1_walk04
			73,
			98,
			72,
			97, // p1_walk05
			146,
			98,
			72,
			97, // p1_walk06
			219,
			98,
			72,
			97, // p1_walk09
			292,
			98,
			72,
			97, // p1_walk11
		],
		jump: [438, 93, 67, 94],
		idle: [67, 196, 66, 92],
		hurt: [438, 0, 69, 92],
		duck: [365, 98, 69, 71],
	};

	useEffect(() => {
		let interval;
		if (animation === "walk") {
			interval = setInterval(() => {
				setFrameIndex(
					(prevIndex) => (prevIndex + 1) % (animations.walk.length / 4)
				); // There are 4 values per frame
			}, 100); // Update frame every 100ms
		}
		return () => clearInterval(interval);
	}, [animation, animations.walk.length]);

	const isOnGround = useCallback(() => {
		const playerBottom = position.y + playerHeight;
		return platforms.some(
			(platform) =>
				position.x + playerWidth > platform.x &&
				position.x < platform.x + platform.width &&
				playerBottom >= platform.y &&
				playerBottom < platform.y + platform.height
		);
	}, [position, playerWidth, playerHeight, platforms]);

	const handleKeyDown = useCallback(
		(e) => {
			if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
				const moveLeft = e.key === "ArrowLeft";
				setPosition((prev) => ({
					...prev,
					x: prev.x + (moveLeft ? -12 : 12), // Simplify movement logic
				}));
				setScaleX(moveLeft ? -1 : 1); // Flip based on direction

				if (isOnGround()) {
					setAnimation("walk");
				} else {
					// Maintain the jump animation if not on ground
					if (animation !== "jump") {
						setAnimation("jump");
					}
				}
			} else if ((e.key === "ArrowUp" || e.key === " ") && isOnGround()) {
				setYVelocity(-12); // Apply jump velocity
				setAnimation("jump"); // Switch to jump animation
			}
		},
		[isOnGround, setPosition, setYVelocity, animation] // Include all used dependencies
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	useEffect(() => {
		const handleKeyUp = () => {
			setAnimation("idle");
		};
		window.addEventListener("keyup", handleKeyUp);
		return () => window.removeEventListener("keyup", handleKeyUp);
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			if (position.y > window.innerHeight) {
				// Trigger game over when player falls below the bottom of the screen
				clearInterval(timer);
				onGameOver();
			} else {
				if (!isOnGround() || yVelocity < 0) {
					// If the player is not on the ground or moving upwards, apply gravity
					const newYVelocity = yVelocity + gravity;
					const nextY = position.y + newYVelocity;

					setPosition((prev) => ({ ...prev, y: nextY }));
					setYVelocity(newYVelocity);
				} else if (isOnGround()) {
					// If the player is on the ground and moving downwards, stop the downward movement
					const groundPlatform = platforms.find(
						(platform) =>
							position.x + playerWidth > platform.x &&
							position.x < platform.x + platform.width &&
							position.y + playerHeight >= platform.y &&
							position.y + playerHeight <= platform.y + platform.height
					);

					if (groundPlatform) {
						setPosition((prev) => ({
							...prev,
							y: groundPlatform.y - playerHeight,
						}));
						setYVelocity(0); // Reset vertical velocity
					}
				}
			}
		}, 20);

		return () => clearInterval(timer);
	}, [
		yVelocity,
		position.y,
		setPosition,
		position.x,
		isOnGround,
		gravity,
		platforms,
		playerWidth,
		playerHeight,
		onGameOver, // add onGameOver to the dependency array if it's not a stable reference
	]);

	return (
		<Sprite
			x={position.x}
			y={position.y}
			image={image}
			animation={animation}
			animations={animations}
			frameRate={10}
			frameIndex={frameIndex}
			scaleX={scaleX}
		/>
	);
};

export default Player;
