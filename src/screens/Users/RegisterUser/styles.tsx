import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/StyleEnums";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor
    },
    editImage: {
        height: 40,
        width: 37
    },
    editButton: {
        position: "absolute",
        top: "1%",
        right: "3%"
    },
    profileImage: {
        height: 150,
        width: "100%",
    },
    selectImageText: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        color: COLORS.dark
    },
    selectImageView: {
        height: 150,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.primary
    },
    inputStyle: {
        borderWidth: 2,
        borderColor: COLORS.primary,
        fontFamily: FONTS.regular,
        fontSize: 18,
        color: COLORS.dark
    },
    headingText: {
        fontFamily: FONTS.semibold,
        fontSize: 18,
        color: COLORS.dark,
        marginTop: "4%",
        marginBottom: "1%"
    },
    inputsView: {
        marginHorizontal: "5%",
        marginBottom: "10%"
    },
    loginText: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: COLORS.primary
    },
    loginButton: {
        borderBottomWidth: 1,
        borderColor: COLORS.primary,
        alignSelf: "flex-start"
    },
    styleButton: {
        width: "50%",
        height: 57,
        borderRadius: 15,
        marginVertical: "8%",
        marginTop: "15%",
    },
    loadingStyle:{
        flex:1,
        position:"absolute",
        alignSelf:"center",
        top:"50%"
    }
})