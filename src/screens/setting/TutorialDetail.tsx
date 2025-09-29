import { useState } from 'react';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { commonStyles } from '@/styles/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_COLORS } from '@/styles/color';
import ChevronUp from '@/assets/svgs/chevron-up.svg';
import ChevronDown from '@/assets/svgs/chevron-down.svg';
import Plus from '@/assets/svgs/plus.svg';
import Minus from '@/assets/svgs/minus.svg';
import { Step } from '@/types/setting';
import { PLANT_TYPE } from '@/constants/product';
import { useTutorialDetail } from '@/hooks/useTutorialDetail';

type TutorialScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'TutorialDetail'
>;

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ItemStep: React.FC<Step> = ({ step, description }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.question}>{step}</Text>
        {expanded ? (
          <ChevronUp height={24} width={24} />
        ) : (
          <ChevronDown height={24} width={24} />
        )}
      </TouchableOpacity>
      {expanded && <Text style={styles.answer}>{description}</Text>}
    </View>
  );
};

export default function TutorialDetail({
  navigation,
  route,
}: TutorialScreenProps) {
  const { id } = route.params;
  const { detail, loading, error, fetchDetail } = useTutorialDetail(id);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections = [
    {
      id: `${id ?? 0}-basic-knowledge`,
      title: 'Kiến thức cơ bản',
      steps: detail?.basic_knowledge || [],
    },
    {
      id: `${id ?? 0}-stages`,
      title: 'Các giai đoạn',
      steps: detail?.stages || [],
    },
  ];

  const toggleSection = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === id ? null : id);
  };

  const renderItem = () => {
    return (
      <>
        <Image
          source={
            detail?.plant.image
              ? { uri: detail?.plant.image }
              : require('@/assets/images/image_failed.png')
          }
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.body}>
          <View style={commonStyles.flex_row}>
            <Text style={styles.badge}>Cây trồng</Text>
            <Text style={styles.badge}>
              {PLANT_TYPE[detail?.plant.type as keyof typeof PLANT_TYPE]}
            </Text>
          </View>
          <View>
            {sections.map((section, idx) => {
              const isLastItem = idx === sections.length - 1;
              return (
                <View
                  key={section.id}
                  style={[styles.section, !isLastItem && styles.sectionBorder]}
                >
                  <TouchableOpacity
                    onPress={() => toggleSection(section.id)}
                    style={styles.sectionHeader}
                  >
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    {expandedSection === section.id ? (
                      <Minus height={24} width={24} />
                    ) : (
                      <Plus height={24} width={24} />
                    )}
                  </TouchableOpacity>

                  {expandedSection === section.id && (
                    <ScrollView nestedScrollEnabled={true}>
                      {section.steps.map((step, index) => (
                        <ItemStep
                          key={`${section.id}-step-${index}`}
                          {...step}
                        />
                      ))}
                    </ScrollView>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </>
    );
  };

  if (loading)
    return <ActivityIndicator size="large" style={commonStyles.center} />;

  return (
    <SafeAreaView style={commonStyles.container}>
      {!error && detail && (
        <>
          <ScreenHeader
            title={detail.plant.name}
            onBackPress={() => navigation.navigate('TutorialList')}
            showShoppingCart={false}
            titleUppercase={false}
          />
          <FlatList
            data={[detail]}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={renderItem}
          />
        </>
      )}
      {error && (
        <View>
          <Text style={commonStyles.center}>Error: {error}</Text>
          <TouchableOpacity onPress={() => fetchDetail()}>
            <Text style={commonStyles.retry}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: BASE_COLORS.white,
    gap: 24,
  },
  image: {
    width: '100%',
    height: 268,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: BASE_COLORS.primary,
    color: BASE_COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 14,
    lineHeight: 20,
    height: 28,
    marginRight: 8,
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
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    paddingVertical: 8,
    flex: 1,
    color: BASE_COLORS.gray_80,
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
    color: BASE_COLORS.gray_80,
    paddingVertical: 8,
  },
  section: {
    marginBottom: 16,
    paddingBottom: 16,
  },
  sectionBorder: {
    borderBottomWidth: 2,
    borderBottomColor: BASE_COLORS.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
});
