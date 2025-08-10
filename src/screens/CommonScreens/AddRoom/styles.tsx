import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/StyleEnums";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    inputStyling: {
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderRadius: 6,
        borderColor: COLORS.primary
    },
    headingText: {
        fontFamily: FONTS.semibold,
        fontSize: 18,
        color: COLORS.dark,
        marginTop: "4%"
    },
    backImage: {
        flex: 1,
        paddingHorizontal: "5%"
    },
    logoText: {
        fontFamily: FONTS.medium,
        fontSize: 15,
        color: COLORS.primary
    },
    logoButton: {
        height: 120,
        width: 150,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderColor: COLORS.primary,
        overflow: "hidden"
    },
    imageStyle: {
        height: 120,
        width: 150,
        overflow: "hidden"
    },
    titleStyle: {
        fontFamily: FONTS.bold,
        fontSize: 25,
        color: COLORS.white
    },
    styleButton: {
        marginVertical: "15%",
        backgroundColor: COLORS.green,
        borderRadius: 15,
        width: "80%"
    },
    droperStyle: {
        backgroundColor: COLORS.primary,
        borderRadius: 6,
        borderWidth: 0,
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
    loadingStyle:{
        flex:1,
        position:"absolute",
        alignSelf:"center",
        top:"50%"
    }
})