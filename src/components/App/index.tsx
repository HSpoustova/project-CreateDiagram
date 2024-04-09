import React, { useState } from 'react';
import './styles.css';
import { BoxCard } from '../BoxCard';

interface BoxData {
  id: number;
  boxes: Box[];
  connections: Connections[];
}

interface Box {
  id: number;
  posX: number;
  posY: number;
  text: string;
}

interface Connections {
  from: number;
  to: number;
}

export const App = (): JSX.Element => {
  const [toBoxes, setBox] = useState<BoxData>({
    id: 0,
    boxes: [],
    connections: [],
  });

  const handleMouseClick = function (event: MouseEvent): void {
    if (event.ctrlKey) {
      const rect = (event.target as SVGSVGElement).getBoundingClientRect();
      const posX: number = event.clientX - rect.left;
      const posY: number = event.clientY - rect.top;

      const boxWidth = 140;
      const boxHeight = 60;
      const newPosX = posX - boxWidth / 2;
      const newPosY = posY - boxHeight / 2;

      const newBox: Box = {
        id: toBoxes.boxes.length,
        posX: newPosX,
        posY: newPosY,
        text: '',
      };

      const newBoxes: Box[] = [...toBoxes.boxes, newBox];

      setBox((prevBoxData) => ({
        ...prevBoxData,
        boxes: newBoxes,
      }));
    }
  };

  const handleLabelChange = (id: number, newText: string): void => {
    setBox((prevBoxData) => ({
      ...prevBoxData,
      boxes: prevBoxData.boxes.map((box) =>
        box.id === id ? { ...box, text: newText } : box,
      ),
    }));
  };

  const handleBoardClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    handleMouseClick(event.nativeEvent);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <header className="header">
          <h1>Diagramy</h1>
        </header>

        <svg className="board" onClick={handleBoardClick}>
          {toBoxes.boxes.map((box: Box) => {
            return (
              <BoxCard
                id={box.id}
                posX={box.posX}
                posY={box.posY}
                text={box.text}
                callback={handleLabelChange}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};
