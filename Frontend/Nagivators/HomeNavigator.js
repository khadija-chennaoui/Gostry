import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductContainer from '../Screens/Products/ProductContainer';
import SingleProduct from '../Screens/Products/SingleProduct';

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
      <Stack.Screen name="Product Detail" component={SingleProduct} options={{
        headerShown: false
      }} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
