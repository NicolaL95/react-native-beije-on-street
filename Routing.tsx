import React, { FC, useEffect, useState } from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
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

const navigatorOptions: StackNavigationOptions = {
    // headerMode: 'screen'
    headerShown: false,
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
                    options={navigatorOptions}
                    component={MenuPage}
                />

                <Stack.Screen
                    name="DrawPage"
                    options={navigatorOptions}
                    component={DrawPage}
                />
                <Stack.Screen
                    name="Gallery"
                    options={navigatorOptions}
                    component={Gallery}
                />
                <Stack.Screen
                    name="Tutorial"
                    options={navigatorOptions}
                    component={Tutorial}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routing