import React from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItem, Icon, Divider } from '@ui-kitten/components';
import { PetaniInterface } from '../interfaces/petani.interface'

const data = new Array(8).fill({
    title: 'Item',
});

type ListCustomProps = {
    result: PetaniInterface[];
};

export const ListCustom = ({ result }: ListCustomProps) => {
    const renderItemIcon = (props: any) => (
        <Icon {...props} name='person' />
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
        borderWidth: 2,
        width: "100%",
        borderRadius: 4,
    },
});

export default ListCustom