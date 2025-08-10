import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import * as ui from '../../screens/index'
import BottomTabs from '../BottomTabs';

const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }} >
                <Stack.Screen name='Splash' component={ui.Splash} />
                <Stack.Screen name='MasterLogin' component={ui.MasterLogin} />
                <Stack.Screen name='AdminPannel' component={ui.AdminPannel} />
                <Stack.Screen name='RegistrationPannel' component={ui.RegistrationPannel} />
                <Stack.Screen name='RegisterOwner' component={ui.RegisterOwner} />
                <Stack.Screen name='RegisterEmployee' component={ui.RegisterEmployee} />
                <Stack.Screen name='RegisterUser' component={ui.RegisterUser} />
                <Stack.Screen name='CreateCompany' component={ui.CreateCompany} />
                <Stack.Screen name='CompanyList' component={ui.CompanyList} />
                <Stack.Screen name='AgentList' component={ui.AgentList} />
                <Stack.Screen name='AgentDetails' component={ui.AgentDetails} />
                <Stack.Screen name='CompanyDetails' component={ui.CompanyDetails} />
                <Stack.Screen name='AddEmployee' component={ui.AddEmployee} />
                <Stack.Screen name='ManagerPannel' component={ui.ManagerPannel} />
                <Stack.Screen name='AddRoom' component={ui.AddRoom} />
                <Stack.Screen name='EmployeeList' component={ui.EmployeeList} />
                <Stack.Screen name='RoomList' component={ui.RoomList} />
                <Stack.Screen name='EditRoom' component={ui.EditRoom} />
                <Stack.Screen name='DeleteRoom' component={ui.DeleteRoom} />
                <Stack.Screen name='RoomDetail' component={ui.RoomDetail} />
                <Stack.Screen name='EmployeePannel' component={ui.EmployeePannel} />
                <Stack.Screen name='BottomTabs' component={BottomTabs} />
                <Stack.Screen name='AllHotel' component={ui.AllHotel} />
                <Stack.Screen name='FiveStarHotel' component={ui.FiveStarHotel} />
                <Stack.Screen name='FourStarHotel' component={ui.FourStarHotel} />
                <Stack.Screen name='ThreeStarHotel' component={ui.ThreeStarHotel} />
                <Stack.Screen name='HotelDetails' component={ui.HotelDetails} />
                <Stack.Screen name='BookRoom' component={ui.BookRoom} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default StackNavigation;