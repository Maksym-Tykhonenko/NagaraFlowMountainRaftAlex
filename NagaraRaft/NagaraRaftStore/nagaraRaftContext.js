import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const NagaraContext = ({ children }) => {
  const [toggleNagaraBgMusic, setToggleNagaraBgMusic] = useState(false);
  const [toggleNagaraNotifications, setToggleNagaraNotifications] =
    useState(false);
  const [soundLevel, updateSoundLevel] = useState(1.0);

  useEffect(() => {
    (async () => {
      try {
        const fetchedVolume = await AsyncStorage.getItem('nagaravolume');
        if (fetchedVolume !== null && !isNaN(parseFloat(fetchedVolume))) {
          updateSoundLevel(parseFloat(fetchedVolume));
        }
      } catch (err) {
        console.log('Error ', err);
      }
    })();
  }, []);

  const adjustVolumeLevel = async newLevel => {
    try {
      const stringifiedLevel = `${newLevel}`;
      await AsyncStorage.setItem('nagaravolume', stringifiedLevel);
      updateSoundLevel(newLevel);
    } catch (err) {
      console.log('err', err);
    }
  };

  const fishincatchcntxvalue = {
    toggleNagaraBgMusic,
    setToggleNagaraBgMusic,
    toggleNagaraNotifications,
    setToggleNagaraNotifications,
    volume: soundLevel,
    setVolume: adjustVolumeLevel,
  };

  return (
    <StoreContext.Provider value={fishincatchcntxvalue}>
      {children}
    </StoreContext.Provider>
  );
};
