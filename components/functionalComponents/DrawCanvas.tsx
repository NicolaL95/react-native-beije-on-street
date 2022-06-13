import React, { FC, useRef, useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import SignatureScreen, {
    SignatureViewRef,
} from "react-native-signature-canvas";
import { eventOn } from '../../-/utils/eventEmitter';

interface State {
    drawingMode: boolean
}

const initialState = {
    drawingMode: true
}

const DrawCanvas: FC = (props: any) => {

    const [state, setState] = useState<State>(initialState);

    const ref = useRef<SignatureViewRef>(null)

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
    const imgHeight = Dimensions.get('window').height - 200;
    const style = `.m-signature-pad {box-shadow: none; border: none; } 
              .m-signature-pad--body {border: none;}
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {
              width: ${imgWidth}px; height: ${imgHeight}px;}`;
    return (
        <View style={{ height: imgHeight, width: '100%' }}>
            <SignatureScreen
                ref={ref}
                bgSrc="https://via.placeholder.com/300x200/ff726b"
                bgWidth={imgWidth}
                bgHeight={imgHeight}
                webStyle={style}
            />
        </View>
    )
}



export default DrawCanvas