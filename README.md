# react-native-simple-calendar

The module have simple calender

## Installation

![image](https://user-images.githubusercontent.com/2674996/160621869-725c8c40-83f9-4a56-bcc4-a4103b701808.png)

```sh
npm install react-native-simple-calendar
```

## Usage

```js
import { Calendar } from 'react-native-simple-calendar';

// ...

<View style={styles.container}>
  <Calendar onChange={(date)=> this.setState({date})} MinYY={1922} MaxYY={2022}/>
  {
      this.state.date &&
      <Text>{this.state.date.DD}-{this.state.date.MMM}-{this.state.date.YYYY}</Text>
    }
</View>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
