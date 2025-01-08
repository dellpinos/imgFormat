const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const paths = {
    imagenes: 'src/img',
    imagenesDestino: 'build/img',
    imagenesThumbs: 'build/img/thumb',
    destino: 'build/img',
    thumbs: 'build/img/thumb'
}

/// Genere este archivo para utilizar Sharp pero los resultados de resize y la perdida de calodad
/// son los mismos

// Rutas
const inputDirectory = paths.imagenes;
const outputDirectory = paths.imagenesDestino;
const outputFormat = 'jpeg'; // Formato de salida

// Opciones
const resizeOptions = {
  // width: 300, // Ancho deseado
  height: 300, // Altura deseada
  fit: 'cover', // Opciones adicionales de ajuste
};

// Listar archivos de entrada
fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error('Error al leer los archivos:', err);
    return;
  }

//   // Filtrar solo archivos con extensión .jpg
//   const jpgFiles = files.filter((file) => path.extname(file).toLowerCase() === '.jpg');
const validFiles = files.filter((file) => !file.startsWith('.'));

  // Iterar sobre cada archivo listado y procesarlo
  validFiles.forEach((file) => {
    const inputPath = path.join(inputDirectory, file);
    const outputFileName = file.replace(path.extname(file), `_resized.jpg`); // Cambiar el nombre
    const outputPath = path.join(outputDirectory, outputFileName);

    sharp(inputPath)
      .resize(resizeOptions)
      .toFormat(outputFormat, { quality: 100 })
      .toFile(outputPath, (resizeErr, info) => {
        if (resizeErr) {
          console.error(`Error al procesar ${file}:`, resizeErr);
        } else {
          console.log(`Imagen redimensionada y guardada en ${outputPath}`);
        }
      });
  });
});
