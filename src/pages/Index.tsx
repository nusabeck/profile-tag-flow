
import { useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { profiles as initialProfiles, defaultTags as initialTags, Tag, Profile } from "@/data/mockData";
import ProfileTable from "@/components/ProfileTable";
import Header from "@/components/Header";
import CreateTagModal from "@/components/CreateTagModal";
import { Toaster } from "sonner";

const Index = () => {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [isCreateTagModalOpen, setIsCreateTagModalOpen] = useState(false);
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredProfiles = useMemo(() => {
    if (!activeTagFilter) {
      return profiles;
    }
    return profiles.filter((profile) => profile.tags.includes(activeTagFilter));
  }, [profiles, activeTagFilter]);

  const handleTagsChange = (profileId: string, tagIds: string[]) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === profileId ? { ...profile, tags: tagIds } : profile
      )
    );
  };

  const handleCreateTag = (tag: Omit<Tag, "id">) => {
    const newTag = {
      ...tag,
      id: `tag-${tags.length + 1}`,
    };

    setTags((prevTags) => [...prevTags, newTag]);
    toast({
      title: "Tag created",
      description: `${tag.name} has been created successfully.`,
    });
  };

  const handleCreateTagFromSelector = (name: string) => {
    const newTag = {
      id: `tag-${tags.length + 1}`,
      name,
      color: "bg-purple-500",
    };
    
    setTags((prevTags) => [...prevTags, newTag]);
    toast({
      title: "Tag created",
      description: `${name} has been created successfully.`,
    });
  };

  const handleFilterByTag = (tagId: string | null) => {
    setActiveTagFilter(tagId);
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
      />

      <ProfileTable 
        profiles={filteredProfiles}
        tags={tags}
        onTagsChange={handleTagsChange}
        onCreateTagFromSelector={handleCreateTagFromSelector}
      />

      <CreateTagModal
        isOpen={isCreateTagModalOpen}
        onClose={() => setIsCreateTagModalOpen(false)}
        onCreateTag={handleCreateTag}
      />
      
      <Toaster />
    </div>
  );
};

export default Index;
