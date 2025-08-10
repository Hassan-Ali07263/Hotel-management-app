import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { baseUrl, companyList } from '../../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../enums/StyleEnums';

const CompanyList = () => {
    const naviagtion = useNavigation();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchData = async () => {
        setLoading(true);

        let getId = await AsyncStorage.getItem("user");
        getId = JSON.parse(getId);
        const userId = getId._id;
        console.log(userId)

        let data = await fetch(companyList + `/${userId}`, {
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
        const image = baseUrl + `/${item.companyLogo.replace("\\", "/")}`;
        return (
            <TouchableOpacity onPress={() => naviagtion.navigate("CompanyDetails", { item })}
                style={styles.buttonStyle}>
                <Image style={styles.imageStyle} source={{ uri: image }} />
                <View>
                    <Text style={styles.nameText}>{item.companyName}</Text>
                    <Text style={styles.numberText}>Phone Number: {item.companyNumberOne}</Text>
                    <Text style={styles.numberText}>Address: {item.companyAddress.length > 30
                        ? item.companyAddress.substring(0, 35) + '...'
                        : item.companyAddress}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backImage} source={IMAGES.CompanyBackground}>
                <Header title={"Company List"} />

                {
                    list.length > 0 ? <FlatList
                        data={list}
                        renderItem={renderItem}
                        contentContainerStyle={{ marginHorizontal: "5%" }}
                    /> : <View style={styles.noDataView}>
                        <Text style={styles.companyText}>No Registered Company</Text>
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
export default CompanyList;