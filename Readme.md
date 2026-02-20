g# Gestión de Opiniones - Sprint 3

¡Qué onda! Aquí les dejo lo que se armó en este último Sprint del proyecto. Le metimos con todo para que quedara calidad:

### 🚀 Lo que se agregó (Sprint 3):
- **Sistema de Comentarios:** Ya se pueden tirar comentarios en las publicaciones. Creé todo el relajo del modelo, las rutas y el controlador para que funcione al cien.
- **Solo el autor manda:** Le puse seguridad para que solo el que escribió el comentario lo pueda editar o borrar, así nadie más mete mano donde no debe.
- **Validaciones calidad:** Programé validaciones en todas las rutas (Auth, Publicaciones y Comentarios) usando `express-validator` para que no truene si mandan datos pura lata.
- **Manejo de Errores Pro:** Arreglé el middleware global para que, si algo falla, el servidor responda con un JSON bien explicado y no saque errores extraños.
- **Estructura Chilera:** Mantuve todo bien ordenadito por carpetas (modelos, controladores y rutas) para que el código no sea un relajo y se entienda bien. 

¡Ahí estamos, ya quedó listo para las pruebas!
