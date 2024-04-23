import { useModal } from "@/hooks/use-modal";
import { Modal } from "@/components/modal";

export const CreateStoreForm = () => {
  const storeModal = useModal();

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Create Store Modal
    </Modal>
  );
};
