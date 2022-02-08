import styled from '@emotion/native';
import React from 'react';
import {Text, TextInput} from 'react-native';

import {colors} from '../design/color';
import {spacing} from '../design/spacing';

function Input({autoFocus, name, value, onChangeText, keyboardType}) {
  return (
    <>
      <Text>{name}</Text>
      <StyledInput
        autoFocus={autoFocus}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </>
  );
}

const StyledInput = styled(TextInput)({
  borderColor: colors.blue,
  borderRadius: spacing.s1,
  borderWidth: spacing.s0,

  marginTop: spacing.s1,
  marginBottom: spacing.s3,
  padding: spacing.s1,
});

export {Input};
