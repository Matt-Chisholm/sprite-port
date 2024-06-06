import React from "react";
import { Rect, Text, Group } from "react-konva";

const WelcomePopup = ({ visible, onClose }) => {
  if (!visible) return null;

  const popupWidth = 500;
  const popupHeight = 300;
  const centerX = window.innerWidth / 2 - popupWidth / 2;
  const centerY = window.innerHeight / 2 - popupHeight / 2;
  const padding = 20;
  const closeButtonWidth = 100;
  const closeButtonHeight = 40;

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
        text="Welcome to My Portfolio!"
        x={padding}
        y={padding}
        fontSize={24}
        fontStyle="bold"
        fill="#333"
        width={popupWidth - padding * 2}
        align="center"
      />
      <Text
        text="Navigate through this interactive game to explore my work and skills. Each platform contains valuable insights about my professional journey. Enjoy your adventure!"
        x={padding}
        y={padding + 40}
        fontSize={18}
        lineHeight={1.5}
        fill="#555"
        width={popupWidth - padding * 2}
        align="center"
      />
      <Rect
        x={popupWidth / 2 - closeButtonWidth / 2}
        y={popupHeight - padding - closeButtonHeight}
        width={closeButtonWidth}
        height={closeButtonHeight}
        fill="#007BFF"
        cornerRadius={5}
        onClick={onClose}
        shadowBlur={5}
        shadowOffset={{ x: 2, y: 2 }}
      />
      <Text
        text="Close"
        x={popupWidth / 2 - closeButtonWidth / 2 + 20}
        y={popupHeight - padding - closeButtonHeight + 10}
        fontSize={18}
        fill="white"
        onClick={onClose}
        align="center"
      />
    </Group>
  );
};

export default WelcomePopup;
