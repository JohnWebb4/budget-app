import {database} from '../model/index';

async function addCategory({name, budget}) {
  const categoryCollection = database.collections.get('categories');

  await database.write(async () => {
    await categoryCollection.create(category => {
      category.name = name;
      category.budget = budget;
    });
  });
}

export {addCategory};
