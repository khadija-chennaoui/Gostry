import { Container } from 'native-base';
import React, { useState } from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);

  return (
    <View style={styles.container}>
      <ScrollView style={{padding: 5}}>
        <Image
          source={{
            uri: item.image
              ? item.image
              : 'https://www.ikea.com/us/en/images/products/ingolf-chair-birch__0712002_PE729202_S5.JPG?f=s',
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.shadow}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
            <Text>seller: {item.vendor}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>Add</Text>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    flex: 1,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#F5F1F2',
  },
  shadow: {
    flex: 1,
    padding: 1,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 2,
    borderColor: '#C4A2AD',
    shadowColor: '#604859',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // ajout de cette propriété
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#604859',
  },
  price: {
    fontSize: 22,
    marginBottom: 8,
    color: '#C4A2AD',
  },
  description: {
    color: '#604859',
    fontSize: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 10,
    marginBottom: 10,
  },
});

export default SingleProduct;