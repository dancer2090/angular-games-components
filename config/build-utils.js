const ts = require('typescript');
const path = require('path');
const fs = require('fs');
const helpers = require('./helpers');

const APP_COMMON_CONFIG = require('./config.common.json');

const DEFAULT_METADATA = {
  title: APP_COMMON_CONFIG.DEFAULT.title,
  appVersion: APP_COMMON_CONFIG.DEFAULT.appVersion,
  description: APP_COMMON_CONFIG.DEFAULT.description,
  baseVer: APP_COMMON_CONFIG.DEFAULT.baseVer,
  cssFileName: APP_COMMON_CONFIG.DEFAULT.cssFileName,
  cdnLocation: APP_COMMON_CONFIG.DEFAULT.cdnLocation,
  baseUrl: APP_COMMON_CONFIG.DEFAULT.baseUrl,  
  googleClientId: APP_COMMON_CONFIG.DEFAULT.googleClientId,  
  isDevServer: helpers.isWebpackDevServer(),
  HMR: helpers.hasProcessFlag('hot'),
  AOT: 0,
  E2E: !!process.env.BUILD_E2E,
  WATCH: helpers.hasProcessFlag('watch'),
  tsConfigPath: 'tsconfig.webpack.json',

  /**
   * This suffix is added to the environment.ts file, if not set the default environment file is loaded (development)
   * To disable environment files set this to null
   */
  envFileSuffix: ''
};

const TYPESY_LIVE_BUILD_METADATA = {
  title: APP_COMMON_CONFIG.TYPESY.title,
  appVersion: APP_COMMON_CONFIG.TYPESY.appVersion,
  description: APP_COMMON_CONFIG.TYPESY.description,
  baseVer: APP_COMMON_CONFIG.TYPESY.live.baseVer,
  cssFileName: APP_COMMON_CONFIG.TYPESY.live.cssFileName,
  cdnLocation: APP_COMMON_CONFIG.TYPESY.live.cdnLocation,
  baseUrl: APP_COMMON_CONFIG.TYPESY.live.baseUrl,  
  googleClientId: APP_COMMON_CONFIG.TYPESY.googleClientId,  
  isDevServer: helpers.isWebpackDevServer(),
  HMR: helpers.hasProcessFlag('hot'),
  AOT: 1,
  E2E: !!process.env.BUILD_E2E,
  WATCH: helpers.hasProcessFlag('watch'),
  tsConfigPath: 'tsconfig.webpack.json',
  envFileSuffix: ''
};

const TYPESY_TEST_BUILD_METADATA = {
  title: APP_COMMON_CONFIG.TYPESY.title,
  appVersion: APP_COMMON_CONFIG.TYPESY.appVersion,
  description: APP_COMMON_CONFIG.TYPESY.description,
  baseVer: APP_COMMON_CONFIG.TYPESY.test.baseVer,
  cssFileName: APP_COMMON_CONFIG.TYPESY.test.cssFileName,
  cdnLocation: APP_COMMON_CONFIG.TYPESY.test.cdnLocation,
  baseUrl: APP_COMMON_CONFIG.TYPESY.test.baseUrl,  
  googleClientId: APP_COMMON_CONFIG.TYPESY.googleClientId,  
  isDevServer: helpers.isWebpackDevServer(),
  HMR: helpers.hasProcessFlag('hot'),
  AOT: 0,
  E2E: !!process.env.BUILD_E2E,
  WATCH: helpers.hasProcessFlag('watch'),
  tsConfigPath: 'tsconfig.webpack.json',
  envFileSuffix: ''
};

const TYPESY_IPAD_BUILD_METADATA = {
  title: APP_COMMON_CONFIG.TYPESY.title,
  appVersion: APP_COMMON_CONFIG.TYPESY.appVersion,
  description: APP_COMMON_CONFIG.TYPESY.description,
  baseVer: APP_COMMON_CONFIG.TYPESY.iPad.baseVer,
  cssFileName: APP_COMMON_CONFIG.TYPESY.iPad.cssFileName,
  cdnLocation: APP_COMMON_CONFIG.TYPESY.iPad.cdnLocation,
  baseUrl: APP_COMMON_CONFIG.TYPESY.iPad.baseUrl,  
  googleClientId: APP_COMMON_CONFIG.TYPESY.googleClientId,  
  isDevServer: helpers.isWebpackDevServer(),
  HMR: helpers.hasProcessFlag('hot'),
  AOT: 1,
  E2E: !!process.env.BUILD_E2E,
  WATCH: helpers.hasProcessFlag('watch'),
  tsConfigPath: 'tsconfig.webpack.json',
  envFileSuffix: ''
};

const TYPESY_ANDROID_BUILD_METADATA = {
  title: APP_COMMON_CONFIG.TYPESY.title,
  appVersion: APP_COMMON_CONFIG.TYPESY.appVersion,
  description: APP_COMMON_CONFIG.TYPESY.description,
  baseVer: APP_COMMON_CONFIG.TYPESY.android.baseVer,
  cssFileName: APP_COMMON_CONFIG.TYPESY.android.cssFileName,
  cdnLocation: APP_COMMON_CONFIG.TYPESY.android.cdnLocation,
  baseUrl: APP_COMMON_CONFIG.TYPESY.android.baseUrl,  
  googleClientId: APP_COMMON_CONFIG.TYPESY.googleClientId,  
  isDevServer: helpers.isWebpackDevServer(),
  HMR: helpers.hasProcessFlag('hot'),
  AOT: 1,
  E2E: !!process.env.BUILD_E2E,
  WATCH: helpers.hasProcessFlag('watch'),
  tsConfigPath: 'tsconfig.webpack.json',
  envFileSuffix: ''
};

const TYPESY_ELECTRON_BUILD_METADATA = {
  title: APP_COMMON_CONFIG.TYPESY.title,
  appVersion: APP_COMMON_CONFIG.TYPESY.appVersion,
  description: APP_COMMON_CONFIG.TYPESY.description,
  baseVer: APP_COMMON_CONFIG.TYPESY.electron.baseVer,
  cssFileName: APP_COMMON_CONFIG.TYPESY.electron.cssFileName,
  cdnLocation: APP_COMMON_CONFIG.TYPESY.electron.cdnLocation,
  baseUrl: APP_COMMON_CONFIG.TYPESY.electron.baseUrl,  
  googleClientId: APP_COMMON_CONFIG.TYPESY.googleClientId,  
  isDevServer: helpers.isWebpackDevServer(),
  HMR: helpers.hasProcessFlag('hot'),
  AOT: 1,
  E2E: !!process.env.BUILD_E2E,
  WATCH: helpers.hasProcessFlag('watch'),
  tsConfigPath: 'tsconfig.webpack.json',
  envFileSuffix: ''
};

const PREPED_TEST_BUILD_METADATA = {
  title: APP_COMMON_CONFIG.title,
  description: APP_COMMON_CONFIG.description,
  baseVer: APP_COMMON_CONFIG.baseVer,
  cssFileName: APP_COMMON_CONFIG.cssFileName,
  cdnLocation: 'https://resources.ereflect.com/PrepEd/webApp/',
  baseUrl: '/apps/test2/',
  googleClientId: '1043885528797-deb5juftahpeiq9a4q87vq3sieeoj9s6.apps.googleusercontent.com',
  isDevServer: helpers.isWebpackDevServer(),
  HMR: helpers.hasProcessFlag('hot'),
  AOT: 1,
  E2E: !!process.env.BUILD_E2E,
  WATCH: helpers.hasProcessFlag('watch'),
  tsConfigPath: 'tsconfig.webpack.json',
  envFileSuffix: ''
};

function supportES2015(tsConfigPath) {
  if (!supportES2015.hasOwnProperty('supportES2015')) {
    const tsTarget = readTsConfig(tsConfigPath).options.target;
    supportES2015['supportES2015'] = tsTarget !== ts.ScriptTarget.ES3 && tsTarget !== ts.ScriptTarget.ES5;
  }
  return supportES2015['supportES2015'];
}

function readTsConfig(tsConfigPath) {
  const configResult = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
  return ts.parseJsonConfigFileContent(configResult.config, ts.sys,
    path.dirname(tsConfigPath), undefined, tsConfigPath);
}

function getEnvFile(suffix) {
  if (suffix && suffix[0] !== '.') {
    suffix = '.' + suffix;
  }

  if (suffix === null) {
    return;
  }

  let fileName = helpers.root(`src/environments/environment${suffix}.ts`);
  if (fs.existsSync(fileName)) {
    return fileName;
  } else if (fs.existsSync(fileName = helpers.root('src/environments/environment.ts'))) {
    console.warn(`Could not find environment file with suffix ${suffix}, loading default environment file`);
    return fileName;
  } else {
    throw new Error('Environment file not found.')
  }
}

/**
 * Read the tsconfig to determine if we should prefer ES2015 modules.
 * Load rxjs path aliases.
 * https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md#build-and-treeshaking
 * @param supportES2015 Set to true when the output of typescript is >= ES6
 */
function rxjsAlias(supportES2015) {
  try {
    const rxjsPathMappingImport = supportES2015 ? 'rxjs/_esm2015/path-mapping' : 'rxjs/_esm5/path-mapping';
    const rxPaths = require(rxjsPathMappingImport);
    return rxPaths(helpers.root('node_modules'));
  } catch (e) {
    return {};
  }
}

function ngcWebpackSetup(prod, metadata) {
  if (!metadata) {
    metadata = DEFAULT_METADATA;
  }

  const buildOptimizer = prod && metadata.AOT;
  const sourceMap = true; // TODO: apply based on tsconfig value?
  const ngcWebpackPluginOptions = {
    skipCodeGeneration: !metadata.AOT,
    sourceMap,
    /* compilerOptions: {
      enableIvy: 'ngtsc'
    } */
  };

  const environment = getEnvFile(metadata.envFileSuffix);
  if (environment) {
    ngcWebpackPluginOptions.hostReplacementPaths = {
      [helpers.root('src/environments/environment.ts')]: environment
    }
  }

  if (!prod && metadata.WATCH) {
    // Force commonjs module format for TS on dev watch builds.
    ngcWebpackPluginOptions.compilerOptions = {
      module: 'commonjs'
    };
  }

  const buildOptimizerLoader = {
    loader: '@angular-devkit/build-optimizer/webpack-loader',
    options: {
      sourceMap
    }
  };

  const loaders = [
    {
      test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
      use: buildOptimizer ? [ buildOptimizerLoader, '@ngtools/webpack' ] : [ '@ngtools/webpack' ]
    },
    ...buildOptimizer
      ? [ { test: /\.js$/, use: [ buildOptimizerLoader ] } ]
      : []
  ];

  return {
    loaders,
    plugin: ngcWebpackPluginOptions
  };
}


exports.DEFAULT_METADATA = DEFAULT_METADATA;
exports.TYPESY_TEST_BUILD_METADATA = TYPESY_TEST_BUILD_METADATA;
exports.TYPESY_LIVE_BUILD_METADATA = TYPESY_LIVE_BUILD_METADATA;
exports.TYPESY_IPAD_BUILD_METADATA = TYPESY_IPAD_BUILD_METADATA;
exports.TYPESY_ANDROID_BUILD_METADATA = TYPESY_ANDROID_BUILD_METADATA;
exports.TYPESY_ELECTRON_BUILD_METADATA = TYPESY_ELECTRON_BUILD_METADATA;
exports.supportES2015 = supportES2015;
exports.readTsConfig = readTsConfig;
exports.getEnvFile = getEnvFile;
exports.rxjsAlias = rxjsAlias;
exports.ngcWebpackSetup = ngcWebpackSetup;
