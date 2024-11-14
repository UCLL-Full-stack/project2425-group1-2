import React from "react";

interface SelectableItemProps {
  toggleSelect: () => void;
  selected: boolean;
  isActive: boolean;
  children: React.ReactNode;
}

const SelectableItem = React.memo(
  ({ toggleSelect, selected, isActive, children }: SelectableItemProps) => {
    return (
      <>
        <div className="flex flex-row justify-between p-2">
          <article>
            <input
              name="select"
              id="select"
              type="checkbox"
              checked={selected}
              className={`p-1 w-4 h-4 shadow-activated rounded-full border-gray-300`}
              onChange={() => isActive && toggleSelect()}
            ></input>
          </article>
          {children}
        </div>
      </>
    );
  }
);

export default SelectableItem;
