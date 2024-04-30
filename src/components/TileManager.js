import React from "react";
import Tile from "./Tile";
import { Text } from "react-konva";

const TileManager = ({ image, tileWidth, tileHeight, startY }) => {
	const tiles = [
		{ name: "grassLeft", x: 0, sheetX: 504, sheetY: 648 },
		{ name: "grassMid", x: 70, sheetX: 504, sheetY: 576 },
		{ name: "grassMid", x: 140, sheetX: 504, sheetY: 576 },
		{ name: "grassMid", x: 210, sheetX: 504, sheetY: 576 },
		{ name: "grassMid", x: 280, sheetX: 504, sheetY: 576 },
		{ name: "grassMid", x: 350, sheetX: 504, sheetY: 576 },
		{ name: "grassMid", x: 420, sheetX: 504, sheetY: 576 },
		{ name: "grassMid", x: 490, sheetX: 504, sheetY: 576 },
		{ name: "grassMid", x: 560, sheetX: 504, sheetY: 576 },
		{ name: "grassMid", x: 630, sheetX: 504, sheetY: 576 },
		{ name: "grassMid", x: 700, sheetX: 504, sheetY: 576 },
		{ name: "grassMid", x: 770, sheetX: 504, sheetY: 576 },
		{ name: "grassRight", x: 840, sheetX: 504, sheetY: 504 },
		{ name: "sign", x: 280, sheetX: 288, sheetY: 432, offsetY: -70 },
		{ name: "snowLeft", x: 420, sheetX: 144, sheetY: 864, offsetY: -140 },
		{ name: "snowMid", x: 490, sheetX: 144, sheetY: 792, offsetY: -140 },
		{ name: "snowMid", x: 560, sheetX: 144, sheetY: 792, offsetY: -140 },
		{ name: "snowRight", x: 630, sheetX: 144, sheetY: 720, offsetY: -140 },
	];

	return (
		<>
			{tiles.map((tile, index) => (
				<Tile
					key={index}
					image={image}
					name={tile.name}
					x={tile.x}
					y={startY + (tile.offsetY || 0)}
					tileWidth={tileWidth}
					tileHeight={tileHeight}
					sheetX={tile.sheetX}
					sheetY={tile.sheetY}
				/>
			))}
			<Text
				text='Welcome!'
				fontSize={15} // Adjust the font size as necessary
				fontFamily='Arial'
				fill='#ffffff' // Text color
				x={tiles[13].x + 0} // Adjust x position to center text on the sign, use the index for the sign tile
				y={startY + tiles[13].offsetY + 20} // Adjust y position to properly position text on the sign
				width={tileWidth} // Set width to the width of the sign tile to center text
				align='center'
			/>
		</>
	);
};

export default TileManager;
