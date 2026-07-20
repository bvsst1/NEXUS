# Contexto del Proyecto: Examen Transversal Angular (Nexus BoardGames)
Eres un desarrollador Frontend Senior experto en Angular. Estamos en la evaluación final de nuestro e-commerce de Juegos de Mesa. Necesito que me generes el código para cumplir con los siguientes requerimientos estrictos:

## 1. Validaciones de Registro
Refactoriza el formulario reactivo del componente de Registro (`register.component.ts`) para incluir 4 validaciones de seguridad en la contraseña: 
1. Longitud mínima (8 caracteres).
2. Longitud máxima (20 caracteres).
3. Uso de caracteres especiales.
4. Uso de números y letras.
Añade los mensajes de error dinámicos en el HTML usando Bootstrap 5.

## 2. Componentes Faltantes
Genera la estructura básica (TS y HTML con clases de Bootstrap 5 y diseño oscuro/glassmorphism) para los siguientes componentes:
* **Recuperar Contraseña:** Un formulario simple que pida el correo y simule enviar un link.
* **Modificación de Perfil:** Un formulario para editar el nombre y teléfono del usuario logueado.
* **Pago Exitoso:** Una vista de confirmación simulada tras "pagar" el carrito de compras.

## 3. Pruebas Unitarias (Jasmine/Karma)
Necesito exactamente 6 pruebas unitarias distribuidas en mis componentes. Genera el código `.spec.ts` para lo siguiente:
1. Validar que el componente `CatalogComponent` se crea correctamente.
2. Validar que el `GamesService` retorna datos correctamente.
3. Validar que el formulario de `Login` sea inválido si está vacío.
4. Validar que la regla de "caracteres especiales" falle en el `RegisterComponent` si se ingresa una contraseña simple.
5. Validar que el `CartComponent` calcule correctamente el total de 2 productos.
6. Validar que el componente de `Pago Exitoso` renderice el mensaje de éxito.

## 4. Documentación
Indícame los comandos exactos para instalar `Compodoc` en Angular 17+ y el script que debo poner en `package.json` para generar la documentación técnica en una carpeta local.