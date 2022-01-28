import styled from '@emotion/native';
import React, {useState} from 'react';
import {Text, TextInput} from 'react-native';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

import {addTransaction} from '../actions/transaction.action';
import {Button} from '../components/Button.component';
import {Page} from '../components/Page.component';
import {colors} from '../design/color';
import {spacing} from '../design/spacing';

function AddPage({transactions}) {
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');

  async function onAddTransaction() {
    await addTransaction({title, date: new Date(), cost: parseFloat(cost)});

    setTitle('');
    setCost('');
  }

  return (
    <Page>
      <Title>Enter:</Title>

      <Text>Title</Text>
      <Input autoFocus value={title} onChangeText={setTitle} />

      <Text>Cost</Text>
      <Input value={cost} onChangeText={setCost} keyboardType="numeric" />

      <Button title="Add" onPress={onAddTransaction}></Button>
    </Page>
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
const Input = styled(TextInput)({
  borderColor: colors.blue,
  borderRadius: spacing.s1,
  borderWidth: spacing.s0,

  marginTop: spacing.s1,
  marginBottom: spacing.s3,
  padding: spacing.s1,
});

const Title = styled(Text)({
  marginTop: spacing.s3,
  marginBottom: spacing.s4,
  fontSize: spacing.s4,
  textAlign: 'center',
});

const EnhancedAddPage = enhance(AddPage);

export {EnhancedAddPage as AddPage};
