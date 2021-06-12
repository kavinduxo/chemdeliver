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
import History from './History';
import Login from './Login';

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Close drawer"
                onPress={() => props.navigation.toggleDrawer()}
            />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer({userId}) {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={PlaceOrderPage} />
            <Drawer.Screen name="Prescriptions" component={OtherStoreList} />
            <Drawer.Screen name="History">{props => <History {...props} userId={userId} />}</Drawer.Screen>
            <Drawer.Screen name="Sign Out" component={Login} />
        </Drawer.Navigator>
    );
}


export default function DrawerNav({userId}) {
    return (
        <MyDrawer userId={userId}/>
    );
}

