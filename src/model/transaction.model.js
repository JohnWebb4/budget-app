import {Model} from '@nozbe/watermelondb';
import {date, field, relation} from '@nozbe/watermelondb/decorators';

export class Transaction extends Model {
  static table = 'transactions';

  @relation('categories', 'category_id') category;

  @field('title') title;
  @date('date') date;
  @field('cost') cost;
}
