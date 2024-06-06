import React, { useState, useEffect, useRef } from "react";
import { Sprite } from "react-konva";
import Konva from "konva";
import useImageLoader from "../hooks/useImageLoader";
import enemyspritesheet from "../assets/enemies/enemies_spritesheet.png";

const Slime = ({
  startX,
  endX,
  y,
  speed,
  playerPosition,
  playerWidth,
  playerHeight,
}) => {
  const [position, setPosition] = useState(startX);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const { image, isLoading } = useImageLoader(enemyspritesheet);
  const [dead, setDead] = useState(false);
  const slimeRef = useRef(null);

  useEffect(() => {
    const animation = new Konva.Animation(() => {
      setPosition((prev) => {
        if (dead) return prev;
        const newPos = prev + speed * direction;
        if (newPos > endX || newPos < startX) {
          setDirection(-direction);
          return prev;
        }
        return newPos;
      });
    });

    animation.start();
    return () => animation.stop();
  }, [direction, speed, startX, endX, dead]);

  useEffect(() => {
    if (
      playerPosition.x + playerWidth > position &&
      playerPosition.x < position + 51 && // 51 is the width of the slime sprite
      playerPosition.y + playerHeight > y &&
      playerPosition.y < y + 28
    ) {
      // 28 is the height of the slime sprite
      setDead(true);
    }
  }, [playerPosition, position, y, playerWidth, playerHeight]);

  useEffect(() => {
    if (dead && slimeRef.current) {
      const tween = new Konva.Tween({
        node: slimeRef.current,
        duration: 1,
        x: position + 200, // Move to the right
        y: y - 10, // Move up
        rotation: 360, // Spin
        easing: Konva.Easings.EaseInOut,
        onFinish: () => {
          slimeRef.current.to({
            duration: 1,
            opacity: 0,
            x: position + 300, // Continue to the right
            y: y + 200, // Move down off screen
            easing: Konva.Easings.EaseInOut,
          });
        },
      });
      tween.play();
    }
  }, [dead, position, y]);

  if (isLoading || !image) return null;

  const slimeFrames = dead
    ? [0, 112, 59, 12]
    : [
        52,
        125,
        50,
        28, // slimeWalk1
        0,
        125,
        51,
        26, // slimeWalk2
      ];

  return (
    <Sprite
      ref={slimeRef}
      x={position}
      y={y}
      image={image}
      animation="walk"
      animations={{ walk: slimeFrames }}
      frameRate={dead ? 1 : 10}
      frameIndex={0}
      scaleX={direction}
    />
  );
};

export default Slime;
