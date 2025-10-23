import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { nagararaftlocations } from '../NagaraRaftData/nagararaftlocations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
import { useStore } from '../NagaraRaftStore/nagaraRaftContext';
const { height } = Dimensions.get('window');

const NagaraRaftLocations = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const nagaraRaftCategories = ['All', 'Easy', 'Medium', 'Hard'];
  const navigation = useNavigation();
  const {
    toggleNagaraBgMusic,
    setToggleNagaraBgMusic,
    setToggleNagaraNotifications,
    volume,
  } = useStore();
  const [trackIndex, setTrackIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const nagararaftrcks = [
    'mountain-path-125573.mp3',
    'mountain-path-125573.mp3',
  ];

  useEffect(() => {
    playNagaraTrack(trackIndex);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [trackIndex]);

  const playNagaraTrack = index => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const trackPath = nagararaftrcks[index];

    const newPartyDareSound = new Sound(trackPath, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error', error);
        return;
      }

      newPartyDareSound.play(success => {
        if (success) {
          setTrackIndex(prevIndex => (prevIndex + 1) % nagararaftrcks.length);
        } else {
          console.log('Error ');
        }
      });
      setSound(newPartyDareSound);
    });
  };

  useFocusEffect(
    useCallback(() => {
      loadNagaraBgMusic();
      loadNagaraNotifications();
    }, []),
  );

  useEffect(() => {
    const setVolumeMusic = async () => {
      try {
        const nagaraBgMusicValue = await AsyncStorage.getItem('nagarabgmusic');

        const isNagaraMusicOn = JSON.parse(nagaraBgMusicValue);
        setToggleNagaraBgMusic(isNagaraMusicOn);
        if (sound) {
          sound.setVolume(isNagaraMusicOn ? volume : 0);
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    setVolumeMusic();
  }, [sound, volume]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(toggleNagaraBgMusic ? volume : 0);
    }
  }, [volume, toggleNagaraBgMusic]);

  const loadNagaraBgMusic = async () => {
    try {
      const nagaraBgMusicValue = await AsyncStorage.getItem('nagarabgmusic');

      const isNagaraMusicOn = JSON.parse(nagaraBgMusicValue);
      setToggleNagaraBgMusic(isNagaraMusicOn);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadNagaraNotifications = async () => {
    try {
      const nagaraNotifValue = await AsyncStorage.getItem(
        'nagaranotifications',
      );
      if (nagaraNotifValue !== null) {
        const isNagaraNotOn = JSON.parse(nagaraNotifValue);

        setToggleNagaraNotifications(isNagaraNotOn);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

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

  const filteredNagaraLocations =
    selectedCategory === 'All'
      ? nagararaftlocations
      : nagararaftlocations.filter(
          item =>
            item.nagaradiff.toLowerCase() === selectedCategory.toLowerCase(),
        );

  return (
    <ImageBackground
      source={require('../../assets/images/nagararaappbg.png')}
      style={{ flex: 1 }}
    >
      <View style={styles.nagaraheader}>
        <View style={styles.nagaracatcnt}>
          {nagaraRaftCategories.map((cat, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.8}
              style={
                selectedCategory === cat && {
                  width: 96,
                  height: 32,
                  backgroundColor: '#009C00',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                }
              }
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={styles.nagaracatlabel}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.nagracontainer]}
      >
        <>
          {filteredNagaraLocations.map((article, index) => (
            <LinearGradient
              colors={['#124C39', '#052C1C']}
              style={styles.nagarawelcomegradwrap}
              key={index}
            >
              <View style={styles.nagarawelcomecontainer}>
                <Image source={article.nagaraimg} style={styles.nagaraimage} />

                <View style={styles.nagaracardwrap}>
                  <Text style={styles.nagaralabel}>{article.nagaratitle}</Text>

                  <Text style={styles.nagaracoord}>
                    {article.nagaralat}, {article.nagaralon}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <Text style={styles.nagaracoord}>Difficulty:</Text>
                    <Image source={article.nagaradiffimg} />
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
                      onPress={() => shareNagaraRaftLocation(article)}
                    >
                      <Image
                        source={require('../../assets/images/nagarashrbt.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate('NagaraRaftDetails', article);
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
          ))}
        </>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  nagracontainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 130,
    paddingTop: 20,
  },
  nagaraheader: { height: height * 0.09, backgroundColor: '#1C5839' },
  nagaralabel: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  nagaracatlabel: {
    fontSize: 16,
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
    paddingHorizontal: 20,
    paddingTop: height * 0.04,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default NagaraRaftLocations;
