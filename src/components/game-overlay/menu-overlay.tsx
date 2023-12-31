import React from "react";
import { IconsIndex } from "~/src/routes/game-view";
import OverlaySelection from "./menu-overlay-selection";

interface MenuOverlayProps {
  items: Array<{ text: keyof IconsIndex; onClick: () => void }>;
  icons: IconsIndex;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ items, icons }) => {
  return (
    <div className="menu-overlay">
      {items.map((item, idx) => (
        <OverlaySelection item={item} icons={icons} key={idx} />
      ))}
    </div>
  );
};
