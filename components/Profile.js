import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStoreByIdTwc, getStoreByIdCwh } from '../services/storesService';
import NavHeader from './NavHeader';

export default function Profle({ user, signout }) {

    useEffect(() => {
        async function getData() {
            var data = await getStoreByIdTwc(user.preferredPharmacy);
            if (data == undefined) {
                data = await getStoreByIdCwh(user.preferredPharmacy);
            }
            setPPharmacy(data.name);
        }
        getData();
    }, []);

    const [pPharmacy, setPPharmacy] = useState(null);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: "90%" }}>
                <NavHeader title={"Delivery Details"} />
                <ScrollView style={{
                    flexDirection: "column",
                    height: 90,
                    padding: 20,
                }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                        <Image style={{ width: 100, height: 100 }} source={require('../assets/uu.png')} />
                    </View>

                    <View style={{
                        backgroundColor: '#F2F2F2', height: 70, marginTop: 20,
                        marginLeft: 10, marginRight: 10, borderRadius: 100,
                    }}>
                        <Text style={{ color: '#B6B7B7', marginLeft: 40, marginTop: 10 }}>Name</Text>
                        <Text style={{ color: '#4A4B4D', marginLeft: 40, marginTop: 10, fontSize: 18 }}>{user.firstName} {user.lastName}</Text>
                    </View>

                    <View style={{
                        backgroundColor: '#F2F2F2', height: 70, marginTop: 20,
                        marginLeft: 10, marginRight: 10, borderRadius: 100,
                    }}>
                        <Text style={{ color: '#B6B7B7', marginLeft: 40, marginTop: 10 }}>Email</Text>
                        <Text style={{ color: '#4A4B4D', marginLeft: 40, marginTop: 10, fontSize: 18 }}>{"myemail@xyz.com"}</Text>
                    </View>

                    <View style={{
                        backgroundColor: '#F2F2F2', height: 70, marginTop: 20,
                        marginLeft: 10, marginRight: 10, borderRadius: 100,
                    }}>
                        <Text style={{ color: '#B6B7B7', marginLeft: 40, marginTop: 10 }}>Mobile No</Text>
                        <Text style={{ color: '#4A4B4D', marginLeft: 40, marginTop: 10, fontSize: 18 }}>{user.phoneNumber}</Text>
                    </View>

                    <View style={{
                        backgroundColor: '#F2F2F2', height: 90, marginTop: 20,
                        marginLeft: 10, marginRight: 10, borderRadius: 100,
                    }}>
                        <Text style={{ color: '#B6B7B7', marginLeft: 40, marginTop: 10 }}>Address</Text>
                        <Text style={{ color: '#4A4B4D', marginLeft: 40, marginTop: 10, fontSize: 18 }}>{user.unit} {user.streetAddress} {'\n'}{user.suburb} {user.state}</Text>
                    </View>

                    <View style={{
                        backgroundColor: '#F2F2F2', height: 70, marginTop: 20, marginBottom: 30,
                        marginLeft: 10, marginRight: 10, borderRadius: 100,
                    }}>
                        <Text style={{ color: '#B6B7B7', marginLeft: 40, marginTop: 10 }}>Preferred Pharmacy</Text>
                        <Text style={{ color: '#4A4B4D', marginLeft: 40, marginTop: 10, fontSize: 18 }}>{pPharmacy}</Text>
                    </View>
                </ScrollView >
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: '10%'
    }
});