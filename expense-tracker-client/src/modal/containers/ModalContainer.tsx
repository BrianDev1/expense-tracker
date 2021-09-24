import React from "react";
import CustomModal from "../CustomModal";
import { useModalContents, useModalOpen } from "../redux/hooks";

/**
 * Global Modal - that can be extended
 * @returns component inside a modal
 */
const ModalContainer = () => {
  const modalChildren = useModalContents();
  const modalOpen = useModalOpen();
  return (
    <CustomModal open={modalOpen} type={"Dialog"}>
      {modalChildren}
    </CustomModal>
  );
};

export default ModalContainer;
