import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Input, Card, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const Header = (props: any) => (
  <View {...props}>
    <Text category='h1'>N-32</Text>
  </View>
);

export const CardAccessoriesShowcase = () => (
  <React.Fragment>
    <Layout style={styles.topContainer} level='1'>
      <Card style={styles.card} header={Header}>
        <Text category='h5'>60/40 C</Text>
      </Card>
    </Layout>
  </React.Fragment>
);

const HomeScreen = () => {

  const successInputState = useInputState();
  const infoInputState = useInputState();

  return (
    <Layout style={styles.container}>
      <Text category='h2' style={styles.title} >SUKOWANGI</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.label} category='label'>Kode Petani :</Text>
        <Input
          style={styles.input}
          {...successInputState}
        />
      </View>
      <Layout style={styles.rowContainer}>
        <Text style={styles.label} category='label'>No Keranjang :</Text>
        <Input
          style={styles.input}
          {...infoInputState}
        />
      </Layout>
      {CardAccessoriesShowcase()}
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
  title: {
    marginBottom: 32,
  },
  label: {
    marginRight: 16,
  },
  input: {
    flex: 1
  },
  rowContainer: {
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "thistle",
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
    paddingTop: 64,
    flexDirection: "column",
    // borderWidth: 1,
    // borderColor: "red",
  },
  topContainer: {
    marginTop: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 16,
    padding: 6,
    width: '100%',
    borderRadius: 4,
    justifyContent: 'center',
    backgroundColor: '#3366FF',
  },
});