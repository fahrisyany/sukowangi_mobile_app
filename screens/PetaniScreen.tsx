import * as React from 'react';
import { View, Text, Layout } from '../components/Themed';
import { Input, Divider, Button } from '@ui-kitten/components';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { CardCustom } from '../components/CardCustom'
import * as Device from 'expo-device';
import { useEffect, useRef, useState } from 'react';
import { PetaniInterface } from '../interfaces/petani.interface'
import ListCustom from '../components/ListCustom'
import * as FileSystem from "expo-file-system";
import XLSX from 'xlsx'
import convertToJson from '../helpers/convertToJson'
import useAsyncStorage from "../hooks/useAsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useInputState = (initialValue: string = '') => {
  const [value, setValue] = useState<string>(initialValue);
  return { value, onChangeText: setValue };
};

export default function PetaniScreen() {
  const kodePetaniInputState = useInputState();
  const npKeranjangInputState = useInputState();
  const [data, setData] = useAsyncStorage<PetaniInterface[]>('data', [])
  const firstInput = useRef<Input | null>(null);
  const secondInput = useRef<Input | null>(null);

  useEffect(() => {
    (async () => {
      const item: string | null = await AsyncStorage.getItem('data');
      if (item === '[]') {
        // Gets all files inside of selected directory
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {

          // Gets SAF URI from response
          const uri = permissions.directoryUri;

          // Gets all files inside of selected directory
          const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(uri);

          try {
            const file = await FileSystem.readAsStringAsync(files[0], { encoding: FileSystem.EncodingType.Base64 })
            const wb = await XLSX.read(file.replace(/_/g, "/").replace(/-/g, "+"), { type: 'base64' })
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws);
            setData(convertToJson(data))
          } catch (e) {
            alert("Error fetching database. Either the database is missing or format is not .xlsx")
          }
        }
      }
    })()

    return () => { }
  }, [])

  const clearAll = async () => {
    try {
      setData([])
    } catch (e) {
      // clear error
    }

    console.log('Done.')
  }

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
        <Button onPress={() => clearAll()}>
          BUTTON
        </Button>
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
    // resizeMode: 'stretch',
  }
});
