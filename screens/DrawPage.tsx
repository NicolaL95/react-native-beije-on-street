import React, { FC } from 'react'
import { View, Text, Dimensions } from 'react-native'
import DrawCanvas from '../components/functionalComponents/DrawCanvas'
import HeaderCanvas from '../components/functionalComponents/HeaderCanvas'
import FooterCanvas from '../components/functionalComponents/FooterCanvas'


const DrawPage: FC = () => {


    return (
        <View style={{ flex: 1 }}>
            <HeaderCanvas
            />
            <DrawCanvas
            />
            <FooterCanvas />
        </View>
    )
}
export default DrawPage