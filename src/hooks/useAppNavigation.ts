import { useContext } from 'react';
import { NavigationContext } from '@react-navigation/native';

export const useAppNavigation = () => {
  const navigation = useContext(NavigationContext);
  if (!navigation) {
    throw new Error(
      'useAppNavigation must be used within a NavigationProvider',
    );
  }
  return navigation;
};
