const { src, dest, watch, parallel, series } = require('gulp');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const resizer = require('gulp-images-resizer');
const rename = require('gulp-rename');
const jpegRec = require('imagemin-jpeg-recompress');
const gulpif = require('gulp-if');

const paths = {
    imagenes: 'src/img/**/*', // 4 // 1
    imagenesDestino: 'build/img/**/*',
    imagenesThumbs: 'build/img/thumb/**/*',
    destino: 'build/img', // 4 // 1
    thumbs: 'build/img/thumb',
    destinoGde: 'build/img/gde'
}

// .pipe(rename({ suffix: '_ejemplo' })) // Agregar sufijo, colocar antes de .pipe(dest())


function thumbs(done) {
    const opts = {
        height: 600,
        quality: 80

    };
    src(paths.imagenesDestino + '.{png,jpg}')
        .pipe(resizer(opts))
        .pipe(rename({ suffix: '_thumb' }))
        .pipe(dest(paths.thumbs))
        
    done();
}

function versionWebpThumb(done) {
    const opciones = {
        quality: 70
    };
    src(paths.imagenesThumbs + '.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest(paths.thumbs))
    done();
}

function versionAvifThumb(done) {
    const opciones = {
        quality: 50
    };
    src(paths.imagenesThumbs + '.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest(paths.thumbs))
    done();
}

function gdeResize(done) {
    const opts = {
        height: 550, // puede ser un porcentaje, el tipo de dato es un string como "50%"
        quality: 100

    };
    src(paths.imagenes + '.{png,jpg}')
        .pipe(resizer(opts))
        .pipe(dest(paths.destinoGde))
        
    done();
}

// function imagenes() {
//     return src(paths.imagenes)
//         .pipe(cache(imagemin({ optimizationLevel: 3 })))
//         .pipe(dest(paths.destino))
// }


// Convierte PNG en JPG y comprime cualquiera de los dos
function imagenes() {
    return src(paths.imagenes)
      .pipe(gulpif('*.png', cache(imagemin([
        jpegRec({
          loops: 6,
          min: 65,
          max: 70,
          quality: 'medium',
        }),
      ])))
      .pipe(rename({ extname: '.jpg' }))
      )
      .pipe(gulpif('*.jpg', cache(imagemin([
        imagemin.mozjpeg({
          quality: 70,
        }),
      ]))))
      .pipe(dest(paths.destino));
  }

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    src(paths.imagenes + '.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest(paths.destino))
    done();
}

function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    src(paths.imagenes + '.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest(paths.destino))
    done();
}

// activar watch
function wImagenes(done) {
    watch(paths.imagenes, imagenes)
    watch(paths.imagenes, versionWebp)
    watch(paths.imagenes, versionAvif)
    done()
}

exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.versionWebpThumb = versionWebpThumb;
exports.versionAvifThumb = versionAvifThumb;

// Seguir orden, no todos los metodos toman las imagenes originales
// 1_ imagenes grandes a todas las versiones
// 2_ thumbs de la version jpg
// 3_ thumbs en todas las versiones
// 4_ version JPG

exports.gdeResize = gdeResize; // 5_ resize grandes

exports.imgJpg = imagenes; // 4_ JPG

exports.img = parallel(imagenes, versionWebp, versionAvif); // 1_ Img

exports.thumbs = thumbs; // 2_ Thumbs

exports.thumbsWA = parallel(versionWebpThumb, versionAvifThumb); // 3_ Thumbs img

exports.wImg = parallel(imagenes, versionWebp, versionAvif, wImagenes); // con watch

// npm run thumbsWA (example)