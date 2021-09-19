import React from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItem, Divider } from '@ui-kitten/components';
import { PetaniInterface } from '../interfaces/petani.interface'
import { Ionicons } from '@expo/vector-icons';

type ListCustomProps = {
    result: PetaniInterface[];
};

export const ListCustom = ({ result }: ListCustomProps) => {
    const renderItemIcon = () => (
        <Ionicons name="ios-trash-bin-sharp" size={24} style={{ marginTop: 4 }} color="black" />
    );
    const renderItem = ({ item }: { item: PetaniInterface }) => {
        return (
            <ListItem title={`${item.SERI}-${item.NO_KERANJANG} ${item.BRUTO}/${item.NETTO} ${item.GRADE_JUAL}`} accessoryLeft={renderItemIcon} />
        );
    }

    return (
        <List
            style={styles.container}
            data={result}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
        width: "100%",
        borderRadius: 4,
    },
});

export default ListCustom