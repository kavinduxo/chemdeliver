import React from 'react'
import { View, Text, StyleSheet} from 'react-native'

export default function NavHeader({ title }) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: '8%',
        flexDirection: 'row',
        backgroundColor: '#00CBBC',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1.0,
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
