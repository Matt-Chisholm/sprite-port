import React, { useState, useEffect, useRef } from "react";
import { Image as KonvaImage, Text, Group } from "react-konva";
import cloud from "../assets/images/cloud.png";
import Konva from "konva";

const CloudName = () => {
  const [cloudImg, setCloudImg] = useState(null);
  const groupRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = cloud;
    img.onload = () => {
      setCloudImg(img);
      setIsAnimating(true); // Trigger re-render to start animation
    };
  }, []);

  useEffect(() => {
    if (groupRef.current && isAnimating) {
      const anim = new Konva.Animation((frame) => {
        if (frame) {
          const amplitude = 10; // Adjust for how much it should sway
          const period = 2000; // Adjust for the speed of the sway
          const yOffset =
            amplitude * Math.sin((frame.time * 2 * Math.PI) / period);
          groupRef.current.y(yOffset + 20); // Adding 20 to keep it within a gentle sway
        }
      }, groupRef.current.getLayer());

      anim.start();
      return () => anim.stop();
    }
  }, [groupRef, isAnimating]);

  if (!cloudImg) return null;

  const cloudWidth = 400;
  const cloudHeight = 200;
  const padding = 20;
  const nameText = "Matt Chisholm";

  return (
    <Group
      x={window.innerWidth - cloudWidth - padding}
      y={padding}
      ref={groupRef}
    >
      <KonvaImage
        image={cloudImg}
        width={cloudWidth}
        height={cloudHeight}
        opacity={0.9}
      />
      <Text
        text={nameText}
        x={cloudWidth / 2 - nameText.length * 15} // Adjust to center the text
        y={cloudHeight / 2 - 15} // Adjust to position vertically in the center
        fontSize={28}
        fontStyle="bold"
        fill="#0398fc"
        shadowBlur={5}
        shadowColor="rgba(255, 255, 255, 0.8)"
        align="center"
        width={cloudWidth} // Ensure text is centered within the cloud
      />
    </Group>
  );
};

export default CloudName;
