import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Text, Rect } from "react-konva";
import Konva from "konva";
import Background from "./components/Background";
import Player from "./components/Player";
import TileManager from "./components/TileManager";
import useImageLoader from "./hooks/useImageLoader";
import ClipLoader from "react-spinners/ClipLoader";
import ControlPopup from "./components/popups/ControlPopup";

const GameStage = () => {
	const [gameOver, setGameOver] = useState(false);
	const [showControls, setShowControls] = useState(false);
	const [playerPosition, setPlayerPosition] = useState({
		x: 50,
		y: window.innerHeight - 70 - 97, // Adjust the calculation based on your game's design
	});
	const popupRef = useRef(null);

	const resetGame = () => {
		setGameOver(false);
		setPlayerPosition({
			x: 50,
			y: window.innerHeight - 70 - 97, // Reset to initial position
		});
		// Add any other state resets here
	};

	const onGameOver = () => {
		setGameOver(true);
	};

	useEffect(() => {
		const hasVisited = localStorage.getItem("hasVisited");
		if (!hasVisited) {
			setShowControls(true);
			localStorage.setItem("hasVisited", "true");
		}
	}, []);

	const handleCloseControls = () => {
		setShowControls(false);
	};

	useEffect(() => {
		if (gameOver && popupRef.current) {
			const tween = new Konva.Tween({
				node: popupRef.current,
				duration: 1,
				scaleX: 1,
				scaleY: 1,
				opacity: 1,
				easing: Konva.Easings.EaseInOut,
			});
			tween.play();
		}
	}, [gameOver]);

	const tileWidth = 70;
	const tileHeight = 70;
	const startY = window.innerHeight - tileHeight;
	const { image, isLoading, error } = useImageLoader(
		"/assets/tiles/tiles_spritesheet.png"
	);

	const platforms = [
		{ x: 0, y: window.innerHeight - 70, width: 925, height: 70 }, // Corrected width for the first grass platform
		{ x: 440, y: window.innerHeight - 210, width: 280, height: 70 }, // Corrected width for the second snow platform
	];

	if (error) {
		return <div>Error loading images</div>;
	}

	return (
		<Stage width={window.innerWidth} height={window.innerHeight}>
			<Layer>
				<Background />
				<ControlPopup visible={showControls} onClose={handleCloseControls} />
				<Player
					platforms={platforms}
					onGameOver={onGameOver}
					position={playerPosition}
					setPosition={setPlayerPosition}
				/>
				{isLoading ? (
					<ClipLoader color='#f00' loading={isLoading} size={35} />
				) : (
					<TileManager
						image={image}
						tileWidth={tileWidth}
						tileHeight={tileHeight}
						startY={startY}
					/>
				)}
				{gameOver && (
					<React.Fragment>
						<Rect
							ref={popupRef}
							x={window.innerWidth / 2 - 150}
							y={window.innerHeight / 2 - 90}
							width={300}
							height={180}
							fill='white'
							stroke='black'
							strokeWidth={4}
							cornerRadius={10}
							opacity={0}
							scaleX={0.5}
							scaleY={0.5}
						/>
						<Text
							text='Oops! You died!'
							fontSize={24}
							x={window.innerWidth / 2 - 140}
							y={window.innerHeight / 2 - 50}
							fill='black'
						/>
						<Rect
							x={window.innerWidth / 2 - 100}
							y={window.innerHeight / 2 + 30}
							width={200}
							height={40}
							cornerRadius={10}
							fill='red'
							onClick={resetGame}
						/>
						<Text
							text='Restart'
							fontSize={20}
							x={window.innerWidth / 2 - 90}
							y={window.innerHeight / 2 + 40}
							fill='white'
							onClick={resetGame}
						/>
					</React.Fragment>
				)}
			</Layer>
		</Stage>
	);
};

export default GameStage;
