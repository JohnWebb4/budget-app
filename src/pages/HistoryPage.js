import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

import {Page} from '../components/Page.component';
import {Transaction} from '../components/Transaction.component';

function HistoryPage({transactions}) {
  return (
    <Page>
      <FlatList data={transactions} renderItem={Transaction} />
    </Page>
  );
}

const enhanceWithProps = withObservables(['database'], ({database}) => ({
  transactions: database.get('transactions').query(),
}));

function enhance(Comp) {
  const CompWithProps = enhanceWithProps(Comp);
  const CompWithDB = withDatabase(CompWithProps);

  return CompWithDB;
}

const EnhancedHistoryPage = enhance(HistoryPage);

export {EnhancedHistoryPage as HistoryPage};
