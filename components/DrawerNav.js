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
import PrescriptionList from './PrescriptionList';
import PrescriptionInformation from './PrescriptionInformation';

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

function MyDrawer({user, signout}) {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={PlaceOrderPage} />
            <Drawer.Screen name="Prescriptions">{props => <PrescriptionList {...props} user={user} />}</Drawer.Screen>
            <Drawer.Screen name="Stores" component={OtherStoreList} />
            <Drawer.Screen name="History">{props => <History {...props} user={user} />}</Drawer.Screen>
            <Drawer.Screen name="Sign Out" component={() => {return signout()}} />
            <Drawer.Screen name="Prescription Information" options={{drawerLabel:() => null, title: null, drawerIcon:() => null}}>
                {props => <PrescriptionInformation {...props} userId={userId} />}</Drawer.Screen>
        </Drawer.Navigator>
    );
}


export default function DrawerNav({user, signout}) {
    return (
        <MyDrawer user={user} signout={signout}/>
    );
}

