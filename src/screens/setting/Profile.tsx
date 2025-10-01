import { AppNavbar } from '@/components/molecules/AppNavbar';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { SCREEN_LIST_TITLE } from '@/constants/product';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { RootState } from '@/stores/store';
import { commonStyles } from '@/styles/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import UserIcon from '@/assets/svgs/user.svg';
import { BASE_COLORS } from '@/styles/color';
import { logout } from '@/stores/auth';

type ProfileScreenProps = NativeStackScreenProps<AppStackParamList, 'Profile'>;

export default function UserProfile({ navigation }: ProfileScreenProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const data = [
    {
      title: 'Chung',
      items: [
        {
          label: SCREEN_LIST_TITLE.EDIT_PROFILE,
          onPress: () => {},
        },
        {
          label: SCREEN_LIST_TITLE.TUTORIAL,
          onPress: () => navigation.navigate('TutorialList'),
        },
        {
          label: SCREEN_LIST_TITLE.HISTORY,
          onPress: () => navigation.navigate('OrderHistory'),
        },
        {
          label: SCREEN_LIST_TITLE.QUESTION,
          onPress: () => navigation.navigate('QuestionAndAnswer'),
        },
      ],
    },
    {
      title: 'Bảo mật và Điều khoản',
      items: [
        {
          label: SCREEN_LIST_TITLE.TERM,
          onPress: () => {},
        },
        {
          label: SCREEN_LIST_TITLE.POLICY,
          onPress: () => {},
        },
        {
          label: 'Logout',
          onPress: () => dispatch(logout()),
          color: 'red',
        },
      ],
    },
  ];

  const renderList = ({
    title,
    items,
  }: {
    title: string;
    items: { label: string; onPress: () => void; color?: string }[];
  }) => {
    return (
      <View style={styles.list}>
        <Text style={styles.listTitle}>{title}</Text>
        {items.map((item, index) => (
          <TouchableOpacity key={index} onPress={item.onPress}>
            <Text
              style={[
                styles.listItem,
                { color: item.color || BASE_COLORS.black },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScreenHeader
        title={SCREEN_LIST_TITLE.PROFILE}
        showShoppingCart={false}
      />
      <ScrollView style={styles.body}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <UserIcon width={28} height={28} />
          </View>
          <View>
            <Text style={styles.name}>{user.userName}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
        {data.map((item, index) => (
          <View key={index}>{renderList(item)}</View>
        ))}
      </ScrollView>
      <AppNavbar activeTab="user" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: BASE_COLORS.white,
  },
  userInfo: {
    height: 72,
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderColor: BASE_COLORS.gray_60,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    lineHeight: 22,
    color: BASE_COLORS.gray_100,
  },
  email: {
    fontSize: 14,
    lineHeight: 20,
    color: BASE_COLORS.gray_50,
  },
  list: {
    paddingVertical: 16,
  },
  listTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: BASE_COLORS.gray_50,
    paddingBottom: 4,
    borderBottomColor: BASE_COLORS.gray_40,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 22,
    paddingVertical: 8,
    color: BASE_COLORS.black,
  },
});
