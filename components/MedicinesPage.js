import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native'
import NavHeader from './NavHeader'

const MedicinesPage = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: "90%" }}>

                <NavHeader title={"Medicines"} />
                <ScrollView style={styles.scrollView}>
                    <View style={styles.storeWrapper}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: "5%" }}>
                            <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                                <View>
                                    <Image
                                        source={require('../assets/medicines/levothyroxine.jpg')}
                                        style={{
                                            height: 135,
                                            width: 300
                                        }}
                                    />
                                </View>
                                <View style={{ padding: 10, width: "90%" }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}> {"Levothyroxine"} </Text>
                                    <Text style={{ color: "#777", paddingTop: 5 }}>
                                        25 micrograms * 28 tablets
                                    </Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: "#777" }}>* for oral use</Text>
                                        <Text style={{ color: "#777", paddingLeft: '40%', fontSize:40 }}> 🛒</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: "5%" }}>
                            <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                                <View>
                                    <Image
                                        source={require('../assets/medicines/prednisone.jpg')}
                                        style={{
                                            height: 135,
                                            width: 300
                                        }}
                                    />
                                </View>
                                <View style={{ padding: 10, width: "90%" }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}> {"Prednisone"} </Text>
                                    <Text style={{ color: "#777", paddingTop: 5 }}>
                                        1 mg * 28 tablets
                                    </Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: "#777" }}>* for oral use</Text>
                                        <Text style={{ color: "#777", paddingLeft: '40%', fontSize:40 }}> 🛒</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: "5%" }}>
                            <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                                <View>
                                    <Image
                                        source={require('../assets/medicines/nexium.jpg')}
                                        style={{
                                            height: 135,
                                            width: 300
                                        }}
                                    />
                                </View>
                                <View style={{ padding: 10, width: "90%" }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Nexium </Text>
                                    <Text style={{ color: "#777", paddingTop: 5 }}>
                                       20 mg * 7 tablets
                                    </Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: "#777" }}>* for oral use</Text>
                                        <Text style={{ color: "#777", paddingLeft: '40%', fontSize:40 }}> 🛒</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: "5%" }}>
                            <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                                <View>
                                    <Image
                                        source={require('../assets/medicines/synthroid.jpg')}
                                        style={{
                                            height: 135,
                                            width: 300
                                        }}
                                    />
                                </View>
                                <View style={{ padding: 10, width: "90%" }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Synthroid</Text>
                                    <Text style={{ color: "#777", paddingTop: 5 }}>
                                        75 micrograms * 28 tablets
                                    </Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: "#777" }}>* for oral use</Text>
                                        <Text style={{ color: "#777", paddingLeft: '40%', fontSize:40 }}> 🛒</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: "5%" }}>
                            <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                                <View>
                                    <Image
                                        source={require('../assets/medicines/chlorpromazine.jpg')}
                                        style={{
                                            height: 135,
                                            width: 300
                                        }}
                                    />
                                </View>
                                <View style={{ padding: 10, width: "90%" }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Chlorpromazine </Text>
                                    <Text style={{ color: "#777", paddingTop: 5 }}>
                                        20 micrograms * 250 tablets
                                    </Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: "#777" }}>* for oral use</Text>
                                        <Text style={{ color: "#777", paddingLeft: '40%', fontSize:40 }}> 🛒</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: "5%" }}>
                            <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                                <View>
                                    <Image
                                        source={require('../assets/medicines/aspirin.jpg')}
                                        style={{
                                            height: 135,
                                            width: 300
                                        }}
                                    />
                                </View>
                                <View style={{ padding: 10, width: "90%" }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Aspirin </Text>
                                    <Text style={{ color: "#777", paddingTop: 5 }}>
                                        5 mg * 28 tablets
                                    </Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: "#777" }}>* for oral use</Text>
                                        <Text style={{ color: "#777", paddingLeft: '40%', fontSize:40 }}> 🛒</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: "5%" }}>
                            <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                                <View>
                                    <Image
                                        source={require('../assets/medicines/ampicillin.jpg')}
                                        style={{
                                            height: 135,
                                            width: 300
                                        }}
                                    />
                                </View>
                                <View style={{ padding: 10, width: "90%" }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Ampicillin </Text>
                                    <Text style={{ color: "#777", paddingTop: 5 }}>
                                        10000mg * 10 * 10 tablets
                                    </Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: "#777" }}>* for oral use</Text>
                                        <Text style={{ color: "#777", paddingLeft: '40%', fontSize:40 }}> 🛒</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    storeWrapper: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00CBBC'
    },
    items: {
        marginTop: 10,
    },
    scrollView: {
        marginHorizontal: 10,
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: '10%'
    },
});

export default MedicinesPage;