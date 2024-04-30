import React, { useState } from "react";
import { Stage, Layer, Text, Rect } from "react-konva";
import Background from "./components/Background";
import Player from "./components/Player";
import TileManager from "./components/TileManager";
import useImageLoader from "./hooks/useImageLoader"; // Assuming the hook is saved here

const GameStage = () => {
	const [gameOver, setGameOver] = useState(false);
	const [playerPosition, setPlayerPosition] = useState({
		x: 50,
		y: window.innerHeight - 70 - 97, // Adjust the calculation based on your game's design
	});

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
				<Player
					platforms={platforms}
					onGameOver={onGameOver}
					position={playerPosition}
					setPosition={setPlayerPosition}
				/>
				{isLoading ? (
					<Text text='Loading image...' fontSize={24} x={100} y={100} />
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
							x={100}
							y={100}
							width={300}
							height={180}
							fill='white'
							stroke='black'
							strokeWidth={4}
							cornerRadius={10}
						/>
						<Text
							text='Oops! You died!'
							fontSize={24}
							x={150}
							y={150}
							fill='black'
						/>
						<Rect
							x={150}
							y={200}
							width={200}
							height={40}
							fill='red'
							onClick={resetGame}
						/>
						<Text
							text='Restart'
							fontSize={20}
							x={190}
							y={210}
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
