import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import AdminHeader from '../../../components/AdminHeader';
import Buttons from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../../apis';

const AdminPannel = () => {
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
    console.log(gt)
    getImage = JSON.parse(getImage);
    const imageFetched = baseUrl + `/${getImage.image.replace("\\", "/")}`;
    console.log(imageFetched)
    setImg(imageFetched);
    setName(getImage.name);
    setNumber(getImage.number)
  }

  useEffect(() => {
    check();
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backImage} source={IMAGES.DashboardBackground}>
        <AdminHeader />

        <View style={styles.headerView}>
          {
            img ? <Image style={styles.profileImage} source={{ uri: img }} /> :
              <Image style={styles.profileImage} source={IMAGES.profileImage} />
          }
          <View>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.numberText}>{number}</Text>
          </View>
        </View>

        <View style={styles.buttonsView}>
          <TouchableOpacity onPress={() => navigation.navigate("CreateCompany")}>
            <Image style={styles.buttonImage} source={IMAGES.CreateCompany} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("CompanyList")}>
            <Image style={styles.buttonImage} source={IMAGES.CompanyList} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("AgentList")}
          style={styles.agentButton}>
          <Image style={styles.buttonImage} source={IMAGES.AgentList} />
        </TouchableOpacity>

        <Buttons onPress={logoutFun} styleButton={styles.styleButton} title={"Log Out"} />
      </ImageBackground>
    </View>
  );
}
export default AdminPannel;