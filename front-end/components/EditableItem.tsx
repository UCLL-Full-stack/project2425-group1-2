import React from "react";

interface EditableItemProps {
  handleEdit: () => Promise<void>;
  isActive: boolean;
}

const EditableItem = React.memo(
  ({ handleEdit, isActive }: EditableItemProps) => {
    return (
      <article>
        <button
          className={`p-1 shadow-regular bg-danger rounded ${
            isActive ? "hover:shadow-success" : ""
          }`}
          onClick={async () => isActive && (await handleEdit())}
          disabled={!isActive}
        >
          Edit
        </button>
      </article>
    );
  }
);

export default EditableItem;
