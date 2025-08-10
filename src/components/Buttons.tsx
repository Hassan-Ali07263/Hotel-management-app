import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../enums/StyleEnums';

const Buttons = (props: any) => {
    const { title, styleButton, titleStyle, onPress } = props;
    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.buttonStyle, styleButton]}>
            <Text style={[styles.buttonTitle, titleStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 50,
        width: "70%",
        borderRadius: 8,
        elevation: 1,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    buttonTitle: {
        fontFamily: FONTS.bold,
        fontSize: 25,
        color: COLORS.white
    }
})
export default Buttons;