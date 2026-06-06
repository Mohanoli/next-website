// components/table/RowAction.tsx
import Link from "next/link";
import { FaPen, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { RowActionProps } from "@/lib/types/GlobalTypes";

export const RowAction = ({ editUrl, rowId, deleteAction, onEdit }: RowActionProps) => {

  const confirmDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAction(rowId);
      }
    });
  };

  // Common classes for the button/link style
  const btnClass = "p-2 bg-teal-700 text-white rounded-full transition hover:scale-95 hover:bg-teal-600 flex items-center justify-center";

  return (
    <div className="flex gap-1">
      {/* Conditionally render Link or Button based on props */}
      {onEdit ? (
        <button onClick={onEdit} className={btnClass}>
          <FaPen />
        </button>
      ) : editUrl ? (
        <Link href={editUrl} className={btnClass}>
          <FaPen />
        </Link>
      ) : null}

      <button
        onClick={confirmDelete}
        className="p-2 bg-red-700 text-white rounded-full transition hover:scale-95 hover:bg-red-600 flex items-center justify-center"
      >
        <FaTrash />
      </button>
    </div>
  );
};