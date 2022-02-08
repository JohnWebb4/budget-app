import React, {useState} from 'react';
import {catchError, of} from 'rxjs';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

import {addCategory, updateCategory} from '../actions/category.action';
import {Button} from '../components/Button.component';
import {Input} from '../components/Input.component';
import {Page} from '../components/Page.component';

function AddCategoryModal({navigation, category, route}) {
  const [name, setName] = useState(category?.name);
  const [budget, setBudget] = useState(category?.budget.toString());

  async function onAddCategory() {
    const budgetFloat = parseFloat(budget);

    try {
      if (category?.id) {
        await updateCategory({id: category.id, name, budget: budgetFloat});
      } else {
        await addCategory({name, budget: budgetFloat});
      }

      setName('');
      setBudget('');

      navigation.pop();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Page>
      <Input autoFocus name="Name" value={name} onChangeText={setName} />
      <Input
        name="Budget"
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
      />

      <Button
        title={category?.id ? 'Update' : 'Add'}
        onPress={onAddCategory}></Button>
    </Page>
  );
}

const enhanceWithProps = withObservables(['database'], ({database, route}) => ({
  category: database
    .get('categories')
    .findAndObserve(route?.params?.id)
    .pipe(catchError(err => of(null))),
}));

function enhance(Comp) {
  const CompWithProps = enhanceWithProps(Comp);
  const CompWithDB = withDatabase(CompWithProps);

  return CompWithDB;
}

const EnhancedAddCategoryModal = enhance(AddCategoryModal);

export {EnhancedAddCategoryModal as AddCategoryModal};
