import React, { FC, ReactElement, useEffect } from 'react'
import { View, Text, Pressable, Image, ImageBackground } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import style from '../../styles/screens/menuPageStyle'
import { Asset, useAssets } from 'expo-asset';

type RootStackParamList = {
    Tutorial: undefined,
    DrawPage: undefined,
    Gallery: undefined,
}

type Props = NativeStackScreenProps<RootStackParamList>;

const MenuPage: FC<Props> = ({ navigation }): ReactElement => {


    return (
        <View style={{ flex: 1, }}>
            <ImageBackground source={require('../../assets/background_default.png')}
                style={style.menu}>
                <Image style={style.menu_logo} source={require('../../assets/logo_icon.png')} />
                <View>
                    <Pressable
                        onPress={() => { navigation.navigate('DrawPage') }}>
                        <Image style={style.menu_button} source={require('../../assets/home_buttons/png/sketchnow_home_btn.png')} />
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        onPress={() => { navigation.navigate('Tutorial') }}>
                        <Image style={style.menu_button} source={require('../../assets/home_buttons/png/home_tutorial_home_btn.png')} />
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    )
}

export default MenuPage