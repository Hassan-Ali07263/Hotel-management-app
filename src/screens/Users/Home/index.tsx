import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import UserHeader from '../../../components/UserHeader';
import { IMAGES } from '../../../assets/images';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { addWishlistData, allHotels, allRooms, baseUrl, deleteFromWishlist, getBookingData, getBookings, getWishlistData, searchRooms } from '../../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../enums/StyleEnums';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeWishlist, setToWishlist } from '../../../redux/action';

const Home = () => {
  const [hotelList, setHotelList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [id, setId] = useState('');
  const [bookings, setBookings] = useState([]);

  const navigation = useNavigation();

  const wishlistItems = useSelector((state) => state.reducer)

  const getAllHotels = async () => {
    try {
      setLoading(true);
      const data = await fetch(allHotels, {
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
        Alert.alert("Oops in hotel list", listing.result)
      }
    }
    catch (err) {
      setLoading(false);
      console.log("Error" + err)
    }
  }

  const getAllRooms = async () => {
    try {
      setLoading(true);
      let getData = await AsyncStorage.getItem("user");
      getData = JSON.parse(getData)
      setId(getData._id)
      console.log("loged in user data", getData)
      const data = await fetch(allRooms, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${await AsyncStorage.getItem("token")}`,
        }
      });

      const listing = await data.json();
      console.log(listing)
      if (listing.response === "ok") {
        setLoading(false);
        setRoomList(listing.result)
      }
      else {
        setLoading(false);
        Alert.alert("Oops in hotel list", listing.result)
      }
    }
    catch (err) {
      setLoading(false);
      console.log("Error" + err)
    }
  }

  const getAllWishlistData = async () => {
    let getData = await AsyncStorage.getItem("user");
    getData = JSON.parse(getData)

    const data = await fetch(getWishlistData + `/${getData._id}`, {
      method: "get",
      headers: {
        "Authorization": `Bearer ${await AsyncStorage.getItem("token")}`,
      }
    })
    const fetchedData = await data.json();
    if (fetchedData.response === "ok") {
      dispatch(setToWishlist(fetchedData.result))
    }
    else {
      console.log(fetchedData.result)
    }
  }
  useEffect(() => {
    getAllHotels();
    getAllWishlistData();
  }, [])

  useEffect(() => {
    if (!search) {
      getAllRooms();
    }
  }, [search])


  const renderItem = ({ item }) => {
    const image = baseUrl + `/${item.companyLogo.replace("\\", "/")}`

    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("HotelDetails", { item })}>
          <Image style={styles.hotelImage} source={{ uri: image }} />
        </TouchableOpacity>
      </View>
    )
  }



  const renderRoomList = ({ item }) => {
    const image = baseUrl + `/${item.image.replace("\\", "/")}`
    const isWishlisted = wishlistItems?.some(element => element.roomNumber === item.roomNumber);

    const booking = bookings.find(b => b.roomNumber === item.roomNumber);
    console.log("booking data is", booking);

    let isBooked = false;

    if (booking && booking.days) {
      const endTime = parseInt(booking.days); // end timestamp saved from booking
      const now = Date.now();

      console.log("current time is", now);
      console.log("saved end time is", endTime);

      isBooked = now < endTime; // disable button if still booked
      console.log("is booked:", isBooked);
    } return (
      <View style={styles.mainContainer}>
        <ImageBackground style={styles.backImageStyle} source={{ uri: image }}>
          <TouchableOpacity disabled={isWishlisted} onPress={() => wishlistFun(item)}
            style={styles.heartButton}>
            <Image style={styles.heartImage} source={isWishlisted ? IMAGES.WishlistActive : IMAGES.WishlistInactive} />
          </TouchableOpacity>
        </ImageBackground>

        <Text style={styles.roomNameText}>{item.roomNumber}</Text>

        <View style={styles.priceView}>
          <Text style={styles.priceText}>From $ {item.rent}/night</Text>
          <Text style={styles.discountText}>$ {item.discount}</Text>
        </View>

        <TouchableOpacity disabled={isBooked} onPress={() => navigation.navigate("BookRoom", { item })}
          style={styles.bookingButton}>
          <Text style={styles.bookOnlineText}>{isBooked ? "Booked" : "Booking Online"}</Text>
          {!isBooked && <View style={styles.goImageView}>
            <Image style={styles.arrowImage} source={IMAGES.GoGreen} />
          </View>}
        </TouchableOpacity>
      </View>
    )
  }

  const dispatch = useDispatch();

  const wishlistFun = async (item) => {
    try {
      console.log(item)

      const formdata = new FormData();
      formdata.append("type", item.type);
      formdata.append("roomNumber", item.roomNumber);
      formdata.append("floor", item.floor);
      formdata.append("rent", item.rent);
      formdata.append("discount", item.discount);
      formdata.append("facility", item.facility);
      formdata.append("offer", item.offer);
      formdata.append("address", item.address);
      formdata.append("phoneNumber", item.phoneNumber);
      formdata.append("website", item.website);
      formdata.append("userId", item.userId);
      formdata.append("logedInUserId", id);
      formdata.append("image", item.image);
      console.log("form data ready to send", formdata)

      console.log("url is ", addWishlistData)
      const getdata = await fetch(addWishlistData, {
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
        dispatch(addToWishlist(item))
      }
      else {
        Alert.alert("Oops", data.result)
      }
    }
    catch (err) {
      Alert.alert("Error" + err)
    }
  }

  const searchFun = async (text) => {
    setSearch(text);
    if (text.trim() !== "") {
      setIsSearching(true);
      const data = await fetch(searchRooms + `/${text}`);
      const searchData = await data.json();
      if (searchData.response === "ok") {
        setRoomList(searchData.result);
      }
      else {
        setRoomList([]);
      }
    }
    else {
      setIsSearching(false)
      getAllRooms();
    }
  }

  const getBookedRooms = async () => {
    try {
      const data = await fetch(getBookings, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${await AsyncStorage.getItem("token")}`,
        }
      });
      console.log(data)

      const listing = await data.json();
      console.log(listing)
      if (listing.response === "ok") {
        setBookings(listing.result)
      }
      else {
        console.log(listing.result)
      }
    }
    catch (err) {
      console.log("Error" + err)
    }
  }

  useEffect(() => {
    getBookedRooms();
  }, [])

  return (
    <View style={styles.container}>
      <UserHeader value={search} onChangeText={(text) => searchFun(text)} />
      <ScrollView>
        <View style={styles.seeAllView}>
          <Text style={styles.headingText}>All Hotel</Text>
          <TouchableOpacity onPress={() => navigation.navigate("AllHotel")}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {
          hotelList.length > 0 ? <View>
            <FlatList
              data={hotelList}
              renderItem={renderItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginLeft: "4%", gap: 8 }}
            />
          </View> : <View style={styles.noRegisterView}>
            <Text style={styles.noRegisterText}>No registered hotel yet.</Text>
          </View>
        }

        <Text style={styles.headingText}>Hotel Type</Text>

        <View style={styles.hotelImageView}>
          <TouchableOpacity onPress={() => navigation.navigate("FiveStarHotel")}
            style={styles.hotelTypeButton}>
            <Image style={styles.hotelTypeIMage} source={IMAGES.FiveStar} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("FourStarHotel")}
            style={styles.hotelTypeButton}>
            <Image style={styles.hotelTypeIMage} source={IMAGES.FourStar} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ThreeStarHotel")}
            style={styles.hotelTypeButton}>
            <Image style={styles.hotelTypeIMage} source={IMAGES.ThreeStar} />
          </TouchableOpacity>

        </View>

        <Text style={styles.headingText}>All Room</Text>
        {
          roomList.length > 0 ? <FlatList
            data={roomList}
            renderItem={renderRoomList}
            contentContainerStyle={{ marginHorizontal: "4%", gap: 12, marginBottom: "17%" }}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          /> :
            <View style={styles.noRegisterRoomView}>
              <Text style={styles.noRegisterText}>{isSearching ? "No match found" : "No registered room yet."}</Text>
            </View>
        }
      </ScrollView>
      {
        loading ? <View style={styles.loadingStyle}>
          <ActivityIndicator size={70} color={COLORS.primary} />
        </View> : null
      }

    </View>
  );
}
export default Home;
