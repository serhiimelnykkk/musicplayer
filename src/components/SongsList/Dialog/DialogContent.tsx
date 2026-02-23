import { DialogContentForm } from "@/components/SongsList/Dialog/DialogContentForm";
import { Close, Content } from "@radix-ui/react-dialog";
import { X as CloseIcon } from "lucide-react";

export const DialogContent = () => {
  return (
    <Content className="p-4 flex flex-col text-neutral-100 fixed left-1/2 top-1/2 w-[90vw] max-w-md border border-neutral-700 rounded-sm max-h-64 bg-neutral-800 -translate-[50%]">
      <Close
        asChild
        className="absolute right-1 top-1 hover:text-red-400 transition-colors duration-200"
      >
        <button>
          <CloseIcon size={20} />
        </button>
      </Close>
      <DialogContentForm />
    </Content>
  );
};
