import React, { useEffect } from 'react';
import { Card } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { View, Text, Layout } from './Themed';
import { PetaniInterface } from '../interfaces/petani.interface'


type CardCustomProps = {
    result: PetaniInterface;
    index: number
};

export const CardCustom = ({ result, index }: CardCustomProps) => {
    console.log("🚀 ~ file: CardCustom.tsx ~ line 14 ~ CardCustom ~ result", result)

    const Header = (props: any) => {
        return (
            <View {...props}>
                <Text category='h1'>{`${result.SERI}-${result.NO_KERANJANG}`}</Text>
            </View>
        )
    }

    if (result)
        return (
            <React.Fragment key={index}>
                <Layout style={styles.topContainer} level='1'>
                    <Card style={styles.card} header={Header} >
                        <Text category='h5'>{result.BRUTO}/{result.NETTO} {result.GRADE_JUAL}</Text>
                    </Card>
                </Layout>
            </React.Fragment>
        )
    else {
        return (
            <React.Fragment>
                <Text category='h5'>Petani tidak ada</Text>
            </React.Fragment>
        )

    }
};


const styles = StyleSheet.create({
    topContainer: {
        marginTop: 26,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
        borderColor: "#2897fc",
        borderWidth: 2,
    },
});