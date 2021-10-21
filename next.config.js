// const withCss = require('@zeit/next-css')
// const withLess = require('@zeit/next-less')
const path = require("path");

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

// module.exports = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       "@": path.resolve(__dirname),
//       "@components": path.resolve(__dirname, "./components"),
//     //   "@server": path.resolve(__dirname, ".", "server"),
//       "@page": path.resolve(__dirname, ".", "page"),
//       "@public": path.resolve(__dirname, ".", "public"),
//       "@utils": path.resolve(__dirname, ".", "utils"),
//     //   "@store": path.resolve(__dirname, ".", "store"),
//       "@styles": path.resolve(__dirname, ".", "styles"),
//       "@config": path.resolve(__dirname, ".", "config"),
//     };
//     return config;
//   },
// };

module.exports = withCss({ webpack5: false,})