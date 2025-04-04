import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types'; // Importamos PropTypes

// Importa las pantallas
import HomeScreen from '../HomeScreen';
import TicketScreen from '../TicketScreen';
import ProfileScreen from '../ProfileScreen';
import AddPublicationScreen from '../AddPublicationScreen';

//componentes
import CustomTabBarIcon from '../../components/CustomTabBarIcon';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ userInfo, onLogout }) => {
  const { given_name, id, picture } = userInfo;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              activeIcon={require('../../../assets/images/publicaciones.png')}
              inactiveIcon={require('../../../assets/images/publicacionesgris.png')}
              label="Home"
            />
          ),
        }}
      >
        {() => (
          <HomeScreen
            route={{
              params: { given_name, picture }  // Pasamos los valores en route.params
            }}
            onLogout={onLogout}  // Pasamos onLogout
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Add"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              activeIcon={require('../../../assets/images/addg.png')}
              inactiveIcon={require('../../../assets/images/addgris.png')}
              label="Agregar"
            />
          ),
        }}
      >
        {() => (
          <AddPublicationScreen
            route={{
              params: { id }  // Pasamos el id correctamente aquí
            }}
          />
        )}
      </Tab.Screen>
      
      <Tab.Screen
        name="Ajustes"
        component={TicketScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              activeIcon={require('../../../assets/images/ajustes.png')}
              inactiveIcon={require('../../../assets/images/ajustesgris.png')}
              label="Ajustes"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        initialParams={{ given_name, id, picture }}  // Pasamos parámetros a la pantalla de Perfil
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              activeIcon={require('../../../assets/images/PerfilGreen.png')}
              inactiveIcon={require('../../../assets/images/PerfilGris.png')}
              label="Perfil"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Validación de las propiedades de TabNavigator
TabNavigator.propTypes = {
  userInfo: PropTypes.shape({
    given_name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#23272A',
    height: 75,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 0,
    paddingTop: 10,
  },
});

export default TabNavigator;

