import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styled from '@emotion/native';
import Swiper from 'react-native-swiper';

import {colors} from '../design/color';
import {spacing} from '../design/spacing';
import {Typography} from './Typography.component';
import {deleteTransaction as deleteTransactionAction} from '../actions/transaction.action';

function Transaction({id, cost, date, style, title}) {
  function deleteTransaction() {
    deleteTransactionAction({id});
  }

  return (
    <Container key={id} style={style}>
      <Swiper showsPagination={false} loop={false}>
        <TransactionContainer>
          <TransactionText>{title}</TransactionText>

          <TransactionText style={{textAlign: 'center'}}>
            ${cost?.toFixed(2)}
          </TransactionText>

          <TransactionText style={{textAlign: 'right'}}>
            {date?.toLocaleDateString()}
          </TransactionText>
        </TransactionContainer>

        <ButtonContainer>
          <Pressable
            style={{flex: 1, height: '100%'}}
            onPress={deleteTransaction}>
            <Button style={{backgroundColor: colors.red}}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </Pressable>
        </ButtonContainer>
      </Swiper>
    </Container>
  );
}

const ButtonContainer = styled(View)({
  flexDirection: 'row',
});

const Button = styled(View)({
  height: '100%',
  justifyContent: 'center',
});

const ButtonText = styled(Typography.Body1)({
  textAlign: 'center',
});

const Container = styled(View)({
  borderWidth: 1,
  borderRadius: spacing.s2,
  height: spacing.s5,
  overflow: 'hidden',
});

const TransactionContainer = styled(View)({
  alignItems: 'center',
  flexDirection: 'row',
  height: '100%',
  justifyContent: 'space-between',
  paddingVertical: spacing.s1,
  paddingHorizontal: spacing.s2,
});

const TransactionText = styled(Text)({
  flex: 1,
});

export {Transaction};
