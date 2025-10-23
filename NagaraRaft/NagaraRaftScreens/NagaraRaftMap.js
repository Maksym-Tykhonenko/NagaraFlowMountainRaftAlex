import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { nagararaftlocations } from '../NagaraRaftData/nagararaftlocations';
import MapView, { Marker } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
const { height } = Dimensions.get('window');
import { customNagaraMap } from '../NagaraRaftData/nagaracustommap';
import Orientation from 'react-native-orientation-locker';

const NagaraRaftMap = ({ route }) => {
  const selectedLocation = route.params;
  const [selectedMarker, setSelectedMarker] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  const shareNagaraRaftLocation = async selectedLoc => {
    try {
      await Share.share({
        message: `${selectedLoc.nagaratitle}
${selectedLoc.nagaralat}, ${selectedLoc.nagaralon}
${selectedLoc.nagaraarticle}
Difficulty:${selectedLoc.nagaradiff}
        `,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/nagararaappbg.png')}
      style={{ flex: 1 }}
    >
      <View style={styles.nagaraheader}></View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.nagracontainer]}
      >
        <MapView
          customMapStyle={customNagaraMap}
          provider={Platform.OS === 'ios' ? 'google' : undefined}
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude:
              selectedLocation === undefined
                ? 35.915
                : selectedLocation.nagaralat,
            longitude:
              selectedLocation === undefined
                ? -82.7774
                : selectedLocation.nagaralon,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        >
          {selectedLocation === undefined ? (
            <>
              {nagararaftlocations.map(marker => (
                <Marker
                  key={marker.nagaraid}
                  coordinate={{
                    latitude: marker.nagaralat,
                    longitude: marker.nagaralon,
                  }}
                  onPress={() =>
                    selectedMarker !== null
                      ? setSelectedMarker(null)
                      : setSelectedMarker(marker)
                  }
                >
                  {Platform.OS === 'ios' ? (
                    <>
                      {marker.nagaradiff === 'Easy' && (
                        <Image
                          source={require('../../assets/images/nagaraloceasy.png')}
                        />
                      )}
                      {marker.nagaradiff === 'Medium' && (
                        <Image
                          source={require('../../assets/images/nagaralocmed.png')}
                        />
                      )}
                      {marker.nagaradiff === 'Hard' && (
                        <Image
                          source={require('../../assets/images/nagaralocdif.png')}
                        />
                      )}
                    </>
                  ) : null}
                </Marker>
              ))}
            </>
          ) : (
            <>
              <Marker
                coordinate={{
                  latitude: selectedLocation.nagaralat,
                  longitude: selectedLocation.nagaralon,
                }}
                onPress={() =>
                  selectedMarker !== null
                    ? setSelectedMarker(null)
                    : setSelectedMarker(selectedLocation)
                }
              >
                {Platform.OS === 'ios' ? (
                  <>
                    {selectedLocation.nagaradiff === 'Easy' && (
                      <Image
                        source={require('../../assets/images/nagaraloceasy.png')}
                      />
                    )}
                    {selectedLocation.nagaradiff === 'Medium' && (
                      <Image
                        source={require('../../assets/images/nagaralocmed.png')}
                      />
                    )}
                    {selectedLocation.nagaradiff === 'Hard' && (
                      <Image
                        source={require('../../assets/images/nagaralocdif.png')}
                      />
                    )}
                  </>
                ) : null}
              </Marker>
            </>
          )}
        </MapView>

        <View
          style={{
            position: 'absolute',
            top: 22,
            width: '100%',
            alignItems: 'center',
          }}
        >
          {selectedMarker && (
            <LinearGradient
              colors={['#124C39', '#052C1C']}
              style={styles.nagarawelcomegradwrap}
            >
              <View style={styles.nagarawelcomecontainer}>
                <Image
                  source={selectedMarker.nagaraimg}
                  style={styles.nagaraimage}
                />

                <View style={styles.nagaracardwrap}>
                  <Text style={styles.nagaralabel}>
                    {selectedMarker.nagaratitle}
                  </Text>

                  <Text style={styles.nagaracoord}>
                    {selectedMarker.nagaralat}, {selectedMarker.nagaralon}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <Text style={styles.nagaracoord}>Difficulty:</Text>
                    <Image source={selectedMarker.nagaradiffimg} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => shareNagaraRaftLocation(selectedMarker)}
                    >
                      <Image
                        source={require('../../assets/images/nagarashrbt.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate(
                          'NagaraRaftDetails',
                          selectedMarker,
                        );
                      }}
                    >
                      <ImageBackground
                        source={require('../../assets/images/nagararacardbtn.png')}
                        style={styles.nagarabtn}
                      >
                        <Text style={styles.nagarabtnlabel}>Open</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </LinearGradient>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  nagracontainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  nagaraheader: { height: height * 0.09, backgroundColor: '#1C5839' },
  nagaralabel: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  nagaracatlabel: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },
  nagarasubtitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  nagarawelcomecontainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nagarabtnlabel: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  nagarabtn: {
    width: 94,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nagarawelcomegradwrap: {
    width: '90%',
    borderRadius: 32,
    borderWidth: 0.9,
    borderColor: '#FFD733',
    marginBottom: 10,
  },
  nagaraimage: {
    width: 132,
    height: 132,
    borderRadius: 32,
  },
  nagaracardwrap: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  nagaraartttl: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  nagaraartdesc: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 22,
  },
  nagaracoord: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  nagaraim: {
    width: 132,
    height: 121,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 32,
    marginBottom: 20,
  },
  nagaracatcnt: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingTop: height * 0.05,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default NagaraRaftMap;
