

Para que no quede ninguna duda y cada carpeta tenga su razón de ser operativa y de negocio, vamos a desglosar a detalle el **Árbol de Directorios `src/**`, explicando su **propósito, flujo y proceso** interno. Esto te servirá como un mapa técnico exacto para tu bóveda y para guiar a Antigravity paso a paso.

---

# Desglose Detallado de Directorios y Procesos (`src/`)

## 1. Grupo de Rutas Públicas: `src/app/(shop)/`

Este grupo maneja toda la cara visible del e-commerce al estilo Homidori, permitiendo al usuario navegar, explorar y comprar de forma intuitiva.

* **`page.tsx` (Home)**
* **Concepto:** Portada principal de la tienda.
* **Proceso / Flujo:** Renderiza el `HeroBanner` principal y el componente de categorías visuales con imágenes. Al hacer clic en una categoría visual, redirige al catálogo aplicando el filtro correspondiente.


* **`products/page.tsx` (Catálogo)**
* **Concepto:** Listado general de figuras y mercancía de anime.
* **Proceso / Flujo:** Permite filtrar productos en tiempo real por franquicia/anime, marca, escala y estado (*Stock* o *Preventa*).


* **`products/[id]/` (Detalle de Producto)**
* **Concepto:** Página independiente para cada artículo coleccionable.
* **Proceso / Flujo:** Muestra la galería de imágenes múltiples, precio, descripción detallada, especificaciones técnicas y la sección de **reseñas de usuarios** vinculadas a sus perfiles.


* **`cart/` (Carrito de Compras)**
* **Concepto:** Resumen temporal de los productos seleccionados.
* **Proceso / Flujo:** Utiliza Zustand para calcular subtotales, verificar stock disponible y permitir modificar cantidades antes de pasar al pago.


* **`checkout/` (Pasarela de Pago Dual)**
* **Concepto:** Pantalla final de transacción donde el cliente elige cómo pagar y cómo recibir su pedido.
* **Proceso / Flujo:**
1. El usuario selecciona el **tipo de envío** (*Presencial, Shalom o Motorizado*), lo que genera un enlace automático para coordinar por WhatsApp.
2. El usuario elige el **método de pago**: o bien es redirigido a *Mercado Pago*, o selecciona *Pago Manual / POS*. Si elige este último, visualiza la **plantilla con el código QR de la billetera digital del admin**, ingresa su número de operación y **sube la captura del comprobante (`PaymentProof`)**.




* **`orders/` e `orders/[id]/` (Historial y Boletas)**
* **Concepto:** Zona privada del comprador.
* **Proceso / Flujo:** Muestra el listado de compras con sus respectivos códigos de proceso únicos (`processCode`). Una vez que el pago es aprobado, se habilita el botón de **descarga de la boleta virtual en PDF**.



---

## 2. Grupo de Rutas Privadas: `src/app/(admin-panel)/admin/`

Panel de control exclusivo para administradores, protegido por roles (Backoffice con módulo POS híbrido).

* **`dashboard/`**
* **Concepto:** Centro de control financiero y operativo.
* **Proceso / Flujo:** Muestra métricas generales de ventas, órdenes pendientes y accesos rápidos a la gestión de la tienda.


* **`products/`**
* **Concepto:** CRUD (Crear, Leer, Actualizar, Borrar) de mercancía.
* **Proceso / Flujo:** Permite al admin dar de alta nuevas figuras, actualizar precios, cambiar estados a preventa y asignar imágenes a los botones de categorías visuales.


* **`orders/`**
* **Concepto:** Control logístico global.
* **Proceso / Flujo:** Permite ver el estado de todas las órdenes de la tienda y su método de envío asociado.


* **`manual-payments/` (Bandeja POS)**
* **Concepto:** Módulo antifraude y de control de caja para pagos manuales.
* **Proceso / Flujo:** El operador visualiza en tiempo real los comprobantes subidos por los clientes (la captura y el número de operación). Al verificar el dinero en la cuenta de la tienda, hace clic en **Aprobar** (lo que libera la orden y genera el PDF de la boleta) o **Rechazar**.



---

## 3. Endpoints del Backend: `src/app/api/`

Capta las peticiones del cliente y ejecuta la lógica del servidor de forma segura.

* **`orders/`**: Procesa la creación atómica de órdenes de compra en la base de datos.
* **`payments/mercadopago/`**: Genera las preferencias de pago conectándose con el SDK oficial.
* **`proofs/`**: Recibe y procesa la subida segura de las capturas de pago manual, enlazándolas al registro `PaymentProof`.
* **`products/`**: Administra las peticiones de consulta y mutación del catálogo.
* **`webhook/mercadopago/`**: Recibe notificaciones asíncronas de Mercado Pago para acreditar pagos de forma instantánea y actualizar el stock sin intervención humana.

---

## 4. Componentes UI: `src/components/`

Modulariza la interfaz gráfica para mantener el código limpio y reutilizable.

* **`admin/`**: Tablas de gestión, modales de control y validadores de la bandeja POS.
* **`common/`**: Elementos genéricos como botones con protección anti-doble clic, loaders y alertas.
* **`home/`**: Componentes específicos de la portada, destacando el `CategoryGrid` con imágenes al estilo Homidori.
* **`layout/`**: Barras de navegación con accesos rápidos y pie de página.
* **`products/`**: Tarjetas de producto (`ProductCard`), galerías interactivas de imágenes y el renderizado del sistema de reseñas.

---

## 5. Utilidades y Librerías: `src/lib/`

* **`db.ts`**: Instancia centralizada de Prisma Client conectada a PostgreSQL para consultas tipadas y seguras contra SQL Injection.
* **`mercadopago.ts`**: Inicializador del SDK de pagos.
* **`storage.ts`**: Servicio encargado de subir avatares, fotos de productos y vouchers a la nube.
* **`transformers.ts`**: Funciones de mapeo para transformar datos crudos de la base de datos a formatos legibles por el frontend.

---

## 6. Estado Global: `src/stores/`

* **`cart-store.ts`**: Gestiona el almacenamiento reactivo del carrito de compras en el cliente.
* **`ui-store.ts`**: Controla estados temporales como la apertura de modales, menús flotantes y filtros activos.