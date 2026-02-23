import { DropdownContent } from "@/components/SongsList/Dialog/PlaylistsDropdown/DropdownContent";
import {
  Root as DropdownMenu,
  Portal,
  Trigger,
} from "@radix-ui/react-dropdown-menu";

interface Props {
  checkedPlaylistIds: string[];
  handleCheckedChange: (checked: boolean, playlistId: string) => void;
}

export const PlaylistsDropdown = ({
  checkedPlaylistIds,
  handleCheckedChange,
}: Props) => {
  return (
    <DropdownMenu>
      <Trigger asChild>
        <button className="border-2 border-neutral-700 rounded-sm p-2 text-sm">
          Playlists
        </button>
      </Trigger>
      <Portal>
        <DropdownContent
          checkedPlaylistIds={checkedPlaylistIds}
          handleCheckedChange={handleCheckedChange}
        />
      </Portal>
    </DropdownMenu>
  );
};
