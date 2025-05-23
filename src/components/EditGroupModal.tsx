import { useState, useEffect } from "react";
import { X, Facebook, Instagram, Twitter, Linkedin, Youtube, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Profile, ProfileGroup, SocialNetwork, UseCase } from "@/data/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableHead, TableCell, TableRow } from "@/components/ui/table";

interface EditGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: ProfileGroup;
  profiles: Profile[];
  onUpdateGroup: (updatedGroup: ProfileGroup) => void;
}

const colorOptions = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-red-500", label: "Red" },
  { value: "bg-yellow-500", label: "Yellow" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-pink-500", label: "Pink" },
];

const useCaseOptions: { value: UseCase; label: string }[] = [
  { value: "analyze", label: "Analyze" },
  { value: "orchestrate", label: "Orchestrate" },
  { value: "engage", label: "Engage" },
];

const networkIcons: Record<SocialNetwork, React.ReactNode> = {
  facebook: <Facebook className="h-4 w-4 text-[#1877F2]" />,
  instagram: <Instagram className="h-4 w-4 text-[#E4405F]" />,
  twitter: <Twitter className="h-4 w-4 text-[#1DA1F2]" />,
  linkedin: <Linkedin className="h-4 w-4 text-[#0A66C2]" />,
  youtube: <Youtube className="h-4 w-4 text-[#FF0000]" />,
  tiktok: <Youtube className="h-4 w-4 text-[#000000]" />, // Using Youtube icon as fallback for TikTok
};

const EditGroupModal = ({
  isOpen,
  onClose,
  group,
  profiles,
  onUpdateGroup,
}: EditGroupModalProps) => {
  const [groupName, setGroupName] = useState(group.name);
  const [selectedColor, setSelectedColor] = useState(group.color);
  const [selectedUseCases, setSelectedUseCases] = useState<UseCase[]>(group.useCases);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>(
    profiles.filter(profile => profile.tags.includes(group.id)).map(profile => profile.id)
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setGroupName(group.name);
    setSelectedColor(group.color);
    setSelectedUseCases(group.useCases);
    setSelectedProfiles(
      profiles.filter(profile => profile.tags.includes(group.id)).map(profile => profile.id)
    );
  }, [group, profiles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGroup({
      ...group,
      name: groupName,
      color: selectedColor,
      useCases: selectedUseCases,
    });
    onClose();
  };

  const toggleProfile = (profileId: string) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId]
    );
  };

  const toggleUseCase = (useCase: UseCase) => {
    setSelectedUseCases((prev) =>
      prev.includes(useCase)
        ? prev.filter((uc) => uc !== useCase)
        : [...prev, useCase]
    );
  };

  const filteredProfiles = profiles.filter(profile => 
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.network.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSocialIcon = (network: SocialNetwork) => {
    return networkIcons[network] || null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Profile Group</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name"
                />
              </div>
              <div className="w-32">
                <Label>Color</Label>
                <div className="flex gap-2 mt-1.5">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={`w-6 h-6 rounded-full ${color.value} ${
                        selectedColor === color.value
                          ? "ring-2 ring-offset-2 ring-primary"
                          : ""
                      }`}
                      onClick={() => setSelectedColor(color.value)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label>Use Cases</Label>
              <div className="flex gap-2 mt-1.5">
                {useCaseOptions.map((useCase) => (
                  <Badge
                    key={useCase.value}
                    variant={selectedUseCases.includes(useCase.value) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleUseCase(useCase.value)}
                  >
                    {useCase.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Associated Profiles</Label>
              <div className="relative mt-1.5">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search profiles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <ScrollArea className="h-[300px] rounded-md border p-4 mt-1.5">
                <div className="space-y-2">
                  <Table>
                    <TableHead>Profile</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </Table>
                  {filteredProfiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={profile.avatar} alt={profile.name} />
                            <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{profile.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getSocialIcon(profile.network)}
                          <span className="capitalize">{profile.network}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          profile.type === 'private'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {profile.type === 'private' ? '🔒 Private' : '🌐 Public'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {selectedProfiles.includes(profile.id) && (
                            <Badge variant="secondary">Selected</Badge>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleProfile(profile.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditGroupModal; 