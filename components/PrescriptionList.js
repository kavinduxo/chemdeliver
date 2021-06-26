import React, { useEffect, useState } from 'react';
import PrescriptionCard from './PrescriptionCard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrescriptionInformation from './PrescriptionInformation';
import { SafeAreaView, FlatList, Text, View, ScrollView, StyleSheet } from 'react-native';
import { getList } from '../services/PrescriptionService'
import { Spinner } from 'native-base';
import { Card, Button, Icon } from 'react-native-elements';
import NavHeader from './NavHeader';

const Stack = createStackNavigator();

function PrescriptionRoute() {

  return (
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

function PrescriptionList({ navigation, user }) {

  const [data, setData] = useState([]);
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await getList(user.medicalId);
      setData(data)
      setLoader(false)
    }
    getData();
  }, []);

  // const list = () => {
  //   const l = orderData.map((data, i) => {
  //     return (
  //       < PrescriptionCard key={i} navigation={navigation} prescription={data} />
  //     )
  //   });

  //   return l;
  // }

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading ?
        <Spinner color='#00CBBC' />
        : (
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
              <View style={{ height: "90%" }}>
                <NavHeader title={"Manage Prescription"} />

                <FlatList
                  LisHeaderComponent={
                    <View style={styles.container}>
                      <Button
                        buttonStyle={styles.button}
                        title='Sort By Date'
                      />
                      <Button
                        buttonStyle={styles.button}
                        title='Sort By Price'
                      />
                      <Button
                        buttonStyle={styles.button}
                        title='Sort By Med'
                      />
                    </View>}

                  data={data}
                  keyExtractor={item => item.script_id.toString()}
                  renderItem={(item) => (
                    < PrescriptionCard navigation={navigation} prescription={item} />
                  )}

                  ListFooterComponent={
                    <View>
                      <Button
                        buttonStyle={{
                          width: 320,
                          marginBottom: 20,
                          marginTop: 20,
                          borderRadius: 20,
                          backgroundColor: '#00CBBC',
                          alignSelf: 'center'
                        }}
                        title='Upload a new Prescription'
                        onPress={() => Alert.alert('Ordered !')}
                      />
                    </View>
                  } />
              </View>
            }
          </>
        )
      }
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#00CBBC',
    width: 100
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: '10%'
  }
});
export default PrescriptionList;