import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import Header from '../../../components/Header';
import { IMAGES } from '../../../assets/images';
import Input from '../../../components/Input';
import Buttons from '../../../components/Buttons';
import SuccessModal from '../../../components/SuccessModal';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { createCompany } from '../../../apis';
import { COLORS } from '../../../enums/StyleEnums';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateCompany = () => {
    const navigation = useNavigation();

    const [numberOne, setNumberOne] = useState('');
    const [numberTwo, setNumberTwo] = useState('');
    const [hotelEmail, setHotelEMail] = useState('');
    const [company, setCompany] = useState('');
    const [country, setCountry] = useState('');
    const [division, setDivision] = useState('');
    const [type, setType] = useState('');
    const [district, setDistrict] = useState('');
    const [facility, setFacility] = useState('');
    const [offer, setOffer] = useState('');
    const [website, setWebsite] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [open, setOpen] = useState(false);
    const [logo, setLogo] = useState('');
    const [openDroper, setOpenDroper] = useState(false);

    const [items, setItems] = useState([
        { label: '5 Star', value: '5 Star' },
        { label: '4 Star', value: '4 Star' },
        { label: '3 Star', value: '3 Star' },
    ]);

    const openLogoPicker = () => {
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
                setLogo(imageUri);
            }
        });
    };

    const modalButtonFun = () => {
        navigation.navigate("AdminPannel")
    }

    // useEffect(()=>{
    //     const check=async()=>{
    //         let getId = await AsyncStorage.getItem("user");
    //         getId = JSON.parse(getId);
    //         const userId=getId._id;
    //         console.log(userId)
    //     }
    //     check();
    // },[])

    const submitButton = async () => {
        try {
            setLoading(true);
            if (!company || !numberOne || !numberTwo || !hotelEmail || !country || !division || !district || !type || !facility || !offer || !website || !companyAddress || !password || !confirmPassword || !logo) {
                return Alert.alert("Oops", "fill all the data")
            }

            if (password != confirmPassword) {
                return Alert.alert("Oops", "Password does not match.")
            }

            let getId = await AsyncStorage.getItem("user");
            getId = JSON.parse(getId);
            const userId = getId._id;

            const formdata = new FormData();

            formdata.append("companyName", company),
                formdata.append("companyNumberOne", numberOne),
                formdata.append("companyNumberTwo", numberTwo),
                formdata.append("email", hotelEmail),
                formdata.append("country", country),
                formdata.append("division", division),
                formdata.append("district", district),
                formdata.append("companyType", type),
                formdata.append("facilities", facility),
                formdata.append("offers", offer),
                formdata.append("website", website),
                formdata.append("companyAddress", companyAddress),
                formdata.append("password", password),
                formdata.append("confirmPassword", confirmPassword),
                formdata.append("userId", userId),
                formdata.append("image", {
                    uri: logo,
                    name: "photo.png",
                    type: "image/png"
                })

            console.log(formdata)
            let response = await fetch(createCompany, {
                method: "POST",
                headers: { "Content-Type": "multipart/form-data" },
                body: formdata
            })
            console.log("started ... " + response)
            response = await response.json();
            if (response.response === "ok") {
                setLoading(false);
                setOpen(true);
                setCompany('');
                setNumberOne('');
                setNumberTwo('');
                setHotelEMail('');
                setCountry('');
                setDivision('');
                setDistrict('');
                setType('');
                setFacility('');
                setOffer('');
                setWebsite('');
                setCompanyAddress('');
                setPassword('');
                setConfirmPassword('');
                setLogo('');
            }
            else {
                setLoading(false)
                Alert.alert("Oops", response.result)
            }
        }
        catch (err) {
            setLoading(false)
            Alert.alert("Error" + err)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Header title={"Create Company/Hotel"} />
            <ScrollView>
                <ImageBackground style={styles.companyBackImage} source={IMAGES.CompanyBackground}>
                    <Text style={styles.headingText}>Hotel Name:</Text>
                    <Input inputStyling={styles.inputStyling}
                        placeholder={"Type here company name"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={company}
                        onChangeText={(text) => setCompany(text)}
                    />

                    <Text style={styles.headingText}>Hotel Mobile Number1:</Text>
                    <Input inputStyling={styles.inputStyling}
                        placeholder={"Type mobile number"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={numberOne}
                        onChangeText={(text) => setNumberOne(text)}
                    />

                    <Text style={styles.headingText}>Hotel Mobile Number2:</Text>
                    <Input inputStyling={styles.inputStyling}
                        placeholder={"Type mobile number"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={numberTwo}
                        onChangeText={(text) => setNumberTwo(text)}
                    />

                    <Text style={styles.headingText}>Hotel Email:</Text>
                    <Input inputStyling={styles.inputStyling}
                        placeholder={"Type hotel email"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={hotelEmail}
                        onChangeText={(text) => setHotelEMail(text)}
                    />

                    <Text style={styles.headingText}>Country:</Text>
                    <Input inputStyling={styles.inputStyling}
                        placeholder={"Type hotel country"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={country}
                        onChangeText={(text) => setCountry(text)}
                    />

                    <Text style={styles.headingText}>Division:</Text>
                    <Input inputStyling={styles.inputStyling}
                        placeholder={"Type hotel division"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={division}
                        onChangeText={(text) => setDivision(text)}
                    />

                    <Text style={styles.headingText}>District:</Text>
                    <Input inputStyling={styles.inputStyling}
                        placeholder={"Type hotel district"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={district}
                        onChangeText={(text) => setDistrict(text)}
                    />

                    <Text style={styles.headingText}>Hotel Type:</Text>
                    <DropDownPicker style={styles.droperStyle}
                        textStyle={styles.textStyle}
                        listItemLabelStyle={styles.listitemStyle}
                        placeholder='Select hotel Type'
                        open={openDroper}
                        value={type}
                        items={items}
                        setOpen={setOpenDroper}
                        setValue={setType}
                        setItems={setItems}
                    />

                    <Text style={styles.headingText}>Facilities:</Text>
                    <Input inputStyling={styles.inputStyling}
                        placeholder={"Type hotel facilities"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={facility}
                        onChangeText={(text) => setFacility(text)}
                    />

                    <Text style={styles.headingText}>Offers:</Text>
                    <Input inputStyling={styles.inputStyling}
                        placeholder={"Type what hotel offers"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={offer}
                        onChangeText={(text) => setOffer(text)}
                    />

                    <Text style={styles.headingText}>Website:</Text>
                    <Input inputStyling={styles.inputStyling}
                        placeholder={"Type hotel website"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={website}
                        onChangeText={(text) => setWebsite(text)}
                    />

                    <Text style={styles.headingText}>Company Address:</Text>
                    <Input inputStyling={styles.inputStyling}
                        placeholder={"Type hotel complete address"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={companyAddress}
                        onChangeText={(text) => setCompanyAddress(text)}
                    />

                    <Text style={styles.headingText}>Password:</Text>
                    <Input inputStyling={styles.inputStyling}
                        placeholder={"Type hotel password"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />

                    <Text style={styles.headingText}>Confirm Password:</Text>
                    <Input inputStyling={styles.inputStyling}
                        placeholder={"Re-Type password"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry={true}
                    />

                    <Text style={styles.headingText}>Company Logo:</Text>
                    <TouchableOpacity onPress={openLogoPicker}
                        style={styles.logoButton}>
                        {
                            logo ? <Image style={styles.imageStyle} source={{ uri: logo }} /> :
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
            <SuccessModal visible={open} onPress={modalButtonFun} heading={"Congratulations!"} description={"You Successfully Create new Company"} />
        </View>
    );
}
export default CreateCompany;