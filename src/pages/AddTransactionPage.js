import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

import {addTransaction} from '../actions/transaction.action';
import {Button} from '../components/Button.component';
import {Input} from '../components/Input.component';
import {Page} from '../components/Page.component';
import {Typography} from '../components/Typography.component';

function AddTransactionPage({categories}) {
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const [categoryId, setCategoryId] = useState('');

  async function onAddTransaction() {
    const category = categories.find(({id}) => id === categoryId);

    try {
      await addTransaction({
        title,
        category,
        date: new Date(),
        cost: parseFloat(cost),
      });

      setTitle('');
      setCost('');
      setCategoryId('');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Page>
      <Typography.Title>Cost:</Typography.Title>

      <Input name="Title" value={title} onChangeText={setTitle} />

      <Input
        name="Cost"
        value={cost}
        onChangeText={setCost}
        keyboardType="numeric"
      />

      <Picker selectedValue={categoryId} onValueChange={setCategoryId}>
        {categories.map(renderCategory)}
      </Picker>

      <Button title="Add" onPress={onAddTransaction}></Button>
    </Page>
  );
}

function renderCategory(category) {
  return (
    <Picker.Item key={category.id} label={category.name} value={category.id} />
  );
}

const enhanceWithProps = withObservables(['database'], ({database}) => ({
  categories: database
    .get('categories')
    .query()
    .observeWithColumns(['name', 'budget']),
}));

function enhance(Comp) {
  const CompWithProps = enhanceWithProps(Comp);
  const CompWithDB = withDatabase(CompWithProps);

  return CompWithDB;
}

const EnhancedAddTransactionPage = enhance(AddTransactionPage);

export {EnhancedAddTransactionPage as AddTransactionPage};
