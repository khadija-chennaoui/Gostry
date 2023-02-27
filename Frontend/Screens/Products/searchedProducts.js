import { Avatar, Box, ScrollView, Text } from 'native-base';
import React from 'react';
import { View, StyleSheet, Dimensions} from 'react-native'

const { width } = Dimensions.get("window")

const SearchedProduct = (props) => {
    const { filteredProducts } = props;
    return(
        <ScrollView style={{ width: width }}>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                    <Box
                        flexDirection="row"
                        key={item._id.$oid}
                        style={{marginBottom: 1, padding: 5, borderRadius: 0, backgroundColor: 'gainsboro'}}
                    >
                        <View style={{marginRight:5}}>
                            <Avatar 
                                source={{uri: item.image ? 
                                    item.image : 'https://www.transparentpng.com/thumb/food/9iZtc8-download-hamburger-food-png.jpg'
                                        }}
                            />
                        </View>
                        <Box>
                            <Text>{item.name}</Text>
                            <Text style={{fontWeight: 300}}>{item.description}</Text>
                        </Box>
                    </Box>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf:  'center' }}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    }
})

export default SearchedProduct;
