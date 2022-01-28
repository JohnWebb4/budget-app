import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

function HistoryPage() {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <View>
            <Text>History Page</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export {HistoryPage};
