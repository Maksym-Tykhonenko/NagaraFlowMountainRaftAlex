import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { nagararaftarticles } from '../NagaraRaftData/nagararaftarticles';
import Video from 'react-native-video';

const { height, width } = Dimensions.get('window');

const NagaraRaftArticles = () => {
  const [nagaraRaftScrnIdx, setNagaraRaftScrnIdx] = useState(0);
  const [showNagaraArticle, setShowNagaraArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigation = useNavigation();
  const videoRef = useRef(null);

  return (
    <ImageBackground
      source={
        showNagaraArticle
          ? require('../../assets/images/nagarablurbg.png')
          : require('../../assets/images/nagararaappbg.png')
      }
      style={{ flex: 1 }}
    >
      <View style={styles.nagaraheader}>
        {showNagaraArticle && (
          <TouchableOpacity
            style={{ position: 'absolute', left: 20, bottom: 5 }}
            onPress={() => setShowNagaraArticle(false)}
          >
            <Image source={require('../../assets/images/nagaraback.png')} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.nagracontainer]}
      >
        {showNagaraArticle ? (
          <View>
            <Text style={styles.nagaraartttl}>
              {selectedArticle?.nagaratitle}
            </Text>

            <Video
              source={selectedArticle?.nagaravideo}
              style={{
                width: 132,
                height: 132,
                marginTop: 20,
                alignSelf: 'center',
              }}
              autoplay
              muted
              paused={false}
              resizeMode="cover"
              repeat
              ref={videoRef}
            />

            <Text style={styles.nagaraartdesc}>
              {selectedArticle?.nagaraarticle}
            </Text>
          </View>
        ) : (
          <>
            {nagararaftarticles.map((article, index) => (
              <LinearGradient
                colors={['#124C39', '#052C1C']}
                style={styles.nagarawelcomegradwrap}
                key={index}
              >
                <View style={styles.nagarawelcomecontainer}>
                  <Image
                    source={article.nagaraimg}
                    style={styles.nagaraimage}
                  />

                  <View style={styles.nagaracardwrap}>
                    <Text style={styles.nagaralabel}>
                      {article.nagaratitle}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        setShowNagaraArticle(true);
                        setSelectedArticle(article);
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
              </LinearGradient>
            ))}
          </>
        )}
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
});

export default NagaraRaftArticles;
