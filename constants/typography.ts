import { StyleSheet } from 'react-native';
import colors from './colors';

export const typography = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.black,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray[600],
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.gray[500],
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  small: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.gray[500],
  },
});

export default typography;