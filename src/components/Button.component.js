import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

import React from 'react';
import {Pressable, Text} from 'react-native';
import {colors} from '../design/color';
import {spacing} from '../design/spacing';

function Button({disabled, onPress, title, style}) {
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <ButtonContainer style={style}>
        <ButtonTitle>{title}</ButtonTitle>
      </ButtonContainer>
    </Pressable>
  );
}

const ButtonContainer = styled(Animated.View)({
  backgroundColor: colors.lightBlue,
  borderRadius: spacing.s2,
  padding: spacing.s2,
});

const ButtonTitle = styled(Text)({
  fontSize: spacing.s4,
  textAlign: 'center',
});

export {Button};
