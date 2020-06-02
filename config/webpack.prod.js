/**
 * @author: tipe.io
 */
const helpers = require('./helpers');
const buildUtils = require('./build-utils');
const APP_COMMON_CONFIG = require('./config.common.json');

/**
 * Used to merge webpack configs
 */
const webpackMerge = require('webpack-merge');

/**
 * The settings that are common to prod and dev
 */
const commonConfig = require('./webpack.common.js');

/**
 * Webpack Plugins
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');
const WorkboxPlugin = require('workbox-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const path = require('path');

/***
 * Ref: https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
 * @param supportES2015
 * @param enableCompress disabling compress could improve the performance, see https://github.com/webpack/webpack/issues/4558#issuecomment-352255789
 * @returns {{ecma: number, warnings: boolean, ie8: boolean, mangle: boolean, compress: {pure_getters: boolean, passes: number}, output: {ascii_only: boolean, comments: boolean}}}
 */
function getUglifyOptions(supportES2015, enableCompress) {
  const uglifyCompressOptions = {
    pure_getters: true /* buildOptimizer */,
    // PURE comments work best with 3 passes.
    // See https://github.com/webpack/webpack/issues/2899#issuecomment-317425926.
    passes: 2 /* buildOptimizer */
  };

  return {
    ecma: supportES2015 ? 6 : 5,
    warnings: false, // TODO verbose based on option?
    ie8: false,
    mangle: true,
    compress: enableCompress ? uglifyCompressOptions : false,
    output: {
      ascii_only: true,
      comments: false
    }
  };
}

module.exports = function(env) {
  const ENV = (process.env.NODE_ENV = process.env.ENV = 'production');
  const supportES2015 = buildUtils.supportES2015(buildUtils.DEFAULT_METADATA.tsConfigPath);
  const sourceMapEnabled = process.env.SOURCE_MAP === '1';
  const PRODUCT = process.env.PRODUCT;
  const LIVE = process.env.LIVE;
  const PLATFORM = process.env.PLATFORM;
  let PRODUCT_METADATA;

  if (PRODUCT === 'TYPESY') {
    if (PLATFORM === 'WEB'){
      if (LIVE === '1') {
        PRODUCT_METADATA = buildUtils.TYPESY_LIVE_BUILD_METADATA;
      }
      else {
        PRODUCT_METADATA = buildUtils.TYPESY_TEST_BUILD_METADATA;
      }
    }
    else if(PLATFORM === 'IPAD'){
      PRODUCT_METADATA = buildUtils.TYPESY_IPAD_BUILD_METADATA;
    }
    else if(PLATFORM === 'ANDROID'){
      PRODUCT_METADATA = buildUtils.TYPESY_ANDROID_BUILD_METADATA;
    }
    else if(PLATFORM === 'ELECTRON'){
      PRODUCT_METADATA = buildUtils.TYPESY_ELECTRON_BUILD_METADATA;
    }
  }
  else {
    PRODUCT_METADATA = buildUtils.DEFAULT_METADATA;
  }

  const METADATA = Object.assign({}, PRODUCT_METADATA, {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080,
    ENV: ENV,
    HMR: false
  });

  // set environment suffix so these environments are loaded.
  METADATA.envFileSuffix = METADATA.E2E ? 'e2e.prod' : 'prod';

  const gzipCompressor = new CompressionPlugin({
    compressionOptions: {
      numiterations: 15,
    },
    algorithm(input, compressionOptions, callback) {
      return zopfli.gzip(input, compressionOptions, callback);
    },
  });

  const brotliCompressor = new CompressionPlugin({
    filename: '[path].br[query]',
    algorithm: 'brotliCompress',
    test: /\.(js|css|html|svg|m3u8|eot|ttf|vtt|json)$/,
    compressionOptions: { level: 11 },
    threshold: 0/* 10240 */, //only assets bigger than this size (in bytes) are compressed/processed
    minRatio: 1/* 0.8 */, //only assets that compress better than this ratio are processed
    deleteOriginalAssets: false,
  });

  var additionalPlugins = [
    new MiniCssExtractPlugin({ filename: '[name]-[hash].css', chunkFilename: '[name]-[chunkhash].css' }),
    new HashedModuleIdsPlugin(),
    new BugsnagSourceMapUploaderPlugin({
      apiKey: APP_COMMON_CONFIG.bugsnagApiKey,
      appVersion: PRODUCT_METADATA.appVersion,
      builderName: APP_COMMON_CONFIG.builderName
    })    
    /* new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }) */
    /* new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
    }) */
  ];

  if (PLATFORM === 'IPAD' || PLATFORM === 'ANDROID') {

  }
  else {
    additionalPlugins = additionalPlugins.concat([gzipCompressor, brotliCompressor]);
  }

  return webpackMerge(commonConfig({ env: ENV, metadata: METADATA }), {
    mode: 'production',

    devtool: 'source-map',

    /**
     * Options affecting the output of the compilation.
     *
     * See: https://webpack.js.org/configuration/output/
     */
    output: {
      /**
       * The output directory as absolute path (required).
       *
       * See: https://webpack.js.org/configuration/output/#output-path
       */
      path: helpers.root('dist'),

      publicPath: PRODUCT_METADATA.cdnLocation,

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: https://webpack.js.org/configuration/output/#output-filename
       */
      filename: '[name].[chunkhash].bundle.js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: https://webpack.js.org/configuration/output/#output-sourcemapfilename
       */
      sourceMapFilename: '[file].map',

      /**
       * The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: https://webpack.js.org/configuration/output/#output-chunkfilename
       */
      chunkFilename: '[name].[chunkhash].chunk.js'
    },

    module: {
      rules: [
        /**
         * Extract CSS files from .src/styles directory to external CSS file
         */
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
          //exclude: [helpers.root('src/app')]
          //include: [path.resolve(__dirname, "src/assets/css")]
          include: [helpers.root('src/assets/css/*')]
        },

        /**
         * Extract and compile SCSS files from .src/styles directory to external CSS file
         */
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          include: [helpers.root('src', 'styles')]
        }
      ]
    },

    optimization: {
      minimizer: [
        /**
         * Plugin: UglifyJsPlugin
         * Description: Minimize all JavaScript output of chunks.
         * Loaders are switched into minimizing mode.
         *
         * See: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
         *
         * NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
         */
        new UglifyJsPlugin({
          sourceMap: sourceMapEnabled,
          parallel: true,
          cache: helpers.root('webpack-cache/uglify-cache'),
          uglifyOptions: getUglifyOptions(supportES2015, true)
        })
        /* new OptimizeCSSAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          }
        }) */
      ],
      splitChunks: {
        chunks: 'all'
      }
    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: https://webpack.js.org/configuration/plugins/
     */
    plugins: additionalPlugins,

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.js.org/configuration/node/
     */
    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      fs: 'empty'
    }
  });
};
