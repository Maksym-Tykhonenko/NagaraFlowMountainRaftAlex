import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const NagaraRaftOnboard = () => {
  const [nagaraRaftScrnIdx, setNagaraRaftScrnIdx] = useState(0);
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/images/nagararafonbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.nagracontainer}
      >
        {nagaraRaftScrnIdx === 0 && (
          <Image source={require('../../assets/images/nagararafonim1.png')} />
        )}
        {nagaraRaftScrnIdx === 1 && (
          <Image source={require('../../assets/images/nagararafonim2.png')} />
        )}
        {nagaraRaftScrnIdx === 2 && (
          <Image source={require('../../assets/images/nagararafonim3.png')} />
        )}
        {nagaraRaftScrnIdx === 3 && (
          <Image source={require('../../assets/images/nagararafonim4.png')} />
        )}

        <LinearGradient
          colors={['#124C39', '#052C1C']}
          style={styles.nagarawelcomegradwrap}
        >
          <View style={styles.nagarawelcomecontainer}>
            <Text style={styles.nagaralabel}>
              {Platform.OS === 'ios' ? (
                <> {nagaraRaftScrnIdx === 0 && 'Welcome to Nagara Raft'}</>
              ) : (
                <> {nagaraRaftScrnIdx === 0 && 'Welcome to Dragon Raft'}</>
              )}
              {nagaraRaftScrnIdx === 1 && 'Explore Local Rivers'}
              {nagaraRaftScrnIdx === 2 && 'Learn Before You Paddle'}
              {nagaraRaftScrnIdx === 3 && 'What Kind of Rafter Are You?'}
            </Text>
            <Text style={styles.nagarasubtitle}>
              {nagaraRaftScrnIdx === 0 &&
                'Discover the wild beauty of Asheville’s mountain rivers — your next adventure starts here.'}
              {nagaraRaftScrnIdx === 1 &&
                'Ten scenic routes, one mountain town. Find your perfect rafting spot by distance and difficulty.'}
              {nagaraRaftScrnIdx === 2 &&
                'From gear essentials to river safety — short, clear guides to keep every trip smooth and safe.'}
              {nagaraRaftScrnIdx === 3 &&
                'Take a fun personality quiz and uncover your rafting style — calm explorer or thrill seeker?'}
            </Text>
          </View>
        </LinearGradient>
        <TouchableOpacity
          onPress={() => {
            if (nagaraRaftScrnIdx < 3) {
              setNagaraRaftScrnIdx(nagaraRaftScrnIdx + 1);
            } else {
              navigation.replace('NagaraRaftTabs');
            }
          }}
          activeOpacity={0.8}
        >
          <ImageBackground
            source={require('../../assets/images/nagararafonbt.png')}
            style={styles.nagarabtn}
          >
            <Text style={styles.nagarabtnlabel}>
              {nagaraRaftScrnIdx === 0 && 'Next'}
              {nagaraRaftScrnIdx === 1 && 'Next'}
              {nagaraRaftScrnIdx === 2 && 'Next'}
              {nagaraRaftScrnIdx === 3 && 'Begin'}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  nagracontainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 20,
  },
  nagaralabel: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
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
    padding: 40,
    borderRadius: 10,
  },
  nagarabtnlabel: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  nagarabtn: {
    marginTop: 80,
    width: 142,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nagarawelcomegradwrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    borderRadius: 32,
    borderWidth: 0.9,
    borderColor: '#FFD733',
  },
});

export default NagaraRaftOnboard;
