import { FC, useState } from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";

import ColorPicker from "react-native-wheel-color-picker";

interface initialState {
    current: string,
    isWheelOpen: boolean
}
const initialState = {
    current: '#ffffff',
    isWheelOpen: false,
}

const ColorWheel: FC = (props) => {

    const [state, setState] = useState(initialState)


    const handleColorPicker = (): void => {
        console.log('open color wheel');

        setState({
            ...state,
            isWheelOpen: !state.isWheelOpen
        })

    }
    return (
        <Pressable
            style={{ position: "relative" }}
            onPress={handleColorPicker}
            onFocus={() => { console.log('press out') }}
        >
            <Text>Color Picker</Text>

            {state.isWheelOpen &&
                <View
                    style={{ position: "absolute", bottom: 50, right: 0, backgroundColor: '#ffffff', borderRadius: 10, padding: 20 }}
                >

                    <ColorPicker
                        // ref={picker.current}
                        // noSnap={true}
                        // discrete={true}
                        // shadeWheelThumb={true}
                        palette={['#57ff0a', '#ffde17', '#f26522']}
                        // sliderHidden={false}
                        // swatches={false}
                        onColorChangeComplete={(color) => { console.log('final color:', color) }}
                        gapSize={10}
                        thumbSize={25}
                        color={state.current}
                        onColorChange={color => {
                            console.log('color changing...', color);
                            setState({
                                ...state,
                                current: color,
                            })
                        }}
                    />
                </View>
            }


        </Pressable>

    )
}

export default ColorWheel