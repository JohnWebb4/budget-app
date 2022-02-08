import styled from '@emotion/native';
import React, {useRef} from 'react';
import {Pressable, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';

import {colors} from '../design/color';
import {spacing} from '../design/spacing';
import {timing} from '../design/timing';
import {Typography} from './Typography.component';

function CategoryItem({id, name, budget, onEdit, onDelete, style}) {
  const swipeRef = useRef();

  function editCategory() {
    if (swipeRef?.current) {
      onEdit({id});

      setTimeout(() => {
        swipeRef?.current?.scrollBy(-1, true);
      }, timing.SLOW_MS);
    }
  }

  function deleteCategory() {
    onDelete({id});
  }

  return (
    <Container key={id} style={style}>
      <Swiper ref={swipeRef} showsPagination={false} loop={false}>
        <CategoryContainer>
          <Text>{name}</Text>
          <Text>${budget?.toFixed(2)}</Text>
        </CategoryContainer>
        <ButtonContainer>
          <Pressable style={{flex: 1, height: '100%'}} onPress={editCategory}>
            <Button style={{backgroundColor: colors.lightBlue}}>
              <ButtonText>Edit</ButtonText>
            </Button>
          </Pressable>

          <Pressable style={{flex: 1, height: '100%'}} onPress={deleteCategory}>
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

const CategoryContainer = styled(View)({
  alignItems: 'center',
  flexDirection: 'row',
  height: '100%',
  justifyContent: 'space-between',
  paddingVertical: spacing.s2,
  paddingHorizontal: spacing.s3,
});

const Container = styled(View)({
  borderWidth: 1,
  borderRadius: spacing.s2,
  height: spacing.s6,
  overflow: 'hidden',
});

export {CategoryItem};
