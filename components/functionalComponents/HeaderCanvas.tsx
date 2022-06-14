import React, { FC } from 'react'
import { View, Text, Pressable, ToastAndroid, Dimensions } from 'react-native'
import { eventEmit } from '../../-/utils/eventEmitter'
import style from '../../styles/styledrawpage'
import { Camera, CameraType } from 'expo-camera';


const Tutorial: FC = (props: any) => {
    const handleCallback = (name: string): void => {
        props.callback[name]()
    }
    return (
        <View style={style.bar}>

            <View style={style.barRow}>
                <View>
                    <Pressable
                        onPress={() => {
                            handleCallback('handleGalleryComponent')
                        }}>
                        <Text>Gallery</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        onPress={() => {
                            handleCallback('handlePhotoComponent')
                        }}>
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
export default Tutorial