import React from 'react';
import { Rect } from 'react-native-svg';
import { useTheme } from '../../contexts/ThemeContext';

interface ActivitySquareProps {
  x: number;
  y: number;
  size: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export const ActivitySquare = React.memo(({ x, y, size, level }: ActivitySquareProps) => {
  const { colors } = useTheme();
  
  // Levels map to colors array in theme
  const fill = colors.activityLevels[level];

  return (
    <Rect
      x={x}
      y={y}
      width={size}
      height={size}
      rx={2}
      ry={2}
      fill={fill}
    />
  );
});
