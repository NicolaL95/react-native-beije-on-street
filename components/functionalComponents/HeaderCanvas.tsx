import React, { FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import { eventEmit } from '../..//utils/eventEmitter'
import style from '../../styles/screens/styledrawpage'

interface callbackProps {
    handleGalleryComponent: Function,
    handlePhotoComponent: Function,
}
interface HeaderCanvasProps {
    callback: callbackProps,
    hide?: boolean

}
const HeaderCanvas: FC<HeaderCanvasProps> = (props) => {
    const handleCallback = (name: string): void => {
        props.callback[name]()
    }
    return (
        <View style={[style.bar, style.barHeader, { display: props?.hide ? 'none' : 'flex' }]}>
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
                    <Pressable
                        onPress={() => {
                            eventEmit("handleDrawSave")
                        }}>
                        <Text>Confirm</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
export default HeaderCanvas