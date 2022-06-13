import React, { FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import style from '../../styles/styledrawpage'
const Tutorial: FC = (props: any) => {

    /* const handleUndo = (): void => {
        props.callback.undoFunc();
    }

    const handleRedo = (): void => {
        props.callback.redoFunc();
    } */

    return (
        <View style={style.bar}>
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
                        /* onPress={handleUndo} */
                        onPress={() => {

                        }}>
                        <Text>Undo</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        /* onPress={handleRedo} */>
                        <Text>Redo</Text>
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