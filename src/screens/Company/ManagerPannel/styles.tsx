import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/StyleEnums";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    backIMage: {
        flex: 1,
        paddingHorizontal: "5%"
    },
    numberText: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        color: COLORS.dark
    },
    nameText: {
        fontFamily: FONTS.bold,
        fontSize: 20,
        color: COLORS.dark
    },
    profileImage: {
        height: 70,
        width: 70,
        borderRadius: 70,
        borderColor: COLORS.primary,
        borderWidth: 3,
        marginRight: "5%"
    },
    headerView: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "0%",
        marginBottom: "5%"
    },
    buttonsImage: {
        height: 79,
        width: 79
    },
    ButtonsView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "7%"
    },
    buttonText: {
        fontFamily: FONTS.bold,
        fontSize: 12,
        color: COLORS.dark,
        textAlign: "center"
    },
    styleButton: {
        marginTop: "55%",
        marginBottom: "10%",
        height:50,
        width:"60%"
    }
})