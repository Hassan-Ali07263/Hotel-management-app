import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { IMAGES } from '../assets/images';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS } from '../enums/StyleEnums';

const Header = (props: any) => {
    const navigation = useNavigation();
    const { title, styleText } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={styles.backImageStyle} source={IMAGES.BackImage} />
            </TouchableOpacity>
            <Text style={[styles.textStyle, styleText]}>{title}</Text>
            <Text style={{ width: "8%" }}></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.primary,
        height: 45,
        paddingHorizontal: "5%"
    },
    textStyle: {
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: COLORS.white
    },
    backImageStyle: {
        height: 25,
        width: 25
    }
})
export default Header;