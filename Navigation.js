import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

//Paginas
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PerfilUsuario from './pages/PerfilUsuario';
import Categorias from './pages/Categorias';
import Creadores from './pages/Creadores';
import Carrito from './pages/Carrito';

//Iconos 
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();
function MyTabs() {
    return(
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {backgroundColor: '#E3298F',
                            height: 100,
                            paddingTop:10
                },
                tabBarActiveTintColor: "#634455",
                tabBarInactiveTintColor: "#FFFFF3",
                tabBarLabelStyle: ({color: "#FFFFF3"}),
                
            }}
        >

            <Tab.Screen 
                name="Home" 
                component={Home}
                options={{
                    tabBarLabel:"Home",
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="home" size={24} color={color} />
                    )
                }}
                />

                
            <Tab.Screen 
                name="Categorias" 
                component={Categorias}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="category" size={24} color={color} />
                    )
                }}
                />

            <Tab.Screen 
                name="Creadores" 
                component={Creadores}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome name="paint-brush" size={24} color={color} />
                    )
                }}
                />

            <Tab.Screen 
                name="Perfil" 
                component={PerfilUsuario}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account" size={24} color={color} />
                    )
                }}
                />
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();
function MyStack() {
    return(
        <Stack.Navigator
            initialRouteName="Login"
        >
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                    gestureEnabled: false 
                }}

            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false      
                }}
            />
            <Stack.Screen
                name="HomeTab"
                component={MyTabs}
                options={{
                    headerShown: false, 
                    gestureEnabled: false     
                }}
            />
            <Stack.Screen
                name="Carrito"
                component={Carrito}
                options={{
                    headerShown: false
                    
                }}
            />

        </Stack.Navigator>
    )
}


export default function Navigation() {
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    );
}
