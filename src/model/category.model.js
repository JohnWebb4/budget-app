import {Model} from '@nozbe/watermelondb';
import {children, field} from '@nozbe/watermelondb/decorators';

export class Category extends Model {
  static table = 'categories';

  static associations = {
    transactions: {type: 'has_many', foreignKey: 'category_id'},
  };

  @field('name') name;

  @children('transactions') transactions;
}
