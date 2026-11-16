# landing_pages

Colección de demos de landing pages. Cada una vive en su propia carpeta y se ejecuta de forma independiente.

| Demo | Descripción | Stack |
|---|---|---|
| [`montclair`](montclair/) | Landing con galería (lightbox) y selector de idioma, más un backend base. | Next.js 16 · React 19 · NestJS 11 |
| [`montclair-air`](montclair-air/) | Landing con un modelo 3D interactivo de un Concorde. | Next.js 16 · React Three Fiber · drei · three.js |

> Son maquetas de demostración: el contenido, las marcas y los datos que aparecen son ficticios.

## Cómo ejecutar una demo

Cada demo tiene su propio `package.json` (usan pnpm):

```bash
# montclair-air
cd montclair-air
pnpm install
pnpm dev

# montclair (frontend)
cd montclair/frontend
pnpm install
pnpm dev

# montclair (backend)
cd montclair/backend
pnpm install
pnpm start:dev
```

La web queda en [http://localhost:3000](http://localhost:3000).
