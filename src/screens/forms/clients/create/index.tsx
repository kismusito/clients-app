import { SaveOutlined } from "@ant-design/icons";
import { Button, Form, Typography } from "antd";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createClientValidator } from "./validation";
import { useAppDispatch } from "src/store";
import { createClient } from "src/modules/clients/actions";
import { TextInput } from "src/screens/styled/inputs/text/text-input";

type DataFields = {
  name: string;
  email: string;
  document: string;
  bankAccount: string;
};

export const CreateClientForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DataFields>({
    resolver: yupResolver(createClientValidator),
  });
  const { Title, Text } = Typography;

  const handleSubmitForm = handleSubmit((data) => {
    dispatch(createClient(data));
  });

  return (
    <Fragment>
      <Title level={3}>Create client</Title>
      <form onSubmit={handleSubmitForm}>
        <Form.Item>
          <TextInput placeholder="Name" type="text" {...register("name")} />
          <Text type="danger">{errors.name?.message}</Text>
        </Form.Item>
        <Form.Item>
          <TextInput placeholder="Email" type="email" {...register("email")} />
          <Text type="danger">{errors.email?.message}</Text>
        </Form.Item>
        <Form.Item>
          <TextInput
            type="text"
            placeholder="Document"
            {...register("document")}
          />
          <Text type="danger">{errors.document?.message}</Text>
        </Form.Item>
        <Form.Item>
          <TextInput
            type="text"
            placeholder="Bank account"
            {...register("bankAccount")}
          />
          <Text type="danger">{errors.bankAccount?.message}</Text>
        </Form.Item>
        <Button
          size="large"
          htmlType="submit"
          type="primary"
          block
          icon={<SaveOutlined />}
        >
          Create
        </Button>
      </form>
    </Fragment>
  );
};
