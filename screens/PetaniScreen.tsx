import * as React from 'react';
import { View, Text, Layout } from '../components/Themed';
import { Input, Divider } from '@ui-kitten/components';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, Image, Alert } from 'react-native';
import { CardCustom } from '../components/CardCustom';
import * as Device from 'expo-device';
import { useEffect, useRef, useState } from 'react';
import { PetaniInterface } from '../interfaces/petani.interface';
import ListCustom from '../components/ListCustom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDatabase } from '../contexts/database';

const useInputState = (initialValue: string = '') => {
  const [value, setValue] = useState<string>(initialValue);
  return { value, onChangeText: setValue };
};

export default function PetaniScreen() {
  const kodePetaniInputState = useInputState();
  const npKeranjangInputState = useInputState();
  const { data, handleCacheDatabase } = useDatabase();
  const firstInput = useRef<Input | null>(null);
  const secondInput = useRef<Input | null>(null);

  useEffect(() => {

    const handleCheckDatabase = async () => {
      const item: string | null = await AsyncStorage.getItem('data');
      if (item === '[]' || item === '' || item === null) {
        handleCacheDatabase(() => Alert.alert("Perhatian", "Database Tersimpan dengan baik"))
      }
    }
    handleCheckDatabase()
    return () => { }
  }, [])

  const renderQueryResult = () => {
    const result = data.filter((el: PetaniInterface) => el.KODE_PETANI == kodePetaniInputState.value.trim() && el.NP_KERANJANG === npKeranjangInputState.value && el)

    if (result.length === 1)
      return result.map((el: PetaniInterface, i: React.Key | null | undefined) =>
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
            ref={firstInput}
            onSubmitEditing={() => {
              secondInput?.current?.focus()
            }}
            {...kodePetaniInputState}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label} category='label'>No Keranjang </Text>
          <Input
            style={styles.input}
            keyboardType={Device.osName === "Android" ? "numeric" : "number-pad"}
            ref={secondInput}
            selectTextOnFocus={true}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
            blurOnSubmit={false}
            {...npKeranjangInputState}
          />
        </View>
        {data ? renderQueryResult() : null}
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
    width: "60%",
    borderWidth: 2,
  },
  inputContainer: {
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "row",
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  notFoundImg: {
    width: '90%',
    height: "50%",
  }
});
