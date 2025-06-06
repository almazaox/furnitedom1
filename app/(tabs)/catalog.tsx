import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  ActivityIndicator, 
  Text,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import { Filter, ArrowUpDown } from 'lucide-react-native';
import { useProductStore } from '@/store/productStore';
import { useLanguageStore } from '@/store/languageStore';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import FilterModal, { FilterOptions } from '@/components/FilterModal';
import SortModal, { SortOption } from '@/components/SortModal';
import EmptyState from '@/components/EmptyState';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { Product } from '@/mocks/products';

export default function CatalogScreen() {
  const { products, isLoading, error, fetchProducts } = useProductStore();
  const { t } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 2000],
    types: [],
    minRating: 0,
  });
  
  const [sortOption, setSortOption] = useState<SortOption>('popularity');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, searchQuery, filters, sortOption]);

  const applyFiltersAndSort = () => {
    let filtered = [...products];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(query) ||
          product.type.toLowerCase().includes(query)
      );
    }
    
    // Apply filters
    filtered = filtered.filter(product => {
      // Price range
      const priceInRange = 
        product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1];
      
      // Product type
      const typeMatch = 
        filters.types.length === 0 || 
        filters.types.includes(product.type);
      
      // Rating
      const ratingMatch = product.rating >= filters.minRating;
      
      return priceInRange && typeMatch && ratingMatch;
    });
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.purchaseCount - a.purchaseCount);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setFilteredProducts(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleApplySort = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} style={styles.productCard} />
  );

  const getSortLabel = () => {
    switch (sortOption) {
      case 'price-asc':
        return t('priceLowToHigh');
      case 'price-desc':
        return t('priceHighToLow');
      case 'popularity':
        return t('popularity');
      case 'rating':
        return t('rating');
      default:
        return t('sort');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
          style={styles.searchBar}
          placeholder={t('searchProducts')}
        />
        
        <View style={styles.filterSortContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Filter size={18} color={colors.black} />
            <Text style={styles.filterButtonText}>
              {t('filter')}{filters.types.length > 0 || filters.minRating > 0 ? ' •' : ''}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setSortModalVisible(true)}
          >
            <ArrowUpDown size={18} color={colors.black} />
            <Text style={styles.sortButtonText}>{getSortLabel()}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading && !refreshing && products.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          title={t('noProductsFound')}
          description={t('adjustFilters')}
          buttonText={t('clearFilters')}
          onButtonPress={() => {
            setSearchQuery('');
            setFilters({
              priceRange: [0, 2000],
              types: [],
              minRating: 0,
            });
            setSortOption('popularity');
          }}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
        maxPrice={2000}
      />

      <SortModal
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
        onApply={handleApplySort}
        currentSort={sortOption}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  searchBar: {
    marginBottom: 12,
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  filterButtonText: {
    ...typography.body,
    marginLeft: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
  },
  sortButtonText: {
    ...typography.body,
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productList: {
    padding: 16,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: '48%',
  },
});