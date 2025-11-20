# Configuración de Firebase en Mi Dulce Felisa

Esta guía detalla paso a paso cómo se configuró Firebase en la aplicación Mi Dulce Felisa, incluyendo Firebase Authentication y Firestore Database.

---

##  Índice

1. [Instalación de Firebase en el Proyecto](#1-instalación-de-firebase-en-el-proyecto)
2. [Creación del Proyecto en Firebase Console](#2-creación-del-proyecto-en-firebase-console)
3. [Obtención de las Credenciales de Firebase](#3-obtención-de-las-credenciales-de-firebase)
4. [Configuración en el Código](#4-configuración-en-el-código)
5. [Configuración de Firestore Database](#5-configuración-de-firestore-database)
6. [Reglas de Seguridad de Firestore](#6-reglas-de-seguridad-de-firestore)
7. [Estructura de Colecciones](#7-estructura-de-colecciones)
8. [Verificación del Funcionamiento](#8-verificación-del-funcionamiento)

---

## 1. Instalación de Firebase en el Proyecto

### Paso 1.1: Instalar las dependencias de Firebase

En la terminal, dentro del directorio del proyecto, ejecuta:

```bash
npm install firebase
```

### Paso 1.2: Instalar dependencias de React Native

Para que Firebase funcione correctamente con React Native y Expo, también necesitas:

```bash
npm install @react-native-async-storage/async-storage
```

### Paso 1.3: Verificar la instalación

Verifica que las dependencias se hayan agregado correctamente en `package.json`:

```json
{
  "dependencies": {
    "firebase": "^12.6.0",
    "@react-native-async-storage/async-storage": "2.2.0"
  }
}
```

---

## 2. Creación del Proyecto en Firebase Console

### Paso 2.1: Acceder a Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Agregar proyecto"** o **"Add project"**

### Paso 2.2: Configurar el proyecto

1. **Nombre del proyecto**: Ingresa `midulcefelisa`
2. **Google Analytics**:
   - Puedes habilitarlo o deshabilitarlo (opcional)
   - Si lo habilitas, selecciona una cuenta de Analytics o crea una nueva
3. Haz clic en **"Crear proyecto"**
4. Espera a que Firebase configure tu proyecto (puede tomar unos segundos)

### Paso 2.3: Habilitar Firebase Authentication

1. En el menú lateral izquierdo, ve a **"Build"** → **"Authentication"**
2. Haz clic en **"Get started"** o **"Comenzar"**
3. En la pestaña **"Sign-in method"** o **"Método de acceso"**:
   - Haz clic en **"Email/Password"**
   - Habilita la opción **"Email/Password"**
   - **NO** habilites "Email link (passwordless sign-in)"
   - Haz clic en **"Guardar"** o **"Save"**

### Paso 2.4: Habilitar Firestore Database

1. En el menú lateral izquierdo, ve a **"Build"** → **"Firestore Database"**
2. Haz clic en **"Create database"** o **"Crear base de datos"**
3. Selecciona el modo:
   - **Modo de producción** (Production mode)
   - Las reglas de seguridad se configurarán después
4. Selecciona la ubicación del servidor:
   - Recomendado: **`southamerica-east1` (São Paulo)** para mejor rendimiento en Argentina
   - O elige **`us-central`** si prefieres servidores en EE.UU.
5. Haz clic en **"Habilitar"** o **"Enable"**

---

## 3. Obtención de las Credenciales de Firebase

### Paso 3.1: Registrar una aplicación web

1. En la página principal de tu proyecto en Firebase Console
2. Haz clic en el ícono **"</>"** (Web) para agregar una aplicación web
3. Ingresa un nombre para la app: `Mi Dulce Felisa Web`
4. **NO** marques "Firebase Hosting"
5. Haz clic en **"Registrar app"** o **"Register app"**

### Paso 3.2: Copiar las credenciales

Firebase te mostrará un código de configuración similar a este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAoWmYiI4UlZsyyElRHQbT-vMHPbEBzbZs",
  authDomain: "midulcefelisa-8a76f.firebaseapp.com",
  projectId: "midulcefelisa-8a76f",
  storageBucket: "midulcefelisa-8a76f.firebasestorage.app",
  messagingSenderId: "196874288667",
  appId: "1:196874288667:web:d734b3c3b132ddb32682be",
  measurementId: "G-J9BZ6EZMLR"
};
```

** IMPORTANTE**: Guarda estas credenciales en un lugar seguro. Las necesitarás en el siguiente paso.

---

## 4. Configuración en el Código

### Paso 4.1: Crear el archivo de configuración

Crea el archivo `config/firebaseConfig.ts` con el siguiente contenido:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
// @ts-ignore - getReactNativePersistence existe en React Native bundle
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "TU_AUTH_DOMAIN_AQUI",
  projectId: "TU_PROJECT_ID_AQUI",
  storageBucket: "TU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "TU_MESSAGING_SENDER_ID_AQUI",
  appId: "TU_APP_ID_AQUI",
  measurementId: "TU_MEASUREMENT_ID_AQUI"
};

console.log(' Inicializando Firebase...');
const app = initializeApp(firebaseConfig);
console.log('Firebase app inicializada');

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
console.log('Firebase Auth inicializada');

const db = getFirestore(app);
console.log('Firestore inicializada');

export { app, auth, db };
```

**Reemplaza** los valores `TU_API_KEY_AQUI`, etc., con las credenciales que copiaste en el Paso 3.2.

### Paso 4.2: Estructura del proyecto

Tu proyecto debería tener esta estructura:

```
Mi-Dulce-Felisa/
├── config/
│   └── firebaseConfig.ts
├── context/
│   └── AuthContext.tsx
├── screens/
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   └── CartScreen.tsx
└── types/
    └── index.ts
```

---

## 5. Configuración de Firestore Database

### Paso 5.1: Acceder a Firestore Rules

1. Ve a **Firebase Console** → Tu proyecto
2. En el menú lateral: **"Firestore Database"**
3. Haz clic en la pestaña **"Reglas"** o **"Rules"**

### Paso 5.2: Verificar las reglas iniciales

Las reglas por defecto en modo producción son:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**Estas reglas bloquean TODO el acceso.** Necesitas actualizarlas.

---

## 6. Reglas de Seguridad de Firestore

### Paso 6.1: Reglas de Seguridad Completas

Reemplaza las reglas por defecto con las siguientes:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Regla para la colección de usuarios
    match /users/{userId} {
      // Permitir crear un documento solo si el usuario está autenticado
      // y el ID del documento coincide con el ID del usuario autenticado
      allow create: if request.auth != null && request.auth.uid == userId;

      // Permitir leer y actualizar solo si el usuario autenticado
      // es el dueño del documento
      allow read, update: if request.auth != null && request.auth.uid == userId;

      // NO permitir eliminar usuarios
      allow delete: if false;
    }

    // Regla para la colección de órdenes
    match /orders/{orderId} {
      // Permitir crear órdenes solo si el usuario está autenticado
      allow create: if request.auth != null;

      // Permitir leer órdenes solo si el usuario autenticado
      // es el dueño de la orden
      allow read: if request.auth != null &&
                     request.auth.uid == resource.data.userId;

      // NO permitir actualizar o eliminar órdenes
      allow update, delete: if false;
    }
  }
}
```

### Paso 6.2: Publicar las reglas

1. En Firebase Console, pega las reglas en el editor
2. Haz clic en **"Publicar"** o **"Publish"**
3. Confirma la publicación

### Paso 6.3: Explicación de las reglas

#### **Colección `users`**

- **Create**: Solo usuarios autenticados pueden crear su propio documento (el `userId` debe coincidir con `auth.uid`)
- **Read/Update**: Solo el dueño del documento puede leer o actualizar su información
- **Delete**: Nadie puede eliminar usuarios (ni siquiera el propio usuario)

#### **Colección `orders`**

- **Create**: Cualquier usuario autenticado puede crear órdenes
- **Read**: Solo el usuario que creó la orden puede leerla (verificando `userId` en el documento)
- **Update/Delete**: Las órdenes no se pueden modificar ni eliminar una vez creadas

---

## 7. Estructura de Colecciones

Firebase Firestore crea las colecciones automáticamente cuando se guarda el primer documento. No necesitas crearlas manualmente.

### 7.1: Colección `users`

**Ruta**: `users/{userId}`

**Estructura de documento**:

```javascript
{
  name: "Juan Pérez",
  email: "juan@example.com",
  phone: "1122334455",           // opcional
  address: "Calle Falsa 123",    // opcional
  createdAt: Timestamp           // fecha de creación
}
```

**Código que crea el documento** (en `AuthContext.tsx`):

```typescript
await setDoc(doc(db, 'users', firebaseUser.uid), {
  name,
  email: firebaseUser.email,
  phone: phone || null,
  address: address || null,
  createdAt: new Date()
});
```

**Cuándo se crea**: Automáticamente al registrar un nuevo usuario.

---

### 7.2: Colección `orders`

**Ruta**: `orders/{orderId}`

**Estructura de documento**:

```javascript
{
  userId: "abc123xyz",              // ID del usuario que hizo la orden
  userName: "Juan Pérez",           // Nombre del usuario
  userEmail: "juan@example.com",    // Email del usuario
  items: [                          // Array de productos
    {
      id: "1",
      name: "Torta de Chocolate",
      price: 5000,
      quantity: 1,
      description: "Torta deliciosa"
    }
  ],
  total: 5000,                      // Total de la orden
  status: "pending",                // Estado: pending, completed, cancelled
  paymentMethod: "MercadoPago",     // Método de pago
  createdAt: Timestamp              // Fecha de creación
}
```

**Código que crea el documento** (en `CartScreen.tsx`):

```typescript
const orderData: Order = {
  userId: user?.id || 'unknown',
  userName: user?.name || 'Usuario',
  userEmail: user?.email || '',
  items: itemsForFirebase as any,
  total: total,
  status: 'pending',
  paymentMethod: 'MercadoPago',
  createdAt: new Date(),
};

const docRef = await addDoc(collection(db, 'orders'), orderData);
```

**Cuándo se crea**: Cuando un usuario finaliza una compra en el carrito.

---

## 8. Verificación del Funcionamiento

### 8.1: Verificar Authentication

1. Registra un usuario desde la app
2. Ve a **Firebase Console** → **Authentication** → **Users**
3. Deberías ver el usuario creado con su email

### 8.2: Verificar colección `users`

1. Ve a **Firebase Console** → **Firestore Database** → **Data**
2. Deberías ver la colección **`users`** con documentos
3. Cada documento tiene como ID el `userId` del usuario
4. Haz clic en un documento para ver sus datos (name, email, phone, address, createdAt)

### 8.3: Verificar colección `orders`

1. Realiza una compra desde la app
2. Ve a **Firebase Console** → **Firestore Database** → **Data**
3. Deberías ver la colección **`orders`** con documentos
4. Cada documento contiene:
   - `userId`: Coincide con el ID del usuario que compró
   - `items`: Array con los productos comprados
   - `total`: Monto total
   - `status`: "pending"
   - `createdAt`: Timestamp de la orden

### 8.4: Probar las reglas de seguridad

**Debería funcionar**:
- Registrar un nuevo usuario
- Iniciar sesión con email/password
- Crear una orden después de iniciar sesión
- Ver tus propias órdenes

**Debería fallar**:
- Crear órdenes sin estar autenticado
- Leer órdenes de otros usuarios
- Modificar o eliminar órdenes existentes
- Eliminar usuarios de Firestore

---

## Resumen

Has configurado exitosamente:

**Firebase Authentication** para registro e inicio de sesión con email/password
**Firestore Database** para almacenar usuarios y órdenes
**Reglas de seguridad** que protegen los datos de los usuarios
**Persistencia local** con AsyncStorage para mantener la sesión activa
**Colecciones automáticas** que se crean al guardar el primer documento

---

## Recursos Adicionales

- [Documentación oficial de Firebase](https://firebase.google.com/docs)
- [Firebase Authentication para React Native](https://rnfirebase.io/auth/usage)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Console](https://console.firebase.google.com/)

---

## Notas Importantes

1. **Credenciales**: Las credenciales de Firebase están en `config/firebaseConfig.ts`. NO las subas a un repositorio público.

2. **Reglas de Seguridad**: Las reglas actuales son seguras para producción. NO las modifiques sin entender las implicaciones.

3. **Colecciones**: Las colecciones `users` y `orders` se crean automáticamente. NO necesitas crearlas manualmente.

4. **Persistencia**: La sesión del usuario persiste gracias a AsyncStorage, por lo que el usuario no necesita iniciar sesión cada vez que abre la app.

5. **Notificaciones**: Cada orden enviada también dispara un email al vendedor vía Formspree con los detalles de la compra.

---

**Fecha de creación**: 2025-01-20
**Proyecto**: Mi Dulce Felisa
**Firebase Project ID**: midulcefelisa-8a76f
