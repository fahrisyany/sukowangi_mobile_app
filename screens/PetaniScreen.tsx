import * as React from 'react';
import { View, Text, Layout } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Input, Divider, Button } from '@ui-kitten/components';
import { StyleSheet, Keyboard } from 'react-native';
// import { CardCustom } from './components/CardCustom'
import * as Device from 'expo-device';

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};


export default function PetaniScreen() {
  const successInputState = useInputState();
  const infoInputState = useInputState();

  return (
    <Layout style={styles.container}>
      <Divider />
      <View style={styles.inputContainer}>
        <Text style={styles.label} category='label'>Kode Petani </Text>
        <Input
          style={styles.input}
          {...successInputState}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label} category='label'>No Keranjang </Text>
        <Input
          style={styles.input}
          keyboardType={Device.osName === "Android" ? "numeric" : "number-pad"}
          {...infoInputState}
        />
      </View>
      {/* {CardCustom()} */}
      <View style={styles.buttonContainer}>
        <Button appearance='ghost' status='control'>
          Cari
        </Button>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
    flexDirection: "column",
  },
  label: {
    marginRight: 16,
  },
  input: {
    width: 260
  },
  inputContainer: {
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "row",
    width: '100%',
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
