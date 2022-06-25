import * as React from 'react';
import RootNavigator from './navigations/RootNavigator';

// Import Redux
import store from './redux/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator/>
    </Provider>
  );
}

export default App;

