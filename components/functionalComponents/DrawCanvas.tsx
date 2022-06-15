import React, { FC, useEffect, useRef, useState } from 'react'
import { View, Dimensions, Pressable, ToastAndroid, ImageBackground } from 'react-native'
import SignatureScreen, {
    SignatureViewRef,
} from "react-native-signature-canvas";
import styleDrawCanvas from '../../styles/components/styleDrawCanvas';
import { colorPalette, fixedDimensions } from '../../styles/globalStyleVariables';
import { eventEmit, eventOn } from '../../utils/eventEmitter';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { CurrentDate } from '../../utils/date';


interface State {
    drawingEnabled: boolean,
    image: string,
    penColor: string
}

const initialState = {
    drawingEnabled: true,
    image: '',
    penColor: colorPalette.primary
}

const bgImage = require('../../assets/background_default.png')
const DrawCanvas: FC = (props: any) => {


    const handleOK = async (signature: string): Promise<void> => {

        //get only base64string
        const base64Code = signature.split("data:image/png;base64,")[1];
        //get location
        const filename = FileSystem.documentDirectory + "Sketch_OS" + CurrentDate + ".jpg";
        //decode and insert base64string
        await FileSystem.writeAsStringAsync(filename, base64Code, {
            encoding: FileSystem.EncodingType.Base64,
        });

        const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);

    };



    const [state, setState] = useState<State>(initialState);
    const ref = useRef<SignatureViewRef>(null)

    useEffect(() => {
        console.log('props', props.imgChoosen)
        setState({
            ...state,
            image: `data:image/${props.imgChoosen?.extension};base64,${props.imgChoosen?.url}`
        })
    }, [props.imgChoosen])


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
        eventOn("handleDrawSave", () => {
            ref.current?.readSignature();
            (() => {
                ToastAndroid.show('Foto salvata sul tuo dispositivo!', ToastAndroid.SHORT);
            })()
        })
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
                onOK={handleOK}
                dataURL={props.imgChoosen !== null ? state.image : bgImage}
                bgSrc={props.imgChoosen !== null ? state.image : bgImage}
                bgWidth={imgWidth}
                bgHeight={imgHeight}
                webStyle={style}
                penColor={state.penColor}

            />
        </View>

    )
}



export default DrawCanvas