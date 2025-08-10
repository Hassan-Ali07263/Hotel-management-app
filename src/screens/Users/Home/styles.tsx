import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/StyleEnums";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.screenBackground,
        // paddingHorizontal:"5%"
    },
    hotelTypeIMage: {
        height: 106,
        width: "100%"
    },
    hotelImage: {
        height: 60,
        width: 80
    },
    hotelImageView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: "4%"
    },
    headingText: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: COLORS.dark,
        marginTop: "3%",
        marginHorizontal: "4%",
        marginBottom: ".5%"
    },
    hotelButtonView: {
        height: 60,
        width: "23%"
    },
    hotelTypeButton: {
        height: 106,
        width: "31%"
    },
    discountText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: "#8C8C8C",
        textDecorationLine: "line-through"
    },
    priceText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.dark
    },
    priceView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 30
    },
    roomNameText: {
        fontFamily: FONTS.bold,
        fontSize: 12,
        color: COLORS.primary,
        alignSelf: "center",
    },
    heartImage: {
        height: 20,
        width: 20
    },
    backImageStyle: {
        height: 106,
        width: "100%",
        overflow: "hidden",
        borderRadius: 10
    },
    mainContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 1,
        width: "48.5%",
        overflow: "hidden",
        padding: 5,
        paddingBottom: 8
    },
    arrowImage: {
        height: 12,
        width: 12
    },
    goImageView: {
        height: 23,
        width: 23,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.green_1,
        borderRadius: 22,
        position: "absolute",
        right: -2,
        top: -1
    },
    bookOnlineText: {
        fontFamily: FONTS.bold,
        fontSize: 12,
        color: COLORS.white,
    },
    bookingButton: {
        height: 21,
        width: "80%",
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    heartButton: {
        alignSelf: "flex-end",
        padding: "4%"
    },
    seeAllText: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.primary
    },
    seeAllView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: "5%"
    },
    noRegisterText: {
        fontFamily: FONTS.semibold,
        fontSize: 16,
        color: COLORS.dark
    },
    noRegisterView: {
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    noRegisterRoomView: {
        height: 300,
        justifyContent: "center",
        alignItems: "center"
    },
    loadingStyle: {
        flex: 1,
        position: "absolute",
        alignSelf: "center",
        top: "50%"
    }
})