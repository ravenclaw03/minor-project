import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { ScrollView } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function TrackScreenDP() {
  const [donorDetails, setDonorDetails] = useState(null);
  const [ngoDetails, setNgoDetails] = useState(null);
  const [latitude1, setlatitude1] = useState({
    latitude: 28.6026,
  });
  const [latitude2, setlatitude2] = useState({
    latitude: 28.6026,
  });
  const [longitude1, setlongitude1] = useState({
    longitude: 77.409,
  });
  const [longitude2, setlongitude2] = useState({
    longitude: 77.409,
  });
  //const [orderDetails, setOrderDetails] = useState(null);

  const initialRegion = {
    latitude: 28.6026,
    longitude: 77.409,
    latitudeDelta: 0.1922,
    longitudeDelta: 0.1421,
  };

  const marker1 = {
    latitude: latitude1.latitude,
    longitude: longitude1.longitude,
  };
  const marker2 = { latitude: latitude2.latitude, longitude: longitude2.longitude};

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        "https://minor-project-wss9.vercel.app/foodReq/dpProgress"
      );
      setNgoDetails(response.data.data[0].ngo);
      setDonorDetails(response.data.data[0].author);
      setlatitude1(response.data.data[0].ngo.latitude)
      setlatitude2(response.data.data[0].author.latitude)
      setlongitude1(response.data.data[0].ngo.longitude)
      setlongitude2(response.data.data[0].author.longitude)
      //setOrderDetails(response.data);
      //console.log(response.data.data.numberOfPlates);
    } catch (error) {
      console.log("Error fetching NGO details:");
      console.log(error);
      Alert.alert("Error!", "Failed to fetch NGO details");
    }
  };

  useEffect(() => {
    fetchDetails();
  });

  return (
    <View style={styles.outerCont}>
      {/* <TouchableOpacity style={styles.cardContainer}>
        <Text style={styles.heading}>Request Details</Text>
        {orderDetails ? (
          <View style={styles.requestCard}>
            <View>
              <Text style={styles.textcont}>
                Type: {orderDetails.type}
              </Text>
              <Text style={styles.textcont}>Number Of Plates: {orderDetails.numberOfPlates}</Text>
              <Text style={styles.textcont}>Is Veg? : {orderDetails.isVegetarian ? 'Yes' : 'No'}</Text>
            </View>
          </View>
        ) : (
          <Text>No order details found</Text>
        )}
      </TouchableOpacity> */}
      <ScrollView style={styles.sv}>
        <TouchableOpacity style={styles.cardContainer}>
          <Text style={styles.heading}>NGO Details</Text>
          {ngoDetails ? (
            <View style={styles.requestCard}>
              <View>
                <Text style={styles.textcont}>
                  NGO Name: {ngoDetails.fullName}
                </Text>
                <Text style={styles.textcont}>
                  Contact: {ngoDetails.contact}
                </Text>
                <Text style={styles.textcont}>Email: {ngoDetails.email}</Text>
                <Text style={styles.textcont}>
                  Address: {ngoDetails.address}
                </Text>
              </View>
            </View>
          ) : (
            <Text>No NGO details found</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardContainer}>
          <Text style={styles.heading}>Donor Details</Text>
          {donorDetails ? (
            <View style={styles.requestCard}>
              <View>
                <Text style={styles.textcont}>
                  Name: {donorDetails.fullName}
                </Text>
                <Text style={styles.textcont}>
                  Contact: {donorDetails.contact}
                </Text>
                <Text style={styles.textcont}>Email: {donorDetails.email}</Text>
                <Text style={styles.textcont}>
                  Address: {donorDetails.address}
                </Text>
              </View>
            </View>
          ) : (
            <Text>No Donor found</Text>
          )}
        </TouchableOpacity>

        <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
        >
          {ngoDetails && (
            <>
              <Marker coordinate={marker1} title="NGO" />
              <Marker coordinate={marker2} title="Donor" />
              <Polyline
                coordinates={[marker1, marker2]}
                strokeColor="#000" // Line color
                strokeWidth={2}
              />
            </>
          )}
        </MapView>
        {!ngoDetails && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Accept an order to track details</Text>
          </View>
        )}
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerCont: {
    flex: 1,
    marginLeft: wp('4.5%'),
    marginTop: hp('2%')
  },
  cardContainer: {
    padding: wp("4%"),
    width: wp("90%"),
    borderRadius: wp("3%"),
    backgroundColor: "#e3e3e3",
    marginBottom: hp("2%"),
  },
  sv: {
    flex:1,
  },
  heading: {
    fontSize: hp("2%"),
    marginBottom: hp("2%"),
  },
  requestCard: {
    backgroundColor: "#fff",
    padding: wp("2.5%"),
    borderRadius: wp("2%"),
    flexDirection: "row",
  },
  textcont: {
    fontSize: hp("1.8%"),
    marginBottom: hp("1%"),
    marginLeft: wp("2%"),
  },
  refreshButton: {
    backgroundColor: "orange",
    padding: wp("2%"),
    borderRadius: wp("2%"),
  },
  refreshButtonText: {
    fontSize: hp("1.8%"),
    color: "white",
  },
  ngoCardContainer: {
    padding: wp("4%"),
    width: wp("90%"),
    borderRadius: wp("3%"),
    backgroundColor: "#e3e3e3",
    marginBottom: hp("2%"),
  },
  mapContainer: {
    position: 'relative',
    width: wp('85%'),
    height: hp('50%'),
    marginTop: hp('1%'),
    borderRadius: wp('5%'),
    marginBottom: hp('2%',),
    marginLeft: wp('2%'),
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: wp('5%'),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  overlayText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#333',
  },
});
