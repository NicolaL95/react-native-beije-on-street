import React, { FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import ColorWheelModal from '../hookComponents/ColorWheelModal'
import { eventEmit } from '../../utils/eventEmitter'
import style from '../../styles/screens/styledrawpage'

const FooterCanvas: FC = () => {

    return (
        <View style={[style.bar, style.barFooter]}>
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
                    <ColorWheelModal />
                </View>
            </View>
        </View>
    )
}
export default FooterCanvas