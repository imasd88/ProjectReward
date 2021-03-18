/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import MapView, { Marker } from 'react-native-maps';



const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [position, setPosition] = useState<Position>({ latitude: -37.7046061, longitude: 144.9173406970003, })
  /* 
    async function permissions() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          alert("You can use the location")
        }
        else {
          alert("Location permission denied")
        }
      }
      catch (err) {
        console.warn(err)
      }
    } */

  useEffect(() => {

    // permissions()

    Geolocation.getCurrentPosition((success) => {
      setPosition(success.coords)
      console.log(success.coords)
    }, (error) => {
      console.log(error)
    })
  }, [])

  const getInitialRegions = (lat: number, lng: number) => {
    return {
      latitude: position?.latitude,
      longitude: position?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  };

  const latitud = -37.7047955
  const longitud = 144.96953804853564

  interface coords {
    latitude: number,
    longitude: number,
    title: string,
    address: string
  }

  const list: coords[] = [{ latitude: -37.7046061, longitude: 144.9173406970003, title: 'Fawkner', address: 'U/149 Major Road' },
  { latitude: -37.7047955, longitude: 144.96953804853564, title: 'Glenroy', address: 'Mosque' },
  { latitude: -37.6996641, longitude: 144.56036575434626, title: 'brookfield', address: '' }]

  return (

    <MapView
      style={styles.map}
      followsUserLocation={true}
      showsUserLocation={true}
      onMapReady={() => {
        // getLocation();
        // setPosition(undefined);
      }}
      initialRegion={getInitialRegions(latitud, longitud)}
    >
      {list.map((coords) =>
        <Marker
          coordinate={coords}
          title={coords.title}
          description={coords.address}
        />
      )
      }
    </MapView>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
