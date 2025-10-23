import { createStackNavigator } from '@react-navigation/stack';
import NagaraRaftTabs from './NagaraRaftTabs';
import NagaraRaftOnboard from '../NagaraRaftScreens/NagaraRaftOnboard';
import NagaraRaftDetails from '../NagaraRaftScreens/NagaraRaftDetails';

const Stack = createStackNavigator();

const NagaraRaftStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NagaraRaftOnboard" component={NagaraRaftOnboard} />
      <Stack.Screen name="NagaraRaftTabs" component={NagaraRaftTabs} />
      <Stack.Screen name="NagaraRaftDetails" component={NagaraRaftDetails} />
    </Stack.Navigator>
  );
};

export default NagaraRaftStack;
