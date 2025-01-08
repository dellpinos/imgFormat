# Comprimir imagenes

- Cambiar los nombres a las imagenes y colocarlas dentro de la carpeta "src/img".
- Todo el código y las funciones disponibles se encuentran en el archivo "gulpfile.js"
- 1ro ejecutar `npm run img` para crear las versiones JPG, WEBP y AVIF de cada imagen y almacenarlas en "build/img"
- 2do si son necesarios los thumbails ejecutar `npm run thumbs` que toma las imagenes dentro de "build/img", les agrega el sufijo "_thumb", cambia su tamaño y las almacena en "build/img/thumbs" como archivos JPG
- 3ro si son necesarias otros versiones ejecutar `npm run thumbsWA` para generar las versiones WEBP y AVIF de estos archivos, se almacenan en la misma carpeta
- Eliminar carpeta "build" y los archivos dentro de "/src/img" una vez que hayan sido copiados en otro lado

El orden es importante porque el source de cada función puede ser diferente, si intento ahcer los thumbnails directamente no va a encontrar ningún archivo.
