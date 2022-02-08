import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';

function Categories() {
  return (
    <BarChart
      style={graphStyle}
      data={data}
      width={screenWidth}
      height={220}
      yAxisLabel="$"
      chartConfig={chartConfig}
      verticalLabelRotation={30}
    />
  );
}

function Category() {
  return;
}

const enhanceWithProps = withObservables(['database'], ({database}) => ({
  categories: database.get('categories').query(),
}));

function enhance(Comp) {
  const CompWithProps = enhanceWithProps(Comp);
  const CompWithDB = withDatabase(CompWithProps);

  return CompWithDB;
}

export {Categories};
