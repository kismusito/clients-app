import { Navigate } from "react-router-dom";

import { getToken } from "src/modules/auth/selectors";
import { useAppSelector } from "src/store";

type Props = {
  element: JSX.Element;
};

export const PrivateRoute = ({ element }: Props): JSX.Element => {
  const token = useAppSelector(getToken);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};
