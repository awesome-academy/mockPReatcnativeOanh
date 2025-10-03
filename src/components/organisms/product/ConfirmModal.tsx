import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BASE_COLORS } from '@/styles/color';

type ConfirmModalProps = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  title,
  message,
  confirmText,
  cancelText,
  visible,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title || 'Xác nhận'}</Text>
          <Text style={styles.subText}>
            {message || 'Bạn đã chắc chắn thực hiện thao tác này.'}
          </Text>

          <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
            <Text style={styles.confirmText}>{confirmText || 'Đồng ý'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>{cancelText || 'Huỷ bỏ'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modal: {
    backgroundColor: BASE_COLORS.white,
    padding: 16,
    paddingTop: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    lineHeight: 20,
    color: BASE_COLORS.gray_60,
    marginBottom: 16,
    textAlign: 'center',
  },
  confirmBtn: {
    width: '100%',
    height: 50,
    backgroundColor: BASE_COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  confirmText: {
    color: BASE_COLORS.white,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  cancelBtn: {
    width: '100%',
    height: 50,
    backgroundColor: BASE_COLORS.white,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: BASE_COLORS.gray_100,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
