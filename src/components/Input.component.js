import styled from '@emotion/native';
import React from 'react';
import {TextInput} from 'react-native';

import {colors} from '../design/color';
import {spacing} from '../design/spacing';
import {Typography} from './Typography.component';

function Input({autoFocus, name, value, onChangeText, keyboardType, style}) {
  return (
    <>
      <Typography.Heading1>{name}</Typography.Heading1>
      <StyledInput
        autoFocus={autoFocus}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={style}
      />
    </>
  );
}

const StyledInput = styled(TextInput)({
  fontSize: spacing.s4,
  minHeight: spacing.s5,
  borderColor: colors.blue,
  borderRadius: spacing.s1,
  borderWidth: spacing.s0,

  marginTop: spacing.s1,
  marginBottom: spacing.s3,
  padding: spacing.s1,
});

export {Input};
