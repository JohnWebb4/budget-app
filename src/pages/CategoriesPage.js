import React from 'react';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

import {Button} from '../components/Button.component';
import {Category} from '../components/Category.component';
import {Page} from '../components/Page.component';
import {MODALS} from '../constants/screen.constant';

function CategoriesPage({categories, navigation}) {
  function showAddCategory() {
    navigation.push(MODALS.ADD_CATEGORY, {});
  }

  return (
    <Page>
      {categories.map(Category)}

      <Button title="Add category" onPress={showAddCategory}></Button>
    </Page>
  );
}

const enhanceWithProps = withObservables(['database'], ({database}) => ({
  categories: database.get('categories').query(),
}));

function enhance(Comp) {
  const CompWithProps = enhanceWithProps(Comp);
  const CompWithDB = withDatabase(CompWithProps);

  return CompWithDB;
}

const EnhancedCategoriesPage = enhance(CategoriesPage);

export {EnhancedCategoriesPage as CategoriesPage};
