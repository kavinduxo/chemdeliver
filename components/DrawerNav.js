import * as React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import OtherStoreList from './OtherStoresList';
import PlaceOrderPage from './PlaceOrderPage';
import History from './History';

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

function MyDrawer({userId, signout}) {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={PlaceOrderPage} />
            <Drawer.Screen name="Prescriptions" component={OtherStoreList} />
            <Drawer.Screen name="History">{props => <History {...props} userId={userId} />}</Drawer.Screen>
            <Drawer.Screen name="Sign Out" component={() => {return signout()}} />
        </Drawer.Navigator>
    );
}


export default function DrawerNav({userId, signout}) {
    return (
        <MyDrawer userId={userId} signout={signout}/>
    );
}

