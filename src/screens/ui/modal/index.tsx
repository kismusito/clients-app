import { Modal } from "antd";
import { closeModal } from "src/modules/modal/actions";
import { MODAL_COMPONENT } from "src/modules/modal/data/modal-data";
import {
  getModalComponent,
  getModalProps,
  isModalOpen,
} from "src/modules/modal/selectors";
import { useAppDispatch, useAppSelector } from "src/store";

export const ControlledModal = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isModalOpen);
  const componentKey = useAppSelector(getModalComponent);
  const modalProps = useAppSelector(getModalProps);

  const getComponent = () => {
    if (componentKey !== null) {
      const Component = MODAL_COMPONENT[componentKey];
      return <Component {...modalProps} />;
    }

    return <></>;
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      open={isOpen}
      okButtonProps={{ hidden: true }}
      onCancel={() => handleCloseModal()}
    >
      {getComponent()}
    </Modal>
  );
};
