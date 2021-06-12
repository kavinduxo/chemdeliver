import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import ClosestStores from './ClosestStores';

const ClosestStoreList = () => {
    return (
        <View style={styles.storeWrapper}>
            <Text style={styles.sectionTitle}>
                Closest Stores
            </Text>
            <View style={styles.items}>
                <ClosestStores text={'Store A               * 12km'} />
                <ClosestStores text={'Store B               * 20km'} />
                <ClosestStores text={'Store AB              * 45km'} />
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

export default ClosestStoreList;