export type SocialNetwork = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok';

export type UseCase = 'analyze' | 'orchestrate' | 'engage';

export type ProfileType = 'public' | 'private';

export interface Profile {
  id: string;
  name: string;
  network: SocialNetwork;
  tags: string[];
  avatar: string;
  type: ProfileType;
}

export interface ProfileGroup {
  id: string;
  name: string;
  color: string;
  useCases: UseCase[];
}

// Mock data for a global retailer with multiple brands and regions
export const profiles: Profile[] = [
  // Global Brand Accounts
  {
    id: "profile-1",
    name: "Global Retail Brand",
    network: "facebook",
    tags: ["1", "2", "5"],
    avatar: "https://ui-avatars.com/api/?name=Global+Retail&background=1877F2&color=fff",
    type: "private",
  },
  {
    id: "profile-2",
    name: "Global Retail Brand",
    network: "instagram",
    tags: ["1", "2", "5"],
    avatar: "https://ui-avatars.com/api/?name=Global+Retail&background=E4405F&color=fff",
    type: "private",
  },
  {
    id: "profile-3",
    name: "Global Retail Brand",
    network: "twitter",
    tags: ["1", "2", "5"],
    avatar: "https://ui-avatars.com/api/?name=Global+Retail&background=1DA1F2&color=fff",
    type: "private",
  },
  {
    id: "profile-4",
    name: "Global Retail Brand",
    network: "linkedin",
    tags: ["1", "2", "5"],
    avatar: "https://ui-avatars.com/api/?name=Global+Retail&background=0A66C2&color=fff",
    type: "private",
  },
  {
    id: "profile-5",
    name: "Global Retail Brand",
    network: "youtube",
    tags: ["1", "2", "5"],
    avatar: "https://ui-avatars.com/api/?name=Global+Retail&background=FF0000&color=fff",
    type: "private",
  },
  {
    id: "profile-6",
    name: "Global Retail Brand",
    network: "tiktok",
    tags: ["1", "2", "5"],
    avatar: "https://ui-avatars.com/api/?name=Global+Retail&background=000000&color=fff",
    type: "private",
  },

  // North America Region
  {
    id: "profile-7",
    name: "North America Retail",
    network: "facebook",
    tags: ["3", "4"],
    avatar: "https://ui-avatars.com/api/?name=NA+Retail&background=1877F2&color=fff",
    type: "private",
  },
  {
    id: "profile-8",
    name: "North America Retail",
    network: "instagram",
    tags: ["3", "4"],
    avatar: "https://ui-avatars.com/api/?name=NA+Retail&background=E4405F&color=fff",
    type: "private",
  },
  {
    id: "profile-9",
    name: "North America Retail",
    network: "twitter",
    tags: ["3", "4"],
    avatar: "https://ui-avatars.com/api/?name=NA+Retail&background=1DA1F2&color=fff",
    type: "private",
  },

  // Europe Region
  {
    id: "profile-10",
    name: "Europe Retail",
    network: "facebook",
    tags: ["2", "6"],
    avatar: "https://ui-avatars.com/api/?name=EU+Retail&background=1877F2&color=fff",
    type: "private",
  },
  {
    id: "profile-11",
    name: "Europe Retail",
    network: "instagram",
    tags: ["2", "6"],
    avatar: "https://ui-avatars.com/api/?name=EU+Retail&background=E4405F&color=fff",
    type: "private",
  },
  {
    id: "profile-12",
    name: "Europe Retail",
    network: "twitter",
    tags: ["2", "6"],
    avatar: "https://ui-avatars.com/api/?name=EU+Retail&background=1DA1F2&color=fff",
    type: "private",
  },

  // Asia Pacific Region
  {
    id: "profile-13",
    name: "Asia Pacific Retail",
    network: "facebook",
    tags: ["7", "8"],
    avatar: "https://ui-avatars.com/api/?name=APAC+Retail&background=1877F2&color=fff",
    type: "private",
  },
  {
    id: "profile-14",
    name: "Asia Pacific Retail",
    network: "instagram",
    tags: ["7", "8"],
    avatar: "https://ui-avatars.com/api/?name=APAC+Retail&background=E4405F&color=fff",
    type: "private",
  },
  {
    id: "profile-15",
    name: "Asia Pacific Retail",
    network: "tiktok",
    tags: ["7", "8"],
    avatar: "https://ui-avatars.com/api/?name=APAC+Retail&background=000000&color=fff",
    type: "private",
  },

  // Product Categories
  {
    id: "profile-16",
    name: "Fashion Collection",
    network: "instagram",
    tags: ["4", "9"],
    avatar: "https://ui-avatars.com/api/?name=Fashion&background=E4405F&color=fff",
    type: "private",
  },
  {
    id: "profile-17",
    name: "Fashion Collection",
    network: "tiktok",
    tags: ["4", "9"],
    avatar: "https://ui-avatars.com/api/?name=Fashion&background=000000&color=fff",
    type: "private",
  },
  {
    id: "profile-18",
    name: "Home & Living",
    network: "instagram",
    tags: ["3", "10"],
    avatar: "https://ui-avatars.com/api/?name=Home&background=E4405F&color=fff",
    type: "private",
  },
  {
    id: "profile-19",
    name: "Home & Living",
    network: "youtube",
    tags: ["3", "10"],
    avatar: "https://ui-avatars.com/api/?name=Home&background=FF0000&color=fff",
    type: "private",
  },
  {
    id: "profile-20",
    name: "Electronics",
    network: "youtube",
    tags: ["2", "5"],
    avatar: "https://ui-avatars.com/api/?name=Tech&background=FF0000&color=fff",
    type: "private",
  },
  {
    id: "profile-21",
    name: "Electronics",
    network: "twitter",
    tags: ["2", "5"],
    avatar: "https://ui-avatars.com/api/?name=Tech&background=1DA1F2&color=fff",
    type: "private",
  },

  // Public Profiles (Competitors & Industry Leaders)
  {
    id: "profile-22",
    name: "Competitor A",
    network: "instagram",
    tags: ["6"],
    avatar: "https://ui-avatars.com/api/?name=Comp+A&background=E4405F&color=fff",
    type: "public",
  },
  {
    id: "profile-23",
    name: "Industry Leader B",
    network: "twitter",
    tags: ["5"],
    avatar: "https://ui-avatars.com/api/?name=Ind+B&background=1DA1F2&color=fff",
    type: "public",
  },
  {
    id: "profile-24",
    name: "Competitor C",
    network: "linkedin",
    tags: ["6"],
    avatar: "https://ui-avatars.com/api/?name=Comp+C&background=0A66C2&color=fff",
    type: "public",
  },
];

export const mockTags: ProfileGroup[] = [
  {
    id: '1',
    name: 'Content Creators',
    color: 'bg-yellow-500',
    useCases: ['orchestrate', 'engage']
  },
  {
    id: '2',
    name: 'Industry Leaders',
    color: 'bg-red-500',
    useCases: ['analyze', 'orchestrate']
  },
  {
    id: '3',
    name: 'Competitors',
    color: 'bg-indigo-500',
    useCases: ['analyze', 'engage']
  },
  {
    id: '4',
    name: 'Influencers',
    color: 'bg-pink-500',
    useCases: ['orchestrate']
  },
  {
    id: '5',
    name: 'Partners',
    color: 'bg-orange-500',
    useCases: ['engage']
  },
  {
    id: '6',
    name: 'Media',
    color: 'bg-teal-500',
    useCases: ['analyze', 'orchestrate', 'engage']
  },
  {
    id: '7',
    name: 'Community',
    color: 'bg-cyan-500',
    useCases: ['engage', 'analyze']
  }
];
