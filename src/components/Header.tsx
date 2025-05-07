import { Plus, Settings, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileGroup, SocialNetwork, UseCase } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  title: string;
  subtitle: string;
  selectedTags: ProfileGroup[];
  onFilterByTag: (tagId: string | null) => void;
  activeTagFilter: string | null;
  onOpenCreateTagModal: () => void;
  onFilterByNetwork: (network: SocialNetwork | null) => void;
  activeNetworkFilter: SocialNetwork | null;
  onEditGroup: (group: ProfileGroup) => void;
  onFilterByUseCase: (useCase: UseCase | null) => void;
  activeUseCaseFilter: UseCase | null;
}

const socialNetworks: { value: SocialNetwork; label: string }[] = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
];

const useCaseOptions: { value: UseCase; label: string }[] = [
  { value: 'analyze', label: 'Analyze' },
  { value: 'orchestrate', label: 'Orchestrate' },
  { value: 'engage', label: 'Engage' },
];

const Header = ({
  title,
  subtitle,
  selectedTags,
  onFilterByTag,
  activeTagFilter,
  onOpenCreateTagModal,
  onFilterByNetwork,
  activeNetworkFilter,
  onEditGroup,
  onFilterByUseCase,
  activeUseCaseFilter,
}: HeaderProps) => {
  return (
    <div className="space-y-6">
      {/* Title and Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <Button onClick={onOpenCreateTagModal}>
          <Plus className="mr-2 h-4 w-4" />
          Create Profilegroup
        </Button>
      </div>

      {/* Network Filters */}
      <div>
        <h2 className="text-sm font-medium mb-2">Filter by Network</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeNetworkFilter === null && activeTagFilter === null && activeUseCaseFilter === null ? "secondary" : "outline"}
            onClick={() => {
              onFilterByNetwork(null);
              onFilterByTag(null);
              onFilterByUseCase(null);
            }}
          >
            All Profiles
          </Button>
          {socialNetworks.map((network) => (
            <Button
              key={network.value}
              size="sm"
              variant={activeNetworkFilter === network.value ? "secondary" : "outline"}
              onClick={() => onFilterByNetwork(network.value)}
            >
              {network.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Use Case Filters */}
      <div>
        <h2 className="text-sm font-medium mb-2">Filter by Use Case</h2>
        <div className="flex flex-wrap gap-2">
          {useCaseOptions.map((useCase) => (
            <Button
              key={useCase.value}
              size="sm"
              variant={activeUseCaseFilter === useCase.value ? "secondary" : "outline"}
              onClick={() => onFilterByUseCase(useCase.value)}
            >
              {useCase.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Profile Groups */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-medium">Profile Groups</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Button
              key={tag.id}
              size="sm"
              variant={activeTagFilter === tag.id ? "secondary" : "outline"}
              onClick={() => onFilterByTag(tag.id)}
              className="flex items-center gap-2 group"
            >
              <span
                className={`h-2 w-2 rounded-full ${tag.color}`}
                aria-hidden="true"
              />
              {tag.name}
              <Button
                variant="ghost"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditGroup(tag);
                }}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
