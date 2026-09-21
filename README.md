# Products API v2 con Middlewares

API REST de productos construida desde cero con Express y TypeScript aplicando arquitectura por capas, DTOs, Repository, Service, Controller, middlewares de validación, autenticación y autorización, logging, y manejo centralizado de errores.

## Tecnologías utilizadas
- Node.js
- Express
- TypeScript

## Requisitos para ejecutar
- Node.js instalado en el sistema.

## Instalación de dependencias
```bash
npm install
```

## Variables de entorno requeridas
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```env
PORT=3000
API_KEY=curso-express-2026
```

## Comandos
- `npm run dev`: Inicia el servidor en modo desarrollo utilizando tsx.
- `npm run build`: Compila el proyecto TypeScript hacia la carpeta `dist`.
- `npm start`: Ejecuta el proyecto ya compilado desde `dist/server.js`.

## Tabla de endpoints

| Endpoint | Pipeline principal |
|---|---|
| GET /api/products | Controller -> Service -> Repository |
| GET /api/products/:id | validateId -> Controller -> Service -> Repository |
| GET /api/products/category/:category | validateCategory -> Controller -> Service -> Repository |
| POST /api/products | auth -> validateProduct -> validateStock -> Controller -> Service |
| PUT /api/products/:id | auth -> validateId -> validateProduct -> validateStock -> Controller |
| DELETE /api/products/:id | auth -> admin -> validateId -> Controller -> Service |

## Ejemplos de headers
- Autenticación (API Key): `x-api-key: curso-express-2026`
- Autorización (Rol): `x-role: admin`

## Ejemplos de cURL

**Consultar productos:**
```bash
curl http://localhost:3000/api/products
```

**Crear producto:**
```bash
curl -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-H "x-api-key: curso-express-2026" \
-d '{
 "name": "Teclado mecánico",
 "price": 320000,
 "category": "Accesorios",
 "stock": 15,
 "active": true
}'
```

**Eliminar producto (requiere rol admin):**
```bash
curl -X DELETE http://localhost:3000/api/products/2 \
-H "x-api-key: curso-express-2026" \
-H "x-role: admin"
```

## Códigos HTTP manejados
- **200 OK**: Consulta o actualización correcta.
- **201 Created**: Producto creado correctamente.
- **204 No Content**: Eliminación correcta sin body.
- **400 Bad Request**: Formato o datos de entrada inválidos.
- **401 Unauthorized**: Falta una credencial requerida.
- **403 Forbidden**: La credencial o autorización no permite la acción.
- **404 Not Found**: Recurso o ruta inexistente.
- **409 Conflict**: Conflicto con el estado actual, como nombre duplicado.
- **500 Internal Server Error**: Error inesperado no controlado.
