import {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Picker} from '@react-native-picker/picker';
import {Alert, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Q} from '@nozbe/watermelondb';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import Snackbar from 'react-native-snackbar';

import {addTransaction} from '../actions/transaction.action';
import {FabButton} from '../components/FabButton.component';
import {Input} from '../components/Input.component';
import {Page} from '../components/Page.component';
import {Typography} from '../components/Typography.component';
import {getCategorySpending} from '../utils/category.util';
import {getCurrentMonth} from '../utils/time.util';
import {colors} from '../design/color';
import {timing} from '../design/timing';

function AddTransactionPage({categories, transactions}) {
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id);
  const [categorySpending, setCategorySpending] = useState({});

  const bgColor = useSharedValue(0);
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        bgColor.value,
        [-1, 1],
        [colors.lightRed, colors.lightGreen],
      ),
    };
  }, [bgColor.value]);

  useEffect(() => {
    const categorySpending = getCategorySpending(categories, transactions);

    updateBGColor(categoryId, categorySpending);

    setCategorySpending(categorySpending);
  }, [categories, transactions]);

  function onChangeCategory(categoryId) {
    updateBGColor(categoryId, categorySpending);

    setCategoryId(categoryId);
  }

  function updateBGColor(categoryId, categorySpending) {
    const selectedCategory = categories.find(({id}) => id === categoryId);

    if (selectedCategory) {
      const selectedCategoryRemaining =
        selectedCategory?.budget - categorySpending[categoryId] ?? 0;

      bgColor.value = withTiming(
        selectedCategoryRemaining / selectedCategory.budget,
        {
          duration: timing.SLOW_MS,
        },
      );
    }
  }

  async function onAddTransaction() {
    if (categoryId && title && cost) {
      const category = categories.find(({id}) => id === categoryId);

      try {
        await addTransaction({
          title,
          category,
          date: new Date(),
          cost: parseFloat(cost),
        });

        setTitle('');
        setCost('');
        Snackbar.show({
          text: 'Successfully added Transaction',
        });
      } catch (e) {
        console.error(e);

        Snackbar.show({
          text: 'Failed to add transaction',
        });
      }
    } else {
      Alert.alert('Missing', 'Please fill in a title cost and category.');
    }
  }

  function renderCategory(category) {
    const remaining = category.budget - categorySpending[category.id];

    return (
      <Picker.Item
        key={category.id}
        label={`${category.name}: $${Math.abs(remaining)} ${
          remaining > 0 ? 'Left' : 'Over'
        }`}
        value={category.id}
      />
    );
  }

  return (
    <Page style={animatedContainerStyle}>
      <Typography.Title>Cost:</Typography.Title>

      <Input name="Title" value={title} onChangeText={setTitle} />

      <Input
        name="Cost"
        value={cost}
        onChangeText={setCost}
        keyboardType="numeric"
      />

      <Picker selectedValue={categoryId} onValueChange={onChangeCategory}>
        {categories.map(renderCategory)}
      </Picker>

      <FabButton title="Add" onPress={onAddTransaction}></FabButton>
    </Page>
  );
}

const enhanceWithProps = withObservables(['database'], ({database}) => {
  const thisMonth = getCurrentMonth();

  return {
    categories: database
      .get('categories')
      .query()
      .observeWithColumns(['name', 'budget']),
    transactions: database
      .get('transactions')
      .query(Q.where('date', Q.gte(thisMonth.getTime()))),
  };
});

function enhance(Comp) {
  const CompWithProps = enhanceWithProps(Comp);
  const CompWithDB = withDatabase(CompWithProps);

  return CompWithDB;
}

const EnhancedAddTransactionPage = enhance(AddTransactionPage);

export {EnhancedAddTransactionPage as AddTransactionPage};
