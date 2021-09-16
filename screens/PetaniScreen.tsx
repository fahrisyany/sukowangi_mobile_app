import * as React from 'react';
import { View, Text, Layout } from '../components/Themed';
import { Input, Divider } from '@ui-kitten/components';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { CardCustom } from '../components/CardCustom'
import * as Device from 'expo-device';
import { useEffect, useRef, useState } from 'react';
import { PetaniInterface } from '../interfaces/petani.interface'
import ListCustom from '../components/ListCustom'
import * as FileSystem from "expo-file-system";
import XLSX from 'xlsx'
import convertToJson from '../helpers/convertToJson'

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

export default function PetaniScreen() {
  const kodePetaniInputState = useInputState();
  const npKeranjangInputState = useInputState();
  const [data, setData] = useState<PetaniInterface[]>([])
  const firstInput = useRef<any>(null);
  const secondInput = useRef<any>(null);

  useEffect(() => {

    const getFile = async () => {
      let result: PetaniInterface[] = [];

      // Gets all files inside of selected directory
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {

        // Gets SAF URI from response
        const uri = permissions.directoryUri;

        // Gets all files inside of selected directory
        const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(uri);
        console.log("🚀 ~ file: PetaniScreen.tsx ~ line 40 ~ getFile ~", `Files inside ${uri}:\n\n${JSON.stringify(files)}`)
        try {
          const file = await FileSystem.readAsStringAsync(files[0], { encoding: FileSystem.EncodingType.Base64 })
          const wb = await XLSX.read(file.replace(/_/g, "/").replace(/-/g, "+"), { type: 'base64' })
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_csv(ws);
          result = convertToJson(data)
        } catch (e) {
          console.log("🚀 ~ file: PetaniScreen.tsx ~ line 48 ~ getFile ~ e", e)
          alert("Error fetching database. Either the database is missing or format is not .xlsx")
        }
      }
      setData(result)
    }
    getFile()
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
            ref={firstInput}
            onSubmitEditing={() => {
              secondInput.current.focus()
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
            blurOnSubmit={false}
            {...npKeranjangInputState}
          />
        </View>
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
