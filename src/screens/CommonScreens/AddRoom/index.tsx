import React, { useState } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { styles } from './styles';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import { IMAGES } from '../../../assets/images';
import { launchImageLibrary } from 'react-native-image-picker';
import Buttons from '../../../components/Buttons';
import SuccessModal from '../../../components/SuccessModal';
import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS } from '../../../enums/StyleEnums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addRoom } from '../../../apis';
import { useNavigation } from '@react-navigation/native';

const AddRoom = () => {
  const navigation = useNavigation();

  const [roomType, setRoomType] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [rent, setRent] = useState('');
  const [discount, setDiscount] = useState('');
  const [facility, setFacility] = useState('');
  const [offer, setOffer] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  const [img, setImg] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openDroper, setOpenDroper] = useState(false);

  const [items, setItems] = useState([
    { label: '5 Star', value: '5 Star' },
    { label: '4 Star', value: '4 Star' },
    { label: '3 Star', value: '3 Star' },
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
      if (!roomType || !roomNumber || !floor || !rent || !discount || !facility || !offer || !address || !phone || !website || !img) {
        setLoading(false)
        return Alert.alert("Oops", "Some data is missing")
      }
      console.log("starting...")

      let getId = await AsyncStorage.getItem("user");
      getId = JSON.parse(getId);
      const userId = getId.userId;
      console.log(userId)

      const formdata = new FormData();
      formdata.append("type", roomType),
        formdata.append("roomNumber", roomNumber),
        formdata.append("floor", floor),
        formdata.append("rent", rent),
        formdata.append("discount", discount),
        formdata.append("facility", facility),
        formdata.append("offer", offer),
        formdata.append("address", address),
        formdata.append("phoneNumber", phone),
        formdata.append("website", website),
        formdata.append("userId", userId),
        formdata.append("image", {
          uri: img,
          name: "Photo.png",
          type: "image/png"
        })
      console.log(formdata)

      const getdata = await fetch(addRoom, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: formdata
      })
      console.log(getdata)

      const data = await getdata.json();
      console.log(data)

      if (data.response === "ok") {
        setLoading(false);
        setOpen(true);
      }
      else {
        setLoading(false);
        Alert.alert("Oops", data.result)
      }

    }
    catch (err) {
      setLoading(false)
      Alert.alert("Error" + err);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Header title={"Add Room"} />
      <ScrollView>
        <ImageBackground style={styles.backImage} source={IMAGES.CompanyBackground}>

          <Text style={styles.headingText}>Room Type:</Text>
          <DropDownPicker style={styles.droperStyle}
            textStyle={styles.textStyle}
            listItemLabelStyle={styles.listitemStyle}
            placeholder='Select Room Type'
            open={openDroper}
            value={roomType}
            items={items}
            setOpen={setOpenDroper}
            setValue={setRoomType}
            setItems={setItems}
          />

          <Text style={styles.headingText}>Room Number:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here room number"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={roomNumber}
            onChangeText={(text) => setRoomNumber(text)}
          />

          <Text style={styles.headingText}>Floor:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here floor number"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={floor}
            onChangeText={(text) => setFloor(text)}
          />

          <Text style={styles.headingText}>Rent:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here amount"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={rent}
            onChangeText={(text) => setRent(text)}
          />

          <Text style={styles.headingText}>Discount:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here discount amount"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={discount}
            onChangeText={(text) => setDiscount(text)}
          />

          <Text style={styles.headingText}>Facility:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here facilities"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={facility}
            onChangeText={(text) => setFacility(text)}
          />

          <Text style={styles.headingText}>Offers:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here offers"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={offer}
            onChangeText={(text) => setOffer(text)}
          />

          <Text style={styles.headingText}>Address:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here address"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />

          <Text style={styles.headingText}>Phone Number:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here phone number"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          <Text style={styles.headingText}>Website:</Text>
          <Input inputStyling={styles.inputStyling}
            placeholder={"Type here website"}
            placeholderTextColor={"rgba(10,108,109,.48)"}
            value={website}
            onChangeText={(text) => setWebsite(text)}
          />

          <Text style={styles.headingText}>Room Image:</Text>
          <TouchableOpacity onPress={openImagePicker}
            style={styles.logoButton}>
            {
              img ? <Image style={styles.imageStyle} source={{ uri: img }} /> :
                <Text style={styles.logoText}>Select Image</Text>}
          </TouchableOpacity>

          <Buttons onPress={submitButton} titleStyle={styles.titleStyle} styleButton={styles.styleButton} title={"Submit"} />

        </ImageBackground>
      </ScrollView>
      {
        loading ? <View style={styles.loadingStyle}>
          <ActivityIndicator size={70} color={COLORS.primary} />
        </View> : null
      }
      <SuccessModal visible={open} onPress={modalButtonFun} heading={"Congratulations!"} description={"You Successfully Add a new Room"} />

    </View>
  );
}
export default AddRoom;