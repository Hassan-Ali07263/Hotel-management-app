import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { Styles } from './styles';
import { IMAGES } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();
  const checkIn = async () => {
    const response = await AsyncStorage.getItem("response");
    console.log("response i get is ", response)
    if (response === "owner") {
      navigation.navigate("AdminPannel")
    }
    else if (response === "user") {
      navigation.navigate("BottomTabs")
    }
    else if (response === "manager") {
      navigation.navigate("ManagerPannel")
    }
    else if (response === "employee") {
      navigation.navigate("EmployeePannel")
    }
    else {
      navigation.navigate("MasterLogin")
    }
  }

  useEffect(() => {
    setTimeout(() => {
      checkIn();
    }, 2000);
  }, [])
  return (
    <View style={Styles.container}>
      <ImageBackground style={Styles.backImageStyle} source={IMAGES.SplashImage}>
        <Image style={Styles.logoStyle} source={IMAGES.MainLogo} />
      </ImageBackground>
    </View>
  );
}
export default Splash;