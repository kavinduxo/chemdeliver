import React, { useState } from 'react'
import { Platform, Keyboard } from 'react-native';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Stores from './Stores';

const OtherStoreList = () => {

    const [postCode, setPostCode] = useState();

    const handleSearchStore = () => {
        console.log(postCode);
        Keyboard.dismiss();
        setPostCode(null);
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.storeWrapper}>
                    <Text style={styles.sectionTitle}>
                        Other Stores
                    </Text>
                    <View style={styles.items}>
                        <Stores text={'Store X               * 102km'} />
                        <Stores text={'Store Y               * 78km'} />
                        <Stores text={'Store XY              * 203km'} />
                        <Stores text={'Store X               * 102km'} />
                        <Stores text={'Store Y               * 78km'} />
                        <Stores text={'Store XY              * 203km'} />
                    </View>
                </View>
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputStoreWrapper}>
                <TextInput style={styles.input} placeholder={'Enter a postcode..'} value={postCode} onChangeText={text => setPostCode(text)} />
                <TouchableOpacity onPress={() => handleSearchStore()}>
                    <View style={styles.searchWrapper}>
                        <Text style={styles.textOnSearch}>🔍</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        marginHorizontal: 20,
    },
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
    inputStoreWrapper: {
        position: 'absolute',
        bottom: '8%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF8DC',
        borderRadius: 60,
        borderColor: '#2F4F4F',
        borderWidth: 2,
        width: '60%'

    },
    searchWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF8DC',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#2F4F4F',
        borderWidth: 2,

    },
    textOnSearch: {
        fontSize: 15
    }

});

export default OtherStoreList;