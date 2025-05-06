
import { useState, useEffect } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tag as TagType } from "@/data/mockData";
import Tag from "./Tag";
import { Input } from "@/components/ui/input";

interface TagSelectorProps {
  allTags: TagType[];
  selectedTagIds: string[];
  onChange: (tagIds: string[]) => void;
  onCreateTag: (name: string) => void;
}

const TagSelector = ({ 
  allTags, 
  selectedTagIds, 
  onChange, 
  onCreateTag 
}: TagSelectorProps) => {
  const [newTagName, setNewTagName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredTags = allTags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTag = (tagId: string) => {
    if (selectedTagIds.includes(tagId)) {
      onChange(selectedTagIds.filter(id => id !== tagId));
    } else {
      onChange([...selectedTagIds, tagId]);
    }
  };

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      onCreateTag(newTagName.trim());
      setNewTagName('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateTag();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Tags
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4 border-b">
          <h3 className="font-medium mb-2">Manage Tags</h3>
          <Input
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-2"
          />
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Create new tag..."
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button 
              size="sm" 
              disabled={!newTagName.trim()}
              onClick={handleCreateTag}
            >
              Add
            </Button>
          </div>
        </div>
        <div className="max-h-60 overflow-auto p-2">
          {filteredTags.length > 0 ? (
            <div className="space-y-1">
              {filteredTags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer"
                  onClick={() => toggleTag(tag.id)}
                >
                  <Tag id={tag.id} name={tag.name} color={tag.color} />
                  {selectedTagIds.includes(tag.id) && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No tags found
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TagSelector;
