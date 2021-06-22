import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStoreByIdTwc, getStoreByIdCwh } from '../services/storesService';

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
        <SafeAreaView>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Image style={{ width: 100, height: 100 }} source={require('../assets/uu.png')} />
                <Text style={{ marginTop: 20, fontSize: 25 }} onPress={signout}>Sign Out</Text>
            </View>

            <View style={{
                backgroundColor: '#F2F2F2', height: 80, marginTop: 20,
                marginLeft: 10, marginRight: 10, borderRadius: 100,
            }}>
                <Text style={{ color: '#B6B7B7', marginLeft: 40, marginTop: 10 }}>Name</Text>
                <Text style={{ color: '#4A4B4D', marginLeft: 40, marginTop: 10, fontSize: 18 }}>{user.firstName} {user.lastName}</Text>
            </View>

            <View style={{
                backgroundColor: '#F2F2F2', height: 80, marginTop: 20,
                marginLeft: 10, marginRight: 10, borderRadius: 100,
            }}>
                <Text style={{ color: '#B6B7B7', marginLeft: 40, marginTop: 10 }}>Email</Text>
                <Text style={{ color: '#4A4B4D', marginLeft: 40, marginTop: 10, fontSize: 18 }}>{"myemail@xyz.com"}</Text>
            </View>

            <View style={{
                backgroundColor: '#F2F2F2', height: 80, marginTop: 20,
                marginLeft: 10, marginRight: 10, borderRadius: 100,
            }}>
                <Text style={{ color: '#B6B7B7', marginLeft: 40, marginTop: 10 }}>Mobile No</Text>
                <Text style={{ color: '#4A4B4D', marginLeft: 40, marginTop: 10, fontSize: 18 }}>{user.phoneNumber}</Text>
            </View>

            <View style={{
                backgroundColor: '#F2F2F2', height: 80, marginTop: 20,
                marginLeft: 10, marginRight: 10, borderRadius: 100,
            }}>
                <Text style={{ color: '#B6B7B7', marginLeft: 40, marginTop: 10 }}>Address</Text>
                <Text style={{ color: '#4A4B4D', marginLeft: 40, marginTop: 10, fontSize: 18 }}>{user.unit} {user.streetAddress} {'\n'}{user.suburb} {user.state}</Text>
            </View>

            <View style={{
                backgroundColor: '#F2F2F2', height: 80, marginTop: 20,
                marginLeft: 10, marginRight: 10, borderRadius: 100,
            }}>
                <Text style={{ color: '#B6B7B7', marginLeft: 40, marginTop: 10 }}>Preferred Pharmacy</Text>
                <Text style={{ color: '#4A4B4D', marginLeft: 40, marginTop: 10, fontSize: 18 }}>{pPharmacy}</Text>
            </View>

        </SafeAreaView>
    );
}