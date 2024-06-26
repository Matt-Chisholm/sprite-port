import React, { useState, useEffect } from "react";
import { Rect, Text, Group, Image as KonvaImage } from "react-konva";

const ControlPopup = ({ visible, onClose }) => {
  const [arrowKeysImg, setArrowKeysImg] = useState(null);

  useEffect(() => {
    const loadImage = (src, setter) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setter(img);
      };
    };

    loadImage("assets/images/arrowkeys.png", setArrowKeysImg);
  }, []);

  const getImageDimensions = (img, maxWidth, maxHeight) => {
    const ratio = img.width / img.height;
    let width = maxWidth;
    let height = maxWidth / ratio;

    if (height > maxHeight) {
      height = maxHeight;
      width = maxHeight * ratio;
    }

    return { width, height };
  };

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
        text="Controls"
        x={padding}
        y={padding}
        fontSize={24}
        fontStyle="bold"
        fill="#333"
        width={popupWidth - padding * 2}
        align="center"
      />
      <Text
        text="Use the arrow keys to move left and right."
        x={padding}
        y={padding + 40}
        fontSize={18}
        fill="#555"
        width={popupWidth - padding * 2}
        align="center"
      />
      <Text
        text="Interact with objects to learn more about me."
        x={padding}
        y={padding + 70}
        fontSize={18}
        fill="#555"
        width={popupWidth - padding * 2}
        align="center"
      />
      {arrowKeysImg && (
        <KonvaImage
          image={arrowKeysImg}
          {...getImageDimensions(arrowKeysImg, 175, 87)}
          x={
            popupWidth / 2 - getImageDimensions(arrowKeysImg, 175, 87).width / 2
          }
          y={padding + 90}
          key="arrowKeysImg"
        />
      )}
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

export default ControlPopup;
