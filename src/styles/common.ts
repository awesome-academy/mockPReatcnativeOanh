import { StyleSheet } from 'react-native';
import { BASE_COLORS } from './color';

export const commonStyles = StyleSheet.create({
  flex_row: { flexDirection: 'row' },
  px_24: { paddingHorizontal: 24 },
  mt_24: { marginTop: 24 },
  corlor_primary: { color: '#007537' },
  font_light: { fontWeight: 300 },
  font_medium: { fontWeight: 500 },
  font_bold: { fontWeight: 700 },
  textCondition: {
    color: '#007537',
    fontWeight: '500',
    textDecorationLine: 'underline',
    textAlignVertical: 'center',
  },
  footerText: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#4CAF50',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#000000',
    fontWeight: 500,
  },
  loginWithGoogle: {
    marginVertical: 32,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  defaultBtnRedirect: {
    flexDirection: 'row',
    gap: 8,
  },
  defaultTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: BASE_COLORS.gray_100,
  },
  defaultDescription: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: BASE_COLORS.gray_60,
  },
  center: {
    marginTop: 100,
    textAlign: 'center',
  },
  retry: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 16,
  },
  success: {
    color: BASE_COLORS.primary,
  },
  fail: {
    color: BASE_COLORS.error,
  },
});
