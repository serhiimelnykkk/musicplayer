import {
  Root as Dialog,
  Overlay,
  Portal,
  Trigger,
} from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";

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
      <Trigger asChild>
        <button className="hover:outline-green-500 hover:outline-2 bg-green-800 padding flex items-center justify-between px-2 py-1 rounded-sm">
          <span className="text-bold text-lg">New playlist</span>
          <Plus />
        </button>
      </Trigger>
      <Portal>
        <Overlay className="fixed inset-0 bg-black/50" />
        {hasOpened && <DialogContent />}
      </Portal>
    </Dialog>
  );
};
