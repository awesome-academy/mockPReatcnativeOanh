import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  history: string[];
  onSelect: (kw: string) => void;
};

export function SearchHistory({ history, onSelect }: Props) {
  if (!history.length) return null;

  return (
    <>
      <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
      <View style={styles.historyWrap}>
        {history.map(item => (
          <TouchableOpacity
            key={item}
            style={styles.historyItem}
            onPress={() => onSelect(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: '400',
    marginTop: 20,
    fontSize: 16,
  },
  historyWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  historyItem: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
});
