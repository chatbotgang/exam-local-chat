import type { ChatMessage } from "@/hooks/useChatHistory";
import useChatHistory from "@/hooks/useChatHistory";
import useCurrentUser from "@/hooks/useCurrentUser";
import React, { useState } from "react";
import ActionMenu from "./ActionMenu";

interface MessageProps {
  messageInfo: ChatMessage;
}

type Action = "unsend";

interface MenuItem {
  action: Action;
  text: string;
}

const MENU_LIST: MenuItem[] = [
  {
    action: "unsend",
    text: "Unsend Message",
  },
];

export default function Message({ messageInfo }: MessageProps) {
  const { curUserName } = useCurrentUser();
  const { removeChatMessage } = useChatHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.type === "contextmenu") {
      e.preventDefault();
      setAnchorEl(e.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (text: string) => {
    const action = MENU_LIST.find((x) => x.text === text)?.action;
    if (!action) return;

    if (action === "unsend") {
      removeChatMessage(messageInfo.id);
    }
    setAnchorEl(null);
  };

  if (messageInfo.type === "system") {
    return <i className="text-xl text-slate-300 p-2">{messageInfo.message}</i>;
  }

  return (
    <>
      <div
        className="flex flex-col gap-2 text-white p-2"
        onContextMenu={handleOpenMenu}
      >
        <div className="text-xl">
          {curUserName === messageInfo.username ? "You" : messageInfo.username}
        </div>
        <div className="text-slate-400">
          {new Date(messageInfo.timestamp).toLocaleTimeString()}
        </div>
        <div className="overflow-auto whitespace-pre-wrap break-all w-fit max-w-full rounded-md bg-slate-500 p-2">
          {messageInfo.message}
        </div>
      </div>
      <ActionMenu
        list={MENU_LIST}
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleSelect}
        anchorEl={anchorEl}
      />
    </>
  );
}
