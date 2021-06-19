import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions, TouchableOpacity, Button } from 'react-native'

export default function NavHeader({ navigation, title }) {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headBtn}>
                {/* <View >
                    <Text style={styles.menuBtn}>𝌆</Text>
                </View> */}
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: '8%',
        flexDirection: 'row',
        backgroundColor: '#00CBBC',
    },
    headerTitle: {
        flex: 1.0,
        paddingLeft: '32%',
        alignSelf: 'center',
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    headBtn: {
        paddingLeft: '3%',
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    menuBtn: {
        fontSize: 30,
    }
});
