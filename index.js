import {AppRegistry, Platform} from 'react-native';

import App from './src/App.js';
import {name as appName} from './app.json';

import './src/model/index';

// database
//   .write(async () => {
//     await database.unsafeResetDatabase();
//   })
//   .catch(console.error);

AppRegistry.registerComponent(appName, () => App);
