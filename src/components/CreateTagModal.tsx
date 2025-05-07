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
import { Checkbox } from "@/components/ui/checkbox";
import { ProfileGroup, UseCase } from "@/data/mockData";

interface CreateTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTag: (tag: Omit<ProfileGroup, "id">) => void;
}

const colorOptions = [
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-yellow-500", label: "Yellow" },
  { value: "bg-red-500", label: "Red" },
];

const useCaseOptions: { value: UseCase; label: string }[] = [
  { value: 'analyze', label: 'Analyze' },
  { value: 'orchestrate', label: 'Orchestrate' },
  { value: 'engage', label: 'Engage' },
];

const CreateTagModal = ({ isOpen, onClose, onCreateTag }: CreateTagModalProps) => {
  const [tagName, setTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-purple-500");
  const [selectedUseCases, setSelectedUseCases] = useState<UseCase[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagName.trim() && selectedUseCases.length > 0) {
      onCreateTag({
        name: tagName.trim(),
        color: selectedColor,
        useCases: selectedUseCases,
      });
      setTagName("");
      setSelectedColor("bg-purple-500");
      setSelectedUseCases([]);
      onClose();
    }
  };

  const toggleUseCase = (useCase: UseCase) => {
    setSelectedUseCases(prev => 
      prev.includes(useCase)
        ? prev.filter(uc => uc !== useCase)
        : [...prev, useCase]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Profile Group</DialogTitle>
            <DialogDescription>
              Create a new profile group to organize your social media profiles.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tagName">Profile Group Name</Label>
              <Input
                id="tagName"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="Enter profile group name"
                required
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label>Profile Group Color</Label>
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
            <div className="grid gap-2">
              <Label>Use Cases</Label>
              <div className="grid gap-2">
                {useCaseOptions.map((useCase) => (
                  <div key={useCase.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={useCase.value}
                      checked={selectedUseCases.includes(useCase.value)}
                      onCheckedChange={() => toggleUseCase(useCase.value)}
                    />
                    <Label
                      htmlFor={useCase.value}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {useCase.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!tagName.trim() || selectedUseCases.length === 0}>
              Create Profile Group
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTagModal;
