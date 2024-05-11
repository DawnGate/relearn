"use client";

import { usePreviewModal } from "@/hooks/use-preview-modal";

import { Modal } from "@/components/ui/modal";
import { Gallery } from "@/components/gallery";
import { ProductInfo } from "@/components/product-info";

export const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const data = usePreviewModal((state) => state.data);
  const isOpen = usePreviewModal((state) => state.isOpen);

  if (!data) {
    return null;
  }

  return (
    <Modal onClose={previewModal.onClose} open={isOpen}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={data.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <ProductInfo product={data} />
        </div>
      </div>
    </Modal>
  );
};
