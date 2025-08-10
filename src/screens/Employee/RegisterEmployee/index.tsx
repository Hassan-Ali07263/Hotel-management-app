import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import Header from '../../../components/Header';
import { IMAGES } from '../../../assets/images';
import Input from '../../../components/Input';
import Buttons from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

const RegisterEmployee = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [img, setImg] = useState('');

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

    return (
        <View style={styles.container}>
            <Header title={"Registration"} />

            <ScrollView>
                {
                    img ? <Image style={styles.profileImage} source={{ uri: img }} /> :
                        <View style={styles.selectImageView}>
                            <Text style={styles.selectImageText}>Select your image</Text>
                        </View>
                }
                <TouchableOpacity onPress={() => openImagePicker()}
                    style={styles.editButton}>
                    <Image style={styles.editImage} source={IMAGES.Upload} />
                </TouchableOpacity>

                <View style={styles.inputsView}>
                    <Text style={styles.headingText}>Name:</Text>
                    <Input inputStyling={styles.inputStyle}
                        placeholder={"Type user name"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />

                    <Text style={styles.headingText}>Mobile Number:</Text>
                    <Input inputStyling={styles.inputStyle}
                        placeholder={"Type your mobile number"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={number}
                        onChangeText={(text) => setNumber(text)}
                        keyboardType={"numeric"}
                    />

                    <Text style={styles.headingText}>Email:</Text>
                    <Input inputStyling={styles.inputStyle}
                        placeholder={"Type your email"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType={"email-address"}
                    />

                    <Text style={styles.headingText}>Address:</Text>
                    <Input inputStyling={styles.inputStyle}
                        placeholder={"Type your address"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />

                    <Text style={styles.headingText}>Password:</Text>
                    <Input inputStyling={styles.inputStyle}
                        placeholder={"Type your password"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />

                    <Text style={styles.headingText}>Confirm Password:</Text>
                    <Input inputStyling={styles.inputStyle}
                        placeholder={"Re-Type your password"}
                        placeholderTextColor={"rgba(10,108,109,.48)"}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry={true}
                    />

                    <Buttons styleButton={styles.styleButton} title={"Submit"} />

                    <TouchableOpacity onPress={() => navigation.navigate("MasterLogin")}
                        style={styles.loginButton}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
export default RegisterEmployee;