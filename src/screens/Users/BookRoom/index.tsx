import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../../components/Header';
import { IMAGES } from '../../../assets/images';
import PaymentModal from '../../../components/PaymentModal';
import { baseUrl } from '../../../apis';

const BookRoom = () => {

    const [img, setImg] = useState('');
    const route = useRoute();
    const { item } = route.params;
    console.log(item);

    const [open, setOpen] = useState(false);

    const navigation = useNavigation();

    const getData = async () => {
        const image = baseUrl + `/${item.image.replace("\\", "/")}`;
        console.log(image)
        setImg(image);
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <View style={styles.container}>
            <Header title={"Room Booking"} />
            <ImageBackground style={styles.backImageStyle} source={IMAGES.CompanyBackground}>
                <ScrollView>
                    <Image style={styles.companyImage} source={{ uri: img }} />
                    <View style={styles.textView}>
                        {/* <Text style={styles.nameText}>{item.name}</Text> */}
                        <View style={styles.amountView}>
                            <Text style={styles.amountText}>From ${item.rent}/night  </Text>
                            <Text style={styles.discountText}>${item.discount}</Text>
                        </View>
                        <View style={styles.compsView}>
                            <Text style={styles.headingText}>Room No.:</Text>
                            <Text style={styles.descriptionText}>{item.roomNumber}</Text>
                        </View>

                        <View style={styles.compsView}>
                            <Text style={styles.headingText}>Floor No.:</Text>
                            <Text style={styles.descriptionText}>{item.floor}</Text>
                        </View>

                        <View style={styles.compsView}>
                            <Text style={styles.headingText}>Facility:</Text>
                            <Text style={styles.descriptionText}>{item.facility}</Text>
                        </View>

                        <View style={styles.compsView}>
                            <Text style={styles.headingText}>Offer:</Text>
                            <Text style={styles.descriptionText}>{item.offer}</Text>
                        </View>

                        <View style={styles.compsView}>
                            <Text style={styles.headingText}>Address:</Text>
                            <Text style={styles.descriptionText}>{item.address}</Text>
                        </View>

                        <View style={styles.compsView}>
                            <Text style={styles.headingText}>Phone:</Text>
                            <Text style={styles.descriptionText}>{item.phoneNumber}</Text>
                        </View>

                        <View style={styles.compsView}>
                            <Text style={styles.headingText}>Website:</Text>
                            <Text style={styles.descriptionText}>{item.website}</Text>
                        </View>

                        <TouchableOpacity onPress={() => setOpen(true)}
                            style={styles.bookingButton}>
                            <Text style={styles.bookingText}>Booking Now</Text>
                            <View style={styles.arrowView}>
                                <Image style={styles.goImage} source={IMAGES.GoWhite} />
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>

                <PaymentModal logo={{ uri: img }} wholeItems={item} price={item.rent} discount={item.discount} visible={open} onPress={() => setOpen(false)} />
            </ImageBackground>
        </View>
    );
}
export default BookRoom;