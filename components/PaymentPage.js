import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Button, Alert, Image, CheckBox, Modal, TextInput } from 'react-native'
import NavHeader from './NavHeader';
import { Card } from 'react-native-elements'
import NativeModal from 'react-native-modal';

const PaymentPage = () => {

    const [visible, setVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleFinishModal = () => {
        setModalVisible(!isModalVisible);
    };

    const showConfirmDialog = () => {
        toggleFinishModal();
    };
    const showDeleteDialog = () => {
        Alert.alert('Confirmation', 'Attempt to delete the Card!', [
            { text: "OK", onPress: () => console.log('') },
        ])
    };
    const showSubmitDialog = () => {
        Alert.alert('Confirmation', 'You have added card succesfully!', [
            { text: "OK", onPress: () => console.log('') },
        ])
    };

    const toggleModal = (visible) => {
        setVisible(visible);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: "90%" }}>
                <NavHeader title={"Payment Method"} />
                <Card>
                    <View>
                        <Text style={{
                            color: 'black',
                            width: '100%',
                            fontSize: 17,
                            fontWeight: 'bold',
                            paddingLeft: '5%',
                            paddingBottom: '5%'
                        }}>Customize your payment method</Text>
                    </View>

                    <Card.Divider />

                    <Card.Title style={{
                        color: 'black',
                        width: '80%',
                        fontSize: 16,
                        textAlign: 'left',
                    }}
                    >Cash/ Card on delivery</Card.Title>

                    <View style={styles.testArea}>
                        <View>
                            <Image style={{ width: 80, height: 50 }} source={require('../assets/visa.png')} />
                        </View>
                        <View style={{ marginRight: '20%' }}>
                            <Image style={{ width: 80, height: 50 }} source={require('../assets/master.jpg')} />
                        </View>
                        <View  >
                            <Button title="Delete" color="#00CBBC" paddingLeft="" onPress={showDeleteDialog} />
                        </View>
                    </View>

                    <Card.Divider />
                    <View style={styles.btnStore}>
                        <Button title="Add Another Credit/ Debit" color="#00CBBC" onPress={() => { toggleModal(true) }} />
                    </View>

                    <View style={{
                        paddingTop: '20%'
                    }}>
                        <View style={styles.btnStore}>
                            <Button title="Confirm" color="#00CBBC" onPress={showConfirmDialog} />
                        </View>
                    </View>
                    <Card.Divider />

                </Card>
                <View style={styles.container}>
                    <Modal animationType={"slide"} transparent={false}
                        visible={visible}
                        onRequestClose={() => { console.log("") }}>

                        <View style={styles.modal}>
                            <Card>
                                <View>
                                    <Text style={{
                                        color: 'black',
                                        width: '100%',
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        paddingBottom: 10
                                    }}>Add you card details</Text>
                                </View>

                                <Card.Divider />

                                <Card.Title style={{
                                    color: 'black',
                                    width: '80%',
                                    fontSize: 16,
                                    textAlign: 'left',
                                }}
                                >Add Credit/Debit Card</Card.Title>

                                <View style={styles.testAreaD}>

                                    <View style={{ width: '100%', paddingHorizontal: '5%' }}>
                                        <TextInput style={styles.input1} placeholder={'Card Number'} />
                                    </View>

                                </View>

                                <View style={styles.testArea1}>
                                    <Text style={{ paddingHorizontal: '10%', marginHorizontal: '30%', paddingVertical: 5, fontWeight: 'bold' }}>Expires</Text>
                                    <TextInput style={styles.input2} placeholder={'MM'} />
                                    <TextInput style={styles.input2} placeholder={'YY'} />
                                </View>
                                <View style={styles.testAreaD}>

                                    <View style={{ width: '100%', paddingHorizontal: '5%' }}>
                                        <TextInput style={styles.input1} placeholder={'Security Code (3 digits on back)'} />
                                    </View>

                                </View>
                                <View style={styles.testAreaD}>

                                    <View style={{ width: '100%', paddingHorizontal: '5%' }}>
                                        <TextInput style={styles.input1} placeholder={'First Name'} />
                                    </View>

                                </View>
                                <View style={styles.testAreaD}>

                                    <View style={{ width: '100%', paddingHorizontal: '5%' }}>
                                        <TextInput style={styles.input1} placeholder={'Last Name'} />
                                    </View>

                                </View>
                                <View style={styles.testAreaD}>
                                    <Text style={{ color: '#808080' }}>You can remove this card at any time.</Text>
                                    <CheckBox value={isSelected}
                                        onValueChange={setSelection} />

                                </View>

                                <View style={{ marginLeft: '50%', paddingBottom: '10%', paddingTop: '5%', flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Button title="Cancel" color="#00CBBC" paddingLeft="" onPress={() => {
                                        toggleModal(false)
                                    }} />
                                    <Button title="Submit" color="#00CBBC" paddingLeft="" onPress={() => {
                                        showSubmitDialog(), toggleModal(false)
                                    }} />
                                </View>
                            </Card>
                        </View>
                    </Modal>
                </View>
            </View>
            <View>
                <View style={{ flex: 1 }}>
                    <NativeModal isVisible={isModalVisible} animationIn="slideInUp">
                        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', textAlign: 'center' }}>
                            <Image style={{ width: 200, height: 200, marginTop: 50 }} source={require('../assets/payment.png')} />
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 30, marginBottom: 30 }}>Thank you for your payment!</Text>
                            <Text style={{ marginLeft: 10, marginRight: 10, textAlign: 'center', marginBottom: 30 }}>Your order is now being processed. We will let you know once the order is picked from the outlet. Check the status of your order.</Text>

                            <Button title="Track My Order" color="#00CBBC" />
                            <Text style={{ marginTop: 20}} onPress={toggleFinishModal} >Back to Home</Text>
                        </View>
                    </NativeModal>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: '10%'
    },
    testArea: {
        paddingBottom: '10%',
        width: '95%',
        flexDirection: 'row',
        paddingTop: '5%',
        justifyContent: 'space-between',
    },
    testAreaD: {
        paddingBottom: '5%',
        width: '95%',
        flexDirection: 'row',
        paddingTop: '5%',
        justifyContent: 'space-between',
    },
    testArea1: {
        paddingBottom: '2%',
        width: '95%',
        paddingHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnStore: {
        marginTop: '1%',
        marginBottom: '2%'
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFF8DC',
        borderRadius: 20,
        borderColor: '#00CBBC',
        borderWidth: 1,
        width: '70%'
    },
    input1: {
        paddingVertical: 7,
        paddingHorizontal: 15,
        backgroundColor: '#FFF8DC',
        borderRadius: 60,
        borderColor: '#00CBBC',
        borderWidth: 1,
        width: '100%',
    },

    input2: {
        backgroundColor: '#FFF8DC',
        borderRadius: 60,
        borderColor: '#00CBBC',
        borderWidth: 1,
        paddingHorizontal: '10%',
        marginHorizontal: '35%',
        paddingVertical: 5
    },
    input: {
        width: "90%",
        marginTop: "3%",
        backgroundColor: "white",
        borderColor: "white"
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#ede3f2',

    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8DC',
        padding: 20
    },
    text: {
        color: '#3f2949',
        marginTop: 10
    }
});

export default PaymentPage;
