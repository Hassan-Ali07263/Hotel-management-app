import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import Input from '../../../components/Input';
import { COLORS } from '../../../enums/StyleEnums';
import Buttons from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../../apis';

const MasterLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const loginFun = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        return Alert.alert("Oops", "Enter complete data")
      }
      console.log("starting...")

      let response = await fetch(login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      console.log(response)
      response = await response.json()
      if (response.response === "owner") {
        setLoading(false);
        await AsyncStorage.setItem("user", JSON.stringify(response.result));
        await AsyncStorage.setItem("token", response.auth);
        await AsyncStorage.setItem("response", response.response);
        navigation.navigate("AdminPannel");
      }
      else if (response.response === "user") {
        setLoading(false);
        await AsyncStorage.setItem("user", JSON.stringify(response.result));
        await AsyncStorage.setItem("token", response.auth);
        await AsyncStorage.setItem("response", response.response);
        navigation.navigate("BottomTabs");
      }
      else if (response.response === "manager") {
        setLoading(false);
        await AsyncStorage.setItem("user", JSON.stringify(response.result));
        await AsyncStorage.setItem("token", response.auth);
        await AsyncStorage.setItem("response", response.response);
        navigation.navigate("ManagerPannel");
      }
      else if (response.response === "employee") {
        setLoading(false);
        await AsyncStorage.setItem("user", JSON.stringify(response.result));
        await AsyncStorage.setItem("token", response.auth);
        await AsyncStorage.setItem("response", response.response);
        navigation.navigate("EmployeePannel");
      }
      else {
        setLoading(false);
        Alert.alert("Oops", response.result)
      }

    }
    catch (err) {
      setLoading(false);
      Alert.alert("Error" + err)
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backImage} source={IMAGES.LoginBackground}>
        <Image style={styles.mainLogo} source={IMAGES.MainLogo} />

        <Text style={styles.userNameStyle}>Email</Text>
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder={"Type here email"}
          placeholderTextColor={COLORS.primary}
        />

        <Text style={styles.passwordStyle}>Password</Text>
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder={"Type here Password"}
          placeholderTextColor={COLORS.primary}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.forgetButton}>
          <Text style={styles.forgetPasswordText}>Forget Password?</Text>
        </TouchableOpacity>

        <Buttons onPress={loginFun} title={"Login"} styleButton={styles.styleButton} />

        <View style={styles.noAccountView}>
          <Text style={styles.noAccountText}>If you have no account click here to</Text>
          <TouchableOpacity onPress={() => navigation.navigate("RegistrationPannel")}
            style={styles.registrationButton}>
            <Text style={styles.registrationText}> Registration</Text>
          </TouchableOpacity>
        </View>
        {
          loading ? <View style={styles.loadingStyle}>
            <ActivityIndicator size={70} color={COLORS.primary} />
          </View> : null
        }

      </ImageBackground>
    </View>
  );
}
export default MasterLogin;