import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/StyleEnums";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    backImage: {
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
        marginTop: "5%",
        marginBottom: "5%"
    },
    buttonsView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "10%"
    },
    agentButton: {
        alignSelf: "center",
        marginTop: "8%",
        marginBottom: "25%"
    },
    buttonImage: {
        height: 150,
        width: 150
    },
    styleButton: {
        width: "55%",
        elevation: 1
    }
})