import React from 'react';
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../../components/Header';
import { IMAGES } from '../../../assets/images';
import Buttons from '../../../components/Buttons';
import { baseUrl } from '../../../apis';

const AgentDetails = () => {
    const route = useRoute();
    const { item } = route.params;
    console.log(item);

    const navigation = useNavigation();
    const image = baseUrl + `/${item.image.replace("\\", "/")}`

    return (
        <View style={styles.container}>
            <Header title={"Agent Detail"} />
            <ImageBackground style={styles.backImageStyle} source={IMAGES.CompanyBackground}>
                <ScrollView>
                    <Image style={styles.companyImage} source={{ uri: image }} />
                    <View style={styles.textView}>
                        <Text style={styles.nameText}>{item.name}</Text>

                        <View style={styles.compsView}>
                            <Text style={styles.headingText}>CNIC:</Text>
                            <Text style={styles.descriptionText}>{item.cnic}</Text>
                        </View>

                        <View style={styles.compsView}>
                            <Text style={styles.headingText}>Gender:</Text>
                            <Text style={styles.descriptionText}>{item.gender}</Text>
                        </View>

                        <View style={styles.compsView}>
                            <Text style={styles.headingText}>Email:</Text>
                            <Text style={styles.descriptionText}>{item.email}</Text>
                        </View>

                        <View style={styles.compsView}>
                            <Text style={styles.headingText}>Address:</Text>
                            <Text style={styles.descriptionText}>{item.address}</Text>
                        </View>

                        <View style={styles.compsView}>
                            <Text style={styles.headingText}>Phone:</Text>
                            <Text style={styles.descriptionText}>{item.number}</Text>
                        </View>

                        <Buttons onPress={() => navigation.navigate("AdminPannel")} titleStyle={styles.titleStyle} styleButton={styles.styleButton} title={"Go to Home"} />
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
export default AgentDetails;