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

async function updateCategory({id, name, budget}) {
  const categoryCollection = database.collections.get('categories');

  await database.write(async () => {
    const category = await categoryCollection.find(id);

    await category.update(record => {
      record.name = name;
      record.budget = budget;
    });
  });
}

async function deleteCategory({id}) {
  const categoryCollection = database.collections.get('categories');

  await database.write(async () => {
    const category = await categoryCollection.find(id);

    await category.markAsDeleted();
  });
}

export {addCategory, deleteCategory, updateCategory};
