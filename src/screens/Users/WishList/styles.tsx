import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/StyleEnums";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.screenBackground
    },
    backImage: {
        flex: 1,
    },
    numberText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.white
    },
    nameText: {
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: COLORS.white
    },
    imageStyle: {
        height: 62,
        width: 62,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: COLORS.white,
        marginRight: "5%"
    },
    buttonStyle: {
        flexDirection: "row",
        backgroundColor: COLORS.green,
        alignItems: "center",
        borderRadius: 6,
        marginTop: "5%",
        paddingVertical: "1%",
        paddingBottom: "1.5%",
        justifyContent: "space-between",
        paddingHorizontal: "4%"

    },
    removeText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.dark
    },
    removeButtonStyle: {
        height: 30,
        width: 60,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    innerView: {
        flexDirection: "row",
        alignItems: "center"
    },
    loadingStyle: {
        flex: 1,
        position: "absolute",
        alignSelf: "center",
        top: "50%"
    },
    noRegisteredText: {
        fontFamily: FONTS.semibold,
        fontSize: 16,
        color: COLORS.dark
    },
    noRegisterView: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }

})