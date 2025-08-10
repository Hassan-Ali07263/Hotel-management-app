import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/StyleEnums";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    typeText: {
        fontFamily: FONTS.semibold,
        fontSize: 15,
        color: COLORS.dark,
        marginTop: "1%"
    },
    nameText: {
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: COLORS.dark,
        marginTop: "1%",
        alignSelf: "center"
    },
    companyImage: {
        height: 160,
        width: "100%"
    },
    textView: {
        marginHorizontal: "5%"
    },
    backImageStyle: {
        flex: 1
    },
    descriptionText: {
        width: "75%",
        textAlign: "justify",
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.dark
    },
    headingText: {
        width: "25%",
        textAlign: "right",
        paddingRight: "3%",
        fontFamily: FONTS.semibold,
        fontSize: 15,
        color: COLORS.dark
    },
    titleStyle: {
        fontFamily: FONTS.semibold,
        fontSize: 15,
        color: COLORS.white
    },
    styleButton: {
        height: 30,
        borderRadius: 25,
        width: "55%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: "15%"
    },
    compsView: {
        flexDirection: "row",
        marginTop: "4%"
    },
    discountText: {
        fontFamily: FONTS.bold,
        fontSize: 15,
        color: "#8C8C8C",
        textDecorationLine: "line-through",
        lineHeight: 27
    },
    amountText: {
        fontFamily: FONTS.bold,
        fontSize: 15,
        color: COLORS.dark,
        lineHeight: 27
    },
    amountView: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginVertical: "1%"
    },
    goImage: {
        height: 12,
        width: 12
    },
    arrowView: {
        height: 30,
        width: 30,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.red,
        position: "absolute",
        right: -1
    },
    bookingText: {
        fontFamily: FONTS.semibold,
        fontSize: 15,
        color: COLORS.white,
    },
    bookingButton: {
        backgroundColor: COLORS.primary,
        height: 30,
        width: "55%",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: "10%"
    }
})