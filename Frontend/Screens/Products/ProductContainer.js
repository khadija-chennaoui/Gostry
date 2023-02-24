import { Container, Input, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';


const ProductContainer = () => {
  return (
    <Container> 
      {/* // This is the search bar not finished yet      */}
      <VStack w="100%" space={2} >
        <Icon name="search1" size={20} color="#000" />
        <Input
          placeholder="Search"
          borderRadius="5"
          py="3"
          px="1"
          fontSize="14"
        />
      </VStack>
      {/* // Banner, Categories will go here and the products  */}
    </Container>
  );
};

export default ProductContainer;
