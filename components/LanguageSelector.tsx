import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal, 
  TouchableWithoutFeedback 
} from 'react-native';
import { Globe } from 'lucide-react-native';
import { useLanguageStore } from '@/store/languageStore';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguageStore();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleLanguageSelect = (selectedLanguage: 'en' | 'ru') => {
    setLanguage(selectedLanguage);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal} style={styles.button}>
        <Globe size={20} color={colors.black} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={[typography.h3, styles.modalTitle]}>
                  {t('language')}
                </Text>
                
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    language === 'en' && styles.selectedLanguage
                  ]}
                  onPress={() => handleLanguageSelect('en')}
                >
                  <Text style={[
                    styles.languageText,
                    language === 'en' && styles.selectedLanguageText
                  ]}>
                    {t('english')}
                  </Text>
                  {language === 'en' && (
                    <View style={styles.selectedIndicator} />
                  )}
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    language === 'ru' && styles.selectedLanguage
                  ]}
                  onPress={() => handleLanguageSelect('ru')}
                >
                  <Text style={[
                    styles.languageText,
                    language === 'ru' && styles.selectedLanguageText
                  ]}>
                    {t('russian')}
                  </Text>
                  {language === 'ru' && (
                    <View style={styles.selectedIndicator} />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedLanguage: {
    backgroundColor: colors.gray[100],
  },
  languageText: {
    ...typography.body,
    color: colors.black,
  },
  selectedLanguageText: {
    color: colors.primary,
    fontWeight: '600',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});

export default LanguageSelector;