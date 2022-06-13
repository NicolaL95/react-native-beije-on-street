import React, { FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import style from '../../styles/styledrawpage'
import { eventEmit } from '../../-/utils/eventEmitter'
const Tutorial: FC = () => {
    return (
        <View style={style.bar}>
            <View style={style.barRow}>
                <View>
                    <Pressable
                        onPress={() => {
                            eventEmit("handleSignatureOperation", {
                                eventName: "draw"
                            })
                        }}>
                        <Text>Spray</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        onPress={() => {
                            eventEmit("handleSignatureOperation", {
                                eventName: "erase"
                            })
                        }}>
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