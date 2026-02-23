import { usePlaylists } from "@/store/playlistStore";
import { useSongDialog } from "@/store/songDialogStore";
import { CheckboxItem, Content, Label } from "@radix-ui/react-dropdown-menu";
import {
  Root as ScrollArea,
  Scrollbar,
  Thumb,
  Viewport,
} from "@radix-ui/react-scroll-area";
import { useShallow } from "zustand/shallow";

export const DropdownContent = () => {
  const { playlists } = usePlaylists(
    useShallow((state) => ({
      playlists: state.playlists,
      addSong: state.addSong,
    })),
  );

  const { checkedPlaylistIds, setChecked } = useSongDialog(
    useShallow((state) => ({
      checkedPlaylistIds: state.checkedPlaylistIds,
      setChecked: state.setChecked,
    })),
  );
  return (
    <Content
      sideOffset={12}
      className="min-w-[220px] rounded-md bg-neutral-900 p-4"
    >
      <ScrollArea className="h-[225px] w-[200px] overflow-hidden rounded text-neutral-100">
        <Viewport className="size-full rounded">
          <div className="flex flex-col gap-2">
            {playlists.map((playlist) => (
              <div key={playlist.id}>
                <CheckboxItem
                  className="data-[state=checked]:bg-neutral-600 transition-colors duration-200 hover:bg-neutral-800 rounded-sm px-2 py-1 cursor-pointer"
                  checked={checkedPlaylistIds.includes(playlist.id)}
                  onCheckedChange={(checked) =>
                    setChecked(checked, playlist.id)
                  }
                  onSelect={(event) => event.preventDefault()}
                >
                  <Label>{playlist.name}</Label>
                </CheckboxItem>
              </div>
            ))}
          </div>
        </Viewport>
        <Scrollbar>
          <Thumb />
        </Scrollbar>
      </ScrollArea>
    </Content>
  );
};
