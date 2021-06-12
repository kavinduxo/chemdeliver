import * as React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Button, SafeAreaView } from 'react-native';
import OtherStoreList from './OtherStoresList';
import PlaceOrderPage from './PlaceOrderPage';

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Close drawer"
                onPress={() => props.navigation.closeDrawer()}
            />
            <DrawerItem
                label="Toggle drawer"
                onPress={() => props.navigation.toggleDrawer()}
            />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={PlaceOrderPage} />
            <Drawer.Screen name="Other Stores" component={OtherStoreList} />
        </Drawer.Navigator>
    );
}

const styles = {
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    }
}

export default function DrawerNav() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <NavigationContainer>
                <MyDrawer />
            </NavigationContainer>
        </SafeAreaView>
    );
}

