import camelCase from 'lodash/camelCase';

const requireModule = require.context('./', false, /\.svg$/);
const modules = {};

requireModule.keys().forEach((fileName) => {
  if (fileName === './index.js') return;
  const moduleName = camelCase(
    fileName.replace(/(\.\/|\.svg)/g, ''),
  );
  modules[moduleName] = requireModule(fileName);
});

export default modules;
