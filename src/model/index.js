import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import migrations from './migrations';
import {Category} from './category.model';
import {Transaction} from './transaction.model.js';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: true,
  onSetUpError: error => {},
});

const database = new Database({
  adapter,
  modelClasses: [Category, Transaction],
});

export {database};
