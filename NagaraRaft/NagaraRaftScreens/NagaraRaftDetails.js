import { useNavigation } from '@react-navigation/native';
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
const { height } = Dimensions.get('window');

const NagaraRaftDetails = ({ route }) => {
  const selectedArticle = route.params;
  const navigation = useNavigation();

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
      source={require('../../assets/images/nagarablurbg.png')}
      style={{ flex: 1 }}
    >
      <View style={styles.nagaraheader}>
        <TouchableOpacity
          style={{ position: 'absolute', left: 20, bottom: 5 }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/images/nagaraback.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.nagracontainer]}
      >
        <View>
          <Text style={styles.nagaraartttl}>
            {selectedArticle?.nagaratitle}
          </Text>

          <Image source={selectedArticle?.nagaraimg} style={styles.nagaraim} />

          <Text style={styles.nagaracoord}>
            {selectedArticle?.nagaralat}, {selectedArticle?.nagaralon}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              justifyContent: 'center',
              marginTop: 14,
            }}
          >
            <Text style={styles.nagaracoord}>Difficulty:</Text>
            <Image source={selectedArticle?.nagaradiffimg} />
          </View>

          <Text style={styles.nagaraartdesc}>
            {selectedArticle?.nagaraarticle}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'flex-end',
              justifyContent: 'center',
              flex: 1,
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('NagaraRaftTabs', {
                  screen: 'NagaraRaftMap',
                  params: selectedArticle,
                })
              }
            >
              <ImageBackground
                source={require('../../assets/images/nagararacardbtn.png')}
                style={styles.nagarabtn}
              >
                <Text style={styles.nagarabtnlabel}>Map</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: 'absolute', right: 30 }}
              activeOpacity={0.8}
              onPress={() => shareNagaraRaftLocation(selectedArticle)}
            >
              <Image source={require('../../assets/images/nagarashrbt.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  nagracontainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 60,
    paddingTop: 20,
  },
  nagaraheader: { height: height * 0.09, backgroundColor: '#1C5839' },
  nagarasubtitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  nagarabtnlabel: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  nagarabtn: {
    width: 95,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nagaraimage: {
    width: 132,
    height: 132,
    borderRadius: 32,
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

export default NagaraRaftDetails;
