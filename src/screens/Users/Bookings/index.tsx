import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { listData } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import UserHeader from '../../../components/UserHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, getBookingData, searchBookings } from '../../../apis';
import { COLORS } from '../../../enums/StyleEnums';

const Bookings = () => {
  const navigation = useNavigation();
  const [hotelList, setHotelList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [roomList, setRoomList] = useState([]);


  const getBookedRooms = async () => {
    try {
      setLoading(true);
      let getData = await AsyncStorage.getItem("user");
      getData = JSON.parse(getData)

      const data = await fetch(getBookingData + `/${getData._id}`, {
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
        setHotelList([])
      }
    }
    catch (err) {
      setLoading(false);
      console.log("Error" + err)
    }
  }

  const searchFun = async (text) => {
    setSearch(text);
    if (text.trim() !== "") {
      setIsSearching(true);
      let getData = await AsyncStorage.getItem("user");
      getData = JSON.parse(getData)
      const data = await fetch(searchBookings + `/${getData._id}` + `/${text}`);
      const searchData = await data.json();
      console.log(searchData)
      if (searchData.response === "ok") {
        setHotelList(searchData.result);
      }
      else {
        setHotelList([]);
      }
    }
    else {
      setIsSearching(false)
      getBookedRooms();
    }
  }


  useEffect(() => {
    if (!search) {
      getBookedRooms()
    }
  }, [search])

  const renderItem = ({ item }) => {
    const image = baseUrl + `/${item.image.replace("\\", "/")}`
    return (
      <View style={styles.buttonStyle}>
        <Image style={styles.imageStyle} source={{ uri: image }} />
        <View>
          <Text style={styles.nameText}>{item.roomNumber}</Text>
          <Text style={styles.numberText}>Address: {item.address}</Text>
          <Text style={styles.numberText}>Payment: {item.payments}...</Text>
        </View>
      </View>
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
        /> :
          <View style={styles.noRegisterRoomView}>
            <Text style={styles.noRegisterText}>{isSearching ? "No match found" : "No booked room yet."}</Text>
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
export default Bookings;