import React, { useEffect } from 'react';
import { Card } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { View, Text, Layout } from './Themed';
import { PetaniInterface } from '../interfaces/petani.interface'
import { useThemeColor } from './Themed';

type CardCustomProps = {
    result: PetaniInterface;
};

export const CardCustom = ({ result }: CardCustomProps) => {

    const Header = (props: any) => {
        return (
            <View {...props}>
                <Text category='h1' style={styles.headerContent}>{`${result.SERI}-${result.NO_KERANJANG}`}</Text>
            </View>
        )
    }

    return (
        <Layout style={styles.topContainer} level='1'>
            <Card style={styles.card} header={Header} >
                <Text category='h1'>{result.BRUTO}/{result.NETTO} {result.GRADE_JUAL}</Text>
            </Card>
        </Layout>
    )

};

const styles = StyleSheet.create({
    topContainer: {
        marginTop: 26,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
        borderWidth: 2,
    },
    headerContent: {
        fontSize: 62
    }
});