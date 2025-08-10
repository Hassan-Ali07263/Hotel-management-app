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
        width: 30,
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
    innerModalContainer: {
        backgroundColor: COLORS.white,
        height: "90%",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        elevation: 3
    },
    outerModalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#000000aa"
    },
    innerScroolView: {
        marginHorizontal: "5%",
        // marginVertical:"5%"
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
    modalImageStyle: {
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
        width: "40%"
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
    buttonView:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly",
        marginTop:"5%"
    }

})