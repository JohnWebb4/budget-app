import React from 'react';
import Animated from 'react-native-reanimated';
import styled from '@emotion/native';

import {spacing} from '../design/spacing';

function Page({contentContainerStyle, children, isScrollView, style}) {
  if (isScrollView) {
    return (
      <StyledScollView
        contentContainerStyle={[
          {minHeight: '100%', paddingBottom: spacing.s6},
          contentContainerStyle,
        ]}
        style={[{}, style]}>
        {children}
      </StyledScollView>
    );
  }

  return <StyledView style={style}>{children}</StyledView>;
}

const StyledView = styled(Animated.View)({
  minHeight: '100%',
  paddingHorizontal: spacing.s3,
  paddingVertical: spacing.s2,
});

const StyledScollView = styled(Animated.ScrollView)({
  paddingHorizontal: spacing.s3,
  paddingVertical: spacing.s2,
});

export {Page};
