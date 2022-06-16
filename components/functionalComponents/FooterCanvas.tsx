import React, { FC } from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import ColorWheel from '../hookComponents/ColorWheel'
import { eventEmit } from '../../utils/eventEmitter'
import style from '../../styles/screens/styledrawpage'
import { fixedDimensions } from '../../styles/globalStyleVariables'
import styleFooterCanvas from '../../styles/components/styleFooterCanvas'
import BrushSizes from './BrushSizes'
interface FooterCanvasProps {
    hide?: boolean
}

const FooterCanvas: FC<FooterCanvasProps> = (props) => {

    return (

        <View style={[style.bar, style.barFooter, { display: props?.hide ? 'none' : 'flex' }]}>
            <View style={style.barRow}>
                <View>
                    <Pressable
                        onPress={() => {
                            eventEmit("handleSignatureOperation", {
                                eventName: "draw"
                            })
                        }}>
                        <Image style={style.drawTable_icon} source={require('../../assets/icons/png/spraycan.png')} />
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        onPress={() => {
                            eventEmit("handleSignatureOperation", {
                                eventName: "erase"
                            })
                        }}>
                        <Image style={style.drawTable_icon} source={require('../../assets/icons/png/eraser.png')} />
                    </Pressable>
                </View>
            </View>
            <View style={style.barRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
                    <BrushSizes />
                </View>
                <View >
                    <ColorWheel />
                </View>
            </View>
        </View >
    )
}
export default FooterCanvas