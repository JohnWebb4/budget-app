import React from 'react';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

import {Button} from '../components/Button.component';
import {Category} from '../components/Category.component';
import {Page} from '../components/Page.component';

function CategoryPage({categories, navigation}) {
  function showAddCategory() {
    navigation.push('AddCategory', {});
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

const EnhancedCategoryPage = enhance(CategoryPage);

export {EnhancedCategoryPage as CategoryPage};
