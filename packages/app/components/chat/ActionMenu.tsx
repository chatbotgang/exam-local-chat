import type { MenuProps } from "@mui/material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface ActionMenuProps {
  list: {
    text: string;
  }[];
  open: boolean;
  onClick: (text: string) => void;
  onClose?: () => void;
  anchorEl: MenuProps["anchorEl"];
}

export default function ActionMenu({
  open,
  list,
  onClick,
  onClose,
  anchorEl,
}: ActionMenuProps) {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <Menu
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
    >
      {list.map((li) => (
        <MenuItem id={li.text} onClick={() => onClick(li.text)}>
          {li.text}
        </MenuItem>
      ))}
    </Menu>
  );
}
