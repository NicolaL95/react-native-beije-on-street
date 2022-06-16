import React, { FC, } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Routing from './Routing';

const App: FC = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Routing></Routing>
        </SafeAreaView>
    );
}
export default App;
