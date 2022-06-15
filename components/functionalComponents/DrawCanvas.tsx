import React, { FC, ReactElement, useEffect, useRef, useState } from 'react'
import { View, Dimensions, Image, PixelRatio } from 'react-native'
import SignatureScreen, {
    SignatureViewRef,
} from "react-native-signature-canvas";
import styleDrawCanvas from '../../styles/components/styleDrawCanvas';
import { fixedDimensions } from '../../styles/globalStyleVariables';
import { eventOn } from '../../utils/eventEmitter';
import { captureRef } from 'react-native-view-shot';

interface State {
    drawingEnabled: boolean,
    image: string
}

const initialState = {
    drawingEnabled: true,
    image: ''
}

const DrawCanvas: FC = (props: any) => {
    const handleDrawSaveFunc = async (): Promise<void> => {
        /*     const targetPixelCount = 1080; // If you want full HD pictures
            const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
            // pixels * pixelratio = targetPixelCount, so pixels = targetPixelCount / pixelRatio
            const pixels = targetPixelCount / pixelRatio;
            const result = await captureRef(ref, {
                result: 'tmpfile',
                height: pixels,
                width: pixels,
                quality: 0.5,
                format: 'png',
            });
            console.log('result', result) */
    }

    const handleOK = (signature) => {
        setState({
            ...state,
            image: signature
        })
        // Callback from Component props
    };

    eventOn("handleDrawSave", () => {
        ref.current?.readSignature();
    })

    const [state, setState] = useState<State>(initialState);
    const ref = useRef<SignatureViewRef>(null)

    useEffect(() => {
        setState({
            ...state,
            image: `data:image/${props.imgChoosen?.extension};base64,${props.imgChoosen?.url}`
        })
    }, [props.imgChoosen])

    const disableCanvas = (isEnabled: boolean): void => {
        setState({
            ...state,
            drawingEnabled: isEnabled,
        })
    }

    //called when colorPicker modal triggers
    eventOn("onHandleCanvas", disableCanvas)

    eventOn("handleSignatureOperation", ({ eventName, color }: { eventName: string, color: string }): void => {
        console.log('evento')
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
                <View style={styleDrawCanvas.canvasBlock}>
                </View>
            }
            <SignatureScreen
                ref={ref}
                onOK={handleOK}
                bgSrc={props.imgChoosen !== null ? state.image : ''}
                bgWidth={imgWidth}
                bgHeight={imgHeight}
                webStyle={style}
            />
        </View>

    )
}



export default DrawCanvas