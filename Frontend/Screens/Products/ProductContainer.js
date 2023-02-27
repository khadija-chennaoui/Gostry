import {
  Box,
  Center,
  Container,
  Divider,
  Input,
  Text,
  VStack,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import Banner from '../../Shared/Banner';
import {StyleSheet} from 'react-native';
import CategoryFilter from './CategoryFilter';

import data from '../../Assets/data/products.json';
import categories from '../../Assets/data/categories.json';
import ProductList from './ProductList';
import SearchedProduct from './searchedProducts';

const {height, width} = Dimensions.get('window');

const ProductContainer = props => {
  const [products, setProducts] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState();
  const [focus, setFocus] = useState();

  useEffect(() => {
    setProducts(data);
    setProductsCategory(data);
    setCategory(categories);
    setFilteredProducts(data);
    setFocus(false);
    setActiveCategory(-1);
  }, []);

  // product search
  const searchProduct = text => {
    setFilteredProducts(
      products.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  }

  // Category Methods
  const changeCategoryFilter = category => {
    category === 'All'
      ? [setProductsCategory(data), setActiveCategory(true)]
      : [
          setProductsCategory(
            data.filter(item => item.category.$oid === category),
          ),
          setActiveCategory(true),
        ];
  };

  return (
    <View>
      {/* // This is the search bar not finished yet      */}
      <Center>
        <VStack
          mx="1"
          space={5}
          w="100%"
          maxW="100%"
          divider={
            <Box px="2">
              <Divider />
            </Box>
          }>
          <VStack w="100%" space={5} alignSelf="center">
            <Input
              onFocus={openList}
              onChangeText={text => searchProduct(text)}
              placeholder="Search "
              width="100%"
              borderRadius="4"
              py="3"
              px="1"
              fontSize="14"
              InputLeftElement={
                <Icon name="search1" style={{marginLeft: 10}} size={20} />
              }
              InputRightElement={
                focus == true ? (<Icon name="close" onPress={onBlur} style={{marginRight: 10, fontSize: 15}} />) : null
              }
            />
          </VStack>
        </VStack>
      </Center>
      {/* // Banner, Categories will go here and the products  */}
      {focus == true ? (
       <SearchedProduct filteredProducts={filteredProducts} />
      ) : (
        <ScrollView>
          <View>
            <View>
              <Banner />
            </View>
            <View>
              <CategoryFilter
                categories={category}
                categoryFilter={changeCategoryFilter}
                productsCategory={productsCategory}
                active={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </View>
            {productsCategory.length > 0 ? (
              <View style={styles.listContainer}>
                {productsCategory.map(item => {
                  return (
                    <ProductList
                      navigation={props.navigation}
                      key={item._id.$oid}
                      item={item}
                    />
                  );
                })}
              </View>
            ) : (
              <View style={[styles.center, {height: height / 2}]}>
                <Text>No products found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: height + height / 2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductContainer;
