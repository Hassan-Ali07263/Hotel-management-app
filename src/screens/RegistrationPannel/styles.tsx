import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../enums/StyleEnums";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    backImage: {
        flex: 1,
        paddingHorizontal: "3%"
    },
    buttonText: {
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: COLORS.white,
        textAlign: "center"
    },
    nextButtons: {
        height: 150,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        padding: "5%",
        borderRadius: 10,
        elevation: 2
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: "8%"
    }
})