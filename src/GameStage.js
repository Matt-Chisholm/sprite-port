import React, { useState, useEffect, useCallback } from "react";
import { Stage, Layer } from "react-konva";
import Background from "./components/Background";
import Player from "./components/Player";
import TileManager from "./components/TileManager";
import useImageLoader from "./hooks/useImageLoader";
import useWindowDimensions from "./hooks/useWindowDimensions";
import ClipLoader from "react-spinners/ClipLoader";
import ControlPopup from "./components/popups/ControlPopup";
import WelcomePopup from "./components/popups/WelcomePopup";
import GameOverPopup from "./components/popups/GameOverPopup";
import CloudName from "./components/CloudName";

const GameStage = () => {
  const [gameOver, setGameOver] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({
    x: 50,
    y: window.innerHeight - 70 - 97,
  });
  const { width, height } = useWindowDimensions();
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  const handleTriggerPopup = () => {
    setShowWelcomePopup(true);
  };

  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false);
  };

  const handleLeavePopup = () => {
    setShowWelcomePopup(false);
  };

  const resetGame = () => {
    setGameOver(false);
    setPlayerPosition({
      x: 50,
      y: height - 70 - 97,
    });
  };

  const onGameOver = useCallback(() => {
    setGameOver(true);
  }, []);

  useEffect(() => {
    setShowControls(true);
  }, []);

  const handleCloseControls = () => {
    setShowControls(false);
  };

  const tileWidth = 70;
  const tileHeight = 70;
  const startY = height - tileHeight;
  const { image, isLoading, error } = useImageLoader(
    "/assets/tiles/tiles_spritesheet.png"
  );

  const platforms = [
    { x: 0, y: height - 70, width: 925, height: 70 },
    { x: 440, y: height - 210, width: 280, height: 70 },
    { x: 420, y: startY - 140, width: 700, height: 70 }, // Extended snow platform
  ];

  if (error) {
    return <div>Error loading images</div>;
  }

  return (
    <Stage width={width} height={height}>
      <Layer>
        <Background />
        <TileManager
          image={image}
          tileWidth={tileWidth}
          tileHeight={tileHeight}
          startY={startY}
          playerPosition={playerPosition}
          playerWidth={72}
          playerHeight={97}
          onPlayerCollision={() => console.log("Player collided with slime!")}
        />
        {isLoading && <ClipLoader color="#f00" loading={isLoading} size={35} />}
      </Layer>
      <Layer>
        <CloudName />
        <Player
          platforms={platforms}
          onGameOver={onGameOver}
          position={playerPosition}
          setPosition={setPlayerPosition}
          onTriggerPopup={handleTriggerPopup}
          onLeavePopup={handleLeavePopup}
          startY={startY}
        />
      </Layer>
      <Layer>
        <GameOverPopup visible={gameOver} onRestart={resetGame} />
        <ControlPopup visible={showControls} onClose={handleCloseControls} />
        <WelcomePopup
          visible={showWelcomePopup}
          onClose={handleCloseWelcomePopup}
        />
      </Layer>
    </Stage>
  );
};

export default GameStage;
