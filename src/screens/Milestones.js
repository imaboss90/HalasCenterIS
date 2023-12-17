import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const Milestones = () => {
  const [firstTime, setFirstTime] = useState(true);
  const [totalGoal, setTotalGoal] = useState(0);
  const [numNodes, setNumNodes] = useState(0);
  const [milestoneValue, setMilestoneValue] = useState(0);


  const [fontsLoaded] = useFonts({
    'Hermeneus One': require('../../assets/fonts/HermeneusOne-Regular.ttf'),
    'Roboto': require('../../assets/fonts/Roboto-Regular.ttf'), 
  });
  
  if(!fontsLoaded) {
    return null; 
  }
  
  const handleSubmit = () => {
    setMilestoneValue(totalGoal / numNodes);
    setFirstTime(false);
  };



  return (
    <View style={firstTime ? styles.initialContainer : styles.scrollContainer}>
      {firstTime ? (
        <View style={styles.inputContainer}>
          <Text>Set Your Milestone Goals</Text>
          <TextInput
            style={styles.input}
            placeholder="Total Goal (e.g., 10 pounds)"
            keyboardType="numeric"
            onChangeText={(text) => setTotalGoal(parseFloat(text))}
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Nodes (e.g., 5)"
            keyboardType="numeric"
            onChangeText={(text) => setNumNodes(parseInt(text, 10))}
          />
          <Button title="Set Milestones" onPress={handleSubmit} />
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.title}>Starting Point</Text>
            {Array.from({ length: numNodes }).map((_, index) => (
              <View key={index} style={styles.nodeContainer}>
                <View style={styles.circle} />
                <Text style={styles.label}>{((index + 1) * milestoneValue).toFixed(2)}</Text>
              </View>
            ))}
            <Text style={styles.title}>🏁 End Goal: {totalGoal}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  initialContainer: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    marginTop: 100,
    
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: 25,
    color: '#FFFFFF',
  },
  title: {
    fontFamily: 'Hermeneus One',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 20,
    marginTop: 50,
  },
  nodeContainer: {
    flexDirection: 'row', alignItems: 'center'
  },
  scrollView: {
    backgroundColor: '#582931',
  },
  circle: {
    width: 80, 
    height: 80, 
    backgroundColor: 'white', 
    borderRadius: 50, 
    margin: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#582931',
  },
  // ... other styles
});

export default Milestones;
