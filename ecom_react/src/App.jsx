import React from "react";
// import First from "./First";
// import { Start, Test } from "./Test";
import MyRoute from "./MyRoute";
// import { legacy_createStore } from "redux"; //It is used to know compiler that there is our data stored
import { Provider } from "react-redux"; //It is used to provide to every component
// import cartReducer from "./Redux/Reducer/cartReducer";
import store from "./Store";
import("./App.css");

const App = () => {
  // const store = legacy_createStore(cartReducer);
  return (
    <Provider store={store}>
      <MyRoute />
    </Provider>
  );
};

export default App;
