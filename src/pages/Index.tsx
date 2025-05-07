import { useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { profiles as initialProfiles, defaultTags as initialTags, ProfileGroup, Profile, SocialNetwork, UseCase } from "@/data/mockData";
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
  const [activeUseCaseFilter, setActiveUseCaseFilter] = useState<UseCase | null>(null);
  const { toast } = useToast();

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const matchesTag = activeTagFilter
        ? profile.tags.includes(activeTagFilter)
        : true;
      const matchesNetwork = activeNetworkFilter
        ? profile.network === activeNetworkFilter
        : true;
      const matchesUseCase = activeUseCaseFilter
        ? profile.tags.some(tagId => {
            const tag = tags.find(t => t.id === tagId);
            return tag?.useCases.includes(activeUseCaseFilter);
          })
        : true;
      return matchesTag && matchesNetwork && matchesUseCase;
    });
  }, [profiles, activeTagFilter, activeNetworkFilter, activeUseCaseFilter, tags]);

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
      useCases: ['analyze', 'orchestrate', 'engage'] as UseCase[],
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

  const handleFilterByUseCase = (useCase: UseCase | null) => {
    setActiveUseCaseFilter(activeUseCaseFilter === useCase ? null : useCase);
  };

  return (
    <div className="container py-8">
      <Header
        title="Social Profiles"
        subtitle="Manage and organize your connected social media profiles"
        selectedTags={tags}
        onFilterByTag={handleFilterByTag}
        activeTagFilter={activeTagFilter}
        onOpenCreateTagModal={() => setIsCreateTagModalOpen(true)}
        onFilterByNetwork={handleFilterByNetwork}
        activeNetworkFilter={activeNetworkFilter}
        onEditGroup={handleEditGroup}
        onFilterByUseCase={handleFilterByUseCase}
        activeUseCaseFilter={activeUseCaseFilter}
      />

      <ProfileTable 
        profiles={filteredProfiles}
        tags={tags}
        onTagsChange={handleTagsChange}
        onCreateTagFromSelector={handleCreateTagFromSelector}
        onAddToGroup={handleTagsChange}
      />

      <CreateTagModal
        isOpen={isCreateTagModalOpen}
        onClose={() => setIsCreateTagModalOpen(false)}
        onCreateTag={handleCreateTag}
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
