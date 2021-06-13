import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import {getDoctor} from '../services/PrescriptionService'


function PrescriptionCard ({navigation, prescription}) {
    
    console.log(prescription.item.doctor_id);

    const [data, setData] = useState('');
  
    useEffect(() => {
      async function getData(){
        const data = await getDoctor(prescription.item.doctor_id);
        setData(data)
      }
      getData();

    }, []);
   

    const drugList = () => {
        return eval(prescription.item.drugs).map((drug) => {
            return (
                <Text style={{
                    marginBottom: 5,
                    alignContent: 'center',
                    color:"#153E73",
                    fontWeight: "bold", 
                    textAlign: "left"
                }}>Name: {drug.name} - {drug.qty}</Text>
            );
        });
    };

    return (
        <Card>
        <Card.Title style={{color:'#66667E', width: 300}}>Script ID: {prescription.item.script_id}</Card.Title>
        <Card.Divider/>
        <Text style={{
            marginBottom: 5,
            alignContent: 'center',
            color:"#153E73",
            fontWeight: "bold",
            textAlign: "center"
        }}>
            {prescription.item.date}, Dr Shane
            </Text>  
            <Text style={{
            alignContent: 'center',
            color:"#153E73",
            fontWeight: "bold",
            textAlign: "center"
        }}>
        </Text>  

        <View>{drugList()}</View>

        <View style={{
            flexDirection: "column",
            height: 70,
            padding: 10,
            justifyContent: "space-around",
            borderRadius: 15,
            width: 280
        }}>
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
            <Text style={{
                marginBottom: 10,
                color:"#153E73",
                fontWeight: "bold",
                }}>
            </Text>        
                <Icon
                    name='trash-outline'
                    type='ionicon'
                    color='#C65D5D'
                /> 
             </View>
        </View>
                <Button
                buttonStyle={{borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:'#C65D5D'}}
                title='Select' 
                onPress={() => {navigation.navigate("Prescription Information",  {prescription : prescription})
                }}
                />
        </Card>
    )
}

export default PrescriptionCard;