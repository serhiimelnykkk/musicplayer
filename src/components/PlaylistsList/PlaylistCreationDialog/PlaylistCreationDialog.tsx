import {
  Root as Dialog,
  Overlay,
  Portal,
  Trigger,
} from "@radix-ui/react-dialog";

import { DialogContent } from "@/components/PlaylistsList/PlaylistCreationDialog/DialogContent/DialogContent";
import { useState } from "react";

export const PlaylistCreationDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Trigger>
        <button>Add playlist</button>
      </Trigger>
      <Portal>
        <Overlay className="fixed inset-0 bg-black/50" />
      </Portal>
      <DialogContent />
    </Dialog>
  );
};
