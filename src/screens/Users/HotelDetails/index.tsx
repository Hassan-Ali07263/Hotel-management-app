import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../../components/Header';
import { IMAGES } from '../../../assets/images';
import { baseUrl } from '../../../apis';

const HotelDetails = () => {
  const route = useRoute();
  const { item } = route.params;
  console.log(item);
  const [image, setImage] = useState('');

  const getImage = async () => {
    const image = baseUrl + `/${item.companyLogo.replace("\\", "/")}`
    setImage(image);
  }

  useEffect(() => {
    getImage();
  }, [])

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header title={"Hotel Detail"} />
      <ImageBackground style={styles.backImageStyle} source={IMAGES.CompanyBackground}>
        <ScrollView>
          <Image style={styles.companyImage} source={{ uri: image }} />
          <View style={styles.textView}>
            <Text style={styles.nameText}>{item.companyName}</Text>
            <Text style={styles.typeText}>Hotel Type: {item.companyType}</Text>

            <View style={styles.compsView}>
              <Text style={styles.headingText}>Facility:</Text>
              <Text style={styles.descriptionText}>{item.facilities}</Text>
            </View>

            <View style={styles.compsView}>
              <Text style={styles.headingText}>Offer:</Text>
              <Text style={styles.descriptionText}>{item.offers}</Text>
            </View>

            <View style={styles.compsView}>
              <Text style={styles.headingText}>Address:</Text>
              <Text style={styles.descriptionText}>{item.companyAddress}</Text>
            </View>

            <View style={styles.compsView}>
              <Text style={styles.headingText}>Phone:</Text>
              <Text style={styles.descriptionText}>{item.companyNumberOne} , {item.companyNumberTwo}</Text>
            </View>

            <View style={styles.compsView}>
              <Text style={styles.headingText}>Website:</Text>
              <Text style={styles.descriptionText}>{item.website}</Text>
            </View>

          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
export default HotelDetails;