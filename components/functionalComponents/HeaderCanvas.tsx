import React, { FC } from 'react'
import { View, Text, Pressable, Image } from 'react-native'
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
                        <Image style={style.drawTable_icon} source={require('../../assets/icons/png/gallery.png')} />
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        onPress={() => {
                            handleCallback('handlePhotoComponent')
                        }}>
                        <Image style={style.drawTable_icon} source={require('../../assets/icons/png/camera.png')} />
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

                        <Image style={style.drawTable_icon} source={require('../../assets/icons/png/undo_redo.png')} />
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
                        <Image style={style.drawTable_icon_reverse} source={require('../../assets/icons/png/undo_redo.png')} />
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        onPress={() => {
                            eventEmit("handleSignatureOperation", {
                                eventName: "clear"
                            })
                        }}>
                        <Image style={style.drawTable_icon} source={require('../../assets/icons/png/clear.png')} />
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        onPress={() => {
                            eventEmit("handleDrawSave")
                        }}>
                        <Image style={style.drawTable_icon} source={require('../../assets/icons/png/check_complete.png')} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
export default HeaderCanvas