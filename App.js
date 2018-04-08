import { StackNavigator } from 'react-navigation';
import Home from './src/Home';
import Images from './src/Images';

const App = StackNavigator({
  Home: { screen: Home },
  Images: { screen: Images }
  // TODO: Включите новую компоненту в стэк
});

export default App;
