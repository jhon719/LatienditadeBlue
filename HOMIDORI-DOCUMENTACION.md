# 📱 DOCUMENTACIÓN COMPLETA - HOMIDORI ECOMMERCE

**Versión:** 2.0  
**Tipo de Negocio:** E-commerce de Figuras Anime + Sistema POS + Gestión Inventario  
**Stack:** PHP/MySQL (Backend) + HTML/CSS/JavaScript (Frontend) + WordPress/WooCommerce (Base)  
**Ubicación:** Lima, Perú

---

## 📑 TABLA DE CONTENIDOS

1. [Visión General del Proyecto](#visión-general)
2. [Estructura de Navegación](#estructura-navegación)
3. [Módulos del Sistema](#módulos-sistema)
4. [Procesos Clave](#procesos-clave)
5. [Base de Datos](#base-datos)
6. [Flujos de Usuario](#flujos-usuario)
7. [Características Específicas](#características)
8. [Sistema de Pagos](#sistema-pagos)
9. [Gestión de Inventario](#gestión-inventario)
10. [Integraciones](#integraciones)

---

## 🎯 VISIÓN GENERAL {#visión-general}

### Propósito Principal
Plataforma de venta de figuras anime, peluches y merchandise con:
- **Tienda Online 24/7** con catálogo de productos
- **Sistema POS** para ventas en tienda física
- **Panel de Administración** para gestión total
- **Gestión de Inventario** en tiempo real
- **Múltiples canales de pago** (Yape, transferencias, tarjetas)
- **Atención al cliente** vía WhatsApp integrado

### Características Principales
- ✅ Catalogo de ~8000+ productos (Figuras, Peluches, Mangas, Merch)
- ✅ 3 categorías principales + subcategorías
- ✅ 4 clasificaciones de estado (Online, Stock, Preventa, Agotado)
- ✅ Búsqueda por series, marcas, precios
- ✅ Carrito de compras + Wishlist
- ✅ Sistema de órdenes
- ✅ Historial de compras
- ✅ Calificaciones y reseñas

---

## 📊 ESTRUCTURA DE NAVEGACIÓN {#estructura-navegación}

### Navegación Principal (Header)

```
┌─────────────────────────────────────────────────────────────┐
│  🎌 HOMIDORI  │ Artículos │ Figuras ▼ │ Peluches ▼ │ ... │
│                                                      🔍 ❤️ 🛒 │
└─────────────────────────────────────────────────────────────┘
```

#### Menú Principal (6 secciones)

1. **『Artículos Recientes』**
   - Vista de todos los productos nuevos
   - Filtros: Recientes, Populares, Ofertas
   - Ordenamiento: Precio, Calificación, Fecha

2. **Figuras** (Categoría Principal)
   - Subcategorías:
     - Online (Stock disponible inmediato)
     - Stock (Disponible en almacén)
     - Preventa (Reserva con fecha de llegada)
   - Series relacionadas: Jujutsu Kaisen, My Hero Academia, etc.
   - Marcas: Nendoroid, Good Smile Company, Banpresto, Furyu, Taito, Sega

3. **Peluches** (Categoría Principal)
   - Subcategorías:
     - Online
     - Stock
     - Preventa
   - Tamaños: Mini, Pequeño, Mediano, Grande
   - Materiales: Peluche, Tela, Algodón

4. **Mangas y Revistas** (Categoría Principal)
   - Géneros: Shounen, Shoujo, Seinen, Josei
   - Idioma: Japonés, Español
   - Formato: Tankoubon, Bunkobon, Light Novel

5. **Merch Varios** (Categoría Principal)
   - Accesorios, T-shirts, Mochilas, Tazas, Llaveros
   - Ropa y equipamiento
   - Coleccionables

6. **FAQ** (Información)
   - Preguntas frecuentes sobre compra
   - Política de devoluciones
   - Métodos de envío
   - Formas de pago

### Navegación Secundaria

```
┌─ CUENTA
   ├─ Mi Perfil
   ├─ Mis Compras
   ├─ Mis Favoritos
   ├─ Dirección de Envío
   ├─ Métodos de Pago
   └─ Cerrar Sesión

┌─ SOPORTE
   ├─ Contacto
   ├─ Chat en Vivo
   ├─ WhatsApp (942 346 281)
   ├─ Discord
   └─ Redes Sociales
```

---

## 🏗️ MÓDULOS DEL SISTEMA {#módulos-sistema}

### 1. MÓDULO FRONTEND (Tienda Pública)

#### Secciones de la Homepage

```
Header + Promo Banner
    ↓
Navigation Bar (Sticky)
    ↓
Hero Section (Promoción Principal)
    ↓
Tendencias (Trending Tags)
    ├─ Jujutsu Kaisen
    ├─ Sousou no Frieren
    ├─ Overlord
    └─ Bishoujo
    ↓
Productos Destacados (3 secciones)
    ├─ Nuevo en Figura Stock (6 productos)
    ├─ Nuevo en Figura Online (6 productos)
    └─ Nuevo en Figura Pre-venta (6 productos)
    ↓
Homidori Originals (Productos propios)
    ↓
Features (4 beneficios)
    ├─ 🚚 Envío a todo Perú (S/ 9+)
    ├─ 🎁 Ofertas todos los días
    ├─ 💬 Atención 24/7 WhatsApp
    └─ 🔒 Pagos seguros
    ↓
Marcas/Líneas (6 marcas principales)
    ├─ Furyu
    ├─ Banpresto
    ├─ Taito
    ├─ Sega
    ├─ Good Smile Company
    └─ Q Posket
    ↓
Series Anime Populares (6+ series)
    ├─ Re:Zero
    ├─ My Hero Academia
    ├─ The Quintessential Quintuplets
    ├─ One Piece
    ├─ Jujutsu Kaisen
    └─ Overlord
    ↓
Reseñas de Clientes (8 items)
    ↓
Newsletter / Suscripción
    ↓
Footer (Información + Links)
```

#### Componentes Principales

**Card de Producto**
```
┌─────────────────────┐
│  [Imagen Producto]  │
│  ┌─ Badge Status  ┐ │
│  Stock/Online     │ │
│  └────────────────┘ │
│                     │
│  [Categoría]        │
│  Título Producto    │
│                     │
│  S/ 179 (Precio)    │
│                     │
│  [Agregar] [❤️]     │
└─────────────────────┘
```

**Badge Estados:**
- 🟢 Stock (Verde oscuro)
- 🔵 Online (Azul)
- 🟠 Preventa (Naranja)
- ⚫ Agotado (Gris)

### 2. MÓDULO CATÁLOGO Y BÚSQUEDA

**Estructura de Categorías**

```
Categoría Padre
├─ Subcategoría 1
│  └─ Clasificación
│     ├─ Online
│     ├─ Stock
│     └─ Preventa
├─ Subcategoría 2
└─ Subcategoría 3
```

**Ejemplo: Figuras**
```
FIGURAS
├─ Por Tipo
│  ├─ Nendoroid
│  ├─ Ichiban Kuji
│  ├─ PalVerse
│  └─ Otros
├─ Por Estado
│  ├─ Online
│  ├─ Stock
│  └─ Preventa
├─ Por Precio
│  ├─ S/ 0 - S/ 100
│  ├─ S/ 100 - S/ 250
│  ├─ S/ 250 - S/ 500
│  └─ S/ 500+
└─ Por Serie
   ├─ Jujutsu Kaisen
   ├─ My Hero Academia
   ├─ Uma Musume
   └─ Otros...
```

### 3. MÓDULO CARRITO Y CHECKOUT

**Flujo de Compra**

```
1. Agregar Producto
   ├─ Seleccionar cantidad
   └─ Agregar al carrito

2. Ver Carrito
   ├─ Revisar productos
   ├─ Cambiar cantidades
   ├─ Eliminar productos
   └─ Ver subtotal

3. Ir a Checkout
   ├─ Confirmar dirección de envío
   ├─ Seleccionar método de envío
   ├─ Aplicar cupones (si aplica)
   └─ Ver total con impuestos

4. Seleccionar Pago
   ├─ Yape (QR)
   ├─ Transferencia Bancaria
   ├─ Tarjeta de Crédito/Débito
   └─ Efectivo (Solo Tienda)

5. Confirmar Orden
   ├─ Número de orden generado
   ├─ Email de confirmación
   └─ Rastreo disponible
```

**Datos del Carrito**
- ID Producto
- Nombre
- Imagen
- Precio unitario
- Cantidad
- Subtotal
- Impuestos (IGV 18%)
- Total

### 4. MÓDULO CUENTA DE USUARIO

**Secciones de Mi Cuenta**

```
MÍ CUENTA
├─ Mi Perfil
│  ├─ Nombre completo
│  ├─ Email
│  ├─ Teléfono
│  └─ Foto de perfil
│
├─ Mis Compras
│  ├─ Historial de órdenes
│  ├─ Estado de envío
│  ├─ Detalles de producto
│  └─ Descargar factura
│
├─ Mis Favoritos
│  ├─ Productos guardados
│  └─ Crear listas
│
├─ Direcciones
│  ├─ Agregar dirección
│  ├─ Editar
│  └─ Establecer principal
│
├─ Métodos de Pago
│  ├─ Guardar tarjetas
│  └─ Billetera digital
│
└─ Preferencias
   ├─ Notificaciones
   ├─ Newsletter
   └─ Idioma
```

### 5. MÓDULO ADMIN/GESTIÓN

**Dashboard Principal**

```
PANEL ADMINISTRADOR
├─ 📊 Dashboard
│  ├─ Ventas del día/mes
│  ├─ Órdenes pendientes
│  ├─ Productos agotados
│  ├─ Clientes nuevos
│  └─ Gráficos de ventas
│
├─ 📦 Gestión de Productos
│  ├─ Agregar producto
│  ├─ Editar producto
│  ├─ Eliminar producto
│  ├─ Importar/Exportar
│  └─ Actualizar precios
│
├─ 📋 Categorías
│  ├─ Crear categoría
│  ├─ Editar categoría
│  ├─ Gestionar subcategorías
│  └─ Reordenar
│
├─ 🏭 Marcas/Líneas
│  ├─ Agregar marca
│  ├─ Editar marca
│  └─ Asignar a productos
│
├─ 📊 Inventario
│  ├─ Stock por producto
│  ├─ Historial de movimientos
│  ├─ Alertas de bajo stock
│  ├─ Ajustes de stock
│  └─ Transferencias
│
├─ 💰 Órdenes
│  ├─ Listar todas las órdenes
│  ├─ Ver detalles
│  ├─ Cambiar estado
│  ├─ Generar factura
│  └─ Reembolsos
│
├─ 👥 Clientes
│  ├─ Lista de clientes
│  ├─ Perfil del cliente
│  ├─ Historial de compras
│  └─ Mensajes
│
├─ 💳 Pagos
│  ├─ Transacciones
│  ├─ Métodos de pago
│  ├─ Reportes financieros
│  └─ Conciliación
│
├─ 📦 Envíos
│  ├─ Integración Motorizado
│  ├─ Integración Shalom
│  ├─ Generar etiquetas
│  ├─ Rastreo
│  └─ Retiros
│
├─ 🔧 Configuración
│  ├─ Datos de tienda
│  ├─ Métodos de envío
│  ├─ Métodos de pago
│  ├─ Impuestos
│  └─ Cupones/Ofertas
│
├─ 📈 Reportes
│  ├─ Ventas
│  ├─ Productos
│  ├─ Clientes
│  ├─ Ingresos
│  └─ Exportar datos
│
└─ ⚙️ Sistema
   ├─ Usuarios admin
   ├─ Permisos
   ├─ Logs
   └─ Respaldos
```

### 6. MÓDULO POS (PUNTO DE VENTA)

**Funciones POS para Tienda Física**

```
SISTEMA POS
├─ 🛒 Venta Rápida
│  ├─ Búsqueda de producto por SKU/Código
│  ├─ Agregar al carrito
│  ├─ Modificar cantidades
│  └─ Aplicar descuentos
│
├─ 💵 Métodos de Pago POS
│  ├─ Efectivo
│  ├─ Tarjeta (Integración)
│  ├─ Yape/Billetera Digital
│  └─ Vale
│
├─ 🧾 Comprobante
│  ├─ Factura
│  ├─ Boleta
│  ├─ Nota de Crédito
│  └─ Imprimir/Email
│
├─ 📊 Cierre de Caja
│  ├─ Registro de montos
│  ├─ Diferencias
│  ├─ Reporte diario
│  └─ Histórico
│
└─ 📈 Reportes POS
   ├─ Ventas por hora
   ├─ Productos más vendidos
   ├─ Performance vendedor
   └─ Devoluciones
```

---

## 🔄 PROCESOS CLAVE {#procesos-clave}

### PROCESO 1: COMPRA ONLINE

**Paso 1: Navegación y Búsqueda**
- Usuario accede al sitio
- Navega por categorías o usa búsqueda
- Aplica filtros (precio, serie, marca, stock)
- Selecciona producto

**Paso 2: Ver Detalles del Producto**
```
Datos mostrados:
├─ Imágenes (múltiples ángulos)
├─ Nombre del producto
├─ Precio en S/ (Soles)
├─ Descripción
├─ Especificaciones
├─ Estado (Stock/Online/Preventa/Agotado)
├─ Cantidad disponible
├─ Código SKU
├─ Marca y Serie
├─ Calificaciones
├─ Reseñas de clientes
├─ Productos relacionados
└─ Botones: Agregar al Carrito / Agregar a Favoritos
```

**Paso 3: Agregar al Carrito**
- Sistema valida disponibilidad
- Incrementa cantidad si ya existe
- Muestra notificación de éxito
- Opción de continuar comprando o ir a carrito

**Paso 4: Revisión del Carrito**
```
Datos en el carrito:
├─ Producto
├─ Precio unitario
├─ Cantidad (modificable)
├─ Subtotal por producto
├─ Subtotal general
├─ Impuestos (IGV 18%)
├─ Costo de envío (calculado)
└─ Total a pagar
```

**Paso 5: Checkout**
- Verificar si usuario está logueado (si no, login/registro)
- Confirmar dirección de envío
- Seleccionar método de envío:
  - 🚚 Motorizado (S/ 9-50 según zona)
  - 📍 Shalom (S/ 12-60 según zona)
  - 🏪 Recojo en tienda (Grau o Centro Cívico, 2-5pm)
- Aplicar cupón de descuento (si tiene)
- Ver resumen final

**Paso 6: Seleccionar Método de Pago**
```
Opciones disponibles:
├─ 📱 Yape QR (Recomendado)
│  └─ Mostrar QR
│  └─ Usuario escanea
│  └─ Usuario sube comprobante
│
├─ 🏦 Transferencia Bancaria
│  ├─ Número de cuenta
│  ├─ Usuario transfiere
│  └─ Usuario sube comprobante
│
├─ 💳 Tarjeta de Crédito/Débito
│  └─ Integración con pasarela
│
└─ 📲 Plin (si aplica)
   └─ Sistema de código dinámico
```

**Paso 7: Confirmación de Orden**
```
Email enviado con:
├─ Número de orden (#000123)
├─ Fecha y hora
├─ Productos ordenados
├─ Total pagado
├─ Dirección de envío
├─ Número de rastreo
├─ Link para rastrear
└─ Instrucciones de contacto
```

**Paso 8: Cambios de Estado de la Orden**
```
Estados disponibles:
1. Pendiente de Pago
2. Pago Confirmado
3. Procesando Empaque
4. Listo para Envío
5. En Tránsito
6. Entregado
7. Completado
8. Cancelado
9. Reembolso
```

### PROCESO 2: GESTIÓN DE INVENTARIO

**Entrada de Stock**
```
1. Crear Orden de Compra
   ├─ Seleccionar proveedor
   ├─ Agregar productos
   └─ Cantidad

2. Recibir Stock
   ├─ Escanear códigos
   ├─ Verificar cantidades
   ├─ Fotografiar
   └─ Registrar en sistema

3. Actualizar Inventario
   ├─ Stock disponible
   ├─ Stock reservado
   ├─ Stock dañado/defectuoso
   └─ Fecha de vencimiento (si aplica)
```

**Movimiento de Stock**
```
Tipos de movimiento:
├─ Entrada (Compra a proveedor)
├─ Salida (Venta)
├─ Devolución
├─ Ajuste (Pérdida, robo)
├─ Transferencia (Tienda A → Tienda B)
└─ Descarte (Producto dañado)
```

**Alertas de Inventario**
```
Umbrales:
├─ Stock bajo (< 10 unidades)
├─ Producto agotado (0 unidades)
├─ Stock máximo (> 500 unidades)
└─ Stock mínimo recomendado
```

**Reporte de Inventario**
```
Datos incluidos:
├─ Producto
├─ SKU
├─ Stock actual
├─ Stock comprometido
├─ Stock disponible
├─ Costo unitario
├─ Valor total
├─ Rotación
├─ Última actualización
└─ Ubicación en almacén
```

### PROCESO 3: GESTIÓN DE PROVEEDORES

**Información de Proveedor**
```
Datos almacenados:
├─ Nombre/Razón social
├─ Contacto (Email, Teléfono)
├─ Dirección
├─ Banco de datos
├─ Términos de pago
├─ Tiempo de entrega
├─ Productos que provee
├─ Catálogo
├─ Negociaciones
└─ Historial de compras
```

### PROCESO 4: DEVOLUCIONES Y CAMBIOS

**Solicitud de Devolución**
```
1. Cliente solicita devolución
   ├─ Motivo (Defecto, No llega, Cambio)
   ├─ Fotografías
   └─ Descripción

2. Administrador revisa
   ├─ Aprueba o rechaza
   └─ Comunica al cliente

3. Si es aprobada
   ├─ Genera etiqueta de retorno
   ├─ Cliente devuelve producto
   └─ Recibe reembolso/cambio

4. Inventario actualizado
   ├─ Producto recibido
   ├─ Inspección
   ├─ Reingreso a stock si aplica
   └─ Proceso completo
```

### PROCESO 5: REPORTES Y ANÁLISIS

**Reportes Disponibles**
```
Ventas:
├─ Por período (diario, semanal, mensual)
├─ Por categoría
├─ Por cliente
├─ Por método de pago
└─ Gráficos de tendencia

Inventario:
├─ Stock actual
├─ Rotación de productos
├─ Productos sin movimiento
├─ Proyecciones de compra
└─ Análisis ABC (Importancia)

Finanzas:
├─ Ingresos totales
├─ Costos
├─ Ganancias
├─ Márgenes
├─ Deuda con proveedores
└─ Cuentas por cobrar

Marketing:
├─ Productos más vendidos
├─ Clientes principales
├─ Tasas de conversión
├─ Canales de tráfico
└─ Retorno de inversión
```

---

## 💾 BASE DE DATOS {#base-datos}

### Tablas Principales

#### 1. **Usuarios**
```sql
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'admin', 'vendedor'),
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Información adicional
    genero ENUM('M', 'F', 'Otro'),
    fecha_nacimiento DATE,
    documento_identidad VARCHAR(20),
    
    INDEX idx_email (email)
);
```

#### 2. **Categorías**
```sql
CREATE TABLE categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    slug VARCHAR(100) UNIQUE,
    padre_id INT,
    posicion INT,
    estado BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (padre_id) REFERENCES categorias(id_categoria),
    INDEX idx_slug (slug)
);
```

#### 3. **Marcas**
```sql
CREATE TABLE marcas (
    id_marca INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    logo_url VARCHAR(255),
    slug VARCHAR(100) UNIQUE,
    estado BOOLEAN DEFAULT TRUE,
    
    INDEX idx_slug (slug)
);
```

#### 4. **Productos**
```sql
CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    descripcion_larga TEXT,
    sku VARCHAR(50) UNIQUE,
    codigo_barras VARCHAR(20),
    
    -- Categorización
    id_categoria INT NOT NULL,
    id_marca INT,
    serie_anime VARCHAR(100),
    
    -- Precios
    precio_costo DECIMAL(10,2),
    precio_venta DECIMAL(10,2) NOT NULL,
    precio_lista DECIMAL(10,2),
    descuento_porcentaje INT DEFAULT 0,
    
    -- Stock
    stock_total INT DEFAULT 0,
    stock_minimo INT DEFAULT 10,
    stock_reservado INT DEFAULT 0,
    
    -- Estado
    estado_producto ENUM('online', 'stock', 'preventa', 'agotado') DEFAULT 'online',
    fecha_llegada_preventa DATE,
    
    -- Imágenes
    imagen_principal VARCHAR(255),
    galeria_imagenes TEXT, -- JSON con URLs
    
    -- Metadatos
    slug VARCHAR(200) UNIQUE,
    peso_kg DECIMAL(8,2),
    dimensiones VARCHAR(100), -- "10x20x30"
    
    -- Control
    activo BOOLEAN DEFAULT TRUE,
    destacado BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca),
    INDEX idx_sku (sku),
    INDEX idx_categoria (id_categoria),
    INDEX idx_estado (estado_producto)
);
```

#### 5. **Órdenes**
```sql
CREATE TABLE ordenes (
    id_orden INT PRIMARY KEY AUTO_INCREMENT,
    numero_orden VARCHAR(20) UNIQUE NOT NULL,
    id_usuario INT NOT NULL,
    
    -- Fechas
    fecha_orden TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega_estimada DATE,
    fecha_entrega_real DATE,
    
    -- Cliente
    nombre_cliente VARCHAR(100) NOT NULL,
    email_cliente VARCHAR(100) NOT NULL,
    telefono_cliente VARCHAR(20) NOT NULL,
    
    -- Dirección
    direccion VARCHAR(255) NOT NULL,
    distrito VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    referencia TEXT,
    
    -- Totales
    subtotal DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(10,2) DEFAULT 0,
    impuesto DECIMAL(10,2) NOT NULL, -- IGV 18%
    costo_envio DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    
    -- Pago
    metodo_pago ENUM('yape', 'transferencia', 'tarjeta', 'efectivo') NOT NULL,
    estado_pago ENUM('pendiente', 'confirmado', 'rechazado') DEFAULT 'pendiente',
    numero_transaccion VARCHAR(50),
    fecha_pago TIMESTAMP,
    
    -- Envío
    metodo_envio ENUM('motorizado', 'shalom', 'recojo_tienda') NOT NULL,
    numero_rastreo VARCHAR(50),
    id_transportista INT,
    
    -- Estado
    estado_orden ENUM('pendiente', 'procesando', 'empacado', 'enviado', 'entregado', 'cancelado', 'reembolso') DEFAULT 'pendiente',
    
    -- Notas
    notas_administrador TEXT,
    notas_cliente TEXT,
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    INDEX idx_numero (numero_orden),
    INDEX idx_estado (estado_orden)
);
```

#### 6. **Detalle de Órdenes**
```sql
CREATE TABLE orden_items (
    id_item INT PRIMARY KEY AUTO_INCREMENT,
    id_orden INT NOT NULL,
    id_producto INT NOT NULL,
    
    -- Datos del producto
    nombre_producto VARCHAR(200) NOT NULL,
    sku_producto VARCHAR(50) NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    
    -- Control
    descuento_item DECIMAL(10,2) DEFAULT 0,
    
    FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);
```

#### 7. **Carrito**
```sql
CREATE TABLE carrito (
    id_carrito INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT DEFAULT 1,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    UNIQUE KEY unique_user_product (id_usuario, id_producto)
);
```

#### 8. **Favoritos/Wishlist**
```sql
CREATE TABLE favoritos (
    id_favorito INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    UNIQUE KEY unique_user_fav (id_usuario, id_producto)
);
```

#### 9. **Inventario/Movimientos**
```sql
CREATE TABLE movimientos_inventario (
    id_movimiento INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT NOT NULL,
    tipo_movimiento ENUM('entrada', 'salida', 'devolución', 'ajuste', 'transferencia') NOT NULL,
    cantidad INT NOT NULL,
    cantidad_anterior INT NOT NULL,
    cantidad_nueva INT NOT NULL,
    motivo VARCHAR(255),
    referencia VARCHAR(100), -- Número de orden, O.C., etc
    id_usuario INT, -- Quién hizo el movimiento
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notas TEXT,
    
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    INDEX idx_producto (id_producto),
    INDEX idx_fecha (fecha_movimiento)
);
```

#### 10. **Cupones/Descuentos**
```sql
CREATE TABLE cupones (
    id_cupon INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    descripcion VARCHAR(255),
    tipo ENUM('porcentaje', 'fijo') NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    minimo_compra DECIMAL(10,2) DEFAULT 0,
    uso_maximo INT,
    usos_restantes INT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    
    INDEX idx_codigo (codigo)
);
```

#### 11. **Reseñas/Calificaciones**
```sql
CREATE TABLE resenas (
    id_resena INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT NOT NULL,
    id_usuario INT NOT NULL,
    calificacion INT NOT NULL, -- 1-5 estrellas
    titulo VARCHAR(200),
    contenido TEXT,
    fecha_resena TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verificado BOOLEAN DEFAULT FALSE, -- Compra verificada
    
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
```

#### 12. **Transportistas/Envío**
```sql
CREATE TABLE transportistas (
    id_transportista INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM('motorizado', 'shalom', 'otros') NOT NULL,
    contacto VARCHAR(20),
    email VARCHAR(100),
    costo_base DECIMAL(10,2),
    
    -- Zonas y costos
    zona_1 VARCHAR(255), -- Distritos
    costo_zona_1 DECIMAL(10,2),
    zona_2 VARCHAR(255),
    costo_zona_2 DECIMAL(10,2)
);
```

---

## 👥 FLUJOS DE USUARIO {#flujos-usuario}

### FLUJO 1: Usuario Nuevo (Registro y Primera Compra)

```
1. Acceso al sitio
   └─> Ve promo y catálogo

2. Busca producto
   ├─> Navega categorías
   ├─> Usa búsqueda
   └─> Aplica filtros

3. Ve detalles del producto
   ├─> Lee descripción
   ├─> Ve imágenes
   ├─> Revisa calificaciones
   └─> Lee reseñas

4. Intenta comprar
   ├─> Sistema pide login
   └─> No tiene cuenta

5. Registro rápido
   ├─> Email
   ├─ Contraseña
   ├─ Nombre
   └─ Teléfono

6. Dirige a checkout
   ├─ Ingresa dirección
   ├─ Elige envío
   ├─ Elige pago
   └─ Confirma orden

7. Realiza pago
   ├─ Yape QR o Transferencia
   └─ Sube comprobante

8. Confirmación
   ├─ Email enviado
   ├─ Número de orden
   └─ Link de rastreo
```

### FLUJO 2: Cliente Registrado (Compra Rápida)

```
1. Acceso y login
   ├─> Email y contraseña
   └─> Sesión iniciada

2. Compra rápida
   ├─> Busca producto
   ├─> Ve carrito guardado (si tenía)
   ├─> Agrégalo al carrito
   └─> Ir a checkout

3. Datos pre-llenados
   ├─ Dirección guardada
   ├─ Métodos de pago
   └─ Información de contacto

4. Confirmación rápida
   ├─ Revisa totales
   ├─ Confirma pago
   └─ Orden completada

5. Rastreo
   ├─ En tiempo real desde dashboard
   └─ Email de actualizaciones
```

### FLUJO 3: Compra desde Tienda Física (POS)

```
1. Cliente entra a tienda
   └─> Ve productos físicos

2. Elige productos
   ├─> Los lleva al mostrador
   └─> Informa cantidad

3. Vendedor en POS
   ├─ Escanea código/SKU
   ├─ Sistema busca producto
   ├─ Agrega a carrito
   └─ Continúa hasta finalizar

4. Revisa total
   ├─ Subtotal
   ├─ IGV
   └─ Total

5. Método de pago
   ├─ Efectivo
   ├─ Tarjeta
   ├─ Yape QR
   └─ Vale

6. Comprobante
   ├─ Factura o Boleta
   ├─ Imprime
   └─ Entrega al cliente
```

### FLUJO 4: Cliente Recibe Producto

```
1. Estado de envío
   ├─ En tránsito
   └─ Transportista notifica

2. Cliente recibe
   ├─ Verifica condición
   ├─ Abre paquete
   └─ Inspecciona producto

3. Dos opciones:
   a) Producto OK
      ├─ Confirma entrega en sistema
      └─ Puede dejar reseña
      
   b) Producto dañado/Problema
      ├─ Toma fotografías
      ├─ Inicia reclamo
      ├─ Admin revisa
      └─ Aprueba devolución/cambio

4. Sistema actualiza
   ├─ Marca como entregado
   ├─ Genere mail de confirmación
   └─ Permite calificación
```

---

## 🎨 CARACTERÍSTICAS ESPECÍFICAS {#características}

### A. Diseño Visual

**Paleta de Colores**
```
- Primario: #E94560 (Rojo/Rosa)
- Secundario: #1A1A2E (Azul Oscuro)
- Terciario: #2A2A3E (Gris Oscuro)
- Acento 1: #4CAF50 (Verde - Stock)
- Acento 2: #FF9800 (Naranja - Preventa)
- Acento 3: #666666 (Gris - Agotado)
- Fondo: #0F0F0F (Negro)
- Texto: #FFFFFF (Blanco)
- Texto secundario: #CCCCCC (Gris claro)
```

**Tipografía**
- Font primaria: Segoe UI, Tahoma, Geneva
- Tamaño H1: 48px
- Tamaño H2: 32px
- Tamaño párrafo: 14-16px
- Peso: Regular (400), Medium (500), Bold (600), Extra Bold (700-800)

**Iconografía**
- Emojis para principales acciones
- SVG para elementos gráficos
- FA Icons para iconos adicionales

### B. Secciones Especiales

**1. Banner de Promoción Superior**
- Envío gratis por compras > S/ 200
- Scrolling automático
- Cerrable por usuario
- Sticky en mobile

**2. Sección Tendencias**
- 4 tags principales
- Clickeables para filtrar
- Con iconos emoji
- Hover effects

**3. Carrusel de Productos**
- 3 secciones principales (Stock, Online, Preventa)
- Botón "Ver más"
- Responsive grid
- Lazy loading de imágenes

**4. Tarjetas de Características**
- 4 beneficios principales
- Con iconos
- Texto descriptivo
- Hover animation

**5. Líneas de Productos**
- 6 marcas destacadas
- Grid responsive
- Clickeables
- Con hover effect

**6. Series Anime Populares**
- 6+ series destacadas
- Ordenadas por popularidad
- Actualizable desde admin
- Link a productos filtrados

**7. Reseñas de Clientes**
- Integración con Instagram Highlights
- Galería de 8+ fotos
- Play button overlay
- Click abre Instagram

**8. Footer**
- 3 columnas de links
- Redes sociales
- Copyright
- Newsletter (opcional)

### C. Funcionalidades Interactivas

**Búsqueda Global**
```
- Búsqueda por:
  ├─ Nombre del producto
  ├─ Serie anime
  ├─ Marca
  ├─ SKU/Código
  └─ Categoría
  
- Autocomplete sugerencias
- Búsqueda por voz (móvil)
- Recientes búsquedas
```

**Filtros Avanzados**
```
- Por categoría
- Por marca
- Por precio (rango)
- Por estado (online/stock/preventa)
- Por serie anime
- Por calificación
- Disponibilidad
```

**Ordenamiento**
```
- Más reciente
- Precio menor a mayor
- Precio mayor a menor
- Mejor calificado
- Más vendido
- Promocionados
```

### D. Integraciones Externas

**1. WhatsApp**
- Botón flotante de contacto
- Link directo: wa.me/942346281
- Mensaje preestablecido
- Disponible 24/7

**2. Redes Sociales**
- Instagram: homidori.shop
- Facebook: homidori.shop
- TikTok: @homidori7
- Discord: Servidor privado
- YouTube (si aplica)

**3. Google Analytics**
- Rastreo de visitas
- Comportamiento de usuario
- Fuentes de tráfico
- Conversiones

**4. Mapas**
- Ubicación de tiendas físicas
- Grau: Lunes-Viernes 2-5pm
- Centro Cívico: Lunes-Viernes 2-5pm

---

## 💳 SISTEMA DE PAGOS {#sistema-pagos}

### Métodos de Pago Disponibles

**1. Yape (Billetera Digital Peruana)**
```
Proceso:
1. Cliente elige Yape
2. Sistema genera QR único
3. Cliente escanea con su app
4. Realiza pago
5. Cliente sube comprobante (opcional en futuro con API)
6. Admin confirma pago
7. Orden se procesa

Datos a guardar:
├─ ID de transacción
├─ Monto
├─ Fecha/Hora
├─ Estado (pendiente/confirmado)
└─ Comprobante (imagen)

IMPORTANTE:
- Nombre a cargo: Fabrizio Sialer
- Límite: S/ 3,000 por transacción
- Si llega al límite → Código de verificación
```

**2. Transferencia Bancaria**
```
Datos de cuenta:
- Banco: [ESPECIFICAR]
- Titular: [ESPECIFICAR]
- Número cuenta: [ESPECIFICAR]
- CCI: [ESPECIFICAR]
- Referencia: #[NÚMERO ORDEN]

Proceso:
1. Cliente ve datos bancarios
2. Realiza transferencia
3. Sube comprobante
4. Admin verifica
5. Confirma pago
```

**3. Tarjeta de Crédito/Débito**
```
Integración con:
- Stripe
- Niubiz
- PayPal

Datos solicitados:
- Número de tarjeta
- Nombre titular
- Fecha vencimiento
- CVV
- DNI

Procesamiento:
- Seguro (PCI DSS)
- Instantáneo
- Automático si aprueba
```

**4. Plin (Interoperabilidad Billeteras)**
```
- Mismo proceso que Yape
- Otros bancos participantes
- Disponible en futuro
```

**5. Efectivo (Solo Tienda Física)**
```
- POS registra transacción
- Cliente paga en mostrador
- Se genera comprobante
- Sistema sincroniza con online
```

### Manejo de Fallos de Pago

```
Escenario 1: Pago Rechazado
├─ Sistema notifica cliente
├─ Email con motivo
├─ Opción de reintentar
└─ Orden se cancela en 24h si no paga

Escenario 2: Timeout
├─ Reintenta automáticamente
├─ Después de 3 intentos → Manual
└─ Cliente contacta soporte

Escenario 3: Monto Inconsistente
├─ Admin revisa
├─ Ajusta si es error de cliente
└─ Niega si es fraudulento
```

---

## 📦 GESTIÓN DE INVENTARIO {#gestión-inventario}

### Stock Management

**Estados de Producto**
```
1. ONLINE
   - Stock disponible inmediatamente
   - Envío en 24-48h
   - Cantidad definida

2. STOCK
   - En almacén
   - Entrega 2-5 días
   - Cantidad variable

3. PREVENTA
   - No disponible aún
   - Llegada en fecha específica
   - Permite reservas

4. AGOTADO
   - Sin stock
   - Puede reabastecerse
   - Clientes pueden watchlist
```

**Niveles de Stock**

```
Alto Stock:    > 500 unidades
Normal:        50 - 500 unidades
Bajo:          10 - 49 unidades
Muy Bajo:      < 10 unidades (Alerta)
Agotado:       0 unidades
```

**Alertas Automáticas**
```
Cuando stock < 20:
├─ Notificar a admin
├─ Email de alerta
└─ Recordatorio de reabastecer

Cuando stock = 0:
├─ Marcar como agotado
├─ Email a interesados
└─ Permitir pre-orden si aplica
```

**Pronóstico de Compra**

```sql
-- Script para analizar rotación
SELECT 
    p.nombre,
    COUNT(oi.id_item) as ventas_mes,
    (COUNT(oi.id_item) / 30) as promedio_diario,
    p.stock_total,
    ROUND((COUNT(oi.id_item) / 30) * 30) as proyeccion_30dias
FROM productos p
LEFT JOIN orden_items oi ON p.id_producto = oi.id_producto
LEFT JOIN ordenes o ON oi.id_orden = o.id_orden
WHERE o.fecha_orden >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY p.id_producto
ORDER BY ventas_mes DESC;
```

---

## 🔗 INTEGRACIONES {#integraciones}

### 1. Envíos

**Motorizado (Local)**
```
Característica: Servicio de entrega local en Lima
Cobertura: Distritos de Lima
Costo: S/ 9 - S/ 50 según zona
Tiempo: 24-48 horas
API: [Si disponible]
Contacto: Directo
```

**Shalom (Delivery)**
```
Característica: Empresa de courier de cobertura nacional
Cobertura: Todo Perú
Costo: S/ 12 - S/ 60 según distancia
Tiempo: 2-7 días según departamento
API: [Si disponible]
Web: https://www.shalom.pe
```

**Recojo en Tienda**
```
Ubicación 1: Grau, Lima
- Horario: Lunes-Viernes 2-5pm
- Dirección: [ESPECIFICAR]

Ubicación 2: Centro Cívico, Lima
- Horario: Lunes-Viernes 2-5pm
- Dirección: [ESPECIFICAR]

Costo: GRATIS
```

### 2. Email (Formspree / SendGrid)

```
Tipos de emails:
├─ Bienvenida (Registro)
├─ Confirmación de orden
├─ Pago recibido
├─ Pedido enviado (con rastreo)
├─ Producto entregado
├─ Solicitud de calificación
├─ Newsletter
├─ Recuperación de contraseña
├─ Cambios de estado de orden
└─ Alertas de admin

Plantillas HTML:
- Responsive
- Logo de marca
- Datos de contacto
- Links de rastreo
- CTA claros
```

### 3. Google Services

**Analytics**
```
- Rastreo de visitas
- Comportamiento de usuario
- Fuentes de tráfico
- Conversiones
- Eventos personalizados
```

**Search Console**
```
- Indexación de sitio
- Palabras clave
- Errores de rastreo
- Sitemaps
- Mobile usability
```

**Google Maps**
```
- Ubicación de tiendas
- Dirección
- Horario
- Teléfono
- Reseñas
```

### 4. Redes Sociales

**Instagram Integration**
```
- Embed de Highlights (Reseñas)
- Shopping tags (si aplica)
- Stories (contenido diario)
- Reels (videos productos)
```

**Facebook**
- Pixel de seguimiento
- Ads integration
- Fan page links
- Compartir de productos

**TikTok**
- Enlace a perfil
- Embed de videos
- Contenido viral

**Discord**
- Comunidad de coleccionistas
- Anuncios de nuevos productos
- Soporte directo
- Eventos especiales

### 5. CMS/Backend

**WordPress + WooCommerce** (Actual)
- Gestión de contenido
- SEO integrado
- Plugins de seguridad
- Backup automático

**O alternativa: Sistema Custom PHP**
- Mayor control
- Optimizado para caso específico
- Integración con POS
- Reportes personalizados

---

## 🛠️ FUNCIONALIDADES AVANZADAS

### A. Cupones y Promociones

**Tipos de Cupones**
```
1. Código Porcentaje
   - 15% en toda la tienda
   - 20% en categoría especifica
   - 30% en producto X

2. Código Fijo
   - Descuento S/ 10
   - Descuento S/ 25
   - Compra X lleva Y

3. Temporal
   - Black Friday
   - Cyber Monday
   - Aniversario
   - Temporada anime

4. Por Usuario
   - Cupón de bienvenida
   - Primera compra
   - Cliente frecuente
   - Referral
```

**Panel de Cupones**
```
- Crear cupón
- Código único
- Tipo (% o fijo)
- Valor
- Mínimo de compra
- Uso máximo
- Fecha inicio/fin
- Categorías aplica
- Productos excluidos
- Estadísticas de uso
```

### B. Sistema de Afiliados/Referrals

```
- Cliente invita amigos
- Compra amigo = Comisión
- Link único de referral
- Dashboard de ganancias
- Retiros de comisión
```

### C. Programa de Lealtad

```
- Puntos por cada compra
- Canjeo de puntos
- Niveles (Silver, Gold, Platinum)
- Beneficios exclusivos
- Cumpleaños especial
- Compra doble puntos
```

### D. Wishlist Avanzado

```
- Crear múltiples listas
- Compartir con amigos
- Notificación de baja de precio
- Sugerencias basadas en lista
- Exportar lista
- Dar como regalo
```

### E. Live Shopping

```
- Sesiones en vivo por Instagram
- Demostración de producto
- Descuentos exclusivos
- Chat en tiempo real
- Compra directa desde stream
```

---

## 📱 DISEÑO RESPONSIVO

### Breakpoints

```
Desktop:      1400px+
Tablet:       768px - 1399px
Mobile:       < 768px
Mini Mobile:  < 480px
```

### Cambios por dispositivo

**Mobile**
- Menú hamburguesa
- Grid 2 columnas (productos)
- Formularios simplificados
- Botones más grandes (touch)
- Nav inferior con acciones
- Imágenes optimizadas

**Tablet**
- Menú desplegable
- Grid 3-4 columnas
- Layout adaptado
- Navegación horizontal

**Desktop**
- Menú completo
- Grid 5+ columnas
- Sidebar (filtros)
- Múltiples opciones

---

## 🔒 SEGURIDAD

### Protección de Datos

```
- HTTPS en todo el sitio
- Encriptación de contraseñas (bcrypt)
- Tokens de sesión
- CSRF Protection
- SQL Injection Prevention (Prepared statements)
- XSS Prevention (Sanitize input/output)
- Rate limiting (Brute force protection)
```

### Información Sensible

```
- No guardar números de tarjeta
- Usar tokenización de pagos
- Cumplir PCI DSS
- Encriptar datos personales
- GDPR compliance (si aplica)
- Política de privacidad clara
- Términos de servicio
```

---

## 📊 KPIs Y MÉTRICAS

### Métricas de Venta

```
- Ticket promedio
- Conversión (visitas → compras)
- AOV (Valor promedio por orden)
- Tasa de repetición
- Productos por orden
- Producto más vendido
- Categoría más vendida
- Revenue por canal
```

### Métricas de Inventario

```
- Rotación de inventario
- Días de inventario
- Productos con lento movimiento
- Stock out rate
- Exactitud de inventario
- Costo de almacenamiento
```

### Métricas de Cliente

```
- Clientes nuevos
- Clientes recurrentes
- Lifetime value
- Churn rate
- Satisfacción (NPS)
- Tiempo de atención
- Tasa de resolución
```

### Métricas de Operación

```
- Tiempo de procesamiento
- Tasa de devoluciones
- Tasa de errores
- Disponibilidad de sistema
- Tiempo de respuesta
- Costo operacional
```

---

## 🚀 ROADMAP FUTURO

### Fase 1 (Actual)
- ✅ Sitio web base
- ✅ Catálogo de productos
- ✅ Carrito y checkout
- ✅ Sistema de pagos básico
- ✅ Panel de admin

### Fase 2 (Próxima)
- 🔄 App mobile (iOS/Android)
- 🔄 Sistema POS integrado
- 🔄 Integración de envíos (API)
- 🔄 Programa de lealtad
- 🔄 Live shopping

### Fase 3 (Futura)
- 📅 Marketplace integrado
- 📅 Vendedores terceros
- 📅 Subasta de productos
- 📅 AI Recommendations
- 📅 AR Try-on (Figuras)

---

## 📞 CONTACTO Y SOPORTE

### Canales de Comunicación

**WhatsApp**
- Número: 942346281
- Disponible: 24/7
- Respuesta: < 1 hora

**Email**
- General: contacto@homidori.com
- Soporte: soporte@homidori.com
- Ventas: ventas@homidori.com

**Redes Sociales**
- Instagram: @homidori.shop
- Facebook: /homidori.shop
- TikTok: @homidori7
- Discord: [Link servidor]

**Ubicaciones Físicas**
- Grau: [Dirección] - Lunes-Viernes 2-5pm
- Centro Cívico: [Dirección] - Lunes-Viernes 2-5pm

---

## 📝 NOTAS IMPORTANTES

### Para Desarrolladores

1. **Database Setup**
   - Crear todas las tablas (SQL proporcionado)
   - Seed datos iniciales (marcas, categorías)
   - Backup automático semanal

2. **Frontend**
   - Responsive design obligatorio
   - SEO optimization (Meta tags, estructuras)
   - Performance (Lazy loading, compresión)
   - A/B testing for conversions

3. **Backend**
   - API REST o GraphQL
   - Documentación de endpoints
   - Rate limiting
   - Validación de datos

4. **DevOps**
   - CI/CD pipeline
   - Staging environment
   - Monitoring y alerts
   - Log aggregation

### Para Administradores

1. **Mantenimiento**
   - Actualizar precios regularmente
   - Revisar inventario semanal
   - Responder tickets de soporte
   - Hacer backups

2. **Marketing**
   - Crear promociones
   - Actualizar social media
   - Email marketing
   - Analytics review

3. **Operación**
   - Procesar órdenes
   - Coordinar envíos
   - Gestionar devoluciones
   - Actualizar catálogo

---

**Documento actualizado:** Febrero 2026  
**Versión:** 2.0  
**Autor:** Equipo Homidori  
**Licencia:** Privado - Solo para uso interno

---

### Anexos Disponibles

- [Anexo A] - Scripts SQL completos
- [Anexo B] - Especificaciones de API
- [Anexo C] - Plantillas de Email
- [Anexo D] - Guía de Instalación
- [Anexo E] - Manual de Usuario (Admin)
- [Anexo F] - Manual de Usuario (Cliente)

