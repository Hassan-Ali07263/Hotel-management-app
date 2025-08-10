import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import Header from '../../../components/Header';
import { listRoom } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, roomList } from '../../../apis';
import { COLORS } from '../../../enums/StyleEnums';

const RoomList = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

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

    const renderItem = ({ item }) => {
        const image = baseUrl + `/${item.image.replace("\\", "/")}`
        return (
            <TouchableOpacity onPress={() => navigation.navigate("RoomDetail", { item })}
                style={styles.buttonStyle}>
                <Image style={styles.imageStyle} source={{ uri: image }} />
                <View>
                    <Text style={styles.numberText}>Room Number: {item.roomNumber}</Text>
                    <Text style={styles.numberText}>Floor Number: {item.floor}</Text>
                    <Text style={styles.numberText}>Price: From ${item.rent}/night</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backImage} source={IMAGES.CompanyBackground}>
                <Header title={"Room List"} />

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
            </ImageBackground>
        </View>
    );
}
export default RoomList;