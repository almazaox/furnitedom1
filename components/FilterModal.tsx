import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { X, Check } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import Button from './Button';
import { productTypes } from '@/mocks/products';
import { useLanguageStore } from '@/store/languageStore';

export interface FilterOptions {
  priceRange: [number, number];
  types: string[];
  minRating: number;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  initialFilters: FilterOptions;
  maxPrice: number;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  initialFilters,
  maxPrice = 2000,
}) => {
  const { t } = useLanguageStore();
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  // Update filters when initialFilters change
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleTypeToggle = (type: string) => {
    setFilters(prev => {
      if (prev.types.includes(type)) {
        return { ...prev, types: prev.types.filter(t => t !== type) };
      } else {
        return { ...prev, types: [...prev.types, type] };
      }
    });
  };

  const handleRatingChange = (rating: number) => {
    setFilters(prev => ({ ...prev, minRating: rating }));
  };

  const handlePriceChange = (value: number) => {
    setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], value] }));
  };

  const handleMinPriceChange = (value: number) => {
    setFilters(prev => ({ ...prev, priceRange: [value, prev.priceRange[1]] }));
  };

  const handleReset = () => {
    setFilters({
      priceRange: [0, maxPrice],
      types: [],
      minRating: 0,
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={[typography.h2, styles.title]}>{t('filter')}</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <X size={24} color={colors.black} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.content}>
                <View style={styles.section}>
                  <Text style={[typography.h3, styles.sectionTitle]}>{t('priceRange')}</Text>
                  <View style={styles.priceLabels}>
                    <Text style={typography.body}>${filters.priceRange[0]}</Text>
                    <Text style={typography.body}>${filters.priceRange[1]}</Text>
                  </View>
                  <View style={styles.sliderContainer}>
                    <Slider
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={maxPrice}
                      step={10}
                      value={filters.priceRange[0]}
                      onValueChange={handleMinPriceChange}
                      minimumTrackTintColor={colors.gray[400]}
                      maximumTrackTintColor={colors.primary}
                      thumbTintColor={colors.gray[600]}
                    />
                    <Slider
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={maxPrice}
                      step={10}
                      value={filters.priceRange[1]}
                      onValueChange={handlePriceChange}
                      minimumTrackTintColor={colors.primary}
                      maximumTrackTintColor={colors.gray[400]}
                      thumbTintColor={colors.primary}
                    />
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={[typography.h3, styles.sectionTitle]}>{t('productType')}</Text>
                  <View style={styles.typeContainer}>
                    {productTypes.map(type => (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.typeButton,
                          filters.types.includes(type) && styles.typeButtonSelected,
                        ]}
                        onPress={() => handleTypeToggle(type)}
                      >
                        <Text
                          style={[
                            styles.typeText,
                            filters.types.includes(type) && styles.typeTextSelected,
                          ]}
                        >
                          {type}
                        </Text>
                        {filters.types.includes(type) && (
                          <Check size={14} color={colors.white} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={[typography.h3, styles.sectionTitle]}>{t('minimumRating')}</Text>
                  <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map(rating => (
                      <TouchableOpacity
                        key={rating}
                        style={[
                          styles.ratingButton,
                          filters.minRating >= rating && styles.ratingButtonSelected,
                        ]}
                        onPress={() => handleRatingChange(rating)}
                      >
                        <Text
                          style={[
                            styles.ratingText,
                            filters.minRating >= rating && styles.ratingTextSelected,
                          ]}
                        >
                          {rating}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>

              <View style={styles.footer}>
                <Button
                  title={t('reset')}
                  onPress={handleReset}
                  variant="outline"
                  style={styles.resetButton}
                />
                <Button
                  title={t('applyFilters')}
                  onPress={handleApply}
                  style={styles.applyButton}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 32,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderContainer: {
    height: 40,
  },
  slider: {
    width: '100%',
    height: 40,
    position: 'absolute',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray[300],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
    marginRight: 8,
  },
  typeButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeText: {
    ...typography.body,
    color: colors.gray[700],
  },
  typeTextSelected: {
    color: colors.white,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  ratingButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  ratingText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.gray[700],
  },
  ratingTextSelected: {
    color: colors.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    marginTop: 24,
  },
  resetButton: {
    flex: 1,
    marginRight: 8,
  },
  applyButton: {
    flex: 2,
  },
});

export default FilterModal;