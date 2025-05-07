import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingCart } from 'lucide-react-native';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useLanguageStore } from '@/store/languageStore';
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import Toast from '@/components/Toast';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

export default function CartScreen() {
  const router = useRouter();
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, getCartTotal, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { t } = useLanguageStore();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setToastMessage(t('pleaseLogin'));
      setToastType('info');
      setToastVisible(true);
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      setToastMessage(t('orderPlacedSuccess'));
      setToastType('success');
      setToastVisible(true);
      
      // Clear cart after successful checkout
      clearCart();
    } catch (error) {
      setToastMessage(t('paymentFailed'));
      setToastType('error');
      setToastVisible(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinueShopping = () => {
    router.navigate('/catalog');
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState
          title={t('yourCartIsEmpty')}
          description={t('addProductsToCart')}
          icon={<ShoppingCart size={64} color={colors.gray[400]} />}
          buttonText={t('continueShopping')}
          onButtonPress={handleContinueShopping}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrement={increaseQuantity}
            onDecrement={decreaseQuantity}
            onRemove={removeFromCart}
          />
        )}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.cartList}
        ListFooterComponent={
          <View style={styles.footer}>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t('subtotal')}</Text>
                <Text style={styles.summaryValue}>${getCartTotal().toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t('shipping')}</Text>
                <Text style={styles.summaryValue}>{t('free')}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, styles.totalLabel]}>{t('total')}</Text>
                <Text style={styles.totalValue}>${getCartTotal().toFixed(2)}</Text>
              </View>
            </View>
            
            <Button
              title={isAuthenticated ? t('checkout') : t('loginToCheckout')}
              onPress={handleCheckout}
              loading={isProcessing}
              style={styles.checkoutButton}
            />
            
            <TouchableOpacity
              onPress={handleContinueShopping}
              style={styles.continueShoppingButton}
            >
              <Text style={styles.continueShoppingText}>{t('continueShopping')}</Text>
            </TouchableOpacity>
          </View>
        }
      />
      
      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
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
  cartList: {
    padding: 16,
  },
  footer: {
    marginTop: 16,
  },
  summaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    ...typography.body,
    color: colors.gray[600],
  },
  summaryValue: {
    ...typography.body,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginVertical: 12,
  },
  totalLabel: {
    ...typography.h3,
    color: colors.black,
  },
  totalValue: {
    ...typography.h3,
    color: colors.primary,
  },
  checkoutButton: {
    marginBottom: 12,
  },
  continueShoppingButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  continueShoppingText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '500',
  },
});