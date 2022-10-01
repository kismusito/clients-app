import { SaveOutlined } from "@ant-design/icons";
import { Button, Form, Typography } from "antd";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editClientValidator } from "./validation";
import { useAppDispatch } from "src/store";
import { updateClient } from "src/modules/clients/actions";
import { TextInput } from "src/screens/styled/inputs/text/text-input";

type DataFields = {
  _id: string;
  name: string;
  email: string;
  document: string;
  bankAccount: string;
};

export const EditClientForm = ({
  _id,
  bankAccount,
  document,
  email,
  name,
}: DataFields): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DataFields>({
    resolver: yupResolver(editClientValidator),
  });
  const { Title, Text } = Typography;

  const handleSubmitForm = handleSubmit((data) => {
    dispatch(updateClient(data));
  });

  return (
    <Fragment>
      <Title level={3}>Edit client</Title>
      <form onSubmit={handleSubmitForm}>
        <input type="hidden" defaultValue={_id} {...register("_id")} />
        <Form.Item>
          <TextInput
            placeholder="Name"
            type="text"
            {...register("name")}
            defaultValue={name}
          />
          <Text type="danger">{errors.name?.message}</Text>
        </Form.Item>
        <Form.Item>
          <TextInput
            placeholder="Email"
            type="email"
            {...register("email")}
            defaultValue={email}
          />
          <Text type="danger">{errors.email?.message}</Text>
        </Form.Item>
        <Form.Item>
          <TextInput
            type="text"
            placeholder="Document"
            defaultValue={document}
            {...register("document")}
          />
          <Text type="danger">{errors.document?.message}</Text>
        </Form.Item>
        <Form.Item>
          <TextInput
            defaultValue={bankAccount}
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
          Edit
        </Button>
      </form>
    </Fragment>
  );
};
