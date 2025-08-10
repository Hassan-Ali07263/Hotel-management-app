import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text, Image } from 'react-native';
import * as ui from "../../screens/index";
import { IMAGES } from '../../assets/images';
import { COLORS } from '../../enums/StyleEnums';

const BottomTabs = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: COLORS.backgroundColor,
                    height: 40,
                    borderRadius: 25,
                    position: 'absolute',
                    bottom: "1%",
                    marginHorizontal: "7%",
                    elevation: 2

                },
                tabBarIcon: ({ focused }) => {
                    let icon;

                    if (route.name === 'Home') {
                        icon = focused
                            ? IMAGES.HomeActive
                            : IMAGES.HomeInactive
                    } else if (route.name === 'Bookings') {
                        icon = focused
                            ? IMAGES.BookActive
                            : IMAGES.BookInactive
                    } else if (route.name === 'WishList') {
                        icon = focused
                            ? IMAGES.WishlistActive
                            : IMAGES.WishlistInactive
                    } else if (route.name === 'Profile') {
                        icon = focused
                            ? IMAGES.ProfileActive
                            : IMAGES.ProfileInactive
                    }

                    return (
                        <Image
                            source={icon}
                            resizeMode="contain"
                            style={{
                                width: 24,
                                height: 24,
                            }}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name='Home' component={ui.Home} />
            <Tab.Screen name='Bookings' component={ui.Bookings} />
            <Tab.Screen name='WishList' component={ui.WishList} />
            <Tab.Screen name='Profile' component={ui.Profile} />
        </Tab.Navigator>
    );
}
export default BottomTabs