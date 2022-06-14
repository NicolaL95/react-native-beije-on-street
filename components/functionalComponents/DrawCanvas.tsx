import React, { FC, useRef, useState } from 'react'
import { View, Dimensions } from 'react-native'
import SignatureScreen, {
    SignatureViewRef,
} from "react-native-signature-canvas";
import styleDrawCanvas from '../../styles/components/styleDrawCanvas';
import { fixedDimensions } from '../../styles/globalStyleVariables';
import { eventOn } from '../../utils/eventEmitter';

interface State {
    drawingEnabled: boolean
}

const initialState = {
    drawingEnabled: true
}

const DrawCanvas: FC = (props: any) => {

    const [state, setState] = useState<State>(initialState);

    const ref = useRef<SignatureViewRef>(null)

    const disableCanvas = (isEnabled: boolean): void => {
        setState({
            ...state,
            drawingEnabled: isEnabled,
        })
    }

    //called when colorPicker modal triggers
    eventOn("onHandleCanvas", disableCanvas)

    eventOn("handleSignatureOperation", ({ eventName, color }: { eventName: string, color: string }): void => {

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
                bgSrc="https://via.placeholder.com/300x200/ff726b"
                bgWidth={imgWidth}
                bgHeight={imgHeight}
                webStyle={style}
            />
        </View >
    )
}



export default DrawCanvas