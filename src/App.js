import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {database} from './model';
import {CategoryStackScreen} from './navigation/category.stack';
import {AddTransactionPage} from './pages/AddTransactionPage';
import {HistoryPage} from './pages/HistoryPage';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <DatabaseProvider database={database}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Add" component={AddTransactionPage} />
          <Tab.Screen name="History" component={HistoryPage} />
          <Tab.Screen name="Categories" component={CategoryStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </DatabaseProvider>
  );
};

export default App;
