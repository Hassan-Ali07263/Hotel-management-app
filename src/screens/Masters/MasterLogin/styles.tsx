import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/StyleEnums";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    mainLogo: {
        height: 200,
        width: 200,
        marginTop: "3%",
        alignSelf: "center"
    },
    backImage: {
        flex: 1,
        paddingHorizontal: "5%"
    },
    userNameStyle: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        lineHeight: 27,
        color: COLORS.dark,
        marginTop: "22%"
    },
    passwordStyle: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        lineHeight: 27,
        color: COLORS.dark,
        marginTop: "7%"
    },
    styleButton: {
        marginVertical: "25%"
    },
    forgetPasswordText: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: COLORS.white,
    },
    forgetButton: {
        alignSelf: "flex-end",
        borderBottomWidth: 1.5,
        borderColor: COLORS.white,
        marginTop: "3%"
    },
    registrationText: {
        fontFamily: FONTS.bold,
        fontSize: 12,
        color: COLORS.red
    },
    registrationButton: {
        borderBottomWidth:1,
        borderColor:COLORS.red
    },
    noAccountText: {
        fontFamily: FONTS.bold,
        fontSize: 12,
        color: COLORS.white
    },
    noAccountView: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center"
    },
    loadingStyle:{
        flex:1,
        position:"absolute",
        alignSelf:"center",
        top:"50%"
    }
})