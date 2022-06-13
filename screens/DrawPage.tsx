import React, { FC } from 'react'
import { View, Text, Dimensions } from 'react-native'
import DrawCanvas from '../components/functionalComponents/DrawCanvas'
import HeaderCanvas from '../components/functionalComponents/HeaderCanvas'
import FooterCanvas from '../components/functionalComponents/FooterCanvas'

const EventEmitter = require('events')

const ee = new EventEmitter()

const DrawPage: FC = () => {

    /* const handleUndoDraw = (): void => {
        console.log('undo')
    }

    const handleRedoDraw = (): void => {
        console.log('redo')
    }
 */
    ee.on('undo', () => {
        console.log('fedegay')
    })
    return (
        <View>
            <HeaderCanvas
                event={ee}
              /*   callback={{ undoFunc: handleUndoDraw, redoFunc: handleRedoDraw }
                } */ />
            <DrawCanvas
            />
            <FooterCanvas />
        </View>
    )
}
export default DrawPage