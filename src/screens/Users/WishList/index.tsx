import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { wishListData } from '../../../constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import UserHeader from '../../../components/UserHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, deleteFromWishlist, getWishlistData, searchWishlist } from '../../../apis';
import { COLORS } from '../../../enums/StyleEnums';
import { useDispatch } from 'react-redux';
import { removeWishlist } from '../../../redux/action';

const WishList = () => {
  const navigation = useNavigation();
  const [hotelList, setHotelList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();
  const getAllHotels = async () => {
    try {
      setLoading(true);
      let getData = await AsyncStorage.getItem("user");
      getData = JSON.parse(getData)

      const data = await fetch(getWishlistData + `/${getData._id}`, {
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
        console.log(listing.result)
        // Alert.alert("Oops in hotel list", listing.result)
      }
    }
    catch (err) {
      setLoading(false);
      console.log("Error" + err)
    }
  }



  useFocusEffect(
    React.useCallback(() => {
      if (!search) {
        getAllHotels();
      }
    }, [search])
  )

  const deleteFun = async (item) => {
    try {
      let getData = await AsyncStorage.getItem("user");
      getData = JSON.parse(getData)

      const data = await fetch(deleteFromWishlist + `/${getData._id}/${item.roomNumber}`, {
        method: "DELETE"
      })
      const deletedData = await data.json();
      if (deletedData.response === "ok") {
        dispatch(removeWishlist(item))
        getAllHotels();
      }
      else {
        Alert.alert("Oops", deletedData.result)
      }
    }
    catch (err) {
      Alert.alert("Error", err)
    }
  }

  const renderItem = ({ item }) => {
    const image = baseUrl + `/${item.image.replace("\\", "/")}`
    return (
      <TouchableOpacity onPress={() => navigation.navigate("BookRoom", { item })}
        style={styles.buttonStyle}>
        <View style={styles.innerView}>
          <Image style={styles.imageStyle} source={{ uri: image }} />
          <View>
            <Text style={styles.nameText}>{item.roomNumber}</Text>
            <Text style={styles.numberText}>Floor Number: {item.floor}</Text>
            <Text style={styles.numberText}>Room rent: ${item.rent}</Text>
            <Text style={styles.numberText}>Room Type: {item.type}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => deleteFun(item)}
          style={styles.removeButtonStyle}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  const searchFun = async (text) => {
    setSearch(text);
    if (text.trim() !== "") {
      setIsSearching(true);
      let getData = await AsyncStorage.getItem("user");
      getData = JSON.parse(getData)
      const data = await fetch(searchWishlist + `/${getData._id}` + `/${text}`);
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
      getAllHotels();
    }
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
          <Text style={styles.noRegisteredText}>{isSearching ? "No match found" : "No hotel in wishlist yet."}</Text>
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
export default WishList;