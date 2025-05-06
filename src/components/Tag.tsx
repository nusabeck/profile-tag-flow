
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagProps {
  id: string;
  name: string;
  color: string;
  onDelete?: (id: string) => void;
  className?: string;
}

const Tag = ({ id, name, color, onDelete, className }: TagProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full",
        color === 'bg-purple-500' ? 'bg-purple-100 text-purple-800' :
        color === 'bg-blue-500' ? 'bg-blue-100 text-blue-800' :
        color === 'bg-green-500' ? 'bg-green-100 text-green-800' :
        color === 'bg-yellow-500' ? 'bg-yellow-100 text-yellow-800' :
        color === 'bg-red-500' ? 'bg-red-100 text-red-800' :
        'bg-gray-100 text-gray-800',
        className
      )}
    >
      {name}
      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="ml-1 rounded-full hover:bg-black/10 p-0.5"
        >
          <X size={12} />
          <span className="sr-only">Remove tag</span>
        </button>
      )}
    </span>
  );
};

export default Tag;
