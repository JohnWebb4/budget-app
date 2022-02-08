import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'transactions',
      columns: [
        {name: 'category_id', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'color', type: 'string'},
        {name: 'cost', type: 'number'},
        {name: 'date', type: 'number', isIndexed: true},
      ],
    }),
    tableSchema({
      name: 'categories',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'budget', type: 'number'},
      ],
    }),
  ],
});
