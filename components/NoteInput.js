import React from 'react';
import { TextInput, Button, StyleSheet } from 'react-native';

const NoteInput = ({ text, setText, addNote, setEditingNote, isDarkMode }) => {
  const handleButtonPress = () => {
    addNote();
    setEditingNote(null);
  };

  return (
    <>
      <TextInput
        style={isDarkMode ? styles.inputDark : styles.input}
        onChangeText={setText}
        value={text}
      />
      <Button
        onPress={handleButtonPress}
        title="ADD"
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e4e5f1',
    color: '#484b6a',
    marginVertical: 10,
  },
  inputDark: {
    height: 60,
    borderWidth: 1,
    borderColor: '#e4e5f1',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#484b6a',
    color: '#e4e5f1',
    marginVertical: 10,
  },
});

export default NoteInput;
