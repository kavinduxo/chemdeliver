import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Card, Button, Icon, SafeAreaView, FlatList } from 'react-native-elements'

function PrescriptionInformation({route, user}) {

let drugLst = eval(route.params.prescription.item.drugs);
console.log(drugLst)
const drugList = () => {
    return drugLst.map((drug) => {
        return (
            <Card>
                <View style={{
                    justifyContent: "space-between",
                    width:250
                    }}>
                <Text style={{
                alignContent: 'center',
                color:"#153E73",
                fontWeight: "bold",
                textAlign: "left"
            }}>
               Name: {drug.name}
            </Text> 

                <Text style={{
                marginBottom: 5,
                alignContent: 'center',
                color:"#153E73",
                fontWeight: "bold",
                textAlign: "left"
            }}>
                Quantity: {drug.qty}
                </Text> 

                <Text style={{
                marginBottom: 5,
                alignContent: 'center',
                color:"#153E73",
                fontWeight: "bold",
                textAlign: "left"
            }}>
                Price: $20


                </Text> 
                <Text style={{
                marginBottom: 5,
                alignContent: 'center',
                color:"#153E73",
                fontWeight: "bold",
                textAlign: "left"
            }}>
                {drug.repeats}
                </Text> 
                </View>
            </Card>
        );
    });
};
return(
    <View style={{alignSelf:'center', paddingTop: 100}}>
    <View>{drugList()}</View>
    <View style={{alignSelf:'center', paddingTop: 20}}/>
    <Button
            buttonStyle={{
                    width:280, 
                    borderRadius: 20, 
                    marginLeft: 0, 
                    marginRight: 0, 
                    marginBottom: 0, 
                    backgroundColor:'#C65D5D',
                    alignSelf: 'center'
            }}
               title='Place Order' 
               onPress={() => Alert.alert('Ordered !')}
                />
    </View>
    )
}



export default PrescriptionInformation;