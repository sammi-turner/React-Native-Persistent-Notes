import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const NoteList = ({ tasks, deleteNote, isDarkMode }) => (
  <FlatList
    data={tasks}
    renderItem={({ item }) => (
      <View style={isDarkMode ? styles.listItemDark : styles.listItem}>
        <Text style={isDarkMode ? styles.itemTextDark : styles.itemText}>{item.value}</Text>
        <Button onPress={() => deleteNote(item.key)} title="x" />
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#d2d3db',
    padding: 15,
    borderRadius: 20,
    marginVertical: 8,
  },
  listItemDark: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#5e6072',
    padding: 15,
    borderRadius: 20,
    marginVertical: 8,
  },
  itemText: {
    fontSize: 20,
    color: '#111',
  },
  itemTextDark: {
    fontSize: 20,
    color: '#fff',
  },
});

export default NoteList;
