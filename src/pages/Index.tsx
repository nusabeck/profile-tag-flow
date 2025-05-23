import { useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { profiles as initialProfiles, mockTags as initialTags, ProfileGroup, Profile, SocialNetwork, UseCase, ProfileType } from "@/data/mockData";
import ProfileTable from "@/components/ProfileTable";
import Header from "@/components/Header";
import CreateTagModal from "@/components/CreateTagModal";
import EditGroupModal from "@/components/EditGroupModal";
import { Toaster } from "sonner";

const Index = () => {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [tags, setTags] = useState<ProfileGroup[]>(initialTags);
  const [isCreateTagModalOpen, setIsCreateTagModalOpen] = useState(false);
  const [isEditGroupModalOpen, setIsEditGroupModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ProfileGroup | null>(null);
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);
  const [activeNetworkFilter, setActiveNetworkFilter] = useState<SocialNetwork | null>(null);
  const [activeTypeFilter, setActiveTypeFilter] = useState<ProfileType | null>(null);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      // Filter by tag
      const matchesTag = activeTagFilter
        ? profile.tags.includes(activeTagFilter)
        : true;

      // Filter by network
      const matchesNetwork = activeNetworkFilter
        ? profile.network === activeNetworkFilter
        : true;

      // Filter by profile type
      const matchesType = activeTypeFilter
        ? profile.type === activeTypeFilter
        : true;

      return matchesTag && matchesNetwork && matchesType;
    });
  }, [profiles, activeTagFilter, activeNetworkFilter, activeTypeFilter, tags]);

  const handleTagsChange = (profileId: string, tagIds: string[]) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === profileId ? { ...profile, tags: tagIds } : profile
      )
    );
  };

  const handleCreateTag = (tag: Omit<ProfileGroup, "id">) => {
    const newTag = {
      ...tag,
      id: `tag-${tags.length + 1}`,
    };

    setTags((prevTags) => [...prevTags, newTag]);
    toast({
      title: "Group created",
      description: `${tag.name} has been created successfully.`,
    });
  };

  const handleCreateTagFromSelector = (name: string) => {
    const newTag = {
      id: `tag-${tags.length + 1}`,
      name,
      color: "bg-purple-500",
      useCases: ['analyze'] as UseCase[],
    };
    
    setTags((prevTags) => [...prevTags, newTag]);
    toast({
      title: "Group created",
      description: `${name} has been created successfully.`,
    });
  };

  const handleUpdateGroup = (updatedGroup: ProfileGroup) => {
    setTags((prevTags) =>
      prevTags.map((tag) => (tag.id === updatedGroup.id ? updatedGroup : tag))
    );
    toast({
      title: "Group updated",
      description: `${updatedGroup.name} has been updated successfully.`,
    });
  };

  const handleEditGroup = (group: ProfileGroup) => {
    setSelectedGroup(group);
    setIsEditGroupModalOpen(true);
  };

  const handleFilterByTag = (tagId: string | null) => {
    setActiveTagFilter(activeTagFilter === tagId ? null : tagId);
  };

  const handleFilterByNetwork = (network: SocialNetwork | null) => {
    setActiveNetworkFilter(activeNetworkFilter === network ? null : network);
  };

  const handleFilterByType = (type: ProfileType | null) => {
    setActiveTypeFilter(activeTypeFilter === type ? null : type);
  };

  const handleRemoveUseCase = (profileId: string, useCase: UseCase) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) => {
        if (profile.id === profileId) {
          // Remove the use case from all tags that have it
          const updatedTags = profile.tags.filter((tagId) => {
            const tag = tags.find((t) => t.id === tagId);
            return tag && !tag.useCases.includes(useCase);
          });
          return { ...profile, tags: updatedTags };
        }
        return profile;
      })
    );
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Header
        title="Profile Management"
        subtitle="Manage your social media profiles and groups"
        selectedTags={tags}
        onFilterByTag={handleFilterByTag}
        activeTagFilter={activeTagFilter}
        onOpenCreateTagModal={() => setIsCreateTagModalOpen(true)}
        onFilterByNetwork={handleFilterByNetwork}
        activeNetworkFilter={activeNetworkFilter}
        onEditGroup={handleEditGroup}
        onFilterByType={handleFilterByType}
        activeTypeFilter={activeTypeFilter}
      />
      <div className="mt-8">
        <ProfileTable 
          profiles={filteredProfiles}
          tags={tags}
          onTagsChange={handleTagsChange}
          onCreateTagFromSelector={handleCreateTagFromSelector}
          onAddToGroup={handleTagsChange}
          onRemoveUseCase={handleRemoveUseCase}
        />
      </div>

      <CreateTagModal
        isOpen={isCreateTagModalOpen}
        onClose={() => setIsCreateTagModalOpen(false)}
        onCreateTag={handleCreateTag}
        profiles={profiles}
      />

      {selectedGroup && (
        <EditGroupModal
          isOpen={isEditGroupModalOpen}
          onClose={() => {
            setIsEditGroupModalOpen(false);
            setSelectedGroup(null);
          }}
          group={selectedGroup}
          profiles={profiles}
          onUpdateGroup={handleUpdateGroup}
        />
      )}
      
      <Toaster />
    </div>
  );
};

export default Index;
