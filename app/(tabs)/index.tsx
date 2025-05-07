import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  FlatList, 
  ActivityIndicator,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import { useProductStore } from '@/store/productStore';
import { useLanguageStore } from '@/store/languageStore';
import ProductCard from '@/components/ProductCard';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { Product } from '@/mocks/products';

export default function HomeScreen() {
  const { promotions, isLoading, error, fetchPromotions, products, fetchProducts } = useProductStore();
  const { t } = useLanguageStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPromotions();
    fetchProducts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchPromotions(), fetchProducts()]);
    setRefreshing(false);
  };

  const renderPromotionItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} horizontal style={styles.promotionCard} />
  );

  const renderCategorySection = (title: string, items: Product[]) => (
    <View style={styles.categorySection}>
      <Text style={[typography.h2, styles.sectionTitle]}>{title}</Text>
      <FlatList
        data={items.slice(0, 4)}
        renderItem={({ item }) => (
          <ProductCard product={item} style={styles.productCard} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
      />
    </View>
  );

  if (isLoading && !refreshing && promotions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={[typography.h1, styles.title]}>{t('furnitureStore')}</Text>
          <Text style={[typography.subtitle, styles.subtitle]}>
            {t('discoverFurniture')}
          </Text>
        </View>

        <View style={styles.promotionsSection}>
          <Text style={[typography.h2, styles.sectionTitle]}>{t('specialOffers')}</Text>
          {isLoading && promotions.length === 0 ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <FlatList
              horizontal
              data={promotions}
              renderItem={renderPromotionItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.promotionsList}
            />
          )}
        </View>

        {renderCategorySection(t('popularItems'), 
          [...products].sort((a, b) => b.purchaseCount - a.purchaseCount)
        )}

        {renderCategorySection(t('topRated'), 
          [...products].sort((a, b) => b.rating - a.rating)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    color: colors.gray[600],
  },
  promotionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  promotionsList: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  promotionCard: {
    marginRight: 12,
    marginBottom: 8,
  },
  categorySection: {
    marginBottom: 24,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  productCard: {
    width: '48%',
  },
});