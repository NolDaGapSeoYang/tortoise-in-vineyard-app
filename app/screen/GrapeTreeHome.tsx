import React, { useMemo } from 'react'
import { View, Image, Dimensions, StyleSheet } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../common/globalStyle'
import Text from '../components/Text'
import Button from '../components/Button'
import GrapeCount from '../components/GrapeCount'
import useGetUser from '../hook/useGetUser'
import { useRecoilValue } from 'recoil'
import { runAtom } from '../store/run'
import Img from '../constants/Img'
import { useGetGrapeLazyQuery, useRunQuery } from '../../graphql/generated'
import GrapeTree from '../components/GrapeTree'

const GrapeTreeHome = () => {
  const navigation = useNavigation()
  const { user } = useGetUser('network-only')
  const grapeCircleCount = useMemo(() => user?.totalRun ?? 0 % 6, [user?.totalRun])

  const totalRun = useMemo(() => user?.totalRun || 0, [user?.totalRun])

  return (
    <SafeAreaView style={[globalStyle.safeAreaContainer]}>
      <View style={[globalStyle.header]}>
        <Text style={[globalStyle.gaeguTitle, { textAlign: 'center' }]}>
          {`포도알을 총 ${totalRun}개 모았어요!`}
        </Text>
        <GrapeCount count={grapeCircleCount} />
      </View>
      <View style={globalStyle.center}>
        <GrapeTree totalRun={totalRun} />
        <Image source={Img.INTERSECT} style={styles.intersect} />
        {user?.canRunToday ? (
          <Image source={Img.BEFORERUNTURTLE} style={styles.turtle} />
        ) : (
          <Image source={Img.SLEEPTURTLE} style={styles.turtle} />
        )}
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.footer]}>
        <Button
          style={{
            ...styles.button,
            backgroundColor: user?.canRunToday ? '#222222' : '#A1AEB7',
          }}
          onPress={() => {
            if (user?.canRunToday) {
              navigation.dispatch(StackActions.push('watchcheck'))
            }
          }}
          disabled={!user?.canRunToday}
        >
          <Text style={[globalStyle.fontMedium, globalStyle.Pretendard, { color: '#fff' }]}>
            {user?.canRunToday ? '달리기 시작' : '내일 만나요!'}
          </Text>
        </Button>
        <Text style={[globalStyle.subheading, { textAlign: 'center' }]}>
          포도알은 하루 한 번만 획득할 수 있어요
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default GrapeTreeHome

const styles = StyleSheet.create({
  tree: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
    top: -Dimensions.get('window').height * 0.04,
    left: -Dimensions.get('window').width * 0.45,
    zIndex: 1,
  },
  intersect: {
    position: 'absolute',
    bottom: -Dimensions.get('window').height * 0.45,
    left: -Dimensions.get('window').width * 0.7,
  },
  turtle: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.26,
    height: Dimensions.get('window').height * 0.4,
    bottom: -Dimensions.get('window').height * 0.1,
    right: Dimensions.get('window').width * 0.1,
    resizeMode: 'contain',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
  },
})