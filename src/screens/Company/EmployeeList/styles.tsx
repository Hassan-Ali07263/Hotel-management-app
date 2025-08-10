import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/StyleEnums";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
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
        paddingVertical: "1%"
    },
    companyText: {
        fontFamily: FONTS.bold,
        fontSize: 20,
        color: COLORS.dark
    },
    noDataView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loadingStyle: {
        flex: 1,
        position: "absolute",
        alignSelf: "center",
        top: "30%"
    }

})