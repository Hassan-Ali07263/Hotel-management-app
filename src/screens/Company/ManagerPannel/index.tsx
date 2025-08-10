import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import AdminHeader from '../../../components/AdminHeader';
import Buttons from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../../apis';

const ManagerPannel = () => {
    const navigation = useNavigation();

    const [img, setImg] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const logoutFun = async () => {
        try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("response");
            navigation.navigate("MasterLogin");
        }
        catch (err) {
            Alert.alert("Error" + err);
        }
    }

    const check = async () => {
        let getImage = await AsyncStorage.getItem("user");
        const gt = await AsyncStorage.getItem("token")
        console.log(gt, getImage)
        getImage = JSON.parse(getImage);
        const imageFetched = baseUrl + `/${getImage.companyLogo.replace("\\", "/")}`;
        console.log(imageFetched)
        setImg(imageFetched);
        setName(getImage.companyName);
        setNumber(getImage.companyNumberOne)
    }

    useEffect(() => {
        check();
    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backIMage} source={IMAGES.DashboardBackground}>
                <AdminHeader />

                <View style={styles.headerView}>
                    <Image style={styles.profileImage} source={{ uri: img }} />
                    <View>
                        <Text style={styles.nameText}>{name}</Text>
                        <Text style={styles.numberText}>{number}</Text>
                    </View>
                </View>

                <View style={styles.ButtonsView}>
                    <TouchableOpacity onPress={() => navigation.navigate("AddEmployee")}
                        style={{ width: "25%" }}>
                        <Image style={styles.buttonsImage} source={IMAGES.CreateEmployee} />
                        <Text style={styles.buttonText}>Create Employee</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("EmployeeList")}
                        style={{ width: "25%" }}>
                        <Image style={styles.buttonsImage} source={IMAGES.EmployeeList} />
                        <Text style={styles.buttonText}>Employee List</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("AddRoom")}
                        style={{ width: "25%" }}>
                        <Image style={styles.buttonsImage} source={IMAGES.AddRoom} />
                        <Text style={styles.buttonText}>Add Room</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.ButtonsView}>
                    <TouchableOpacity onPress={() => navigation.navigate("RoomList")}
                        style={{ width: "25%" }}>
                        <Image style={styles.buttonsImage} source={IMAGES.RoomList} />
                        <Text style={styles.buttonText}>Room List</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("EditRoom")}
                        style={{ width: "25%" }}>
                        <Image style={styles.buttonsImage} source={IMAGES.EditRoom} />
                        <Text style={styles.buttonText}>Edit Room</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("DeleteRoom")}
                        style={{ width: "25%" }}>
                        <Image style={styles.buttonsImage} source={IMAGES.DeleteRoom} />
                        <Text style={styles.buttonText}>Delete Room</Text>
                    </TouchableOpacity>
                </View>

                <Buttons onPress={logoutFun} styleButton={styles.styleButton} title={"Log Out"} />

            </ImageBackground>
        </View>
    );
}
export default ManagerPannel;