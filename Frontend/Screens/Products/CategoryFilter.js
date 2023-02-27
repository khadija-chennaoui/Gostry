import {Badge, Box} from 'native-base';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CategoryFilter = props => {
  return (
    <ScrollView
      horizontal={true}
      bounces={true}
      style={{backgroundColor: '#f2f2f2'}}>
      <Box
        style={{margin: 0, padding: 0, borderRadius: 0, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            props.categoryFilter('All'), props.setActiveCategory(-1);
          }}>
          <Badge
            style={[
              styles.center,
              {margin: 5},
              props.active === -1
                ? {backgroundColor: '#03bafc'}
                : {backgroundColor: '#a0e1eb'},
            ]}>
            <Text style={{color: 'white'}}>All</Text>
          </Badge>
        </TouchableOpacity>
        {props.categories.map(item => {
          return (
            <TouchableOpacity
              key={item._id.$oid}
              onPress={() => {
                props.categoryFilter(item._id.$oid),
                  props.setActiveCategory(props.categories.indexOf(item));
              }}>
              <Badge style={[styles.center, {margin: 5},
                props.active === props.categories.indexOf(item) ? {backgroundColor: '#03bafc'} : {backgroundColor: '#a0e1eb'},
            ]}>
                <Text style={{color: 'white'}}>{item.name}</Text>
              </Badge>
            </TouchableOpacity> 
          );
        })}
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryFilter;
