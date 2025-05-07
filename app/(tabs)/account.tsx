import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Eye, EyeOff, LogOut, Package, User as UserIcon, Mail } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';
import { useLanguageStore } from '@/store/languageStore';
import Button from '@/components/Button';
import Toast from '@/components/Toast';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { mockOrders } from '@/mocks/users';

export default function AccountScreen() {
  const { user, isAuthenticated, login, register, logout, isLoading, error, clearError } = useAuthStore();
  const { t } = useLanguageStore();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

  const handleSubmit = async () => {
    // Clear previous errors
    clearError();
    
    // Validate inputs
    if (!email.trim()) {
      setToastMessage(t('pleaseEnterEmail'));
      setToastType('error');
      setToastVisible(true);
      return;
    }
    
    if (!password.trim()) {
      setToastMessage(t('pleaseEnterPassword'));
      setToastType('error');
      setToastVisible(true);
      return;
    }
    
    if (!isLogin) {
      if (password !== confirmPassword) {
        setToastMessage(t('passwordsNotMatch'));
        setToastType('error');
        setToastVisible(true);
        return;
      }
      
      if (!name.trim()) {
        setToastMessage(t('pleaseEnterName'));
        setToastType('error');
        setToastVisible(true);
        return;
      }
    }
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
    } catch (err) {
      // Error is handled by the store
    }
  };

  const handleLogout = () => {
    logout();
    setToastMessage(t('loggedOut'));
    setToastType('info');
    setToastVisible(true);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    clearError();
  };

  // Show error from auth store
  React.useEffect(() => {
    if (error) {
      setToastMessage(error);
      setToastType('error');
      setToastVisible(true);
    }
  }, [error]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          {isAuthenticated && user ? (
            // User profile
            <View style={styles.profileContainer}>
              <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                  <UserIcon size={40} color={colors.white} />
                </View>
                <Text style={[typography.h2, styles.userName]}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
              
              <View style={styles.section}>
                <Text style={[typography.h3, styles.sectionTitle]}>{t('accountInformation')}</Text>
                <View style={styles.infoRow}>
                  <UserIcon size={20} color={colors.gray[600]} />
                  <Text style={styles.infoLabel}>{t('name')}:</Text>
                  <Text style={styles.infoValue}>{user.name}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Mail size={20} color={colors.gray[600]} />
                  <Text style={styles.infoLabel}>{t('email')}:</Text>
                  <Text style={styles.infoValue}>{user.email}</Text>
                </View>
              </View>
              
              <View style={styles.section}>
                <Text style={[typography.h3, styles.sectionTitle]}>{t('orderHistory')}</Text>
                {mockOrders.map(order => (
                  <View key={order.id} style={styles.orderCard}>
                    <View style={styles.orderHeader}>
                      <Text style={styles.orderId}>{t('order')} #{order.id}</Text>
                      <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
                    </View>
                    <View style={styles.orderDetails}>
                      <Text style={styles.orderItemCount}>
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} {t('items')}
                      </Text>
                      <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
                    </View>
                    <View style={styles.orderStatus}>
                      <Package size={16} color={colors.primary} />
                      <Text style={styles.orderStatusText}>{order.status}</Text>
                    </View>
                  </View>
                ))}
              </View>
              
              <Button
                title={t('logOut')}
                onPress={handleLogout}
                variant="outline"
                icon={<LogOut size={18} color={colors.primary} />}
                style={styles.logoutButton}
              />
            </View>
          ) : (
            // Login/Register form
            <View style={styles.formContainer}>
              <Text style={[typography.h1, styles.formTitle]}>
                {isLogin ? t('welcomeBack') : t('createAccount')}
              </Text>
              <Text style={styles.formSubtitle}>
                {isLogin ? t('signInAccess') : t('fillDetails')}
              </Text>
              
              {!isLogin && (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>{t('name')}</Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder={t('yourName')}
                    autoCapitalize="words"
                  />
                </View>
              )}
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t('email')}</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder={t('emailPlaceholder')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t('password')}</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder={t('yourPassword')}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={colors.gray[500]} />
                    ) : (
                      <Eye size={20} color={colors.gray[500]} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              
              {!isLogin && (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>{t('confirmPassword')}</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder={t('confirmYourPassword')}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} color={colors.gray[500]} />
                      ) : (
                        <Eye size={20} color={colors.gray[500]} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              
              <Button
                title={isLogin ? t('signIn') : t('signUp')}
                onPress={handleSubmit}
                loading={isLoading}
                style={styles.submitButton}
              />
              
              <View style={styles.switchFormContainer}>
                <Text style={styles.switchFormText}>
                  {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}
                </Text>
                <TouchableOpacity onPress={toggleForm}>
                  <Text style={styles.switchFormLink}>
                    {isLogin ? t('signUp') : t('signIn')}
                  </Text>
                </TouchableOpacity>
              </View>
              
              {isLogin && (
                <Text style={styles.demoCredentials}>
                  {t('demoCredentials')}
                </Text>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  
  // Profile styles
  profileContainer: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    marginBottom: 4,
  },
  userEmail: {
    ...typography.body,
    color: colors.gray[600],
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    ...typography.body,
    fontWeight: '500',
    marginLeft: 8,
    width: 60,
  },
  infoValue: {
    ...typography.body,
    flex: 1,
    marginLeft: 8,
  },
  orderCard: {
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderId: {
    ...typography.body,
    fontWeight: '600',
  },
  orderDate: {
    ...typography.small,
    color: colors.gray[600],
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderItemCount: {
    ...typography.body,
  },
  orderTotal: {
    ...typography.body,
    fontWeight: '600',
    color: colors.primary,
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderStatusText: {
    ...typography.small,
    marginLeft: 4,
    color: colors.primary,
  },
  logoutButton: {
    marginTop: 8,
  },
  
  // Form styles
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  formSubtitle: {
    ...typography.body,
    color: colors.gray[600],
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    ...typography.body,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    paddingRight: 48,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  submitButton: {
    marginTop: 8,
  },
  switchFormContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  switchFormText: {
    ...typography.body,
    color: colors.gray[600],
  },
  switchFormLink: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 4,
  },
  demoCredentials: {
    ...typography.small,
    color: colors.gray[500],
    textAlign: 'center',
    marginTop: 16,
  },
});