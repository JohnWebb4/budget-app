import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {database} from './model';
import {AddPage} from './pages/AddPage';
import {HistoryPage} from './pages/HistoryPage';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <DatabaseProvider database={database}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Add" component={AddPage} />
          <Tab.Screen name="History" component={HistoryPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </DatabaseProvider>
  );
};

export default App;
