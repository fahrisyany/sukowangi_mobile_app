import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { useDatabase } from '../contexts/database';

const ClearDatabaseFooter = (props: any) => {
    const { handleClearDatabase, handleCacheDatabase } = useDatabase();

    const clearAll = async () => {
        try {
            Alert.alert('Perhatian', 'Database yang di chache akan dihapus', [
                {
                    text: 'Batal',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: 'Lanjut', onPress: () => {
                        handleClearDatabase(() => Alert.alert("Perhatian", "Database berhasil dihapus"))
                    }
                },
            ]);
        } catch (e) {
            console.log("🚀 ~ file: PengaturanScreen.tsx ~ line 14 ~ clearAll ~ e", e)
        }
    }

    return (
        <View {...props} style={[props.style, styles.footerContainer]}>
            <Button
                style={styles.footerControl}
                onPress={() => handleCacheDatabase(() => Alert.alert("Perhatian", "Database Tersimpan dengan baik"))}
                size='small'>
                PILIH
            </Button>
            <Button
                style={styles.footerControl}
                onPress={() => clearAll()}
                size='small'>
                HAPUS CACHE
            </Button>
        </View>
    )
};

export const PengaturanScreen = () => (
    <Layout style={styles.container} level='1'>
        <Card style={styles.card} footer={ClearDatabaseFooter}>
            <Text>Pilih Database yang akan di simpan</Text>
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