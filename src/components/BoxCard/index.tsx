import { useState } from 'react';

interface BoxProps {
  id: number;
  posX: number;
  posY: number;
  text: string;
  callback: (id: number, newText: string) => void;
}

export const BoxCard = ({
  id,
  posX,
  posY,
  text,
  callback,
}: BoxProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(text);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    callback(id, inputText);
  };
  return (
    <>
      <g key={id}>
        <rect
          x={posX}
          y={posY}
          rx="5"
          ry="5"
          width="140"
          height="60"
          fill="#9bb7f1"
          stroke="black"
          strokeWidth="2"
          onClick={handleClick}
        />
      </g>

      {!isEditing ? (
        <text
          className="label"
          x={posX + 70}
          y={posY + 30}
          textAnchor="middle"
          alignmentBaseline="central"
        >
          {text}
        </text>
      ) : (
        <foreignObject x={posX + 10} y={posY + 10} width="120" height="40">
          <input
            type="text"
            value={inputText}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            style={{ width: '100%', height: '100%', padding: '5px' }}
          />
        </foreignObject>
      )}
    </>
  );
};
