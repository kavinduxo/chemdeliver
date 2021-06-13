import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import Stores from './Stores';

const ClosestStoreList = () => {
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.storeWrapper}>
                <Text style={styles.sectionTitle}>
                    Stores Close by
                </Text>
                <View style={styles.items}>
                    <Stores text={'Store A               * 12km'} />
                    <Stores text={'Store B               * 20km'} />
                    <Stores text={'Store AB              * 45km'} />
                </View>
            </View>
        </ScrollView>
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
    },
    scrollView: {
        marginHorizontal: 20,
    },
});

export default ClosestStoreList;