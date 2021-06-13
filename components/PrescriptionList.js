import React, { useEffect, useState } from 'react';
import PrescriptionCard from './PrescriptionCard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrescriptionInformation from './PrescriptionInformation';
import { SafeAreaView, FlatList, Text, View} from 'react-native'; 
import {getList} from '../services/PrescriptionService'
import { Spinner } from 'native-base';


const Stack = createStackNavigator();

function PrescriptionRoute() {

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

  const [data, setData] = useState([]);
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    async function getData(){
      const data = await getList('222771');
      setData(data)
      console.log(data)
      setLoader(false)  
    }
    getData();
  }, []);
 

 console.log(data);

 return (
          <SafeAreaView>
          {isLoading ? 
            <Spinner/>
                :(
                    <>
                    {data.length === 0 ? 
                    
                      <View >
                        <Text style={{
                          fontSize: 20,
                          paddingTop: 200,
                          textAlign: 'center',
                          fontWeight: 'bold'
                          }}>No Prescription Available</Text>
                      </View>
                  :
                  <FlatList
                  data={data}
                  keyExtractor={item => item.script_id.toString()}
                  renderItem={(item) => (
                < PrescriptionCard navigation={navigation} prescription={item}/>
              )}
              />
                  } 
              </>
            )}
          </SafeAreaView>
        )
}

export default PrescriptionList;