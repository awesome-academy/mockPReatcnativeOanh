import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import BellIcon from '@/assets/svgs/bell.svg';
import HomeIcon from '@/assets/svgs/home.svg';
import SearchIcon from '@/assets/svgs/search.svg';
import UserIcon from '@/assets/svgs/user.svg';
import { BASE_COLORS } from '@/styles/color';
import { useAppNavigation } from '@/hooks/useAppNavigation';

type NavbarProps = {
  activeTab: string;
};

export const AppNavbar = ({ activeTab }: NavbarProps) => {
  const navigation = useAppNavigation();

  const TABS = [
    {
      key: 'home',
      icon: <HomeIcon width={24} height={24} />,
      action: () => navigation.navigate('Home'),
    },
    {
      key: 'search',
      icon: <SearchIcon width={24} height={24} />,
      action: () => navigation.navigate('Search'),
    },
    { key: 'noti', icon: <BellIcon width={24} height={24} /> },
    {
      key: 'user',
      icon: <UserIcon width={24} height={24} />,
      action: () => navigation.navigate('Profile'),
    },
  ];

  return (
    <View style={styles.container}>
      {TABS.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => {
            if (tab.action) tab.action();
          }}
        >
          {tab.icon}
          {activeTab === tab.key && <View style={styles.activeDot} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#ffffff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: BASE_COLORS.gray_100,
    marginTop: 4,
  },
});
