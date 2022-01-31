import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MODALS} from '../constants/screen.constant';
import {AddCategoryModal} from '../modals/addCategory.modal';
import {TabStack} from './tab.stack';

const Stack = createStackNavigator();

function ModalStackScreen() {
  return (
    <Stack.Navigator screenOptions={{mode: 'modal'}}>
      <Stack.Screen
        name="Tab"
        component={TabStack}
        options={{
          header: () => null,
          headerTitle: '',
        }}
      />
      <Stack.Screen name={MODALS.ADD_CATEGORY} component={AddCategoryModal} />
    </Stack.Navigator>
  );
}

export {ModalStackScreen};
