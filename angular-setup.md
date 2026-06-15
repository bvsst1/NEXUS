# Configuracion de Bootstrap para Angular

Usa Bootstrap 5 de una de estas dos formas:

## Opcion 1: `angular.json`

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

## Opcion 2: `src/styles.scss` o `src/styles.css`

```css
@import 'bootstrap/dist/css/bootstrap.min.css';
```

Si quieres que funcione el boton hamburguesa del navbar, agrega tambien el bundle JS en `angular.json` como en la opcion 1.

## Importante

- Para `[(ngModel)]`, importa `FormsModule` en los componentes standalone o en tu modulo.
- Para `*ngIf` y `*ngFor`, importa `CommonModule`.
- Las rutas del proyecto quedaron definidas en `src/app/app.routes.ts`.
