import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { useStore } from '../NagaraRaftStore/nagaraRaftContext';
import { nagaraquizquestions } from '../NagaraRaftData/nagaraquizquestions';
const { height } = Dimensions.get('window');
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

const typeByIndex = ['Charger', 'Explorer', 'Balancer', 'Wild Spirit'];

const NagaraRaftQuiz = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState('');
  const { toggleNagaraNotifications } = useStore();

  useFocusEffect(
    useCallback(() => {
      resetQuiz();
    }, []),
  );

  const resetQuiz = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setFinished(false);
    setResult('');
  };

  const handleAnswer = optionIndex => {
    if (toggleNagaraNotifications) {
      Toast.show({
        text1: 'Answer successfully selected!',
      });
    }

    const type = typeByIndex[optionIndex];
    setSelectedAnswer(optionIndex);
    setAnswers([...answers, type]);

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion + 1 < nagaraquizquestions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResult([...answers, type]);
      }
    }, 1000);
  };

  const calculateResult = allAnswers => {
    const counts = { Explorer: 0, Charger: 0, Balancer: 0, 'Wild Spirit': 0 };
    allAnswers.forEach(ans => counts[ans]++);

    let maxCount = 0;
    let maxTypes = [];
    for (let type in counts) {
      if (counts[type] > maxCount) {
        maxCount = counts[type];
        maxTypes = [type];
      } else if (counts[type] === maxCount) {
        maxTypes.push(type);
      }
    }

    for (let type of typeByIndex) {
      if (maxTypes.includes(type)) {
        setResult(type);
        break;
      }
    }
    setFinished(true);
  };

  if (!started) {
    return (
      <ImageBackground
        source={require('../../assets/images/nagararaappbg.png')}
        style={{ flex: 1 }}
      >
        <View style={styles.nagaraheader} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.nagracontainer}
        >
          <Image source={require('../../assets/images/nagaraquiz1.png')} />
          <LinearGradient
            colors={['#124C39', '#052C1C']}
            style={styles.nagarawelcomegradwrap}
          >
            <View style={styles.nagarawelcomecontainer}>
              <Text style={styles.nagaralabel}>
                Find Out What Kind of Rafter You Are
              </Text>
              <Text style={styles.nagarasubtitle}>
                Every river tells a story — and so do you. Answer a few quick
                questions to discover your rafting style.
              </Text>
            </View>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => setStarted(true)}
            activeOpacity={0.8}
          >
            <ImageBackground
              source={require('../../assets/images/nagararafonbt.png')}
              style={styles.nagarabtn}
            >
              <Text style={styles.nagarabtnlabel}>Start</Text>
            </ImageBackground>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    );
  }

  if (finished) {
    return (
      <ImageBackground
        source={require('../../assets/images/nagarabluredbg.png')}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.nagaraheader} />
        <ScrollView
          contentContainerStyle={styles.nagracontainer}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={['#124C39', '#052C1C']}
            style={[styles.nagarawelcomegradwrap, { marginBottom: 50 }]}
          >
            <View style={styles.nagarawelcomecontainer}>
              <Text style={styles.nagarareslabel}>
                {result === 'Charger' && 'You’re the Chargrer'}
                {result === 'Explorer' && 'You’re the Explorer'}
                {result === 'Balancer' && 'You’re the Balancer'}
                {result === 'Wild Spirit' && 'You’re the Wild Spirit'}
              </Text>
              <Text style={styles.nagararessubtitle}>
                {result === 'Charger' &&
                  'You find peace in the flow. Calm, observant, and grounded — you see the river not as a challenge but as a companion. Your strength lies in patience. You read the current before you move, and when you do — it’s always in the right direction.'}
                {result === 'Explorer' &&
                  'Adrenaline runs through your veins like mountain water. You crave motion, speed, and the thrill of every drop. The river doesn’t scare you — it fuels you. You don’t wait for the perfect moment, you create it.'}
                {result === 'Balancer' &&
                  'You move with rhythm and intention. Every paddle stroke is measured, every pause — meaningful. You’re the harmony between calm and chaos, the teammate everyone trusts when the current turns sharp.'}
                {result === 'Wild Spirit' &&
                  'Rules? You make your own. You trust your instincts, embrace the unknown, and follow the river wherever it dares to go. The wild water recognizes you — bold, free, and endlessly curious.'}
              </Text>
            </View>
          </LinearGradient>

          {result === 'Charger' && (
            <Image source={require('../../assets/images/nagarares1.png')} />
          )}
          {result === 'Explorer' && (
            <Image source={require('../../assets/images/nagarares2.png')} />
          )}
          {result === 'Balancer' && (
            <Image source={require('../../assets/images/nagarares3.png')} />
          )}
          {result === 'Wild Spirit' && (
            <Image source={require('../../assets/images/nagarares4.png')} />
          )}
        </ScrollView>
      </ImageBackground>
    );
  }

  const question = nagaraquizquestions[currentQuestion];

  return (
    <ImageBackground
      source={require('../../assets/images/nagararaappbg.png')}
      style={{ flex: 1 }}
    >
      <View style={styles.nagaraheader} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.nagracontainer}
      >
        <Image source={require('../../assets/images/nagaraquiz2.png')} />
        <LinearGradient
          colors={['#124C39', '#052C1C']}
          style={styles.nagarawelcomegradwrap}
        >
          <View style={styles.nagarawelcomecontainer}>
            <Text style={styles.nagaralabel}>{currentQuestion + 1} / 8</Text>
            <Text style={styles.nagaralabel}>{question.nagaraqs}</Text>
          </View>
        </LinearGradient>
        {question.nagaraqoptions.map((opt, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            style={{ width: '100%', marginVertical: 5 }}
          >
            <LinearGradient
              colors={
                selectedAnswer === index
                  ? ['#4CAF50', '#388E3C']
                  : ['#124C39', '#052C1C']
              }
              style={styles.optionButton}
            >
              <View style={{ padding: 10, width: '100%' }}>
                <Text style={styles.nagaraopttxt}>{opt}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 24,
  },
  nagaralabel: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 20,
  },
  nagarasubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  nagarawelcomegradwrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 32,
    borderWidth: 0.9,
    borderColor: '#FFD733',
    marginBottom: 20,
  },
  nagarawelcomecontainer: {
    padding: 30,
    borderRadius: 10,
  },
  nagarabtn: {
    width: 150,
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  nagarabtnlabel: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  optionButton: {
    borderRadius: 32,
    borderWidth: 0.9,
    borderColor: '#FFD733',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  nagaraopttxt: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  nagarareslabel: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
  },
  nagararessubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    lineHeight: 18,
  },
  nagaraheader: { height: height * 0.09, backgroundColor: '#1C5839' },
});

export default NagaraRaftQuiz;
