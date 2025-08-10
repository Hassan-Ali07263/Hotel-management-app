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
        marginHorizontal: "5%"
    },
    buttonStyle: {
        flexDirection: "row",
        alignItems: "center",
    },
    editImage: {
        height: 30,
        width: 23,
        marginHorizontal: "5%"
    },
    editButton: {
        flexDirection: "row",
        backgroundColor: COLORS.green,
        alignItems: "center",
        borderRadius: 6,
        marginTop: "5%",
        paddingVertical: "1%",
        justifyContent: "space-between"
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
    },
    modalInnerContainer: {
        backgroundColor: COLORS.white,
        height: "20%",
        width: "80%",
        borderRadius: 20,
        paddingVertical: "5%",
        paddingHorizontal: "5%"
    },
    modalOuterContainer: {
        flex: 1,
        backgroundColor: "#000000aa",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: "8%"
    },
    styleButton: {
        width: "40%",
        height: 40
    },
    titleStyle: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.white
    },
    sureText: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        color: COLORS.dark
    }

})