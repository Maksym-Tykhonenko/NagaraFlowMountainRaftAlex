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
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../NagaraRaftStore/nagaraRaftContext';
import Toast from 'react-native-toast-message';

const { height } = Dimensions.get('window');

const NagaraRaftSetup = () => {
  const {
    toggleNagaraBgMusic,
    setToggleNagaraBgMusic,
    toggleNagaraNotifications,
    setToggleNagaraNotifications,
  } = useStore();

  const toggleNagaraRaftMusic = async selectedValue => {
    if (toggleNagaraNotifications) {
      Toast.show({
        text1: !toggleNagaraBgMusic ? 'Music Enabled!' : 'Music Disabled!',
      });
    }
    try {
      await AsyncStorage.setItem(
        'nagarabgmusic',
        JSON.stringify(selectedValue),
      );
      setToggleNagaraBgMusic(selectedValue);
    } catch (error) {
      console.log('Error saving music setting:', error);
    }
  };

  const toggleNagaraRaftNotifications = async selectedValue => {
    Toast.show({
      text1: !toggleNagaraNotifications
        ? 'Notifications Enabled!'
        : 'Notifications Disabled!',
    });
    try {
      await AsyncStorage.setItem(
        'nagaranotifications',
        JSON.stringify(selectedValue),
      );
      setToggleNagaraNotifications(selectedValue);
    } catch (error) {
      console.log('Error saving vibration setting:', error);
    }
  };

  const shareNagaraInfo = async () => {
    try {
      await Share.share({
        message:
          Platform.OS === 'ios'
            ? `Discover the spirit of the mountains through calm waters and wild rapids. Explore real rafting routes, maps, guides, and a rafting-style quiz in Nagara Flow: Mountain Raft.`
            : `Discover the spirit of the mountains through calm waters and wild rapids. Explore real rafting routes, maps, guides, and a rafting-style quiz in Dragon Flow: Mountain Raft.`,
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
      <View style={styles.nagaraheader} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.nagracontainer]}
      >
        <LinearGradient
          colors={['#124C39', '#052C1C']}
          style={styles.nagarawelcomegradwrap}
        >
          <View style={styles.nagarawelcomecontainer}>
            <Text style={styles.nagaralabel}>Setup</Text>
            {Platform.OS === 'ios' && (
              <View style={styles.nagaracarwrapper}>
                <Text style={styles.nagaralabel}>Music</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggleNagaraRaftMusic(!toggleNagaraBgMusic)}
                >
                  {toggleNagaraBgMusic ? (
                    <Image
                      source={require('../../assets/images/nagaraact.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/nagarainact.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.nagaracarwrapper}>
              <Text style={styles.nagaralabel}>Notifications</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  toggleNagaraRaftNotifications(!toggleNagaraNotifications)
                }
              >
                {toggleNagaraNotifications ? (
                  <Image
                    source={require('../../assets/images/nagaraact.png')}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/nagarainact.png')}
                  />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginTop: 49, alignItems: 'center' }}
              onPress={shareNagaraInfo}
            >
              <Image source={require('../../assets/images/nagarashare.png')} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
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
    justifyContent: 'center',
  },
  nagaraheader: { height: height * 0.09, backgroundColor: '#1C5839' },
  nagaralabel: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  nagarawelcomegradwrap: {
    justifyContent: 'center',
    width: '90%',
    borderRadius: 32,
    borderWidth: 0.9,
    borderColor: '#FFD733',
  },
  nagaraimage: {
    width: 132,
    height: 132,
    resizeMode: 'contain',
    borderRadius: 32,
  },
  nagaracardwrap: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  nagaraartttl: {
    fontSize: 22,
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
  nagarawelcomecontainer: {
    padding: 25,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  nagaracarwrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
  },
});

export default NagaraRaftSetup;
