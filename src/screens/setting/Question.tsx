import { useEffect, useState } from 'react';
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
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_COLORS } from '@/styles/color';
import ChevronUp from '@/assets/svgs/chevron-up.svg';
import ChevronDown from '@/assets/svgs/chevron-down.svg';
import { Question } from '@/types/setting';
import { fetchQuestionData } from '@/stores/question';

type QuestionScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'QuestionAndAnswer'
>;

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const QAItem: React.FC<Question> = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.question}>{question}</Text>
        {expanded ? (
          <ChevronUp height={24} width={24} />
        ) : (
          <ChevronDown height={24} width={24} />
        )}
      </TouchableOpacity>
      {expanded && <Text style={styles.answer}>{answer}</Text>}
    </View>
  );
};

export default function QuestionAndAnswer({ navigation }: QuestionScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, loading, error } = useSelector(
    (state: RootState) => state.question,
  );

  useEffect(() => {
    dispatch(fetchQuestionData());
  }, [dispatch]);

  if (loading)
    return <ActivityIndicator size="large" style={commonStyles.center} />;

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScreenHeader
        title={SCREEN_LIST_TITLE.QUESTION}
        onBackPress={() => navigation.goBack()}
        showShoppingCart={false}
      />
      <View style={styles.body}>
        {!error &&
          (questions.length ? (
            <FlatList
              data={questions}
              keyExtractor={item => item.id.toString()}
              numColumns={1}
              renderItem={({ item }) => <QAItem key={item.id} {...item} />}
            />
          ) : (
            <Text style={commonStyles.center}>
              Hiện tại không có câu hỏi nào.
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
    paddingHorizontal: 40,
    backgroundColor: BASE_COLORS.white,
  },
  item: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    paddingVertical: 8,
    flex: 1,
  },
  answer: {
    fontSize: 16,
    lineHeight: 20,
    color: BASE_COLORS.gray_60,
    paddingVertical: 8,
  },
});
