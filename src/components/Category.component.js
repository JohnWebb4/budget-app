import styled from '@emotion/native';
import React from 'react';
import {Text, View} from 'react-native';

function Category({id, name, budget}) {
  return (
    <Container key={id}>
      <Text>{name}</Text>
      <Text>{budget}</Text>
    </Container>
  );
}

const Container = styled(View)({
  backgroundColor: 'red',
  flex: 1,
  flexDirection: 'column',
});

export {Category};
