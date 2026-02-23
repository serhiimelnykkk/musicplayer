import { DialogContent } from "@/components/SongsList/Dialog/DialogContent";
import { SongsList } from "@/components/SongsList/SongsList";
import { useSongDialog } from "@/store/songDialogStore";
import { Dialog, Overlay, Portal } from "@radix-ui/react-dialog";
import { useShallow } from "zustand/shallow";

export const DialogRoot = () => {
  const { open, setOpen } = useSongDialog(
    useShallow((state) => ({ open: state.isOpen, setOpen: state.setIsOpen })),
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Portal>
        <Overlay className="fixed inset-0 bg-black/50" />
        <DialogContent />
      </Portal>
      <SongsList />
    </Dialog>
  );
};
