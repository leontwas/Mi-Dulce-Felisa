import { useColorScheme } from 'react-native';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: 'text' | 'background'
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return theme === 'dark' 
      ? (colorName === 'text' ? '#FFFFFF' : '#000000')
      : (colorName === 'text' ? '#000000' : '#FFFFFF');
  }
}
