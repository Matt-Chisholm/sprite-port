import React, { useState, useEffect } from "react";
import { Stage, Layer, Text } from "react-konva";
import Background from "./components/Background";
import Player from "./components/Player";
import Tile from "./components/Tile";

const GameStage = () => {
	const tileWidth = 70;
	const tileHeight = 70;
	const startY = window.innerHeight - tileHeight;
	const [image, setImage] = useState(null);

	useEffect(() => {
		const img = new Image();
		img.src = "/assets/tiles/tiles_spritesheet.png"; // Updated path
		img.onload = () => {
			setImage(img);
			console.log("Image loaded:", true);
		};
		img.onerror = (err) => {
			console.error("Failed to load image", err);
		};
	}, []);

	return (
		<Stage width={window.innerWidth} height={window.innerHeight}>
			<Layer>
				<Background />
				<Player />
				{image ? (
					<React.Fragment>
						<Tile
							image={image}
							name='grassLeft'
							x={0}
							y={startY}
							tileWidth={tileWidth}
							tileHeight={tileHeight}
							sheetX={504}
							sheetY={648}
						/>
						{Array.from({ length: 3 }).map((_, index) => (
							<Tile
								image={image}
								name='grassCenter'
								key={index}
								x={(index + 1) * tileWidth}
								y={startY}
								tileWidth={tileWidth}
								tileHeight={tileHeight}
								sheetX={576}
								sheetY={864}
							/>
						))}
						<Tile
							image={image}
							name='grassRight'
							x={4 * tileWidth}
							y={startY}
							tileWidth={tileWidth}
							tileHeight={tileHeight}
							sheetX={504}
							sheetY={504}
						/>
					</React.Fragment>
				) : (
					<Text text='Loading image...' fontSize={24} x={100} y={100} />
				)}
			</Layer>
		</Stage>
	);
};

export default GameStage;
