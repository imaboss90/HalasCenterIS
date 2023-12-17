import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity } from 'react-native'; 
import Animated from 'react-native-reanimated'; 

const AnimatedCylinder = Animated.createAnimatedComponent(View);

const TestAnimations = () => {
  const [numCylinders, setNumCylinders] = useState('5'); // Store as string
  const cylinders = [];

  for (let i = 0; i < parseInt(numCylinders, 10); i++) {
    const progress = new Animated.Value(0);

    const cylinderStyle = {
      height: 100,
      width: 50,
      borderRadius: 25,
      backgroundColor: 'grey',
      margin: 10,
    };

    cylinders.push(
      <TouchableOpacity key={i} onPress={() => progress.setValue(1)}>
        <AnimatedCylinder
          style={[
            cylinderStyle,
            {
              backgroundColor: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['grey', 'green']
              })
            }
          ]}
        />
      </TouchableOpacity>
    );
  }

  // ... rest of your component
};

export default TestAnimations;
