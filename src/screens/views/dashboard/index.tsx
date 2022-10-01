import { useEffect } from "react";
import {
  Table,
  Button,
  Layout,
  Space,
  Divider,
  Row,
  Col,
  Typography,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { ColumnsType } from "antd/lib/table";
import Swal from "sweetalert2";

import { deleteClient, getClients } from "src/modules/clients/actions";
import { getClientsItems } from "src/modules/clients/selectors";
import { useAppDispatch, useAppSelector } from "src/store";
import { openModal } from "src/modules/modal/actions";
import { MODAL_COMPONENT_KEY } from "src/modules/modal/data/modal-data";
import { Sidebar } from "src/screens/ui/sidebar";
import { getPermissions } from "src/modules/auth/selectors";
import { canAccess } from "src/utils/can-access";
import { MODULES } from "src/utils/enums/modules";
import { PERMISSION } from "src/utils/enums/permissions";

type DataType = {
  _id: string;
  name: string;
  email: string;
  document: string;
  bankAccount: string;
};

export const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const clients = useAppSelector(getClientsItems);
  const permissions = useAppSelector(getPermissions);
  const { Content } = Layout;
  const { Title } = Typography;

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const handleDeleteClient = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteClient({ id }));
      }
    });
  };

  const handleCreateClient = () => {
    dispatch(
      openModal({
        component: MODAL_COMPONENT_KEY.CREATE_CLIENT,
        props: {},
      })
    );
  };

  const handleEditClient = (data: DataType) => {
    dispatch(
      openModal({
        component: MODAL_COMPONENT_KEY.EDIT_CLIENT,
        props: { ...data },
      })
    );
  };

  const columns: ColumnsType<DataType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Document", dataIndex: "document", key: "document" },
    { title: "Bank account", dataIndex: "bankAccount", key: "bankAccount" },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            {canAccess(permissions, MODULES.CLIENTS, PERMISSION.UPDATE) && (
              <Button
                type="primary"
                ghost
                icon={<EditOutlined />}
                onClick={() => handleEditClient(record)}
              />
            )}
            {canAccess(permissions, MODULES.CLIENTS, PERMISSION.DELETE) && (
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteClient(record._id)}
              />
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content style={{ padding: 40 }}>
          <Row>
            <Col span={18}>
              <Title level={3}>Clients</Title>
            </Col>
            <Col span={6}>
              {canAccess(permissions, MODULES.CLIENTS, PERMISSION.CREATE) && (
                <Button
                  onClick={handleCreateClient}
                  icon={<PlusOutlined />}
                  type="primary"
                  block
                  size="large"
                >
                  Create client
                </Button>
              )}
            </Col>
          </Row>
          <Divider />
          <Table
            columns={columns}
            dataSource={clients.map((client) => {
              return { ...client, key: client._id };
            })}
            pagination={false}
          />
        </Content>
      </Layout>
    </Layout>
  );
};
