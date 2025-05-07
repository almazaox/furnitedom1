import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  Animated, 
  View, 
  TouchableOpacity,
  ViewStyle 
} from 'react-native';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
  style?: ViewStyle;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onClose,
  style,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      timeoutRef.current = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onClose();
        });
      }, duration);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible, fadeAnim, duration, onClose]);

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} color={colors.success} />;
      case 'error':
        return <AlertCircle size={20} color={colors.error} />;
      case 'info':
      default:
        return <Info size={20} color={colors.info} />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return styles.successBackground;
      case 'error':
        return styles.errorBackground;
      case 'info':
      default:
        return styles.infoBackground;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        getBackgroundColor(),
        { opacity: fadeAnim },
        style,
      ]}
    >
      <View style={styles.content}>
        {getIcon()}
        <Text style={[typography.body, styles.message]} numberOfLines={2}>
          {message}
        </Text>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <X size={16} color={colors.gray[600]} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 1000,
  },
  successBackground: {
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  errorBackground: {
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  infoBackground: {
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    marginLeft: 12,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
});

export default Toast;