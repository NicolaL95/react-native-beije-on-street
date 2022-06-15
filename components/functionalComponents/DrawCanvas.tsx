import React, { FC, useEffect, useRef, useState } from 'react'
import { View, Dimensions, Pressable } from 'react-native'
import SignatureScreen, {
    SignatureViewRef,
} from "react-native-signature-canvas";
import styleDrawCanvas from '../../styles/components/styleDrawCanvas';
import { colorPalette, fixedDimensions } from '../../styles/globalStyleVariables';
import { eventEmit, eventOn } from '../../utils/eventEmitter';

interface disableCanvasPayload {
    color: string
    canvasBlocker: boolean
}
interface State {
    drawingEnabled: boolean
    penColor: string
}

const initialState = {
    drawingEnabled: true,
    penColor: colorPalette.primary
}

const DrawCanvas: FC = (props: any) => {

    const [state, setState] = useState<State>(initialState);

    const ref = useRef<SignatureViewRef>(null)

    const blockCanvas = (isWheelOpen: boolean): void => {
        setState({
            ...state,
            drawingEnabled: isWheelOpen,
        })
    }

    const handlePenColorChange = (newColor: string) => { ref.current?.changePenColor(newColor) }

    const onBlurColorPicker = () => {
        const isEnabled = true
        //on overlay touch, close colorPicker modal
        eventEmit('onBlurColorPicker', isEnabled)

        setState({
            ...state,
            drawingEnabled: isEnabled
        })
    }

    useEffect(() => {
        eventOn("onColorModalTrigger", blockCanvas)
        eventOn("onSetNewColor", handlePenColorChange)
        eventOn("handleSignatureOperation", ({ eventName, color }: { eventName: string, color: string }): void => {

            console.log('handleSignatureOperation Event');
            switch (eventName) {
                case "undo":
                    ref.current?.undo();
                    break;
                case "redo":
                    ref.current?.redo();
                    break;
                case "clear":
                    ref.current?.clearSignature();
                    break;
                case "color":
                    console.log(color)
                    break;
                case "draw":
                    ref.current?.draw();
                    break;
                case "erase":
                    ref.current?.erase();
                    break;
                default:
                    return;
            }
        })
    }, [])




    const imgWidth = Dimensions.get('window').width;
    const imgHeight = Dimensions.get('window').height;

    const style = `.m-signature-pad { box-shadow: none; border: none; } 
              .m-signature-pad--body {border: none;}
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {
              width: 100%; height: 100%}`;

    return (
        <View style={{ width: '100%', flexGrow: 1 }}>

            {!state.drawingEnabled &&
                <Pressable
                    style={styleDrawCanvas.canvasBlock}
                    onPressIn={onBlurColorPicker}
                >
                    <View />
                </Pressable>
            }

            <SignatureScreen
                ref={ref}
                bgSrc="https://via.placeholder.com/300x200/ff726b"
                bgWidth={imgWidth}
                bgHeight={imgHeight}
                webStyle={style}
                penColor={state.penColor}

            />
        </View >
    )
}



export default DrawCanvas