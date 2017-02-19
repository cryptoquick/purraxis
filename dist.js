const fs = require('fs')
const browserify = require('browserify')
const rollupify = require('rollupify')
const uglify = require('uglify-js')

const date0 = Date.now()

browserify('./client/index.js')
  .transform('babelify', {
    plugins: ['transform-es2015-modules-commonjs'],
    presets: ['es2015', 'stage-3'],
  })
  .transform('rollupify')
  .transform({
    global: true
  }, 'uglifyify')
  .bundle()
  .pipe(fs.createWriteStream('dist/app.js'))
  .on('finish', () => {
    const date1 = Date.now()
    console.log(`${fs.readFileSync('dist/app.js').length} bytes in ${date1 - date0} ms.`)
  })
