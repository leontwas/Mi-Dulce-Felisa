# Configuración de MercadoPago - Mi Dulce Felisa

## Integración Completada

Se ha implementado la integración de MercadoPago mediante **Link de Cobro Personalizado**. Esta opción es perfecta porque:
- No requiere inscripción en AFIP
- No requiere monotributo
- Solo necesitas una cuenta personal de MercadoPago
- Cobras directo a tu cuenta de MercadoPago

---

## Configuración Actual

### Link de Cobro Configurado

**Link:** `https://link.mercadopago.com.ar/midulcefelisa`

Este link está configurado en el archivo `screens/CartScreen.tsx` (línea 132)

### ¿Cómo se Creó este Link?

1. Se abrió la **app de MercadoPago**
2. Se fue a **"Cobrar con link de pago"** → **"Link sin monto definido"**
3. Se creó un link personalizado para el negocio "Mi Dulce Felisa"
4. Se configuró sin monto fijo (los clientes ingresan el monto manualmente)

### Si Necesitas Cambiar el Link

1. Abre el archivo: `screens/CartScreen.tsx`
2. Busca la línea 132 que dice:
   ```typescript
   const mercadopagoUrl = 'https://link.mercadopago.com.ar/midulcefelisa';
   ```
3. Reemplaza con tu nuevo link de cobro de MercadoPago
4. **Guarda el archivo**

### 3. Probar el Flujo de Pago

1. **Ejecuta la app**: `npx expo start`
2. **Logueate con tu mail y contraseña**
3. **Agrega productos al carrito**
4. **Ve al Carrito**
5. **Click en "Pagar con MercadoPago"**
6. **Serás redirigido a MercadoPago** donde podrás pagar
7. **Después de pagar**, la orden quedará registrada en Firebase

---

## Cómo Funciona el Flujo

```
Usuario agrega productos
         ↓
Click en "Pagar con MercadoPago"
         ↓
Se crea orden en Firebase (estado: pending)
         ↓
Se abre link de cobro de MercadoPago
         ↓
Usuario ingresa manualmente:
  - Monto total (mostrado en el mensaje)
  - Completa el pago
         ↓
Usuario paga en MercadoPago
         ↓
Dinero llega a tu cuenta de MercadoPago
         ↓
Usuario vuelve a la app
         ↓
Carrito se vacía automáticamente
```

---

## Ver las Órdenes en Firebase

Todas las órdenes se guardan en Firebase Firestore en la colección `orders`.

### Ver órdenes en Firebase Console:

1. Ve a https://console.firebase.google.com
2. Selecciona tu proyecto: **midulcefelisa**
3. Menú lateral → **Firestore Database**
4. Verás la colección **orders** con todas las compras

### Estructura de cada orden:

```javascript
{
  id: "abc123...",           // ID único
  userId: "user123",         // ID del usuario
  userName: "Juan Pérez",    // Nombre del cliente
  userEmail: "juan@email.com", // Email del cliente
  items: [                   // Productos comprados
    {
      id: "1",
      name: "Torta de Frutilla",
      price: 5000,
      quantity: 2,
      image: ...
    }
  ],
  total: 10000,              // Total en pesos
  status: "pending",         // pending | paid | cancelled
  paymentMethod: "MercadoPago",
  createdAt: "2025-11-14T00:00:00Z"
}
```

---

## Recibir los Pagos

### Opciones para retirar el dinero:

1. **Transferencia a tu banco** (gratis en la mayoría de bancos)
2. **Tarjeta de débito MercadoPago** (física o virtual)
3. **Usar directamente desde MercadoPago** para pagar servicios

### Comisiones de MercadoPago:

- **Cuenta Persona**: 6,29% por transacción
- **Sin costo de inscripción**
- **Sin costo mensual**

---

## Limitaciones de esta Versión (Link Manual)

### Lo que NO hace automáticamente:

1. **No actualiza el estado a "paid"** después del pago
   - Debes marcar manualmente las órdenes como pagadas
   - Solución futura: Webhooks de MercadoPago

2. **No envía email de confirmación**
   - Puedes implementarlo con Firebase Functions

3. **No valida que el pago se completó**
   - Confía en que el usuario pague
   - Solución: Revisar en tu cuenta de MercadoPago

### Lo que SÍ hace:

1. Guarda la orden en Firebase
2. Registra todos los productos
3. Guarda datos del cliente
4. Abre MercadoPago para pagar
5. Limpia el carrito después de iniciar el pago

---

## Mejoras Futuras Recomendadas

### Corto Plazo (1-2 semanas):

1. **Panel de Administrador**
   - Ver todas las órdenes
   - Marcar órdenes como "paid" manualmente
   - Ver estadísticas de ventas

2. **Notificaciones por Email**
   - Email al cliente con resumen de orden
   - Email a ti cuando hay una nueva orden

### Mediano Plazo (1 mes):

1. **Webhooks de MercadoPago**
   - Actualización automática del estado de pago
   - Requiere backend (Firebase Functions)

2. **Historial de Compras**
   - Los usuarios pueden ver sus pedidos anteriores
   - Estado de cada pedido (pending, paid, enviado)

### Largo Plazo (2-3 meses):

1. **MercadoPago Checkout Pro**
   - Integración nativa más profesional
   - Mejor experiencia de usuario
   - Requiere backend

---

## Instrucciones para el Usuario

Cuando tus clientes usen la app, verán:

1. **Botón "Pagar con MercadoPago"** en el carrito
2. **Alert con el total** a pagar
3. **Redirección a MercadoPago** (app o web)
4. **Pantalla de pago de MercadoPago** donde pueden:
   - Pagar con saldo de MercadoPago
   - Pagar con tarjeta de débito
   - Pagar con tarjeta de crédito
   - Usar Mercado Crédito
5. **Confirmación de pago** en MercadoPago
6. **Volver a la app** y el carrito estará vacío

---

## Solución de Problemas

### Problema: "No se puede abrir el link"

**Solución:**
- Verifica que el link esté escrito correctamente en CartScreen.tsx
- Prueba abrir manualmente: `https://link.mercadopago.com.ar/midulcefelisa`
- Si el link cambió, actualízalo en el código

### Problema: "El pago no se refleja"

**Recuerda:** Esta versión no actualiza automáticamente el estado.
- Ve a Firebase Console → Firestore → orders
- Busca la orden por ID o fecha
- Verifica en tu cuenta de MercadoPago si recibiste el pago
- Marca manualmente como pagada si es necesario

### Problema: "Los clientes no saben si pagaron"

**Solución temporal:**
- Comunícate por WhatsApp/email
- Envía confirmación manual
- **Próxima versión:** Emails automáticos

---

## Contacto y Soporte

Si tienes dudas sobre:
- Configuración de MercadoPago
- Problemas con la integración
- Mejoras o nuevas funcionalidades

Puedes contactar al desarrollador o consultar:
- **Documentación MercadoPago**: https://www.mercadopago.com.ar/developers
- **Soporte MercadoPago**: Chat en la app

---

## Checklist de Configuración

Antes de usar en producción, verifica:

- [x] Link de MercadoPago configurado en CartScreen.tsx (línea 132)
- [x] Firebase configurado correctamente
- [x] App probada con una compra de prueba
- [x] Verificado que la orden se guarda en Firebase
- [x] Verificado que el link abre MercadoPago correctamente
- [x] Probado el flujo completo de principio a fin

**Estado actual:** Todo configurado y funcionando

---

## ¡Listo para Vender!

Una vez configurado el alias, tu app estará lista para recibir pagos reales.

**Recuerda:**
- No necesitas AFIP ni monotributo para empezar
- MercadoPago se encarga de la seguridad
- Tus clientes confían en la marca MercadoPago
- Puedes empezar a vender HOY mismo
 
