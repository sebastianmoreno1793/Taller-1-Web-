# API REST - Colección de Juegos de Mesa

Servidor en Express para gestionar una colección compartida de juegos de mesa.

## Instalación

```bash
npm install
npm run dev
```

El servidor corre en:

```text
http://localhost:3000
```

## Rutas principales

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/boardgames` | Consultar catálogo completo |
| GET | `/api/boardgames?search=catan` | Búsqueda específica por nombre, estado o id |
| GET | `/api/boardgames/:idBoardgame` | Consultar un juego por id |
| POST | `/api/boardgames` | Ingresar nuevo juego |
| PUT | `/api/boardgames/:idBoardgame` | Actualizar datos de un juego |
| DELETE | `/api/boardgames/:idBoardgame` | Retirar juego del catálogo |

## Ejemplo para crear un juego

```json
{
  "name": "Catan",
  "minPlayers": 3,
  "maxPlayers": 4,
  "averageDuration": 90,
  "acquisitionDate": "2026-05-02",
  "status": "En perfectas condiciones"
}
```

## Estados permitidos

- En perfectas condiciones
- Ligeramente usado
- Deteriorado
- Dañado

## Importante

No subir la carpeta `node_modules` al repositorio. Este proyecto incluye `.gitignore` para evitarlo.
