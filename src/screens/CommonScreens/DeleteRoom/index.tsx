import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, FlatList, TouchableOpacity, ActivityIndicator, Modal, Alert } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import Header from '../../../components/Header';
import { EditRoomList } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, deleteRoom, roomList } from '../../../apis';
import { COLORS } from '../../../enums/StyleEnums';
import Buttons from '../../../components/Buttons';

const DeleteRoom = () => {
    const naviagtion = useNavigation();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');

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

    const modalForDelete = ({ item }) => {
        console.log(item)
        setId(item._id);
        setOpen(true);
    }

    const cancelButton = async () => {
        setOpen(false)
    }

    const okButton = async () => {
        try {
            const data = await fetch(deleteRoom + `/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const deletion = await data.json();
            if (deletion.response === "ok") {
                setOpen(false)
                fetchData();
            }
            else {
                Alert.alert("Oops", deletion.result)
            }
        }
        catch (err) {
            Alert.alert("Error" + err)
        }
    }

    const renderItem = ({ item }) => {
        const image = baseUrl + `/${item.image.replace("\\", "/")}`

        return (
            <TouchableOpacity onPress={() => modalForDelete({ item })}
                style={styles.editButton}>
                <View style={styles.buttonStyle}>
                    <Image style={styles.imageStyle} source={{ uri: image }} />
                    <View>
                        <Text style={styles.numberText}>Room Number: {item.roomNumber}</Text>
                        <Text style={styles.numberText}>Floor Number: {item.floor}</Text>
                        <Text style={styles.numberText}>Price: From ${item.rent}/night</Text>
                    </View>
                </View>

                <Image style={styles.editImage} source={IMAGES.Delete} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backImage} source={IMAGES.CompanyBackground}>
                <Header title={"Delete Room"} />

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
                    <Modal visible={open} transparent={true} animationType={"slide"}>
                        <View style={styles.modalOuterContainer}>
                            <View style={styles.modalInnerContainer}>
                                <Text style={styles.sureText}>Are you sure,</Text>
                                <Text style={styles.sureText}>You want to delete this room</Text>
                                <View style={styles.buttonView}>
                                    <Buttons onPress={okButton} titleStyle={styles.titleStyle} styleButton={styles.styleButton} title={"Delete"} />
                                    <Buttons onPress={cancelButton} titleStyle={styles.titleStyle} styleButton={styles.styleButton} title={"Cancel"} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                }
            </ImageBackground>
        </View>
    );
}
export default DeleteRoom;