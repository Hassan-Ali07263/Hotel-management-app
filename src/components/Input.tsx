import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { COLORS, FONTS } from '../enums/StyleEnums';

const Input = (props: any) => {
    const { placeholder, placeholderTextColor, keyboardType, secureTextEntry, value, onChangeText, inputStyling } = props
    return (
        <TextInput style={[styles.inputStyle, inputStyling]}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
        />
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        height: 45,
        width: "100%",
        borderRadius: 8,
        backgroundColor: COLORS.white,
        fontFamily: FONTS.regular,
        fontSize: 16,
        color: COLORS.dark,
        paddingHorizontal: "5%",
        elevation: 1
    }
})
export default Input;