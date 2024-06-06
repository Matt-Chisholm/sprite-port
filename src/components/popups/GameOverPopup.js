import React from "react";
import { Rect, Text, Group } from "react-konva";

const GameOverPopup = ({ visible, onRestart }) => {
  if (!visible) return null;

  const popupWidth = 400;
  const popupHeight = 200;
  const centerX = window.innerWidth / 2 - popupWidth / 2;
  const centerY = window.innerHeight / 2 - popupHeight / 2;
  const padding = 20;
  const buttonWidth = 120;
  const buttonHeight = 40;

  return (
    <Group x={centerX} y={centerY}>
      <Rect
        width={popupWidth}
        height={popupHeight}
        fill="#f9f9f9"
        stroke="#333"
        strokeWidth={2}
        shadowBlur={10}
        cornerRadius={10}
      />
      <Text
        text="Oops! You died!"
        x={padding}
        y={padding}
        fontSize={24}
        fontStyle="bold"
        fill="#333"
        width={popupWidth - padding * 2}
        align="center"
      />
      <Rect
        x={popupWidth / 2 - buttonWidth / 2}
        y={popupHeight - padding - buttonHeight}
        width={buttonWidth}
        height={buttonHeight}
        fill="#FF6347"
        cornerRadius={5}
        onClick={onRestart}
        shadowBlur={5}
        shadowOffset={{ x: 2, y: 2 }}
      />
      <Text
        text="Restart"
        x={popupWidth / 2 - buttonWidth / 2 + 20}
        y={popupHeight - padding - buttonHeight + 10}
        fontSize={18}
        fill="white"
        onClick={onRestart}
        align="center"
      />
    </Group>
  );
};

export default GameOverPopup;
