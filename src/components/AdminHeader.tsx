import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IMAGES } from '../assets/images';

const AdminHeader = (props: any) => {
    const { } = props;
    return (
        <View style={styles.headerView}>
            <Text style={styles.noThingText}></Text>
            <Image style={styles.imageStyle} resizeMode='contain' source={IMAGES.HeaderLogo} />
            <TouchableOpacity>
                <Image style={styles.editImage} resizeMode='contain' source={IMAGES.Edit} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        width: "50%",
        height: 48
    },
    editImage: {
        height: 60,
        width: 60
    },
    noThingText: {
        width: "10%"
    },
    headerView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: "2%"
    }
})
export default AdminHeader;