#API_REST

Como este proyecto se fue creando por partes sobre la clase del 07/03, está en 1 sólo repositorio.
Utiliza una base de datos noSQL, que esta en mongoDB. *(datos de conexión al final)*

##Vistas de usuario:
* Index
* Productos
* Servicios
* Instalaciones
* Quienes Somos (esta vacía)
* Contacto (esta vacía)

####Productos:
Están almacenado en la base de datos, aunque se extrajeron utilizando **scrapping**. Si se quiere probar hay que entrar en la siguiente ruta: **/api/v1/productos/scrap**. *(Esto agrega productos a la bd pero no elimina los existentes)*

---
##Admin:
La ruta para acceder a las vistas del administrador es **/admin**, aunque también hay un atajo que es pulsando a la vez las siguientes teclas:
* **CTRL** + **SHIFT** + **ALT** y haciendo **click** sobre la barra verde del NAV.

Datos del usuario administrador:
* **email**: pepe@correo.es
* **contraseña**: admin

##Vistas del administrador:
* Dashboard (muestra tablas con productos y servicios)
* Formulario crear/editar productos
* Formulario crear/editar servicios

\**Se muestra mensajes de error en los formularios al validarlos.*

---
##.env:
####Requiere:
* El puerto del servidor: **PORT**=3000
* La ruta base: **URL_BASE**=http://localhost:3000
* La URI de conexión a la base de datos: **URI_CONNECT**=mongodb+srv://admin:admin@cluster0.yuzkx08.mongodb.net/proyecto1?retryWrites=true&w=majority
* La frase secreta: **JWT_SECRET_KEY**=this_is_the_frase_secreta

---
##Main.js
Este proyecto incluye en la carpeta **/public/js/** el archivo *main.js* que utiliza 2 constantes (**URL_API_INST** y **URL_API_PROD**) que tienen como valor la ruta '*http://localhost:3000...*' que habría que modificar si se utiliza otro puerto en el **.env**.

---
##Nota:
El proyecto está con algunas cosas sin acabar, pero que no se solicitaban en la entrega, como por ejemplo:
* La cesta del front.
* La posibilidad de crear/editar instalaciones desde la vista del admin.
* Mejorar la validación del admin al entrar con el jwt y cookies, que en ese momento no sabíamos utilizar.
* Las vistas de Contacto y Quienes Somos.