import React from "react";
import { Image } from "react-konva";

const Tile = ({ image, name, x, y, tileWidth, tileHeight, sheetX, sheetY }) => {
	return (
		<Image
			image={image}
			x={x}
			y={y}
			width={tileWidth}
			height={tileHeight}
			crop={{
				x: sheetX,
				y: sheetY,
				width: tileWidth,
				height: tileHeight,
			}}
		/>
	);
};

export default Tile;
