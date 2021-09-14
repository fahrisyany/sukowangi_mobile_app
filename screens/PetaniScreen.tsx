import * as React from 'react';
import { View, Text, Layout } from '../components/Themed';
import { Input, Divider, Button } from '@ui-kitten/components';
import { StyleSheet, Keyboard, ScrollView } from 'react-native';
import { CardCustom } from '../components/CardCustom'
import SampleJson from '../sample.json'
import * as Device from 'expo-device';
import { useEffect, useState } from 'react';
import { PetaniInterface } from '../interfaces/petani.interface'
import ListCustom from '../components/ListCustom'

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

export default function PetaniScreen() {
  const kodePetaniInputState = useInputState();
  const npKeranjangInputState = useInputState();
  const [data, setData] = useState<PetaniInterface[]>([])
  const [result, setResult] = useState<PetaniInterface[]>([])

  const handleSearchQuery = () => {
    let res = data.filter((el: PetaniInterface) => {
      if (el.KODE_PETANI == kodePetaniInputState.value.trim() && el.NP_KERANJANG === npKeranjangInputState.value) {
        return el
      }
    })
    setResult(res)
    Keyboard.dismiss()
  }

  useEffect(() => {
    setData(SampleJson)
    return () => { }
  }, [])

  const renderQueryResult = () => {
    if (result.length > 1) {
      return <ListCustom result={result} />
    } else {
      return result.map((el, i) => <CardCustom result={el} index={i} />)
    }
  }

  return (
    <Layout style={styles.container}>
      <Divider />
      <View style={styles.inputContainer}>
        <Text style={styles.label} category='label'>Kode Petani </Text>
        <Input
          style={styles.input}
          autoCapitalize={"characters"}
          {...kodePetaniInputState}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label} category='label'>No Keranjang </Text>
        <Input
          style={styles.input}
          keyboardType={Device.osName === "Android" ? "numeric" : "number-pad"}
          {...npKeranjangInputState}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button appearance='ghost' status='control' onPress={handleSearchQuery}>
          Cari
        </Button>
      </View>
      {
        renderQueryResult()
      }
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
