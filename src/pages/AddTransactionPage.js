import styled from '@emotion/native';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Picker} from '@react-native-picker/picker';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
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
import {Button} from '../components/Button.component';

function AddTransactionPage({categories, transactions}) {
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState(0);
  const [costText, setCostText] = useState('$0.00');
  const [categoryId, setCategoryId] = useState(categories[0]?.id);
  const [isCategoryBottomSheetVisible, setCategoryBottomSheetVisible] =
    useState(false);

  const categorySpending = useMemo(
    () => getCategorySpending(categories, transactions),
    [categories, transactions],
  );
  const selectedCategory = useMemo(() =>
    categories.find(({id}) => id === categoryId, [categories, categoryId]),
  );
  const selectedCategoryLabel = useMemo(() => {
    if (!categoryId) {
      return 'Please add a category';
    }

    const remaining =
      selectedCategory.budget - categorySpending[selectedCategory.id] - cost;

    return `${selectedCategory.name}: $${Math.abs(remaining).toFixed(2)} ${
      remaining > 0 ? 'Left' : 'Over'
    }`;
  }, [selectedCategory, categorySpending, cost]);
  const snapPoints = useMemo(() => ['40%'], []);

  const bgColor = useSharedValue(1);
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        bgColor.value,
        [0, 0.25, 0.5, 0.75],
        [colors.lightRed, colors.lightYellow, colors.lightGreen, colors.greeen],
      ),
    };
  }, [bgColor.value]);

  useEffect(() => {
    const categorySpending = getCategorySpending(categories, transactions);

    updateBGColor(categoryId, categorySpending, cost);
  }, [categories, transactions]);

  function onChangeCategory(categoryId) {
    updateBGColor(categoryId, categorySpending, cost);

    setCategoryId(categoryId);
  }

  function updateBGColor(
    categoryId,
    categorySpending,
    cost,
    speed = timing.VERY_SLOW_MS,
  ) {
    const selectedCategory = categories.find(({id}) => id === categoryId);

    if (selectedCategory) {
      const selectedCategoryRemaining =
        selectedCategory?.budget - categorySpending[categoryId] ?? 0;

      bgColor.value = withTiming(
        Math.max(
          Math.min(
            1,
            (selectedCategoryRemaining - cost) / selectedCategory.budget,
          ),
          0,
        ),
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
        setCost(0.0);
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
    const cost = Number.parseFloat(costString.replace(/[^\d.]/g, ''));

    updateBGColor(categoryId, categorySpending, cost, timing.SLOW_SM);

    setCost(cost);
    setCostText(costString);
  }

  function onCostSliderChange(value) {
    updateBGColor(categoryId, categorySpending, value, timing.FASTER_MS);

    setCost(value);
    setCostText(`$${value.toFixed(2)}`);
  }

  function toggleCategoryBottomSheet() {
    setCategoryBottomSheetVisible(!isCategoryBottomSheetVisible);
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
      <Typography.Title>Add</Typography.Title>

      <Typography.Heading1>Category</Typography.Heading1>

      <CategoryContainer>
        <Typography.Body1>{selectedCategoryLabel}</Typography.Body1>

        <Button title="Select" onPress={toggleCategoryBottomSheet}></Button>
      </CategoryContainer>

      <Typography.Heading1>Cost</Typography.Heading1>

      <CostInput
        value={costText}
        onChangeText={onCostTextChange}
        keyboardType="numeric"
      />

      <Slider
        disabled={!selectedCategory}
        minimumValue={0}
        maximumValue={selectedCategory?.budget ?? 0}
        minimumTrackTintColor={colors.green}
        maximumTrackTintColor={'#00000022'}
        onValueChange={onCostSliderChange}
      />

      <StyledAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Input
          name="Message"
          value={title}
          onChangeText={setTitle}
          style={{textAlign: 'center'}}
        />
      </StyledAvoidingView>

      <FabButton
        title="Add"
        onPress={onAddTransaction}
        disabled={!selectedCategory}></FabButton>

      {isCategoryBottomSheetVisible ? (
        <BottomSheet
          enablePanDownToClose
          snapPoints={snapPoints}
          onClose={toggleCategoryBottomSheet}>
          <Picker selectedValue={categoryId} onValueChange={onChangeCategory}>
            {categories.map(renderCategory)}
          </Picker>
        </BottomSheet>
      ) : null}
    </Page>
  );
}

const CategoryContainer = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const StyledAvoidingView = styled(KeyboardAvoidingView)({
  marginBottom: spacing.s2,
});

const CostInput = styled(TextInput)({
  fontSize: spacing.s6,
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
