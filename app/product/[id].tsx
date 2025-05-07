import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ChevronLeft, Minus, Plus, Heart, Share2 } from 'lucide-react-native';
import { products } from '@/mocks/products';
import { useCartStore } from '@/store/cartStore';
import { useLanguageStore } from '@/store/languageStore';
import Button from '@/components/Button';
import Rating from '@/components/Rating';
import Toast from '@/components/Toast';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { t } = useLanguageStore();
  
  const [quantity, setQuantity] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={typography.h2}>Product not found</Text>
          <Button 
            title="Go Back" 
            onPress={() => router.back()} 
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setToastVisible(true);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleShare = () => {
    // In a real app, this would use the Share API
    console.log(`Sharing product: ${product.name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <ChevronLeft size={24} color={colors.black} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity 
                style={styles.iconButton} 
                onPress={() => setLiked(!liked)}
              >
                <Heart 
                  size={24} 
                  color={liked ? colors.error : colors.black} 
                  fill={liked ? colors.error : 'transparent'} 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.iconButton} 
                onPress={handleShare}
              >
                <Share2 size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <Image 
          source={{ uri: product.imageURL }} 
          style={styles.image} 
          resizeMode="cover"
        />
        
        {product.oldPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
            </Text>
          </View>
        )}
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[typography.h1, styles.name]}>{product.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.price}</Text>
              {product.oldPrice && (
                <Text style={styles.oldPrice}>${product.oldPrice}</Text>
              )}
            </View>
          </View>
          
          <View style={styles.ratingContainer}>
            <Rating value={product.rating} size={20} />
            <Text style={styles.ratingText}>{product.rating} ({product.purchaseCount} purchases)</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.section}>
            <Text style={[typography.h3, styles.sectionTitle]}>{t('description')}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.section}>
            <Text style={[typography.h3, styles.sectionTitle]}>{t('details')}</Text>
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>{t('category')}</Text>
                <Text style={styles.detailValue}>{product.type}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>{t('availability')}</Text>
                <Text style={[
                  styles.detailValue, 
                  product.inStock ? styles.inStock : styles.outOfStock
                ]}>
                  {product.inStock ? t('inStock') : t('outOfStock')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Minus size={20} color={quantity <= 1 ? colors.gray[400] : colors.black} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={increaseQuantity}
          >
            <Plus size={20} color={colors.black} />
          </TouchableOpacity>
        </View>
        
        <Button
          title={t('addToCart')}
          onPress={handleAddToCart}
          style={styles.addToCartButton}
        />
      </View>
      
      <Toast
        visible={toastVisible}
        message={`${product.name} ${t('addedToCart')}`}
        type="success"
        onClose={() => setToastVisible(false)}
      />
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
  image: {
    width: width,
    height: width,
    backgroundColor: colors.gray[200],
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 12,
  },
  name: {
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    ...typography.h2,
    color: colors.primary,
    marginRight: 8,
  },
  oldPrice: {
    ...typography.h3,
    color: colors.gray[500],
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    ...typography.body,
    color: colors.gray[600],
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginVertical: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  description: {
    ...typography.body,
    lineHeight: 22,
    color: colors.gray[700],
  },
  detailsContainer: {
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    padding: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    ...typography.body,
    color: colors.gray[600],
  },
  detailValue: {
    ...typography.body,
    fontWeight: '500',
  },
  inStock: {
    color: colors.success,
  },
  outOfStock: {
    color: colors.error,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    marginRight: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    ...typography.body,
    fontWeight: '600',
    width: 30,
    textAlign: 'center',
  },
  addToCartButton: {
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  discountText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});