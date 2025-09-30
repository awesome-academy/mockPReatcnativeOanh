import { useEffect } from 'react';
import { AppNavbar } from '@/components/molecules/AppNavbar';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { SCREEN_LIST_TITLE } from '@/constants/product';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { AppDispatch, RootState } from '@/stores/store';
import { commonStyles } from '@/styles/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_COLORS } from '@/styles/color';
import { fetchTutorialData } from '@/stores/tutorial';
import { Tutorial } from '@/types/setting';

type TutorialScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'TutorialList'
>;

export default function TutorialList({ navigation }: TutorialScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { tutorials, loading, error } = useSelector(
    (state: RootState) => state.tutorial,
  );

  useEffect(() => {
    dispatch(fetchTutorialData());
  }, [dispatch]);

  if (loading)
    return <ActivityIndicator size="large" style={commonStyles.center} />;

  const renderItem = ({
    id,
    plant: { name: plant_name, image: plant_image },
    difficulty,
  }: Tutorial) => (
    <TouchableOpacity
      key={id}
      onPress={() => navigation.navigate('TutorialDetail', { id })}
    >
      <View style={styles.item}>
        <Image
          source={
            plant_image
              ? { uri: plant_image }
              : require('@/assets/images/image_failed.png')
          }
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.plantName}>{plant_name}</Text>
          <Text style={styles.plantDifficulty}>Độ khó {difficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScreenHeader
        title={SCREEN_LIST_TITLE.TUTORIAL}
        onBackPress={() => navigation.navigate('Profile')}
        showShoppingCart={false}
      />
      <View style={styles.body}>
        {!error &&
          (tutorials.length ? (
            <FlatList
              data={tutorials}
              keyExtractor={item => item.id.toString()}
              numColumns={1}
              renderItem={({ item }) => renderItem(item)}
            />
          ) : (
            <Text style={commonStyles.center}>
              Hiện tại không có sẵn hướng dẫn trồng cây.
            </Text>
          ))}
        {error && <Text style={commonStyles.center}>Error: {error}</Text>}
      </View>
      <AppNavbar activeTab="user" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: BASE_COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 48,
    flexDirection: 'row',
    gap: 16,
  },
  image: {
    width: 77,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  info: {
    gap: 5,
    justifyContent: 'center',
  },
  plantName: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: BASE_COLORS.black,
  },
  plantDifficulty: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: BASE_COLORS.gray_60,
  },
});
