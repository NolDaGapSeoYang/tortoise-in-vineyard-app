import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../components/globalStyle'
import NextButton from '../components/NextButton'

const OnBoard = ({ navigation }: { navigation: any }) => {
  return (
    <View style={globalStyle.container}>
      <SafeAreaView style={globalStyle.safeAreaContainer}>
        <Text style={globalStyle.heading}>아직은 포도알이 없어요</Text>
        <Text style={globalStyle.subheading}>포도알 6개를 모으면, 한 송이가 완성돼요!</Text>
        <View style={styles.characterContainer}>
          <Text style={globalStyle.heading}>나무 이미지</Text>
        </View>
        <NextButton text='달리기 시작' onPress={() => navigation.push('watchcheck')} />
      </SafeAreaView>
    </View>
  )
}

export default OnBoard

const styles = StyleSheet.create({
  characterContainer: {
    borderColor: '#C2D1D9',
    backgroundColor: 'yellowgreen',
    width: 263,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
})