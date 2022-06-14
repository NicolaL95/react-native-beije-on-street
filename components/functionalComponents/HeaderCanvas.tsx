import React, { FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import { eventEmit } from '../../utils/eventEmitter'
import style from '../../styles/screens/styledrawpage'

const HeaderCanvas: FC = (props: any) => {

    return (
        <View style={[style.bar, style.barHeader]}>
            <View style={style.barRow}>
                <View>
                    <Pressable>
                        <Text>Gallery</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable>
                        <Text>Fotocamera</Text>
                    </Pressable>
                </View>
            </View>
            <View style={style.barRow}>
                <View>
                    <Pressable

                        onPress={() => {
                            eventEmit("handleSignatureOperation", {
                                eventName: "undo"
                            })
                        }}>
                        <Text>Undo</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        onPress={() => {
                            eventEmit("handleSignatureOperation", {
                                eventName: "redo"
                            })
                        }}
                    >
                        <Text>Redo</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        onPress={() => {
                            eventEmit("handleSignatureOperation", {
                                eventName: "clear"
                            })
                        }}>
                        <Text>Clear</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable>
                        <Text>Confirm</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
export default HeaderCanvas