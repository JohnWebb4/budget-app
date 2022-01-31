import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {database} from './model';
import {ModalStackScreen} from './navigation/modal.stack';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <DatabaseProvider database={database}>
      <NavigationContainer>
        <ModalStackScreen />
      </NavigationContainer>
    </DatabaseProvider>
  );
};

export default App;
