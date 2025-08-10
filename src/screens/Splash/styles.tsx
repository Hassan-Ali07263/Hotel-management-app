import { StyleSheet } from "react-native";
import { COLORS } from "../../enums/StyleEnums";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    logoStyle: {
        height: 188,
        width: 188
    },
    backImageStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})