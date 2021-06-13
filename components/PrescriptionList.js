import React, { useEffect, useState } from 'react';
import PrescriptionCard from './PrescriptionCard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrescriptionInformation from './PrescriptionInformation';
import { SafeAreaView, FlatList} from 'react-native'; 
import axios from 'axios';

const Stack = createStackNavigator();

function PrescriptionRoute() {

  getPrescriptionList();

  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  // console.log(data);

  // useEffect(() => {
  //   fetch('ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6500/getAllRecords/2227715',
  //   {method: 'GET',
  //   headers: {'Authorization' : 'Bearer c60812f728a3356b4ee2b69b5bf4f14d' }})
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

    return(
          <NavigationContainer>
                <Stack.Navigator initialRouteName="Prescription">
                    <Stack.Screen name="Prescription">
                        {props => <PrescriptionList {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="Prescription Card">
                        {props => <PrescriptionCard {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="Prescription Information">
                        {props => <PrescriptionInformation {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
           </NavigationContainer>
        )
}

function PrescriptionList({navigation, user}){
 console.log(user.medicalId)
 return (
          <SafeAreaView>
            <FlatList
              data={DATA}
              keyExtractor={item => item.script_id.toString()}
              renderItem={(item) => (
                <PrescriptionCard navigation={navigation} prescription={item}/>
              )}
            />
          </SafeAreaView>
        )
}

const getPrescriptionList = async () => {
  try {
    const response = await axios.get(
      'http://ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6500/getAllRecords/2227715',
      {
        headers: {
          Authorization: 'Bearer c60812f728a3356b4ee2b69b5bf4f14d'
        }
      }
    );
    alert(JSON.stringify(response.data));
  } catch (error) {
    alert(error.message);
  }
};

const DATA = [
  {
    "script_id": 142763,
    "patient_id": 2227715,
    "doctor_id": 5695627,
    "date": "2021/04/15",
    "description": "Right shoulder muscle pain",
    "drugs": "[{\"name\":\"Naproxen 750mg\",\"type\":\"modified release\",\"qty\": \"28\",\"dir\": \"1 daily\", \"repeats\":\"3 repeats\"}]",
    "PBS": 0,
    "RPBS": 0,
    "BSNP": 1
  },
  {
    "script_id": 142981,
    "patient_id": 2227715,
    "doctor_id": 5695627,
    "date": "2021/04/25",
    "description": "Right shoulder muscle pain continuing",
    "drugs": "[{\"name\": \"Naproxen 750mg\",\"type\": \"modified release\",\"qty\": \"28\",\"dir\": \"1 daily\", \"repeats\":\"3 repeats\"}, {\"name\": \"Voltaren\",\"type\": \"Rapid\",\"qty\": \"3\",\"dir\": \"1 daily\", \"repeats\":\"3 repeats\"}]",
    "PBS": 0,
    "RPBS": 0,
    "BSNP": 1
  },
  {
    "script_id": 158788,
    "patient_id": 2227715,
    "doctor_id": 5695627,
    "date": "2021/06/4",
    "description": "Unfit",
    "drugs": "[{'name':'Naproxen 750mg','type':'modified release','qty': '28','dir': '1 daily', 'repeats':'3 repeats'}]",
    "PBS": 0,
    "RPBS": 0,
    "BSNP": 1
  }
];

export default PrescriptionList;