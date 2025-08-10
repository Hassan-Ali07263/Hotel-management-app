import React from 'react';
import { View, Text, Modal, StyleSheet, ImageBackground } from 'react-native';
import { COLORS, FONTS } from '../enums/StyleEnums';
import { IMAGES } from '../assets/images';
import Buttons from './Buttons';

const SuccessModal = (props: any) => {
    const { visible, onPress, heading, description } = props;
    return (
        <Modal visible={visible} transparent animationType={"slide"}>
            <View style={style.container}>
                <ImageBackground style={style.backImage} source={IMAGES.CompanyBackground}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={style.congratsText}>{heading}</Text>
                        <Text style={style.descriptionText}>{description}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Buttons onPress={onPress} title={"Go to Back"} styleButton={style.buttonStyle} />
                    </View>
                </ImageBackground>
            </View>
        </Modal>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    backImage: {
        flex: 1
    },
    descriptionText: {
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: COLORS.dark
    },
    congratsText: {
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: COLORS.red
    },
    buttonStyle: {
        width: "75%",
        borderRadius: 15
    }
})
export default SuccessModal;