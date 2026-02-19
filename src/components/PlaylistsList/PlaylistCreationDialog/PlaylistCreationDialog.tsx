import {
  Root as Dialog,
  Overlay,
  Portal,
  Trigger,
} from "@radix-ui/react-dialog";

import { lazy, useState } from "react";

const DialogContent = lazy(() =>
  import("@/components/PlaylistsList/PlaylistCreationDialog/DialogContent/DialogContent").then(
    (module) => ({ default: module.DialogContent }),
  ),
);

export const PlaylistCreationDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    setHasOpened(true);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <Trigger>
        <button>Add playlist</button>
      </Trigger>
      <Portal>
        <Overlay className="fixed inset-0 bg-black/50" />
        {hasOpened && <DialogContent />}
      </Portal>
    </Dialog>
  );
};
