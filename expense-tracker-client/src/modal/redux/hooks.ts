import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const useModalContents = () => {
  return useSelector((state: RootState) => state.modal.modalContent);
};

export const useModalOpen = () => {
  return useSelector((state: RootState) => state.modal.modalOpen);
};
