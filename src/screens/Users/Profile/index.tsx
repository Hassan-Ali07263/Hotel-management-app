import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import Header from '../../../components/Header';
import Buttons from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../../apis';

const Profile = () => {
  const navigation = useNavigation();
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const getData = async () => {
    let getData = await AsyncStorage.getItem("user");
    getData = JSON.parse(getData)
    const image = baseUrl + `/${getData.image.replace("\\", "/")}`;
    console.log(getData)
    setName(getData.name);
    setNumber(getData.number);
    setEmail(getData.email);
    setAddress(getData.address);
    setImg(image);
  }

  useEffect(() => {
    getData();
  }, [])

  console.log(name, address, number, email, img)

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
  return (
    <View style={styles.container}>
      <Header title={"Profile"} />
      <Image style={styles.profileImage} source={{ uri: img }} />

      <View style={styles.lowerContainer}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Name:</Text>
          <Text style={styles.subHeadingText}>{name}</Text>
        </View>

        <View style={styles.headingView}>
          <Text style={styles.headingText}>Phone:</Text>
          <Text style={styles.subHeadingText}>{number}</Text>
        </View>

        <View style={styles.headingView}>
          <Text style={styles.headingText}>Email:</Text>
          <Text style={styles.subHeadingText}>{email}</Text>
        </View>

        <View style={styles.headingView}>
          <Text style={styles.headingText}>Address:</Text>
          <Text style={styles.subHeadingText}>{address}</Text>
        </View>
      </View>

      <Buttons onPress={logoutFun} styleButton={styles.styleButton} title={"Log Out"} />


    </View>
  );
}
export default Profile;
