import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native'
import ClosestStoreList from './ClosestStoreList';
import OtherStoreList from './OtherStoresList';
import FavouriteStoreCard from './FavouriteStoreCard';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
    <FavouriteStoreCard />
);

const SecondRoute = () => (
    <ClosestStoreList />
);

const ThirddRoute = () => (
    <OtherStoreList />
);

const PlaceOrderPage = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Place Order' },
        { key: 'second', title: 'Close Stores' },
        { key: 'third', title: 'Other Stores' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirddRoute
    });

    return (
        <SafeAreaView style={styles.safeArea}>
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