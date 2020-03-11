1. npm run build
2. you can find the source map below dist/map
3. map file missing sourcesContent, cause the source map broke.

change to ~~uglifyjs-webpack-plugin 1.2.4~~ terser-webpack-plugin **v1.1.0** and it works fine
