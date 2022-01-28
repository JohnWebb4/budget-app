import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'transactions',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'cost', type: 'string'},
        {name: 'date', type: 'number', isIndexed: true},
      ],
    }),
  ],
});
