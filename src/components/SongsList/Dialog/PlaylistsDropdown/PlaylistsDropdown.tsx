import { DropdownContent } from "@/components/SongsList/Dialog/PlaylistsDropdown/DropdownContent";
import {
  Root as DropdownMenu,
  Portal,
  Trigger,
} from "@radix-ui/react-dropdown-menu";

export const PlaylistsDropdown = () => {
  return (
    <DropdownMenu>
      <Trigger asChild>
        <button className="border-2 border-neutral-700 rounded-sm p-2 text-sm">
          Playlists
        </button>
      </Trigger>
      <Portal>
        <DropdownContent />
      </Portal>
    </DropdownMenu>
  );
};
