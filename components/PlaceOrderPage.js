import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native'
import ClosestStoreList from './ClosestStoreList';
import OtherStoreList from './OtherStoresList';
import OrderForm from './OrderForm';
import { TabView, SceneMap } from 'react-native-tab-view';
import NavHeader from './NavHeader';

const FirstRoute = ({user}) => (
    <OrderForm  user={user}/>
);

const SecondRoute = () => (
    <ClosestStoreList />
);

const ThirddRoute = () => (
    <OtherStoreList />
);

const PlaceOrderPage = ({ navigation, user }) => {
    const layout = useWindowDimensions();
    console.log("testetsts--" + user.medicalId)
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Place Order' },
        { key: 'second', title: 'Close Stores' },
        { key: 'third', title: 'Other Stores' },
    ]);

    const renderScene = SceneMap({
        first: () => <FirstRoute user={user} />,
        second: SecondRoute,
        third: ThirddRoute
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <NavHeader {...navigation}/>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
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

export default PlaceOrderPage;