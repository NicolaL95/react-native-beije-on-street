import React, { FC, useRef } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import SignatureScreen from 'react-native-signature-canvas';



const DrawCanvas: FC = () => {



    const ref = useRef(null);

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