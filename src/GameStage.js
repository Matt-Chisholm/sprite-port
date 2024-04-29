import React from "react";
import { Stage, Layer, Text } from "react-konva";
import Background from "./components/Background";
import Player from "./components/Player";
import TileManager from "./components/TileManager";
import useImageLoader from "./hooks/useImageLoader"; // Assuming the hook is saved here

const GameStage = () => {
	const tileWidth = 70;
	const tileHeight = 70;
	const startY = window.innerHeight - tileHeight;
	const { image, isLoading, error } = useImageLoader(
		"/assets/tiles/tiles_spritesheet.png"
	);

	if (error) {
		return <div>Error loading images</div>;
	}

	return (
		<Stage width={window.innerWidth} height={window.innerHeight}>
			<Layer>
				<Background />
				<Player />
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
			</Layer>
		</Stage>
	);
};

export default GameStage;
