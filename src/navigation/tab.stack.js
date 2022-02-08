import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AddTransactionPage} from '../pages/AddTransactionPage';
import {CategoriesPage} from '../pages/CategoriesPage';
import {HistoryPage} from '../pages/HistoryPage';
import {SCREENS} from '../constants/screen.constant';

const Tab = createBottomTabNavigator();
const addActiveIcon = require('../images/add-active.png');
const addInactiveIcon = require('../images/add-inactive.png');
const categoryActiveIcon = require('../images/category-active.png');
const categoryInactiveIcon = require('../images/category-inactive.png');
const historyActiveIcon = require('../images/history-active.png');
const historyInactiveIcon = require('../images/history-inactive.png');

const TabStack = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={SCREENS.ADD_TRANSACTION}
      component={AddTransactionPage}
      options={{
        tabBarIcon: AddIcon,
      }}
    />
    <Tab.Screen
      name={SCREENS.HISTORY}
      component={HistoryPage}
      options={{
        tabBarIcon: HistoryIcon,
      }}
    />
    <Tab.Screen
      name={SCREENS.CATEGORIES}
      component={CategoriesPage}
      options={{
        tabBarIcon: CategoryIcon,
      }}
    />
  </Tab.Navigator>
);

function getTabIcon({activeIcon, inactiveIcon}) {
  return function ({focused, size = 30}) {
    if (focused) {
      return (
        <Image source={activeIcon} style={{height: size, aspectRatio: 1}} />
      );
    }

    return (
      <Image source={inactiveIcon} style={{height: size, aspectRatio: 1}} />
    );
  };
}

const AddIcon = getTabIcon({
  activeIcon: addActiveIcon,
  inactiveIcon: addInactiveIcon,
});

const HistoryIcon = getTabIcon({
  activeIcon: historyActiveIcon,
  inactiveIcon: historyInactiveIcon,
});

const CategoryIcon = getTabIcon({
  activeIcon: categoryActiveIcon,
  inactiveIcon: categoryInactiveIcon,
});

export {TabStack};
