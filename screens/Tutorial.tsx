import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import PagerView from 'react-native-pager-view';
import styleTutorial from '../styles/screens/styleTutorial'
import { FIRST_TIME_KEY } from '../utils/storage';

type RootStackParamList = {
    DrawPage: undefined,
    Gallery: undefined,
    Menu: undefined,
}

type Props = NativeStackScreenProps<RootStackParamList>;

const Tutorial: FC<Props> = ({ navigation }) => {


    const goToHome = async (): Promise<void> => {
        await AsyncStorage.setItem(FIRST_TIME_KEY, 'false')

        navigation.navigate('Menu')
    }

    return (
        <View style={styleTutorial.pageWrapper}>
            <PagerView
                style={styleTutorial.carouselWrapper}
                initialPage={0}
            >
                <View style={styleTutorial.slideContainer} key="1">
                    <Image
                        style={{ width: '100%', height: '80%' }}
                        source={require('../assets/tutorial/tutorial_1.png')}
                    />
                </View>

                <View style={styleTutorial.slideContainer} key="2">
                    <Image
                        style={{ width: '100%', height: '80%' }}
                        source={require('../assets/tutorial/tutorial_2.png')}
                    />
                </View>

                <View style={styleTutorial.slideContainer} key="3">
                    <Image
                        style={{ width: '100%', height: '80%' }}
                        source={require('../assets/tutorial/tutorial_3.png')}
                    />
                    <TouchableHighlight
                        style={styleTutorial.nextButton}
                        onPress={goToHome}
                        underlayColor='#A8DADC'
                    >
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={require('../assets/icons/png/yo.png')}
                        />
                    </TouchableHighlight>
                </View>

            </PagerView>
        </View>
    )
}

export default Tutorial