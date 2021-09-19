import React from 'react';
import { StyleSheet, View, BackHandler, Alert } from 'react-native';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClearDatabaseFooter = (props: any) => {

    const clearAll = async () => {
        try {
            Alert.alert('Database akan dihapus', 'Aplikasi akan tutup dan database bisa dipilih kembali', [
                {
                    text: 'Batal',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'Lanjut', onPress: () => { AsyncStorage.removeItem('data'); BackHandler.exitApp(); } },
            ]);

        } catch (e) {
            console.log("🚀 ~ file: PengaturanScreen.tsx ~ line 14 ~ clearAll ~ e", e)
        }
    }

    return (
        <View {...props} style={[props.style, styles.footerContainer]}>
            <Button
                style={styles.footerControl}
                onPress={() => clearAll()}
                size='small'>
                KONFIRMASI
            </Button>
        </View>
    )
};

export const PengaturanScreen = () => (
    <Layout style={styles.container} level='1'>
        <Card style={styles.card} footer={ClearDatabaseFooter}>
            <Text>Hapus Database yang tersimpan</Text>
        </Card>
    </Layout>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    card: {
        margin: 2,
        width: '100%'
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },
});

export default PengaturanScreen