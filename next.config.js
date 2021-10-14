// const withCss = require('@zeit/next-css')
// const withLess = require('@zeit/next-less')

// module.exports = withCss({
//   cssModules: true,
//   ...withLess({
//     lessLoaderOptions: {
//       javascriptEnabled: true,
//     },
//   }),
//   webpack5: false,
// })
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({ webpack5: false,})