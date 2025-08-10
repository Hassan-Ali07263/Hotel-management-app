import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { COLORS, FONTS } from '../enums/StyleEnums';
import { IMAGES } from '../assets/images';
import DropDownPicker from 'react-native-dropdown-picker';
import CalendarModal from './CalendarModal';
import SuccessModal from './SuccessModal';
import { useNavigation } from '@react-navigation/native';
import { bookingData } from '../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentModal = (props: any) => {
    const { logo, price, discount, onPress, visible, wholeItems } = props;

    const navigation = useNavigation();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [calendarEndVisible, setCalendarEndVisible] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const [done, setDone] = useState(false);

    const [items, setItems] = useState([
        { label: 'Jazz cash', value: 'Jazz cash' },
        { label: 'Easy Paisa', value: 'Easy Paisa' },
        { label: 'Sadapay', value: 'Sadapay' },
        { label: 'Credit/Debit card', value: 'Credit/Debit card' },
    ]);

    const getDaysBetweenDates = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const timeDiff = endDate.getTime() - startDate.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);
        return dayDiff >= 0 ? dayDiff + 1 : 0;
    };

    const paymentSuccess = async () => {
        try {
            console.log(wholeItems)
            let getData = await AsyncStorage.getItem("user");
            getData = JSON.parse(getData)
            if (!selectedDate && !selectedEndDate) {
                return Alert.alert("Oops", "Looks like dates are missing");
            }

            const formdata = new FormData();
            formdata.append("type", wholeItems.type);
            formdata.append("roomNumber", wholeItems.roomNumber);
            formdata.append("floor", wholeItems.floor);
            formdata.append("rentPerNight", wholeItems.rent);
            formdata.append("totalRent", `${selectedDate && selectedEndDate ? getDaysBetweenDates(selectedDate, selectedEndDate) * price : '00'}`);
            formdata.append("payments", "Pending");
            formdata.append("days", `${selectedDate && selectedEndDate ? new Date(selectedEndDate).getTime() - new Date(selectedDate).getTime() + 86400000+Date.now() : '0'}`);
            formdata.append("address", wholeItems.address);
            formdata.append("phoneNumber", wholeItems.phoneNumber);
            formdata.append("userId", wholeItems.userId);
            formdata.append("logedInUserId", getData._id);
            formdata.append("image", wholeItems.image);

            console.log("form data ready to send", formdata)

            console.log("url is ", bookingData)
            const getdata = await fetch(bookingData, {
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
                setDone(true)
            }
            else {
                Alert.alert("Oops", data.result)
            }
        }
        catch (err) {
            Alert.alert("Error" + err)
        }
    }

    const closeModal = () => {
        setDone(false)
        navigation.navigate("BottomTabs")
    }
    return (
        <View>
            <Modal visible={visible} transparent>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>

                        <TouchableOpacity onPress={onPress}
                            style={styles.closeButton}>
                            <Image style={styles.crossImage} resizeMode='contain' source={IMAGES.Close} />
                        </TouchableOpacity>

                        <View style={styles.logoView}>
                            <Image style={styles.companyLogo} source={logo} />
                            <View>
                                <Text style={styles.priceText}>From $ {price}/night</Text>
                                <Text style={styles.discountText}>$ {discount}</Text>
                            </View>
                        </View>

                        <View style={styles.lineView} />

                        <View style={styles.mainView}>

                            <View style={styles.headingView}>
                                <Text style={styles.headingText}>Start Date:</Text>
                            </View>

                            <View style={styles.subHeadingView}>
                                <TouchableOpacity onPress={() => setCalendarVisible(true)}
                                    style={styles.descriptionView}>
                                    {
                                        selectedDate ? <Text style={styles.dateTxt}>{selectedDate}</Text> : <Text style={styles.dateTxt}>Start Date</Text>
                                    }
                                    <Image style={styles.calendarImage} resizeMode='contain' source={IMAGES.Calendar} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.mainView}>

                            <View style={styles.headingView}>
                                <Text style={styles.headingText}>End Date:</Text>
                            </View>

                            <View style={styles.subHeadingView}>
                                <TouchableOpacity onPress={() => setCalendarEndVisible(true)}
                                    style={styles.descriptionView}>
                                    {
                                        selectedEndDate ? <Text style={styles.dateTxt}>{selectedEndDate}</Text> : <Text style={styles.dateTxt}>End Date</Text>
                                    }
                                    <Image style={styles.calendarImage} resizeMode='contain' source={IMAGES.Calendar} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.mainView}>

                            <View style={styles.headingView}>
                                <Text style={styles.headingText}>Day's:</Text>
                            </View>

                            <View style={styles.subHeadingView}>
                                <View style={styles.daysView}>
                                    <Text style={styles.dateTxt}>
                                        {selectedDate && selectedEndDate ? getDaysBetweenDates(selectedDate, selectedEndDate) + ' Days' : '0 Days'}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <Text style={styles.headingText}>Select a Payment Method</Text>
                        <DropDownPicker style={styles.droperStyle}
                            textStyle={styles.textStyle}
                            listItemLabelStyle={styles.listitemStyle}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                        />

                        <View style={styles.paymentView}>
                            <View>
                                <Text style={styles.subtotalText}>Sub total:     {selectedDate && selectedEndDate ? getDaysBetweenDates(selectedDate, selectedEndDate) * price : '00'}</Text>
                                <Text style={styles.vtaText}>VAT 0%:        00</Text>
                            </View>
                            <TouchableOpacity onPress={paymentSuccess}
                                style={styles.submitButton}>
                                <Text style={styles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <CalendarModal
                visible={calendarVisible}
                onClose={() => setCalendarVisible(false)}
                onDateSelect={(date) => setSelectedDate(date)}
            />

            <CalendarModal
                visible={calendarEndVisible}
                onClose={() => setCalendarEndVisible(false)}
                onDateSelect={(date) => setSelectedEndDate(date)}
            />

            <SuccessModal visible={done} onPress={closeModal} heading={"Congratulations!"} description={"Your Room Booking Successfully Done."} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end"
    },
    innerContainer: {
        backgroundColor: COLORS.screenBackground_1,
        height: "62%",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        elevation: 10,
        paddingHorizontal: "5%",
        paddingVertical: "5%"
    },
    crossImage: {
        height: 25,
        width: 25
    },
    closeButton: {
        position: "absolute",
        right: "4%",
        top: "4%"
    },
    companyLogo: {
        height: 100,
        width: 100,
        borderRadius: 10,
        marginRight: "3%"
    },
    discountText: {
        fontFamily: FONTS.bold,
        fontSize: 15,
        color: "#8C8C8C",
        textDecorationLine: "line-through"
    },
    priceText: {
        fontFamily: FONTS.bold,
        fontSize: 15,
        color: COLORS.dark,
        marginTop: "5%"
    },
    logoView: {
        flexDirection: "row"
    },
    lineView: {
        borderWidth: .5,
        borderColor: COLORS.primary,
        width: "80%",
        alignSelf: "center",
        marginVertical: "4%"
    },
    calendarImage: {
        height: 20,
        width: 20
    },
    dateTxt: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.white,
        // width: "60%"
    },
    descriptionView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: "3%",
        backgroundColor: COLORS.primary,
        borderRadius: 6,
        height: 25,
        width: "60%",
        marginTop: "5%"
    },
    daysView: {
        paddingHorizontal: "3%",
        backgroundColor: COLORS.primary,
        borderRadius: 6,
        height: 25,
        width: "212%",
        marginTop: "5%",
        alignItems: "center",
        justifyContent: "center"
    },
    headingText: {
        fontFamily: FONTS.bold,
        fontSize: 15,
        color: COLORS.dark,
        marginTop: "5%"

    },
    mainView: {
        flexDirection: "row",
        marginBottom: "2%",
        alignItems: "center"
    },
    subHeadingView: {
    },
    headingView: {
        width: "32%",
        alignItems: "flex-end",
        marginRight: "8%",
    },
    droperStyle: {
        backgroundColor: COLORS.primary,
        borderRadius: 6,
        borderWidth: 0,
        marginVertical: "2%"
    },
    textStyle: {
        color: COLORS.white,
        fontFamily: FONTS.regular,
        fontSize: 18,
    },
    listitemStyle: {
        fontFamily: FONTS.regular,
        fontSize: 18,
        color: COLORS.primary
    },
    submitText: {
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: COLORS.white
    },
    submitButton: {
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.red,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "35%",
        right: "0%"
    },
    vtaText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: "#717171"
    },
    subtotalText: {
        fontFamily: FONTS.bold,
        fontSize: 12,
        color: COLORS.red
    },
    paymentView: {
        backgroundColor: COLORS.white,
        height: 44,
        borderRadius: 22,
        elevation: 2,
        justifyContent: "center",
        paddingHorizontal: "5%",
        marginTop: "15%",
        marginBottom: "5%"
    },
})
export default PaymentModal;