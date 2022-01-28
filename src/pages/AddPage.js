import React, {useState} from 'react';
import {FlatList, SafeAreaView, ScrollView, TextInput} from 'react-native';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

import {Transaction} from '../components/Transaction.component';

function AddPage({transactions}) {
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState(0);

  return (
    <SafeAreaView>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{backgroundColor: 'red'}}
      />

      <TextInput
        value={cost}
        onChangeText={setCost}
        style={{backgroundColor: 'blue'}}
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
}

const enhanceWithProps = withObservables([], ({database}) => ({
  transactions: database.get('transactions').query(),
}));

function enhance(Comp) {
  const CompWithProps = enhanceWithProps(Comp);
  const CompWithDB = withDatabase(CompWithProps);

  return CompWithDB;
}

const EnhancedAddPage = enhance(AddPage);

export {EnhancedAddPage as AddPage};
