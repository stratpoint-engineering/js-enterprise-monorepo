const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: [options.entry],
    externals: [
      nodeExternals({
        allowlist: [],
      }),
    ],
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        // Add a rule to handle HTML files in node-pre-gyp
        {
          test: /\.html$/,
          use: "null-loader",
        },
        // Add a rule to handle C# files in node-gyp
        {
          test: /\.cs$/,
          use: "null-loader",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      fallback: {
        // Provide empty mocks for Node.js modules
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        zlib: false,
        http: false,
        https: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        aws4: false,
        "aws-sdk": false,
        nock: false,
        "mock-aws-s3": false,
        "mongodb-client-encryption": false,
        "gcp-metadata": false,
        snappy: false,
        "@aws-sdk/credential-providers": false,
        "@mongodb-js/zstd": false,
        kerberos: false,
        "@mapbox/node-pre-gyp": false,
      },
    },
    plugins: [
      ...options.plugins.filter(
        (plugin) =>
          // Filter out HotModuleReplacementPlugin
          !(plugin instanceof webpack.HotModuleReplacementPlugin)
      ),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      // Add DefinePlugin to mock bcrypt in development
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV || "development"
        ),
      }),
      // Ignore native modules
      new webpack.IgnorePlugin({
        resourceRegExp: /^(node-pre-gyp|aws-sdk|nock|@mapbox\/node-pre-gyp)$/,
      }),
    ],
    ignoreWarnings: [
      // Ignore warnings about these modules
      { message: /Can't resolve '@mapbox\/node-pre-gyp'/ },
      { message: /Can't resolve 'node-gyp'/ },
      { message: /Can't resolve 'kerberos'/ },
      { message: /Can't resolve '@mongodb-js\/zstd'/ },
      { message: /Can't resolve '@aws-sdk\/credential-providers'/ },
      { message: /Can't resolve 'gcp-metadata'/ },
      { message: /Can't resolve 'snappy'/ },
      { message: /Can't resolve 'aws4'/ },
      { message: /Can't resolve 'mongodb-client-encryption'/ },
      { message: /Can't resolve 'mock-aws-s3'/ },
      { message: /Can't resolve 'aws-sdk'/ },
      { message: /Can't resolve 'nock'/ },
      {
        message:
          /Critical dependency: the request of a dependency is an expression/,
      },
    ],
  };
};
