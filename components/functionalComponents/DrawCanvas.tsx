import React, { FC, useEffect, useRef, useState } from 'react'
import { View, Dimensions, Pressable, ToastAndroid, Image } from 'react-native'
import SignatureScreen, {
    SignatureViewRef,
} from "react-native-signature-canvas";
import styleDrawCanvas from '../../styles/components/styleDrawCanvas';
import { colorPalette, fixedDimensions } from '../../styles/globalStyleVariables';
import { eventEmit, eventOn } from '../../utils/eventEmitter';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { CurrentDate } from '../../utils/date';
import { Asset, useAssets } from 'expo-asset';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
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
    console.log('propes', props)

    const handleOK = async (signature: string): Promise<void> => {

        /* const base64 = await FileSystem.readAsStringAsync(assets[0].localUri, { encoding: 'base64' });
        console.log(base64) */
        //get only base64string
        const base64Code = signature.split("data:image/png;base64,")[1];
        //get location
        const filename = FileSystem.documentDirectory + "Sketch_OS" + CurrentDate() + ".jpg";
        //decode and insert base64string
        await FileSystem.writeAsStringAsync(filename, props.imgChoosen !== null ? base64Code : base64Code, {
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

    const handlePenColorChange = (newColor: string): void => { ref.current?.changePenColor(newColor) }

    const onBlurColorPicker = (): void => {
        const isEnabled = true
        //on overlay touch, close colorPicker modal
        eventEmit('onBlurColorPicker', isEnabled)

        setState({
            ...state,
            drawingEnabled: isEnabled
        })
    }

    const changeBrushWidth = (newBrushWidth: number): void => {
        ref.current?.changePenSize(newBrushWidth - 5, newBrushWidth)
    }

    useEffect(() => {
        eventOn("onChangeBrushWidth", changeBrushWidth)

        eventOn("handleDrawSave", (): void => {
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

    const style = `.m-signature-pad { box-shadow: none; border: none; 
     background-image: url(${bgImage});} 
              .m-signature-pad--body {border: none;}
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {
              width: 100%; height: 100%;
            }`;

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
                dataURL={props.imgChoosen !== null ? state.image : props.defaultbg}
                bgSrc={props.imgChoosen !== null ? state.image : props.defaultbg}
                bgWidth={imgWidth}
                bgHeight={imgHeight}
                webStyle={style}
                penColor={state.penColor}
                minWidth={fixedDimensions.brushRadius.medium - 5}
                maxWidth={fixedDimensions.brushRadius.medium}
            />
        </View>

    )
}



export default DrawCanvas