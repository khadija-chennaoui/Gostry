import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductContainer from '../Screens/Products/ProductContainer';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={ProductContainer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
