import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native'
import ClosestStoreList from './ClosestStoreList';
import OtherStoreList from './OtherStoresList';
import OrderForm from './OrderForm';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import NavHeader from './NavHeader';

const FirstRoute = ({ user }) => (
    <OrderForm user={user} />
);

const SecondRoute = ({ user }) => (
    <ClosestStoreList user={user} />
);

const ThirddRoute = ({ user }) => (
    <OtherStoreList user={user} />
);

const PlaceOrderPage = ({ navigation, user }) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Place Order' },
        { key: 'second', title: 'Close Stores' },
        { key: 'third', title: 'Other Stores' },
    ]);

    const renderScene = SceneMap({
        first: () => <FirstRoute user={user} />,
        second: () => <SecondRoute user={user} />,
        third: () => <ThirddRoute user={user} />,
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <NavHeader {...navigation} title={"Place Order"}/>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        renderLabel={({ route, color }) => (
                            <Text style={{ color: 'white', margin: 8, fontWeight: 'bold' }}>
                                {route.title}
                            </Text>
                        )}
                        style={{ backgroundColor: '#00CBBC' }}
                    />
                )}
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