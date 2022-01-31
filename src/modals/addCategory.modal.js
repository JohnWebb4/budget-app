import React, {useState} from 'react';

import {addCategory} from '../actions/category.action';
import {Button} from '../components/Button.component';
import {Input} from '../components/Input.component';
import {Page} from '../components/Page.component';

function AddCategoryModal({navigation}) {
  const [name, setName] = useState();
  const [budget, setBudget] = useState();

  async function onAddCategory() {
    try {
      await addCategory({name, budget: parseFloat(budget)});
      setName('');
      setBudget('');

      navigation.pop();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Page>
      <Input name="Name" value={name} onChangeText={setName} />
      <Input
        name="Budget"
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
      />

      <Button title="Add" onPress={onAddCategory}></Button>
    </Page>
  );
}

export {AddCategoryModal};
