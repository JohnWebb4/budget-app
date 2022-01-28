import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

function AddPage() {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <View>
            <Text>Add Page</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export {AddPage};
