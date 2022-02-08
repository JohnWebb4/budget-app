import styled from '@emotion/native';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {Q} from '@nozbe/watermelondb';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import {BarChart, PieChart} from 'react-native-chart-kit';

import {Page} from '../components/Page.component';
import {Transaction} from '../components/Transaction.component';
import {Typography} from '../components/Typography.component';
import {colors} from '../design/color';
import {spacing} from '../design/spacing';
import {getCategorySpending} from '../utils/category.util';
import {getCurrentMonth} from '../utils/time.util';

const CHART_CONFIG = {
  backgroundGradientFrom: colors.white,
  backgroundGradientTo: colors.white,
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const CHART_HEIGHT = 250;

function HistoryPage({categories, transactions}) {
  const dimensions = useWindowDimensions();
  const chartWidth = dimensions.width - spacing.s4;

  const categorySpending = getCategorySpending(categories, transactions);

  const spendingData = {
    labels: categories.map(category => category?.name),
    datasets: [
      {
        data: Object.values(categorySpending),
      },
    ],
  };

  const breakdownData = categories.map((category, i) => ({
    name: category.name,
    population: categorySpending[category.id],
    color: category.color,
    legendFontColor: colors.black,
    legendFontSize: spacing.s3,
  }));

  return (
    <Page>
      <Typography.Title>History</Typography.Title>

      <Typography.Heading1>Spending</Typography.Heading1>

      <BarChart
        data={spendingData}
        width={chartWidth}
        height={CHART_HEIGHT}
        fromZero
        yAxisLabel="$"
        xLabelsOffset={-spacing.s2}
        chartConfig={CHART_CONFIG}
        verticalLabelRotation={30}
      />

      <Typography.Heading1>Breakdown</Typography.Heading1>

      <PieChart
        data={breakdownData}
        width={chartWidth}
        height={CHART_HEIGHT}
        chartConfig={CHART_CONFIG}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={spacing.s2}
        center={[0, 0]}
        absolute
      />

      <Typography.Heading1>Transactions</Typography.Heading1>

      {transactions.map(renderTransaction)}
    </Page>
  );
}

function renderTransaction(transaction) {
  return (
    <StyledTransaction
      key={transaction?.id}
      id={transaction?.id}
      cost={transaction?.cost}
      date={transaction?.date}
      title={transaction?.title}
    />
  );
}

const StyledTransaction = styled(Transaction)({
  marginBottom: spacing.s2,
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

const EnhancedHistoryPage = enhance(HistoryPage);

export {EnhancedHistoryPage as HistoryPage};
