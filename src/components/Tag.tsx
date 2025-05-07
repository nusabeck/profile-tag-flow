import { X, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagProps {
  id: string;
  name: string;
  color: string;
  onDelete?: (id: string) => void;
  onFilter?: () => void;
  isActive?: boolean;
  onEdit?: () => void;
  className?: string;
}

const Tag = ({ id, name, color, onDelete, onFilter, isActive, onEdit, className }: TagProps) => {
  return (
    <span
      onClick={onFilter}
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full cursor-pointer",
        color === 'bg-purple-500' ? 'bg-purple-100 text-purple-800' :
        color === 'bg-blue-500' ? 'bg-blue-100 text-blue-800' :
        color === 'bg-green-500' ? 'bg-green-100 text-green-800' :
        color === 'bg-yellow-500' ? 'bg-yellow-100 text-yellow-800' :
        color === 'bg-red-500' ? 'bg-red-100 text-red-800' :
        color === 'bg-indigo-500' ? 'bg-indigo-100 text-indigo-800' :
        color === 'bg-pink-500' ? 'bg-pink-100 text-pink-800' :
        color === 'bg-orange-500' ? 'bg-orange-100 text-orange-800' :
        color === 'bg-teal-500' ? 'bg-teal-100 text-teal-800' :
        color === 'bg-cyan-500' ? 'bg-cyan-100 text-cyan-800' :
        color === 'bg-emerald-500' ? 'bg-emerald-100 text-emerald-800' :
        color === 'bg-violet-500' ? 'bg-violet-100 text-violet-800' :
        'bg-gray-100 text-gray-800',
        isActive && 'ring-2 ring-offset-2 ring-primary',
        className
      )}
    >
      {name}
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="ml-1 rounded-full hover:bg-black/10 p-0.5"
        >
          <X size={12} />
          <span className="sr-only">Remove tag</span>
        </button>
      )}
      {onEdit && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="ml-1 rounded-full hover:bg-black/10 p-0.5"
        >
          <MoreVertical size={12} />
          <span className="sr-only">Edit tag</span>
        </button>
      )}
    </span>
  );
};

export default Tag;
