# Guia de instalacion y uso de Compodoc

## 1. Instalar la libreria en el proyecto

Ejecuta el siguiente comando en la raiz del proyecto:

```bash
npm install --save-dev @compodoc/compodoc
```

## 2. Verificar los scripts en `package.json`

Deja estos scripts dentro de la seccion `scripts`:

```json
"compodoc:build": "compodoc -p tsconfig.json",
"compodoc:serve": "compodoc -p tsconfig.json -s -r 8080",
"compodoc:build-and-serve": "compodoc -p tsconfig.json -s -r 8080"
```

## 3. Generar la documentacion del FrontEnd

```bash
npm run compodoc:build
```

Al finalizar se crea la carpeta `documentation/` con la documentacion del proyecto Angular: componentes, rutas, guards, servicios, modelos y estructura general.

## 4. Levantar el servidor local de documentacion

```bash
npm run compodoc:serve
```

Compodoc levantara un servidor local en:

```text
http://localhost:8080
```

## 5. Flujo recomendado para la entrega

1. Ejecuta `npm install` si aun no has descargado dependencias.
2. Ejecuta `npm run compodoc:build` para generar la documentacion.
3. Ejecuta `npm run compodoc:serve` para revisar el resultado en el navegador.
4. Verifica que todas las pantallas, servicios, guards y modelos aparezcan documentados.

## 6. Comando rapido para generar y servir en una sola vez

```bash
npm run compodoc:build-and-serve
```

Ese comando genera la documentacion y deja el visor web disponible localmente para la revision docente.
