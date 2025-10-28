# 🍰 Mi Dulce Felisa

## 📱 Descripción

**Mi Dulce Felisa** es una aplicación móvil de comercio electrónico especializada en pastelería artesanal. Permite a los usuarios explorar productos, agregar tortas al carrito de compras, gestionar pedidos y realizar compras de manera intuitiva y elegante.

## ✨ Características

- 🏠 **Página de inicio** con carrusel de imágenes y mapa de ubicación
- 🎂 **Catálogo de productos** con imágenes y descripciones detalladas
- 🛒 **Carrito de compras** con gestión de cantidades
- 👤 **Sistema de autenticación** con Firebase (Login/Registro)
- 📍 **Integración con mapas** para mostrar la ubicación del negocio
- 📱 **Diseño responsive** optimizado para dispositivos móviles
- 🎨 **Interfaz intuitiva** con navegación por pestañas

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React Native** - Framework para desarrollo móvil multiplataforma
- **TypeScript** - Superset tipado de JavaScript
- **Expo** - Plataforma para desarrollo rápido de aplicaciones React Native
- **Expo Router** - Sistema de enrutamiento basado en archivos

### Navegación
- **React Navigation** - Navegación entre pantallas
- **Bottom Tabs Navigator** - Navegación por pestañas inferiores
- **Stack Navigator** - Navegación apilada para pantallas detalladas

### Backend y Autenticación
- **Firebase Authentication** - Sistema de autenticación de usuarios
- **Firebase Firestore** - Base de datos NoSQL en tiempo real

### UI/UX
- **React Native Maps** - Integración de mapas interactivos
- **Ionicons** - Iconos vectoriales para la interfaz
- **React Native Gesture Handler** - Manejo de gestos táctiles

### Gestión de Estado
- **React Context API** - Gestión de estado global
  - `CartContext` - Manejo del carrito de compras
  - `AuthContext` - Manejo de autenticación de usuarios

## 📂 Estructura del Proyecto
```
Mi-Dulce-Felisa/
├── app/                         # Configuración de Expo Router
│   ├── _layout.tsx              # Layout principal con providers
│   └── index.tsx                # Punto de entrada de la aplicación
├── assets/                      # Recursos estáticos
│   └── images/                  # Imágenes de productos
├── components/                  # Componentes reutilizables
├── context/                     # Contextos de React
│   ├── AuthContext.tsx          # Contexto de autenticación
│   └── CartContext.tsx          # Contexto del carrito
├── navigation/                  # Configuración de navegación
│   └── AppNavigator.tsx         # Navegadores principales
├── screens/                     # Pantallas de la aplicación
│   ├── HomeScreen.tsx           # Pantalla de inicio
│   ├── ProductsScreen.tsx       # Catálogo de productos
│   ├── ProductDetailScreen.tsx  # Detalle del producto
│   ├── CartScreen.tsx           # Carrito de compras
│   ├── LoginScreen.tsx          # Inicio de sesión
│   ├── RegisterScreen.tsx       # Registro de usuarios
│   ├── ContactScreen.tsx        # Información de contacto
│   └── AboutScreen.tsx          # Acerca de nosotros
├── types/                       # Definiciones de TypeScript
│   └── index.ts                 # Tipos e interfaces
├── config/                      # Archivos de configuración
│   └── firebaseConfig.ts        # Configuración de Firebase
├── App.tsx                      # Componente raíz
├── package.json                 # Dependencias del proyecto
└── tsconfig.json                # Configuración de TypeScript
```

## 🚀 Instalación y Configuración

### Prerequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI
- Expo Go app (en tu dispositivo móvil)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/leontwas/Mi-Dulce-Felisa.git
cd Mi-Dulce-Felisa
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar Firebase**

Crea un archivo `config/firebaseConfig.ts` con tu configuración de Firebase:
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

4. **Iniciar el proyecto**
```bash
npx expo start
```

## 📱 Cómo Visualizar la Aplicación

### Opción 1: Expo Go (Recomendado para desarrollo)

1. Instala **Expo Go** en tu dispositivo móvil:
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Ejecuta el proyecto:
```bash
npx expo start
```

3. Escanea el código QR:
   - **iOS**: Abre la cámara y escanea el código QR
   - **Android**: Abre Expo Go y escanea el código QR

### Opción 2: Emulador Android
```bash
npx expo start --android
```

### Opción 3: Simulador iOS (solo macOS)
```bash
npx expo start --ios
```

### Opción 4: Navegador Web
```bash
npx expo start --web
```

## 🎯 Funcionalidades Principales

### 1. Navegación
- **Home**: Carrusel de imágenes y mapa de ubicación
- **Productos**: Catálogo completo de tortas disponibles
- **Contacto**: Información de contacto del negocio
- **Quiénes Somos**: Historia y descripción del negocio
- **Carrito**: Gestión del carrito de compras

### 2. Gestión de Productos
- Visualización de productos con imagen y precio
- Vista detallada con descripción completa
- Agregar productos al carrito desde múltiples pantallas
- Notificación al agregar productos

### 3. Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades (+/-)
- Cálculo automático del total
- Vaciar carrito completo
- Persistencia del carrito en la sesión

### 4. Autenticación
- Registro de nuevos usuarios
- Inicio de sesión
- Recuperación de contraseña
- Protección de rutas (checkout requiere login)

## 🔑 Variables de Entorno

Asegúrate de configurar las siguientes variables en tu proyecto Firebase:

- `apiKey`: Clave API de Firebase
- `authDomain`: Dominio de autenticación
- `projectId`: ID del proyecto
- `storageBucket`: Bucket de almacenamiento
- `messagingSenderId`: ID del remitente de mensajes
- `appId`: ID de la aplicación

## 📦 Dependencias Principales
```json
{
  "@react-navigation/bottom-tabs": "^6.x",
  "@react-navigation/native": "^6.x",
  "@react-navigation/stack": "^6.x",
  "expo": "~51.x",
  "expo-router": "~3.x",
  "firebase": "^10.x",
  "react": "18.x",
  "react-native": "0.74.x",
  "react-native-maps": "1.x",
  "typescript": "~5.3.x"
}
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Leonardo Daniel Lipiejko** - [leontwas](https://github.com/leontwas)

## 🔗 Enlaces

- **Repositorio**: [https://github.com/leontwas/Mi-Dulce-Felisa.git](https://github.com/leontwas/Mi-Dulce-Felisa.git)
- **Reportar Issues**: [https://github.com/leontwas/Mi-Dulce-Felisa/issues](https://github.com/leontwas/Mi-Dulce-Felisa/issues)


