import {database} from '../model/index';

async function addTransaction({title, date, cost}) {
  const transactionCollection = database.collections.get('transactions');

  await database.write(async () => {
    await transactionCollection.create(transaction => {
      transaction.date = date;
      transaction.title = title;
      transaction.cost = cost;
    });
  });
}

export {addTransaction};
