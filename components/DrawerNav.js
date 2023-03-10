import * as React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import OtherStoreList from './OtherStoresList';
import PlaceOrder from './PlaceOrder';
import History from './History';
import PrescriptionList from './PrescriptionList';
import PrescriptionInformation from './PrescriptionInformation';
import HomePage from './HomePage';
import Profile from './Profile';

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer({ user, signout }) {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home">{props => <HomePage {...props} user={user} />}</Drawer.Screen>
            <Drawer.Screen name="Place Order">{props => <PlaceOrder {...props} user={user} />}</Drawer.Screen>
            <Drawer.Screen name="Prescriptions">{props => <PrescriptionList {...props} user={user} />}</Drawer.Screen>
            <Drawer.Screen name="History">{props => <History {...props} user={user} />}</Drawer.Screen>
            {/* <Drawer.Screen name="Sign Out" component={() => {return signout()}} /> */}
            <Drawer.Screen name="Prescription Information" options={{ drawerLabel: () => null, title: null, drawerIcon: () => null }}>
                {props => <PrescriptionInformation {...props} user={user} />}</Drawer.Screen>
            <Drawer.Screen name="Profile">{props => <Profile {...props} user={user} signout={signout} />}</Drawer.Screen>
        </Drawer.Navigator>
    );
}


export default function DrawerNav({ user, signout }) {
    return (
        <MyDrawer user={user} signout={signout} />
    );
}

