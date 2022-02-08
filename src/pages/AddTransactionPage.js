import styled from '@emotion/native';
import {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Picker} from '@react-native-picker/picker';
import {Alert, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Q} from '@nozbe/watermelondb';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import Snackbar from 'react-native-snackbar';
import Slider from '@react-native-community/slider';

import {addTransaction} from '../actions/transaction.action';
import {FabButton} from '../components/FabButton.component';
import {Input} from '../components/Input.component';
import {Page} from '../components/Page.component';
import {Typography} from '../components/Typography.component';
import {getCategorySpending} from '../utils/category.util';
import {getCurrentMonth} from '../utils/time.util';
import {colors} from '../design/color';
import {spacing} from '../design/spacing';
import {timing} from '../design/timing';
import {SafeAreaView} from 'react-native-safe-area-context';

function AddTransactionPage({categories, transactions}) {
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState(0);
  const [categoryId, setCategoryId] = useState(categories[0]?.id);
  const [categorySpending, setCategorySpending] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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

    updateBGColor(categoryId, categorySpending, cost);

    setCategorySpending(categorySpending);
  }, [categories, transactions]);

  function onChangeCategory(categoryId) {
    const selectedCategory = categories.find(({id}) => id === categoryId);

    updateBGColor(categoryId, categorySpending, cost);

    setCategoryId(categoryId);
    setSelectedCategory(selectedCategory);
  }

  function updateBGColor(
    categoryId,
    categorySpending,
    cost,
    speed = timing.SLOW_MS,
  ) {
    const selectedCategory = categories.find(({id}) => id === categoryId);

    if (selectedCategory) {
      const selectedCategoryRemaining =
        selectedCategory?.budget - categorySpending[categoryId] ?? 0;

      bgColor.value = withTiming(
        (selectedCategoryRemaining - cost) / selectedCategory.budget,
        {
          duration: speed,
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

  function onCostTextChange(costString) {
    const cost = costString.replace(/[^\d.]/g, '');

    updateBGColor(categoryId, categorySpending, cost, timing.FASTER_MS);

    setCost(Number.parseFloat(cost));
  }

  function onCostSliderChange(value) {
    updateBGColor(categoryId, categorySpending, value, timing.FASTER_MS);

    setCost(value);
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
      <SafeAreaView>
        <Typography.Title>Cost:</Typography.Title>

        <Input
          name="Title"
          value={title}
          onChangeText={setTitle}
          style={{textAlign: 'center'}}
        />

        <Typography.Heading1>Category</Typography.Heading1>

        <Picker selectedValue={categoryId} onValueChange={onChangeCategory}>
          {categories.map(renderCategory)}
        </Picker>

        <CostInput
          value={`$${cost.toFixed(2)}`}
          onChangeText={onCostTextChange}
          keyboardType="numeric"
        />

        <Slider
          minimumValue={0}
          maximumValue={selectedCategory.budget}
          minimumTrackTintColor={colors.green}
          maximumTrackTintColor={'#00000022'}
          onValueChange={onCostSliderChange}
        />
      </SafeAreaView>

      <FabButton title="Add" onPress={onAddTransaction}></FabButton>
    </Page>
  );
}

const CostInput = styled(TextInput)({
  marginTop: spacing.s4,
  fontSize: spacing.s5,
  textAlign: 'center',
});

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
