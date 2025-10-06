import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckIcon from '@/assets/svgs/check-primary.svg';
import { BASE_COLORS } from '@/styles/color';
import { commonStyles } from '@/styles/common';

type Option = {
  id: number;
  label: string;
  description?: string;
};

interface Props {
  options: Option[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const OptionList: React.FC<Props> = ({ options, selectedId, onSelect }) => {
  return (
    <View>
      {options.map(opt => (
        <TouchableOpacity
          key={opt.id}
          onPress={() => onSelect(opt.id)}
          style={styles.optionContainer}
        >
          <View>
            <Text
              style={[
                commonStyles.text_14_500,
                opt.id === selectedId ? styles.primaryText : styles.grayText,
              ]}
            >
              {opt.label}
            </Text>
            {opt.description && (
              <Text style={[commonStyles.text_14_500, styles.descriptionText]}>
                {opt.description}
              </Text>
            )}
          </View>
          {opt.id === selectedId && <CheckIcon width={24} height={24} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OptionList;

const styles = StyleSheet.create({
  optionContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: BASE_COLORS.gray_60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryText: {
    color: BASE_COLORS.primary,
  },
  grayText: {
    color: BASE_COLORS.gray_80,
  },
  descriptionText: {
    fontWeight: '400',
    color: BASE_COLORS.gray_60,
  },
});
