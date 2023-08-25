import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import icons for tabs

import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';

import { IconButton, Provider as PaperProvider } from 'react-native-paper'; // Removed unused 'useTheme' import
import { GlobalStyles } from './constants/styles';

import IconButton2 from './components/UI/IconButton2';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.accent_green,
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.accent_green,
          padding: 5, // Add padding to the bottom tab bar
        },
        tabBarActiveTintColor: GlobalStyles.colors.dark_green,
        tabBarInactiveTintColor: GlobalStyles.colors.another_green,
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'RecentExpenses') {
            iconName = focused ? 'ios-list' : 'ios-list';
          } else if (route.name === 'AllExpenses') {
            iconName = focused ? 'ios-albums' : 'ios-albums-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          tabBarLabel: 'Recent Expenses',
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          tabBarLabel: 'All Expenses',
          headerShown: false,
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="dark" />
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation, route }) => ({
            headerStyle: {
              backgroundColor: GlobalStyles.colors.accent_green,
              padding: 10, // Add padding to the top header
            },
            headerRight: () => {
              if (route.name === 'ExpensesOverview') {
                return (
                  <IconButton2
                    icon="add"
                    size={24}
                    color={GlobalStyles.colors.dark_green}
                    onPress={() => {
                      navigation.navigate('ManageExpenses');
                    }}
                  />
                );
              }
              return null; // Return null for other screens
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{
              headerTitle: 'Expense Overview',
              headerTintColor: GlobalStyles.colors.dark_green,
            }}
          />
          <Stack.Screen
            name="ManageExpenses"
            component={ManageExpenses}
            options={{
              headerTintColor: GlobalStyles.colors.dark_green,
              presentation: 'modal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </PaperProvider>
  );
}
