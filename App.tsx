import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Input, Divider, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { CardCustom } from './components/CardCustom'
import * as Device from 'expo-device';

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};


const HomeScreen = () => {

  const successInputState = useInputState();
  const infoInputState = useInputState();

  return (
    <Layout style={styles.container}>
      <Text category='h2' style={styles.title} >SUKOWANGI</Text>
      <Divider />
      <View style={styles.rowContainer}>
        <Text style={styles.label} category='label'>Kode Petani {'   '}:</Text>
        <Input
          style={styles.input}
          {...successInputState}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label} category='label'>No Keranjang :</Text>
        <Input
          style={styles.input}
          keyboardType={Device.osName === "Android" ? "numeric" : "number-pad"}
          {...infoInputState}
        />
      </View>
      {CardCustom()}
      <View style={styles.buttonContainer}>
        <Button appearance='ghost' status='control'>
          Cari
        </Button>
      </View>
    </Layout>
  )
};

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
  </ApplicationProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
    paddingTop: 64,
    flexDirection: "column",
    backgroundColor: '#f7f8fc'
    // borderWidth: 1,
    // borderColor: "red",
  },
  title: {
    marginBottom: 32,
  },
  label: {
    marginRight: 16,
  },
  input: {
    width: 260
  },
  rowContainer: {
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "row",
    width: '100%',
    // borderWidth: 1,
    // borderColor: "thistle",
  },
  buttonContainer: {
    marginTop: 16,
    padding: 6,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#2897fc',
  },
});