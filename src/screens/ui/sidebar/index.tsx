import { AppstoreAddOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

import logo from "src/assets/img/negozia-logo.png";
import { logout } from "src/modules/auth/actions";
import { useAppDispatch } from "src/store";

export const Sidebar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { Sider } = Layout;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Sider trigger={null} collapsible>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <img src={logo} alt="negozia" width={120} />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <AppstoreAddOutlined />,
            label: "Dashboard",
          },
          {
            key: "2",
            icon: <LogoutOutlined />,
            label: "Logout",
            onClick: handleLogout,
          },
        ]}
      />
    </Sider>
  );
};
