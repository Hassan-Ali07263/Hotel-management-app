import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, FlatList, TouchableOpacity, ActivityIndicator, Modal, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import Header from '../../../components/Header';
import { EditRoomList } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, roomList, updateRoom } from '../../../apis';
import { COLORS } from '../../../enums/StyleEnums';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../../../components/Input';
import Buttons from '../../../components/Buttons';
import UserHeader from '../../../components/UserHeader';

const EditRoom = () => {
    const naviagtion = useNavigation();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
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
    const [id, setId] = useState('');

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


    const fetchData = async () => {
        setLoading(true);
        let getId = await AsyncStorage.getItem("user");
        getId = JSON.parse(getId);
        const userId = getId.userId;
        console.log(userId)

        let data = await fetch(roomList + `/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${await AsyncStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        data = await data.json();
        setList(data.result);
        setLoading(false);

    }

    useEffect(() => {
        fetchData();
    }, [])
    console.log(list)

    const fetchDataToUpdate = ({ item }) => {
        setLoading(true);
        const image = baseUrl + `/${item.image.replace("\\", "/")}`;
        console.log(item)
        setRoomType(item.type)
        setRoomNumber(item.roomNumber)
        setFloor(item.floor);
        setRent(item.rent);
        setDiscount(item.discount);
        setFacility(item.facility);
        setOffer(item.offer);
        setAddress(item.address);
        setPhone(item.phoneNumber);
        setWebsite(item.website);
        setImg(image);
        setId(item._id)
        setOpen(true)
        setLoading(false);
    }

    const submitButton = async () => {
        try {
            setLoading(true);
            if (!roomType || !roomNumber || !floor || !rent || !discount || !facility || !offer || !address || !phone || !website || !img) {
                setLoading(false)
                return Alert.alert("Oops", "Some data is missing")
            }
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
                formdata.append("image", {
                    uri: img,
                    name: "Photo.png",
                    type: "image/png"
                })

            console.log(formdata)

            const data = await fetch(updateRoom + `/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: formdata
            })

            const updation = await data.json();
            console.log(updation);
            if (updation.response === "ok") {
                setLoading(false)
                setOpen(false)
                fetchData();
            }
            else {
                Alert.alert("Oops", updation.result)
            }
        }
        catch (err) {
            Alert.alert("Error" + err)
        }
    }

    const closeButton = async () => {
        setOpen(false)
    }

    const renderItem = ({ item }) => {
        const image = baseUrl + `/${item.image.replace("\\", "/")}`

        return (
            <TouchableOpacity onPress={() => fetchDataToUpdate({ item })}
                style={styles.editButton}>
                <View style={styles.buttonStyle}>
                    <Image style={styles.imageStyle} source={{ uri: image }} />
                    <View>
                        <Text style={styles.numberText}>Room Number: {item.roomNumber}</Text>
                        <Text style={styles.numberText}>Floor Number: {item.floor}</Text>
                        <Text style={styles.numberText}>Price: From ${item.rent}/night</Text>
                    </View>
                </View>

                <Image style={styles.editImage} source={IMAGES.EditWhite} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backImage} source={IMAGES.CompanyBackground}>
                <Header title={"Edit Room"} />

                {
                    list.length > 0 ? <FlatList
                        data={list}
                        renderItem={renderItem}
                        contentContainerStyle={{ marginHorizontal: "5%" }}
                    /> : <View style={styles.noDataView}>
                        <Text style={styles.companyText}>No Registered Room</Text>
                    </View>
                }
                {
                    loading ? <View style={styles.loadingStyle}>
                        <ActivityIndicator size={70} color={COLORS.primary} />
                    </View> : null
                }

                {
                    <Modal visible={open} transparent={true} animationType={"fade"}>
                        <View style={styles.outerModalContainer}>
                            <View style={styles.innerModalContainer}>
                                <ScrollView>
                                    <View style={styles.innerScroolView}>
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
                                                img ? <Image style={styles.modalImageStyle} source={{ uri: img }} /> :
                                                    <Text style={styles.logoText}>Select Image</Text>}
                                        </TouchableOpacity>

                                        <View style={styles.buttonView}>
                                            <Buttons onPress={submitButton} titleStyle={styles.titleStyle} styleButton={styles.styleButton} title={"Update"} />
                                            <Buttons onPress={closeButton} titleStyle={styles.titleStyle} styleButton={styles.styleButton} title={"Cancel"} />

                                        </View>

                                    </View>
                                </ScrollView>
                                {
                                    loading ? <View style={styles.loadingStyle}>
                                        <ActivityIndicator size={70} color={COLORS.primary} />
                                    </View> : null
                                }
                            </View>
                        </View>
                    </Modal>
                }
            </ImageBackground>
        </View>
    );
}
export default EditRoom;