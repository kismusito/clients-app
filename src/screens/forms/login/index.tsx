import { Button, Form, Typography } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { login } from "src/modules/auth/actions";
import { getToken, isLoginError } from "src/modules/auth/selectors";
import { TextInput } from "src/screens/styled/inputs/text/text-input";
import { LoginFormComponent } from "src/screens/styled/login/login-form";
import { useAppDispatch, useAppSelector } from "src/store";

type FormData = {
  email: string;
  password: string;
};

export const LoginForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(getToken);
  const loginError = useAppSelector(isLoginError);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();
  const { Text, Title } = Typography;

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleFormSubmit = handleSubmit((data) => {
    dispatch(login(data));
  });

  return (
    <LoginFormComponent onSubmit={handleFormSubmit}>
      <Form.Item>
        <Title level={2} style={{ marginBottom: 10 }}>
          Welcome back
        </Title>
        <Text>Welcome back! Please enter your details.</Text>
      </Form.Item>
      <Form.Item>
        <Text>Email</Text>
        <TextInput type="email" {...register("email")} />
        <Text type="danger">{errors.email?.message}</Text>
      </Form.Item>
      <Form.Item>
        <Text>Password</Text>
        <TextInput type="password" {...register("password")} />
        <Text type="danger">{errors.password?.message}</Text>

        {loginError && <Text type="danger">{loginError}</Text>}
      </Form.Item>

      <Button htmlType="submit" size="large" block type="primary">
        Sign in
      </Button>
    </LoginFormComponent>
  );
};
