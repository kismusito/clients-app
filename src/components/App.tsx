import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { GlobalStyle } from "src/utils/global-style";

import { store } from "../store";
import { PrivateRoute } from "./private-route";

// Views
import { Login } from "src/screens/views/login";
import { Dashboard } from "src/screens/views/dashboard";
import { ControlledModal } from "src/screens/ui/modal";

export const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ControlledModal />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>
      </Router>
    </Provider>
  );
};
