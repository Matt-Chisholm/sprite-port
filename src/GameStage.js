import React from "react";
import { Stage, Layer } from "react-konva";
import Background from "./components/Background";
import Player from "./components/Player";

const GameStage = () => {
	return (
		<Stage width={window.innerWidth} height={window.innerHeight}>
			<Layer>
				<Background />
				<Player />
			</Layer>
		</Stage>
	);
};

export default GameStage;
