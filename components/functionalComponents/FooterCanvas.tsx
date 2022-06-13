import React, { FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import style from '../../styles/styledrawpage'
const Tutorial: FC = () => {
    return (
        <View style={style.bar}>
            <View style={style.barRow}>
                <View>
                    <Pressable>
                        <Text>Spray</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable>
                        <Text>Erase</Text>
                    </Pressable>
                </View>
            </View>
            <View style={style.barRow}>
                <View>
                    <Pressable>
                        <Text>Color Picker</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
export default Tutorial