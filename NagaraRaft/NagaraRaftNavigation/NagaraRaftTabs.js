import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import NagaraRaftMap from '../NagaraRaftScreens/NagaraRaftMap';
import NagaraRaftLocations from '../NagaraRaftScreens/NagaraRaftLocations';
import NagaraRaftArticles from '../NagaraRaftScreens/NagaraRaftArticles';
import NagaraRaftGameIntro from '../NagaraRaftScreens/NagaraRaftGameIntro';
import NagaraRaftSetup from '../NagaraRaftScreens/NagaraRaftSetup';

const Tab = createBottomTabNavigator();

const { height } = Dimensions.get('window');

const NagaraRaftTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="NagaraRaftLocations"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.nagaratabbar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="NagaraRaftMap"
        component={NagaraRaftMap}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.nagaraicon,
                focused && { backgroundColor: '#009C00' },
              ]}
            >
              <Image
                source={require('../../assets/images/nagararaftmap.png')}
                style={{ tintColor: color }}
              />
              {focused && <View style={styles.nagararaftdot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NagaraRaftLocations"
        component={NagaraRaftLocations}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.nagaraicon,
                focused && { backgroundColor: '#009C00' },
              ]}
            >
              <Image
                source={require('../../assets/images/nagararaftloc.png')}
                style={{ tintColor: color }}
              />
              {focused && <View style={styles.nagararaftdot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NagaraRaftArticles"
        component={NagaraRaftArticles}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.nagaraicon,
                focused && { backgroundColor: '#009C00' },
              ]}
            >
              <Image
                source={require('../../assets/images/nagararaftart.png')}
                style={{ tintColor: color }}
              />
              {focused && <View style={styles.nagararaftdot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NagaraRaftGameIntro"
        component={NagaraRaftGameIntro}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.nagaraicon,
                focused && { backgroundColor: '#009C00' },
              ]}
            >
              <Image
                source={require('../../assets/images/nagararaftquiz.png')}
                style={{ tintColor: color }}
              />
              {focused && <View style={styles.nagararaftdot} />}
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="NagaraRaftSetup"
        component={NagaraRaftSetup}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.nagaraicon,
                focused && { backgroundColor: '#009C00' },
              ]}
            >
              <Image
                source={require('../../assets/images/nagararaftsett.png')}
                style={{ tintColor: color }}
              />
              {focused && <View style={styles.nagararaftdot} />}
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  nagaratabbar: {
    backgroundColor: '#1C5839',
    elevation: 1,
    borderTopColor: '#1C5839',
    borderTopWidth: 1,
    paddingTop: 16,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    height: height * 0.1,
  },
  nagaraicon: {
    borderRadius: 12,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  nagararaftdot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#009C00',
    position: 'absolute',
    bottom: -12,
    right: 21,
  },
});

export default NagaraRaftTabs;
