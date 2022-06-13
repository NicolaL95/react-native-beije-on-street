import React, { FC, ReactElement } from 'react'
import { View, Text, Pressable } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type RootStackParamList = {
    Tutorial: undefined,
    DrawPage: undefined,
    Gallery: undefined,
}

type Props = NativeStackScreenProps<RootStackParamList>;

const MenuPage: FC<Props> = ({ navigation }): ReactElement => {
    return (
        <View>
            <Text>Sketch onStreet</Text>
            <View>
                <Pressable
                    onPress={() => { navigation.navigate('DrawPage') }}>
                    <Text>Disegna</Text>
                </Pressable>
            </View>
            <View>
                <Pressable
                    onPress={() => { navigation.navigate('Gallery') }}>
                    <Text>Galleria</Text>
                </Pressable>
            </View>
            <View>
                <Pressable
                    onPress={() => { navigation.navigate('Tutorial') }}>
                    <Text>Tutorial</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default MenuPage