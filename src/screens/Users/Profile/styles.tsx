import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/StyleEnums";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.screenBackground
    },
    profileImage: {
        height: 150,
        width: "100%",
    },
    subHeadingText:{
        fontFamily:FONTS.regular,
        fontSize:18,
        color:COLORS.dark,
        width:"75%",
    },
    headingText:{
        fontFamily:FONTS.bold,
        fontSize:18,
        color:COLORS.dark,
        width:"23%"
    },
    headingView:{
        flexDirection:"row",
        marginVertical:"3.5%"
    },
    lowerContainer:{
        marginHorizontal:"5%"
    },
    styleButton: {
        width: "55%",
        elevation: 1,
        marginTop:"35%",
    }
})