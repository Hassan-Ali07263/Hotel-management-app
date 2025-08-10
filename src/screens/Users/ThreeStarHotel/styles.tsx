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
        height: 46,
        width: 46,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: COLORS.white,
        marginHorizontal: "3%"
    },
    buttonStyle: {
        flexDirection: "row",
        backgroundColor: COLORS.green,
        alignItems: "center",
        borderRadius: 6,
        marginTop: "5%",
        paddingVertical: "1%",
        paddingBottom:"1.5%"
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