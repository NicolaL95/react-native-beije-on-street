import React, { FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import ColorWheel from '../hookComponents/ColorWheel'
import { eventEmit } from '../../utils/eventEmitter'
import style from '../../styles/screens/styledrawpage'
import { fixedDimensions } from '../../styles/globalStyleVariables'

interface FooterCanvasProps {
    hide?: boolean
}

const FooterCanvas: FC<FooterCanvasProps> = (props) => {

    const setBrushWidth = (newBrushWidth: number) => () => {
        console.log('new brush width: ', newBrushWidth);

        eventEmit('onChangeBrushWidth', newBrushWidth)
    }

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
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
                    <Pressable
                        style={{ marginHorizontal: 5 }}
                        onPress={setBrushWidth(fixedDimensions.brushRadius.small)}
                        hitSlop={20}
                    >
                        <View
                            style={{
                                width: fixedDimensions.brushRadius.small,
                                height: fixedDimensions.brushRadius.small,
                                backgroundColor: 'black',
                                borderRadius: 50,
                            }}
                        />
                    </Pressable>
                    <Pressable
                        style={{ marginHorizontal: 5 }}
                        onPress={setBrushWidth(fixedDimensions.brushRadius.medium)}
                    >
                        <View
                            style={{
                                width: fixedDimensions.brushRadius.medium,
                                height: fixedDimensions.brushRadius.medium,
                                backgroundColor: 'black',
                                borderRadius: 50,
                            }}
                        />
                    </Pressable>
                    <Pressable
                        style={{ marginHorizontal: 5 }}
                        onPress={setBrushWidth(fixedDimensions.brushRadius.large)}
                    >
                        <View
                            style={{
                                width: fixedDimensions.brushRadius.large,
                                height: fixedDimensions.brushRadius.large,
                                backgroundColor: 'black',
                                borderRadius: 50,
                            }}
                        />
                    </Pressable>
                </View>
                <View >
                    <ColorWheel />
                </View>
            </View>
        </View >
    )
}
export default FooterCanvas