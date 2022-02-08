import {database} from '../model/index';

async function addTransaction({title, category, date, cost}) {
  const transactionCollection = database.collections.get('transactions');

  await database.write(async () => {
    await transactionCollection.create(transaction => {
      transaction.category.set(category);
      transaction.date = date;
      transaction.title = title;
      transaction.cost = cost;
    });
  });
}

async function deleteTransaction({id}) {
  const transactionCollection = database.collections.get('transactions');

  await database.write(async () => {
    const transaction = await transactionCollection.find(id);

    await transaction.markAsDeleted();
  });
}

export {addTransaction, deleteTransaction};
