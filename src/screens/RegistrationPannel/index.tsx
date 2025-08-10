import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import AdminHeader from '../../components/AdminHeader';
import { IMAGES } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';

const RegistrationPannel = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backImage} source={IMAGES.DashboardBackground}>
                <AdminHeader />

                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={() => navigation.navigate("RegisterOwner")}
                        style={styles.nextButtons}>
                        <Text style={styles.buttonText}>Register as Owner</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("RegisterUser")}
                        style={styles.nextButtons}>
                        <Text style={styles.buttonText}>Register as User</Text>
                    </TouchableOpacity>
                </View>

                {/* <View style={styles.buttonView}>
                    <TouchableOpacity onPress={() => navigation.navigate("RegisterEmployee")}
                    style={styles.nextButtons}>
                        <Text style={styles.buttonText}>Register as Employee</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("RegisterUser")}
                    style={styles.nextButtons}>
                        <Text style={styles.buttonText}>Register as User</Text>
                    </TouchableOpacity>
                </View> */}
            </ImageBackground>
        </View>
    );
}
export default RegistrationPannel;