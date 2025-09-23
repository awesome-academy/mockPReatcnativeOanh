import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  flex_row: { flexDirection: 'row' },
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
});
