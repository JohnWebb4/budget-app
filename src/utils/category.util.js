function getCategorySpending(categories, transactions) {
  const summedTransactions = transactions.reduce((memo, transaction) => {
    if (memo[transaction._raw['category_id']]) {
      memo[transaction._raw['category_id']] += transaction?.cost;
    } else {
      memo[transaction._raw['category_id']] = transaction?.cost;
    }

    return memo;
  }, {});

  const categorySpending = categories.reduce(
    (memo, category) => ({
      ...memo,
      [category.id]: 0,
    }),
    {},
  );

  if (categorySpending['unknown']) {
    categorySpending['unknown'] = 0;
  }

  Object.keys(summedTransactions).forEach(id => {
    if (categorySpending[id] !== undefined) {
      categorySpending[id] = summedTransactions[id];
    } else {
      categorySpending['unknown'] = summedTransactions[id];
    }
  });

  return categorySpending;
}

export {getCategorySpending};
