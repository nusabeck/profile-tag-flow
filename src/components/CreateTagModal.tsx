
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tag } from "@/data/mockData";

interface CreateTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTag: (tag: Omit<Tag, "id">) => void;
}

const colorOptions = [
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-yellow-500", label: "Yellow" },
  { value: "bg-red-500", label: "Red" },
];

const CreateTagModal = ({ isOpen, onClose, onCreateTag }: CreateTagModalProps) => {
  const [tagName, setTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-purple-500");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagName.trim()) {
      onCreateTag({
        name: tagName.trim(),
        color: selectedColor,
      });
      setTagName("");
      setSelectedColor("bg-purple-500");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Tag</DialogTitle>
            <DialogDescription>
              Create a new tag to organize your social media profiles.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tagName">Tag Name</Label>
              <Input
                id="tagName"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="Enter tag name"
                required
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label>Tag Color</Label>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="grid grid-cols-5 gap-2"
              >
                {colorOptions.map((color) => (
                  <div key={color.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={color.value}
                      id={color.value}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={color.value}
                      className={`w-full h-8 rounded-md cursor-pointer flex items-center justify-center ${color.value} hover:opacity-90 ${
                        selectedColor === color.value ? "ring-2 ring-offset-2 ring-primary" : ""
                      }`}
                    >
                      <span className="text-white text-xs font-medium">
                        {color.label}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!tagName.trim()}>
              Create Tag
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTagModal;
