import React from 'react';
import { Layout, Text, Card } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const Header = (props: any) => (
    <View {...props}>
        <Text category='h1'>N-32</Text>
    </View>
);

export const CardCustom = () => (
    <React.Fragment>
        <Layout style={styles.topContainer} level='1'>
            <Card style={styles.card} header={Header}>
                <Text category='h5'>60/40 C</Text>
            </Card>
        </Layout>
    </React.Fragment>
);


const styles = StyleSheet.create({
    topContainer: {
        marginTop: 26,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
    },
});