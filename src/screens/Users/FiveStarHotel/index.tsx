import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import UserHeader from '../../../components/UserHeader';
import { baseUrl, fiveStarHotels, searcFiveStarhHotels } from '../../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../enums/StyleEnums';

const FiveStarHotel = () => {
    const navigation = useNavigation();

    const [hotelList, setHotelList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
        const [isSearching, setIsSearching] = useState(false);


    const getAllHotels = async () => {
        try {
            setLoading(true);
            const data = await fetch(fiveStarHotels, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${await AsyncStorage.getItem("token")}`,
                }
            });
            console.log(data)

            const listing = await data.json();
            console.log(listing)
            if (listing.response === "ok") {
                setLoading(false);
                setHotelList(listing.result)
            }
            else {
                setLoading(false);
            }
        }
        catch (err) {
            setLoading(false);
            console.log("Error" + err)
        }
    }

    useEffect(() => {
            if(!search){
            getAllHotels();
            }
        }, [search])
    
        const searchFun = async (text) => {
            setSearch(text);
            if (text.trim() !== "") {
                setIsSearching(true);
                const data = await fetch(searcFiveStarhHotels + `/${text}`);
                const searchData = await data.json();
                if (searchData.response === "ok") {
                    setHotelList(searchData.result);
                }
                else {
                    setHotelList([]);
                }
            }
            else {
                setIsSearching(false)
                getAllHotels();
            }
        }

    const renderItem = ({ item }) => {
        const image = baseUrl + `/${item.companyLogo.replace("\\", "/")}`
        return (
            <TouchableOpacity onPress={() => navigation.navigate("HotelDetails", { item })}
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
            <UserHeader value={search} onChangeText={(text) => searchFun(text)} />
            {
                hotelList.length > 0 ? <FlatList
                    data={hotelList}
                    renderItem={renderItem}
                    contentContainerStyle={{ marginHorizontal: "5%" }}
                /> : <View style={styles.noRegisterView}>
                    <Text style={styles.noRegisteredText}>{isSearching ? "No match found" : "No registered hotel yet."}</Text>
                </View>
            }
            {
                loading ? <View style={styles.loadingStyle}>
                    <ActivityIndicator size={70} color={COLORS.primary} />
                </View> : null
            }
        </View>
    );
}
export default FiveStarHotel;