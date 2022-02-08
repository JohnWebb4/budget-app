import React from 'react';
import {FlatList} from 'react-native';
import {Q} from '@nozbe/watermelondb';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

import {Categories} from '../components/Categories.component';
import {Page} from '../components/Page.component';
import {Transaction} from '../components/Transaction.component';
import {Typography} from '../components/Typography.component';

function HistoryPage({transactions}) {
  return (
    <Page>
      <Typography.Title>History</Typography.Title>

      <Categories transactions={transactions} />

      <FlatList data={transactions} renderItem={Transaction} />
    </Page>
  );
}

const enhanceWithProps = withObservables(['database'], ({database}) => {
  const thisMonth = new Date();
  thisMonth.setDate(1);
  thisMonth.setHours(0);
  thisMonth.setMilliseconds(0);
  thisMonth.setSeconds(0);

  return {
    transactions: database
      .get('transactions')
      .query(Q.where('date', Q.gte(thisMonth.getTime()))),
  };
});

function enhance(Comp) {
  const CompWithProps = enhanceWithProps(Comp);
  const CompWithDB = withDatabase(CompWithProps);

  return CompWithDB;
}

const EnhancedHistoryPage = enhance(HistoryPage);

export {EnhancedHistoryPage as HistoryPage};
