import styled from '@emotion/native';

import React from 'react';
import {Pressable, Text} from 'react-native';
import {colors} from '../design/color';
import {spacing} from '../design/spacing';

function Button({onPress, title}) {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonTitle>{title}</ButtonTitle>
    </ButtonContainer>
  );
}

const ButtonContainer = styled(Pressable)({
  backgroundColor: colors.lightBlue,
  borderRadius: spacing.s2,
  padding: spacing.s2,
});

const ButtonTitle = styled(Text)({
  fontSize: spacing.s4,
  textAlign: 'center',
});

export {Button};
