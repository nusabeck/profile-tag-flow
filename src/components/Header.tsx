
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/data/mockData";

interface HeaderProps {
  title: string;
  subtitle: string;
  selectedTags: Tag[];
  onFilterByTag: (tagId: string | null) => void;
  activeTagFilter: string | null;
  onOpenCreateTagModal: () => void;
}

const Header = ({
  title,
  subtitle,
  selectedTags,
  onFilterByTag,
  activeTagFilter,
  onOpenCreateTagModal,
}: HeaderProps) => {
  return (
    <div className="pb-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <Button onClick={onOpenCreateTagModal}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Tag
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Button
          size="sm"
          variant={activeTagFilter === null ? "secondary" : "outline"}
          onClick={() => onFilterByTag(null)}
        >
          All Profiles
        </Button>
        {selectedTags.map((tag) => (
          <Button
            key={tag.id}
            size="sm"
            variant={activeTagFilter === tag.id ? "secondary" : "outline"}
            onClick={() => onFilterByTag(tag.id)}
            className="flex items-center gap-2"
          >
            <span
              className={`h-2 w-2 rounded-full ${tag.color}`}
              aria-hidden="true"
            />
            {tag.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Header;
