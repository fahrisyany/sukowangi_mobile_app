import * as React from 'react';
import { View, Text, Layout } from '../components/Themed';
import { Input, Divider } from '@ui-kitten/components';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
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

  useEffect(() => {
    setData(SampleJson)
    return () => { }
  }, [])

  const renderQueryResult = () => {
    const result = data.filter((el: PetaniInterface) => el.KODE_PETANI == kodePetaniInputState.value.trim() && el.NP_KERANJANG === npKeranjangInputState.value && el)

    if (result.length === 1)
      return result.map((el, i) =>
        <React.Fragment key={i}>
          <CardCustom result={el} />
        </React.Fragment>
      )
    else if (result.length > 1)
      return <ListCustom result={result} />
    else
      if (kodePetaniInputState.value !== "" && npKeranjangInputState.value !== "")
        return (
          <View style={styles.imageContainer}>
            <Image
              resizeMode={'contain'}
              style={styles.notFoundImg}
              source={require('../assets/images/not_found.png')}
            />
            <Text category='s1'>Hasil pencarian {kodePetaniInputState.value}-{npKeranjangInputState.value} tidak dapat ditemukan</Text>
          </View>
        )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
        {/* <View style={styles.buttonContainer}>
        <Button appearance='ghost' status='control' onPress={handleSearchQuery}>
          <Text style={styles.label}>Cari</Text>
        </Button>
      </View> */}
        {renderQueryResult()}
      </Layout>
    </TouchableWithoutFeedback>
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
    fontSize: 14
  },
  input: {
    width: 245,
    borderWidth: 2,
  },
  inputContainer: {
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "row",
    width: '100%',
  },
  buttonContainer: {
    marginTop: 8,
    padding: 6,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#2897fc',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  notFoundImg: {
    width: '100%',
    height: 400,
  }
});
