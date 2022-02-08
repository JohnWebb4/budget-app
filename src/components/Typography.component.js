import styled from '@emotion/native';
import {Text} from 'react-native';

import {spacing} from '../design/spacing';

const Typography = {
  Body1: styled(Text)({}),

  Title: styled(Text)({
    marginTop: spacing.s3,
    marginBottom: spacing.s4,
    fontSize: spacing.s4,
    textAlign: 'center',
  }),
};

export {Typography};
