import styled from '@emotion/native';

import React from 'react';
import {Pressable, Text} from 'react-native';
import {colors} from '../design/color';
import {spacing} from '../design/spacing';

function Button({disabled, onPress, title, style}) {
  return (
    <ButtonContainer disabled={disabled} onPress={onPress} style={style}>
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
