# Contexto del Proyecto: Integración de JSON y Servicios en Angular (Nexus BoardGames)

Eres un desarrollador Frontend Senior experto en Angular. Necesito continuar con el desarrollo de nuestro e-commerce de Juegos de Mesa (diseño *glassmorphism*, modo oscuro, Bootstrap 5, Standalone Components). El objetivo de esta fase es implementar el consumo de datos desde un archivo JSON simulando una API externa.

## 1. Requerimientos Estructurales (Consumo de JSON)
Debes refactorizar la forma en que la aplicación obtiene el catálogo de juegos. Actualmente usamos un mock en TypeScript. Necesito que generes lo siguiente:

1. **Archivo JSON:** Crea un archivo `games.json` que contenga un arreglo de objetos (los juegos de mesa con su id, nombre, descripción, precio, categoría e imagen). Este archivo vivirá en la carpeta `src/assets/data/`.
2. **Servicio Angular (`GamesService`):** Crea un servicio inyectable que utilice `HttpClient` para realizar una petición `GET` al archivo `assets/data/games.json` y retorne un `Observable` con la lista de juegos.
3. **Configuración Global:** Indícame cómo configurar `provideHttpClient()` en el archivo `main.ts` o `app.config.ts` (ya que usamos Standalone Components) para que el servicio HTTP funcione correctamente.

## 2. Refactorización de Componentes
Necesito que actualices los siguientes componentes para que consuman el nuevo servicio en lugar del mock estático, manteniendo el diseño HTML intacto:

* **Catálogo de Productos (`catalog.component.ts`):** Debe inyectar el `GamesService`, suscribirse al observable en el `ngOnInit` y renderizar los juegos dinámicamente.
* **(Opcional si aplica) Detalle de Producto (`product-detail.component.ts`):** Debe consumir el servicio para buscar el juego específico por su ID.

## 3. Restricciones Técnicas
* Mantén las directivas de Angular (`*ngFor`, `*ngIf`).
* Si usas Observables directamente en el HTML, puedes aplicar el `async pipe` (`*ngFor="let game of games$ | async"`), o suscribirte en el componente TypeScript y guardar la respuesta en una variable, lo que consideres mejor práctica.
* Asegúrate de manejar posibles errores de la petición HTTP (un `catchError` básico en el servicio).

## Entregables Solicitados
Por favor, entrégame el código organizado de la siguiente manera:
1. El contenido exacto para `src/assets/data/games.json`.
2. El código del `games.service.ts`.
3. La configuración requerida en `main.ts` para habilitar `HttpClient`.
4. El código TypeScript actualizado para `catalog.component.ts` demostrando cómo te suscribes al servicio.