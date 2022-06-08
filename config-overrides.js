module.exports = function override(config, env) {
  if (!config.resolve) {
    config.resolve ={
      alias: {
        "react/jsx-runtime.js": "react/jsx-runtime",
        "react/jsx-dev-runtime.js": "react/jsx-dev-runtime",
        'react-bootstrap-table2-toolkit-css': 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css',
        'react-bootstrap-table2-toolkit': `react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.js`,
      }
    };
  }else {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "react/jsx-runtime.js": "react/jsx-runtime",
        "react/jsx-dev-runtime.js": "react/jsx-dev-runtime",
        'react-bootstrap-table2-toolkit-css': 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css',
        'react-bootstrap-table2-toolkit': `react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.js`,
      }
    }
  }

  return config;
}