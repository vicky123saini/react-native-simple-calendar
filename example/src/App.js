import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-simple-calendar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Calendar onChange={(date)=> this.setState({date})} MinYY={1922} MaxYY={2022}/>
        {
            this.state.date &&
            <Text>{this.state.date.DD}-{this.state.date.MMM}-{this.state.date.YYYY}</Text>
          }
      </View>
    );
  }
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
  
});
