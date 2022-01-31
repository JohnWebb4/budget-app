import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AddTransactionPage} from '../pages/AddTransactionPage';
import {CategoriesPage} from '../pages/CategoriesPage';
import {HistoryPage} from '../pages/HistoryPage';
import {SCREENS} from '../constants/screen.constant';

const Tab = createBottomTabNavigator();

const TabStack = () => (
  <Tab.Navigator>
    <Tab.Screen name={SCREENS.ADD_TRANSACTION} component={AddTransactionPage} />
    <Tab.Screen name={SCREENS.HISTORY} component={HistoryPage} />
    <Tab.Screen name={SCREENS.CATEGORIES} component={CategoriesPage} />
  </Tab.Navigator>
);

export {TabStack};
