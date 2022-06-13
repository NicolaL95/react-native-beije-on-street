import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
//screens
import MenuPage from './screens/menu/MenuPage';
import Tutorial from './screens/Tutorial';
import DrawPage from './screens/DrawPage';
import Gallery from './screens/Gallery';

type RootStackParamList = {
    Menu: undefined,
    Tutorial: undefined,
    DrawPage: undefined,
    Gallery: undefined,
}

const Routing: FC = () => {

    const Stack = createStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Menu'}
            >
                <Stack.Screen
                    name="Menu"
                    options={{
                        headerTitleAlign: 'center'
                    }}
                    component={MenuPage}
                />
                <Stack.Screen
                    name="DrawPage"
                    options={{
                        headerTitleAlign: 'center'
                    }}
                    component={DrawPage}
                />
                <Stack.Screen
                    name="Gallery"
                    options={{
                        headerTitleAlign: 'center'
                    }}
                    component={Gallery}
                />
                <Stack.Screen
                    name="Tutorial"
                    options={{
                        headerTitleAlign: 'center'
                    }}
                    component={Tutorial}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routing