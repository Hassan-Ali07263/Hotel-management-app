import React, { useState } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import Header from '../../../components/Header';
import { IMAGES } from '../../../assets/images';
import Input from '../../../components/Input';
import { launchImageLibrary } from 'react-native-image-picker';
import Buttons from '../../../components/Buttons';
import SuccessModal from '../../../components/SuccessModal';
import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS } from '../../../enums/StyleEnums';
import { addEmployee } from '../../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddEmployee = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [cnic, setCnic] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [img, setImg] = useState('');
  const [openDroper, setOpenDroper] = useState(false);

  const [items, setItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ]);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImg(imageUri);
      }
    });
  };

  const modalButtonFun = () => {
    navigation.navigate("ManagerPannel")
  }

  const submitButton = async () => {
    try {
      setLoading(true)
      if (!name || !number || !email || !cnic || !gender || !address || !password || !confirmPassword) {
        setLoading(false)
        return Alert.alert("Oops", "Some data is missing")
      }

      if (password != confirmPassword) {
        setLoading(false)
        return Alert.alert("Oops", "Password does not watch")
      }

      let getId = await AsyncStorage.getItem("user");
      getId = JSON.parse(getId);
      const userId = getId.userId;
      console.log(userId)

      const formdata = new FormData();
      formdata.append("name", name),
        formdata.append("number", number),
        formdata.append("email", email),
        formdata.append("cnic", cnic),
        formdata.append("gender", gender),
        formdata.append("address", address),
        formdata.append("password", password),
        formdata.append("confirmPassword", confirmPassword),
        formdata.append("image", {
          uri: img,
          name: "photo.png",
          type: "image/png"
        })
      formdata.append("userId", userId)

      const getdata = await fetch(addEmployee, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: formdata
      })
      console.log(getdata)

      const data =await getdata.json();
      console.log(data)

      if (data.response === "ok") {
        setLoading(false);
        setOpen(true);
      }
      else {
        console.log("Oops",data.result)
      }

    }
    catch (err) {
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <View style={styles.container}>
      <Header title={"Create Employee"} />

      <ScrollView>
        <ImageBackground style={styles.backImage} source={IMAGES.CompanyBackground}>

          <Text style={styles.headingText}>User Full Name:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here user full name"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <Text style={styles.headingText}>Mobile Number:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here user mobile number"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={number}
            onChangeText={(text) => setNumber(text)}
          />

          <Text style={styles.headingText}>Email:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here user email"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <Text style={styles.headingText}>CNIC No.:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here user cnic"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={cnic}
            onChangeText={(text) => setCnic(text)}
          />

          <Text style={styles.headingText}>Gender:</Text>
          <DropDownPicker style={styles.droperStyle}
            textStyle={styles.textStyle}
            listItemLabelStyle={styles.listitemStyle}
            placeholder='Select Employee Gender'
            open={openDroper}
            value={gender}
            items={items}
            setOpen={setOpenDroper}
            setValue={setGender}
            setItems={setItems}
          />

          <Text style={styles.headingText}>Address:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here user address"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />

          <Text style={styles.headingText}>Password:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here user password"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />

          <Text style={styles.headingText}>Confirm Password:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Re-Type here user password"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
          />

          <Text style={styles.headingText}>User Image:</Text>
          <TouchableOpacity onPress={openImagePicker}
            style={styles.logoButton}>
            {
              img ? <Image style={styles.imageStyle} source={{ uri: img }} /> :
                <Text style={styles.logoText}>Select Image</Text>}
          </TouchableOpacity>

          <Buttons onPress={submitButton} titleStyle={styles.titleStyle} styleButton={styles.styleButton} title={"Submite"} />

        </ImageBackground>
      </ScrollView>
      {
        loading ? <View style={styles.loadingStyle}>
          <ActivityIndicator size={70} color={COLORS.primary} />
        </View> : null
      }

      <SuccessModal visible={open} onPress={modalButtonFun} heading={"Congratulations!"} description={"You Successfully Create new Employee"} />

    </View>
  );
}
export default AddEmployee;