import React from "react";

interface EditableItemProps {
  handleEdit: () => Promise<void>;
  isActive: boolean;
  children: React.ReactNode;
}

const EditableItem = React.memo(
  ({ handleEdit, isActive, children }: EditableItemProps) => {
    return (
      <>
        (
        <div className="flex flex-row justify-between p-2">
          {children}
          <article>
            <button
              className={`p-1 shadow-regular  bg-danger rounded ${
                isActive ? "hover:shadow-success" : ""
              }`}
              onClick={async () => isActive && (await handleEdit())}
              disabled={!isActive}
            >
              Edit
            </button>
          </article>
        </div>
        )
      </>
    );
  }
);

export default EditableItem;
