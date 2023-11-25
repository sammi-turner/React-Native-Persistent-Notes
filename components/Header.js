import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const Header = ({ isDarkMode, setIsDarkMode }) => (
  <View style={styles.header}>
    <Text style={isDarkMode ? styles.headerTextDark : styles.headerText}>Persistent Notes</Text>
    <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#484b6a',
  },
  headerTextDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e4e5f1',
  },
});

export default Header;
