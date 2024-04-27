"use client";
import { useEffect, useState } from "react";

import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Are you sure"
      description="This action can't be undone"
      onClose={onClose}
    >
      <div className="flex items-center space-x-2 pt-6 justify-end">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" disabled={isLoading} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
