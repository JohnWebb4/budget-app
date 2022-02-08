import React from 'react';
import {Text, View} from 'react-native';
import styled from '@emotion/native';

import {spacing} from '../design/spacing';

function Transaction({item}) {
  return (
    <Container>
      <Text>{item.title}</Text>
      <Text>{item.cost}</Text>
      <Text>{item.date.toString()}</Text>
    </Container>
  );
}

const Container = styled(View)({
  flexDirection: 'row',
  backgroundColor: 'red',
  margin: spacing.s2,
});

export {Transaction};
