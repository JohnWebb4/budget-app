import {AppRegistry, Platform} from 'react-native';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import App from './src/App.js';
import {name as appName} from './app.json';
import schema from './src/db//model/schema';
import migrations from './src/db/model/migrations';
import {Transaction} from './src/db/model/transaction.js';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: true,
  onSetUpError: error => {},
});

const database = new Database({
  adapter,
  modelClasses: [Transaction],
});

AppRegistry.registerComponent(appName, () => App);
