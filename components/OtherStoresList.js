import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import OtherStores from './OtherStores';

const OtherStoreList = () => {
    return (

        <View style={styles.storeWrapper}>
            <Text style={styles.sectionTitle}>
                Other Stores
            </Text>
            <View style={styles.items}>
                <OtherStores text={'Store X               * 102km'} />
                <OtherStores text={'Store Y               * 78km'} />
                <OtherStores text={'Store XY              * 203km'} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    storeWrapper: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30,
    }
});

export default OtherStoreList;