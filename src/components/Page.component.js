import Animated from 'react-native-reanimated';
import styled from '@emotion/native';

import {spacing} from '../design/spacing';

const Page = styled(Animated.ScrollView)({
  paddingHorizontal: spacing.s3,
  paddingVertical: spacing.s2,
});

export {Page};
