import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {AddCategoryModal} from '../modals/addCategory.modal';
import {CategoryPage} from '../pages/CategoryPage';

const CategoryStack = createStackNavigator();

const CategoryStackScreen = () => (
  <CategoryStack.Navigator>
    <CategoryStack.Screen name="CategoryPage" component={CategoryPage} />
    <CategoryStack.Screen name="AddCategory" component={AddCategoryModal} />
  </CategoryStack.Navigator>
);

export {CategoryStackScreen};
