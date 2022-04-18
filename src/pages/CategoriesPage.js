import React from 'react';
import styled from '@emotion/native';
import {View} from 'react-native';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

import {Button} from '../components/Button.component';
import {CategoryItem} from '../components/CategoryItem.component';
import {Page} from '../components/Page.component';
import {MODALS} from '../constants/screen.constant';
import {spacing} from '../design/spacing';
import {Typography} from '../components/Typography.component';
import {deleteCategory as deleteCategoryAction} from '../actions/category.action';

function CategoriesPage({categories, navigation}) {
  function showAddCategory({id}) {
    navigation.push(MODALS.ADD_CATEGORY, {id});
  }

  function deleteCategory({id}) {
    deleteCategoryAction({id});
  }

  function renderCategory({id, name, budget}) {
    return (
      <Category
        key={id}
        id={id}
        name={name}
        budget={budget}
        onDelete={deleteCategory}
        onEdit={showAddCategory}
      />
    );
  }

  return (
    <Page
      isScrollView
      contentContainerStyle={{
        justifyContent: 'space-between',
        minHeight: '10%',
      }}>
      <View>
        <Typography.Title>Categories</Typography.Title>
        {categories.map(renderCategory)}
      </View>

      <AddButton title="Add category" onPress={showAddCategory}></AddButton>
    </Page>
  );
}

const AddButton = styled(Button)({
  marginTop: spacing.s4,
});

const Category = styled(CategoryItem)({
  marginBottom: spacing.s2,
});

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

const EnhancedCategoriesPage = enhance(CategoriesPage);

export {EnhancedCategoriesPage as CategoriesPage};
