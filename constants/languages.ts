export type Language = 'en' | 'ru';

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  [key: string]: Translation;
}

export const translations: Translations = {
  en: {
    // Common
    language: 'Language',
    english: 'English',
    russian: 'Russian',
    
    // Navigation
    home: 'Home',
    catalog: 'Catalog',
    cart: 'Cart',
    account: 'Account',
    
    // Home
    furnitureStore: 'Furniture Store',
    discoverFurniture: 'Discover beautiful furniture for your home',
    specialOffers: 'Special Offers',
    popularItems: 'Popular Items',
    topRated: 'Top Rated',
    
    // Catalog
    filter: 'Filter',
    sort: 'Sort',
    priceRange: 'Price Range',
    productType: 'Product Type',
    minimumRating: 'Minimum Rating',
    reset: 'Reset',
    applyFilters: 'Apply Filters',
    sortBy: 'Sort By',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    popularity: 'Popularity',
    rating: 'Rating',
    apply: 'Apply',
    noProductsFound: 'No products found',
    adjustFilters: 'Try adjusting your filters or search query',
    clearFilters: 'Clear Filters',
    searchProducts: 'Search products...',
    
    // Product
    addToCart: 'Add to Cart',
    description: 'Description',
    details: 'Details',
    category: 'Category',
    availability: 'Availability',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    addedToCart: 'added to cart',
    
    // Cart
    yourCartIsEmpty: 'Your cart is empty',
    addProductsToCart: 'Add some products to your cart to see them here',
    continueShopping: 'Continue Shopping',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    total: 'Total',
    checkout: 'Checkout',
    loginToCheckout: 'Login to Checkout',
    orderPlacedSuccess: 'Order placed successfully!',
    paymentFailed: 'Failed to process payment. Please try again.',
    pleaseLogin: 'Please log in to complete your purchase',
    
    // Account
    welcomeBack: 'Welcome Back',
    createAccount: 'Create Account',
    signInAccess: 'Sign in to access your account',
    fillDetails: 'Fill in your details to get started',
    name: 'Name',
    yourName: 'Your name',
    email: 'Email',
    emailPlaceholder: 'your.email@example.com',
    password: 'Password',
    yourPassword: 'Your password',
    confirmPassword: 'Confirm Password',
    confirmYourPassword: 'Confirm your password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    demoCredentials: 'Demo credentials: user@example.com / password',
    accountInformation: 'Account Information',
    orderHistory: 'Order History',
    items: 'items',
    logOut: 'Log Out',
    loggedOut: 'You have been logged out',
    invalidCredentials: 'Invalid email or password',
    emailInUse: 'Email already in use',
    passwordsNotMatch: 'Passwords do not match',
    pleaseEnterEmail: 'Please enter your email',
    pleaseEnterPassword: 'Please enter your password',
    pleaseEnterName: 'Please enter your name',
    order: 'Order',
  },
  ru: {
    // Common
    language: 'Язык',
    english: 'Английский',
    russian: 'Русский',
    
    // Navigation
    home: 'Главная',
    catalog: 'Каталог',
    cart: 'Корзина',
    account: 'Аккаунт',
    
    // Home
    furnitureStore: 'Мебельный Магазин',
    discoverFurniture: 'Откройте для себя красивую мебель для вашего дома',
    specialOffers: 'Специальные предложения',
    popularItems: 'Популярные товары',
    topRated: 'Лучшие по рейтингу',
    
    // Catalog
    filter: 'Фильтр',
    sort: 'Сортировка',
    priceRange: 'Диапазон цен',
    productType: 'Тип товара',
    minimumRating: 'Минимальный рейтинг',
    reset: 'Сбросить',
    applyFilters: 'Применить фильтры',
    sortBy: 'Сортировать по',
    priceLowToHigh: 'Цена: от низкой к высокой',
    priceHighToLow: 'Цена: от высокой к низкой',
    popularity: 'Популярность',
    rating: 'Рейтинг',
    apply: 'Применить',
    noProductsFound: 'Товары не найдены',
    adjustFilters: 'Попробуйте изменить фильтры или поисковый запрос',
    clearFilters: 'Очистить фильтры',
    searchProducts: 'Поиск товаров...',
    
    // Product
    addToCart: 'Добавить в корзину',
    description: 'Описание',
    details: 'Детали',
    category: 'Категория',
    availability: 'Наличие',
    inStock: 'В наличии',
    outOfStock: 'Нет в наличии',
    addedToCart: 'добавлен в корзину',
    
    // Cart
    yourCartIsEmpty: 'Ваша корзина пуста',
    addProductsToCart: 'Добавьте товары в корзину, чтобы увидеть их здесь',
    continueShopping: 'Продолжить покупки',
    subtotal: 'Подытог',
    shipping: 'Доставка',
    free: 'Бесплатно',
    total: 'Итого',
    checkout: 'Оформить заказ',
    loginToCheckout: 'Войдите для оформления',
    orderPlacedSuccess: 'Заказ успешно размещен!',
    paymentFailed: 'Не удалось обработать платеж. Пожалуйста, попробуйте снова.',
    pleaseLogin: 'Пожалуйста, войдите, чтобы завершить покупку',
    
    // Account
    welcomeBack: 'С возвращением',
    createAccount: 'Создать аккаунт',
    signInAccess: 'Войдите, чтобы получить доступ к вашему аккаунту',
    fillDetails: 'Заполните данные, чтобы начать',
    name: 'Имя',
    yourName: 'Ваше имя',
    email: 'Email',
    emailPlaceholder: 'ваш.email@example.com',
    password: 'Пароль',
    yourPassword: 'Ваш пароль',
    confirmPassword: 'Подтвердите пароль',
    confirmYourPassword: 'Подтвердите ваш пароль',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    dontHaveAccount: "Нет аккаунта?",
    alreadyHaveAccount: "Уже есть аккаунт?",
    demoCredentials: 'Демо-данные: user@example.com / password',
    accountInformation: 'Информация об аккаунте',
    orderHistory: 'История заказов',
    items: 'товаров',
    logOut: 'Выйти',
    loggedOut: 'Вы вышли из системы',
    invalidCredentials: 'Неверный email или пароль',
    emailInUse: 'Email уже используется',
    passwordsNotMatch: 'Пароли не совпадают',
    pleaseEnterEmail: 'Пожалуйста, введите ваш email',
    pleaseEnterPassword: 'Пожалуйста, введите ваш пароль',
    pleaseEnterName: 'Пожалуйста, введите ваше имя',
    order: 'Заказ',
  }
};

export default translations;