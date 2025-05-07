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
import { Profile, ProfileGroup, SocialNetwork, UseCase } from "@/data/mockData";
import Tag from "./Tag";
import TagSelector from "./TagSelector";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, X, Lock, Globe } from "lucide-react";

interface ProfileTableProps {
  profiles: Profile[];
  tags: ProfileGroup[];
  onTagsChange: (profileId: string, tagIds: string[]) => void;
  onCreateTagFromSelector: (name: string) => void;
  onAddToGroup: (profileId: string, tagIds: string[]) => void;
  onRemoveUseCase: (profileId: string, useCase: UseCase) => void;
}

const getSocialIcon = (network: SocialNetwork) => {
  switch (network) {
    case 'twitter':
      return (
        <div className="h-6 w-6 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white shadow-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      );
    case 'facebook':
      return (
        <div className="h-6 w-6 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>
      );
    case 'instagram':
      return (
        <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] flex items-center justify-center text-white shadow-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </div>
      );
    case 'linkedin':
      return (
        <div className="h-6 w-6 rounded-full bg-[#0A66C2] flex items-center justify-center text-white shadow-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>
      );
    case 'youtube':
      return (
        <div className="h-6 w-6 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
      );
    case 'tiktok':
      return (
        <div className="h-6 w-6 rounded-full bg-black flex items-center justify-center text-white shadow-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
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

const ProfileTable = ({
  profiles,
  tags,
  onTagsChange,
  onCreateTagFromSelector,
  onAddToGroup,
  onRemoveUseCase,
}: ProfileTableProps) => {
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

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

  const handleRemoveTag = (profileId: string, tagId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      const newTags = profile.tags.filter(id => id !== tagId);
      onTagsChange(profileId, newTags);
    }
  };

  const handleRemoveUseCase = (profileId: string, useCase: UseCase) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      // Find all tags that have this use case
      const tagsWithUseCase = tags.filter(tag => 
        profile.tags.includes(tag.id) && tag.useCases.includes(useCase)
      );
      
      // Remove the use case from all these tags
      const updatedTags = tagsWithUseCase.map(tag => ({
        ...tag,
        useCases: tag.useCases.filter(uc => uc !== useCase)
      }));

      // Update the profile's tags
      onTagsChange(profileId, profile.tags);
    }
  };

  return (
    <div className="rounded-md border">
      {selectedProfiles.length > 0 && (
        <div className="p-4 bg-secondary/50 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedProfiles.length === profiles.length}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all"
              />
              <span className="font-medium">
                {selectedProfiles.length} {selectedProfiles.length === 1 ? 'profile' : 'profiles'} selected
              </span>
            </div>
            <button 
              onClick={() => setSelectedProfiles([])} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear selection
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Apply Groups:</span>
            <TagSelector
              allTags={tags}
              selectedTagIds={[]}
              onChange={handleBulkTagChange}
              onCreateTag={onCreateTagFromSelector}
              trigger={
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add to Group
                </Button>
              }
            />
          </div>
        </div>
      )}
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedProfiles.length === profiles.length}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="font-semibold">Profile</TableHead>
              <TableHead className="font-semibold">Network</TableHead>
              <TableHead className="font-semibold w-[120px]">Type</TableHead>
              <TableHead className="font-semibold">Profile Groups</TableHead>
              <TableHead className="font-semibold">Use Cases</TableHead>
              <TableHead className="w-[100px] font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.map((profile) => (
              <TableRow 
                key={profile.id}
                className="group hover:bg-muted/50 transition-colors"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedProfiles.includes(profile.id)}
                    onCheckedChange={() => toggleProfileSelection(profile.id)}
                    aria-label={`Select ${profile.name}`}
                  />
                </TableCell>
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
                <TableCell className="w-[120px]">
                  <button className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    profile.type === 'private'
                      ? 'bg-secondary hover:bg-secondary/80'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}>
                    {profile.type === 'private' ? '🔒 Private' : '🌐 Public'}
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {profile.tags.map((tagId) => {
                      const tag = tags.find(t => t.id === tagId);
                      if (!tag) return null;
                      return (
                        <span
                          key={tag.id}
                          className={`inline-flex items-center gap-1 px-2 py-1 font-medium rounded-full cursor-pointer text-xs ${
                            tag.color === 'bg-purple-500' ? 'bg-purple-100 text-purple-800' :
                            tag.color === 'bg-blue-500' ? 'bg-blue-100 text-blue-800' :
                            tag.color === 'bg-green-500' ? 'bg-green-100 text-green-800' :
                            tag.color === 'bg-yellow-500' ? 'bg-yellow-100 text-yellow-800' :
                            tag.color === 'bg-red-500' ? 'bg-red-100 text-red-800' :
                            tag.color === 'bg-indigo-500' ? 'bg-indigo-100 text-indigo-800' :
                            tag.color === 'bg-pink-500' ? 'bg-pink-100 text-pink-800' :
                            tag.color === 'bg-orange-500' ? 'bg-orange-100 text-orange-800' :
                            tag.color === 'bg-teal-500' ? 'bg-teal-100 text-teal-800' :
                            tag.color === 'bg-cyan-500' ? 'bg-cyan-100 text-cyan-800' :
                            tag.color === 'bg-emerald-500' ? 'bg-emerald-100 text-emerald-800' :
                            tag.color === 'bg-violet-500' ? 'bg-violet-100 text-violet-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {tag.name}
                          <button
                            onClick={() => handleRemoveTag(profile.id, tag.id)}
                            className="ml-1 hover:text-red-600 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {Array.from(new Set(profile.tags.flatMap(tagId => {
                      const tag = tags.find(t => t.id === tagId);
                      return tag?.useCases || [];
                    }))).map((useCase) => (
                      <span
                        key={useCase}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          useCase === 'analyze' 
                            ? 'bg-blue-100 text-blue-800' 
                            : useCase === 'orchestrate'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {useCase === 'analyze' ? '📊' : useCase === 'orchestrate' ? '🎯' : '💬'} {useCase}
                        <button
                          onClick={() => onRemoveUseCase(profile.id, useCase)}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <TagSelector
                    allTags={tags}
                    selectedTagIds={profile.tags}
                    onChange={(tagIds) => onAddToGroup(profile.id, tagIds)}
                    onCreateTag={onCreateTagFromSelector}
                    trigger={
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Add to Group
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProfileTable;
