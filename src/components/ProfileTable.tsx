
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Checkbox
} from "@/components/ui/checkbox";
import { Profile, Tag as TagType, SocialNetwork } from "@/data/mockData";
import Tag from "./Tag";
import TagSelector from "./TagSelector";
import { toast } from "sonner";

interface ProfileTableProps {
  profiles: Profile[];
  tags: TagType[];
  onTagsChange: (profileId: string, tagIds: string[]) => void;
  onCreateTagFromSelector: (name: string) => void;
}

const getSocialIcon = (network: SocialNetwork) => {
  switch (network) {
    case 'twitter':
      return (
        <div className="h-5 w-5 rounded-full bg-social-twitter flex items-center justify-center text-white">
          <span className="text-xs font-bold">X</span>
        </div>
      );
    case 'facebook':
      return (
        <div className="h-5 w-5 rounded-full bg-social-facebook flex items-center justify-center text-white">
          <span className="text-xs font-bold">f</span>
        </div>
      );
    case 'instagram':
      return (
        <div className="h-5 w-5 rounded-full bg-social-instagram flex items-center justify-center text-white">
          <span className="text-xs font-bold">Ig</span>
        </div>
      );
    case 'linkedin':
      return (
        <div className="h-5 w-5 rounded-full bg-social-linkedin flex items-center justify-center text-white">
          <span className="text-xs font-bold">In</span>
        </div>
      );
    case 'youtube':
      return (
        <div className="h-5 w-5 rounded-full bg-social-youtube flex items-center justify-center text-white">
          <span className="text-xs font-bold">Yt</span>
        </div>
      );
    case 'tiktok':
      return (
        <div className="h-5 w-5 rounded-full bg-social-tiktok flex items-center justify-center text-white">
          <span className="text-xs font-bold">Tt</span>
        </div>
      );
    default:
      return null;
  }
};

const formatFollowers = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const ProfileTable = ({ profiles, tags, onTagsChange, onCreateTagFromSelector }: ProfileTableProps) => {
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedProfiles([]);
      setIsAllSelected(false);
    } else {
      setSelectedProfiles(profiles.map(profile => profile.id));
      setIsAllSelected(true);
    }
  };

  const toggleProfileSelection = (profileId: string) => {
    if (selectedProfiles.includes(profileId)) {
      setSelectedProfiles(selectedProfiles.filter(id => id !== profileId));
      setIsAllSelected(false);
    } else {
      const newSelected = [...selectedProfiles, profileId];
      setSelectedProfiles(newSelected);
      if (newSelected.length === profiles.length) {
        setIsAllSelected(true);
      }
    }
  };

  const getProfileTags = (profile: Profile) => {
    return tags.filter(tag => profile.tags.includes(tag.id));
  };

  const handleBulkTagChange = (tagIds: string[]) => {
    if (selectedProfiles.length === 0) {
      toast.error("No profiles selected");
      return;
    }

    selectedProfiles.forEach(profileId => {
      onTagsChange(profileId, tagIds);
    });

    toast.success(`Updated tags for ${selectedProfiles.length} profiles`);
  };

  return (
    <div className="rounded-md border">
      {selectedProfiles.length > 0 && (
        <div className="p-4 bg-secondary border-b flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium mr-2">
              {selectedProfiles.length} selected
            </span>
            <button 
              onClick={() => setSelectedProfiles([])} 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear selection
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Apply tags:</span>
            <TagSelector
              allTags={tags}
              selectedTagIds={[]}
              onChange={handleBulkTagChange}
              onCreateTag={onCreateTagFromSelector}
            />
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={isAllSelected} 
                onCheckedChange={toggleSelectAll}
                aria-label="Select all profiles"
              />
            </TableHead>
            <TableHead className="w-48">Account</TableHead>
            <TableHead>Handle</TableHead>
            <TableHead>Network</TableHead>
            <TableHead className="text-right">Followers</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile) => (
            <TableRow key={profile.id}>
              <TableCell>
                <Checkbox 
                  checked={selectedProfiles.includes(profile.id)}
                  onCheckedChange={() => toggleProfileSelection(profile.id)}
                  aria-label={`Select ${profile.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                  </div>
                  <span>{profile.name}</span>
                </div>
              </TableCell>
              <TableCell>{profile.handle}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getSocialIcon(profile.network)}
                  <span className="capitalize">{profile.network}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{formatFollowers(profile.followers)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1 items-center">
                  {getProfileTags(profile).map((tag) => (
                    <Tag 
                      key={tag.id} 
                      id={tag.id} 
                      name={tag.name} 
                      color={tag.color} 
                    />
                  ))}
                  <TagSelector
                    allTags={tags}
                    selectedTagIds={profile.tags}
                    onChange={(tagIds) => onTagsChange(profile.id, tagIds)}
                    onCreateTag={onCreateTagFromSelector}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProfileTable;
