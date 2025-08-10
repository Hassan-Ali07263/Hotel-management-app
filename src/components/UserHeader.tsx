import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { IMAGES } from '../assets/images';
import { COLORS, FONTS } from '../enums/StyleEnums';

const UserHeader = (props: any) => {
    const { onChangeText, value, onPress } = props;
    return (
        <View style={styles.container}>
            <Image style={styles.logoImage} source={IMAGES.UserHeaderIcon} />

            <View style={styles.inputViewStyle}>
                <TextInput style={styles.inputStyle}
                    placeholder='Search here'
                    placeholderTextColor={COLORS.white}
                    value={value}
                    onChangeText={onChangeText}
                />
                <Image style={styles.searchStyle} source={IMAGES.Search} />
            </View>

            <TouchableOpacity onPress={onPress}>
                <Image style={styles.bellStyle} resizeMode='contain' source={IMAGES.Bell} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: "3%",
        marginHorizontal:"3%"
    },
    bellStyle: {
        height: 35,
        width: 35
    },
    searchStyle: {
        height: 15,
        width: 15,

    },
    inputViewStyle: {
        height: 35,
        backgroundColor: "rgba(21,168,109,.49)",
        flexDirection: "row",
        borderRadius: 25,
        width: "65%",
        justifyContent: "space-between",
        paddingHorizontal: "3%",
        alignItems: "center"
    },
    logoImage: {
        height: 41,
        width: 70
    },
    inputStyle: {
        width: "90%",
        height: "100%",
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.white,
        marginTop: "2%"
    }
})
export default UserHeader;