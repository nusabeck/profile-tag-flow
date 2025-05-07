export type SocialNetwork = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok';

export type UseCase = 'analyze' | 'orchestrate' | 'engage';

export interface Profile {
  id: string;
  name: string;
  network: SocialNetwork;
  tags: string[];
  avatar: string;
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
    tags: ["tag-1", "tag-2"],
    avatar: "https://ui-avatars.com/api/?name=Global+Retail&background=1877F2&color=fff",
  },
  {
    id: "profile-2",
    name: "Global Retail Brand",
    network: "instagram",
    tags: ["tag-1", "tag-2"],
    avatar: "https://ui-avatars.com/api/?name=Global+Retail&background=E4405F&color=fff",
  },
  {
    id: "profile-3",
    name: "Global Retail Brand",
    network: "twitter",
    tags: ["tag-1", "tag-2"],
    avatar: "https://ui-avatars.com/api/?name=Global+Retail&background=1DA1F2&color=fff",
  },
  {
    id: "profile-4",
    name: "Global Retail Brand",
    network: "linkedin",
    tags: ["tag-1", "tag-2"],
    avatar: "https://ui-avatars.com/api/?name=Global+Retail&background=0A66C2&color=fff",
  },
  {
    id: "profile-5",
    name: "Global Retail Brand",
    network: "youtube",
    tags: ["tag-1", "tag-2"],
    avatar: "https://ui-avatars.com/api/?name=Global+Retail&background=FF0000&color=fff",
  },
  {
    id: "profile-6",
    name: "Global Retail Brand",
    network: "tiktok",
    tags: ["tag-1", "tag-2"],
    avatar: "https://ui-avatars.com/api/?name=Global+Retail&background=000000&color=fff",
  },

  // North America Region
  {
    id: "profile-7",
    name: "North America Retail",
    network: "facebook",
    tags: ["tag-3", "tag-4"],
    avatar: "https://ui-avatars.com/api/?name=NA+Retail&background=1877F2&color=fff",
  },
  {
    id: "profile-8",
    name: "North America Retail",
    network: "instagram",
    tags: ["tag-3", "tag-4"],
    avatar: "https://ui-avatars.com/api/?name=NA+Retail&background=E4405F&color=fff",
  },
  {
    id: "profile-9",
    name: "North America Retail",
    network: "twitter",
    tags: ["tag-3", "tag-4"],
    avatar: "https://ui-avatars.com/api/?name=NA+Retail&background=1DA1F2&color=fff",
  },

  // Europe Region
  {
    id: "profile-10",
    name: "Europe Retail",
    network: "facebook",
    tags: ["tag-5", "tag-6"],
    avatar: "https://ui-avatars.com/api/?name=EU+Retail&background=1877F2&color=fff",
  },
  {
    id: "profile-11",
    name: "Europe Retail",
    network: "instagram",
    tags: ["tag-5", "tag-6"],
    avatar: "https://ui-avatars.com/api/?name=EU+Retail&background=E4405F&color=fff",
  },
  {
    id: "profile-12",
    name: "Europe Retail",
    network: "twitter",
    tags: ["tag-5", "tag-6"],
    avatar: "https://ui-avatars.com/api/?name=EU+Retail&background=1DA1F2&color=fff",
  },

  // Asia Pacific Region
  {
    id: "profile-13",
    name: "Asia Pacific Retail",
    network: "facebook",
    tags: ["tag-7", "tag-8"],
    avatar: "https://ui-avatars.com/api/?name=APAC+Retail&background=1877F2&color=fff",
  },
  {
    id: "profile-14",
    name: "Asia Pacific Retail",
    network: "instagram",
    tags: ["tag-7", "tag-8"],
    avatar: "https://ui-avatars.com/api/?name=APAC+Retail&background=E4405F&color=fff",
  },
  {
    id: "profile-15",
    name: "Asia Pacific Retail",
    network: "tiktok",
    tags: ["tag-7", "tag-8"],
    avatar: "https://ui-avatars.com/api/?name=APAC+Retail&background=000000&color=fff",
  },

  // Product Categories
  {
    id: "profile-16",
    name: "Fashion Collection",
    network: "instagram",
    tags: ["tag-9", "tag-10"],
    avatar: "https://ui-avatars.com/api/?name=Fashion&background=E4405F&color=fff",
  },
  {
    id: "profile-17",
    name: "Fashion Collection",
    network: "tiktok",
    tags: ["tag-9", "tag-10"],
    avatar: "https://ui-avatars.com/api/?name=Fashion&background=000000&color=fff",
  },
  {
    id: "profile-18",
    name: "Home & Living",
    network: "instagram",
    tags: ["tag-11", "tag-12"],
    avatar: "https://ui-avatars.com/api/?name=Home&background=E4405F&color=fff",
  },
  {
    id: "profile-19",
    name: "Home & Living",
    network: "youtube",
    tags: ["tag-11", "tag-12"],
    avatar: "https://ui-avatars.com/api/?name=Home&background=FF0000&color=fff",
  },
  {
    id: "profile-20",
    name: "Electronics",
    network: "youtube",
    tags: ["tag-13", "tag-14"],
    avatar: "https://ui-avatars.com/api/?name=Tech&background=FF0000&color=fff",
  },
  {
    id: "profile-21",
    name: "Electronics",
    network: "twitter",
    tags: ["tag-13", "tag-14"],
    avatar: "https://ui-avatars.com/api/?name=Tech&background=1DA1F2&color=fff",
  },
];

export const defaultTags: ProfileGroup[] = [
  {
    id: "tag-1",
    name: "Global Brand",
    color: "bg-blue-500",
    useCases: ["analyze", "orchestrate", "engage"],
  },
  {
    id: "tag-2",
    name: "Corporate",
    color: "bg-purple-500",
    useCases: ["analyze", "orchestrate"],
  },
  {
    id: "tag-3",
    name: "North America",
    color: "bg-red-500",
    useCases: ["analyze", "engage"],
  },
  {
    id: "tag-4",
    name: "US Market",
    color: "bg-yellow-500",
    useCases: ["analyze", "orchestrate", "engage"],
  },
  {
    id: "tag-5",
    name: "Europe",
    color: "bg-green-500",
    useCases: ["analyze", "engage"],
  },
  {
    id: "tag-6",
    name: "EU Market",
    color: "bg-indigo-500",
    useCases: ["analyze", "orchestrate", "engage"],
  },
  {
    id: "tag-7",
    name: "Asia Pacific",
    color: "bg-pink-500",
    useCases: ["analyze", "engage"],
  },
  {
    id: "tag-8",
    name: "APAC Market",
    color: "bg-orange-500",
    useCases: ["analyze", "orchestrate", "engage"],
  },
  {
    id: "tag-9",
    name: "Fashion",
    color: "bg-teal-500",
    useCases: ["analyze", "orchestrate"],
  },
  {
    id: "tag-10",
    name: "Style & Trends",
    color: "bg-cyan-500",
    useCases: ["analyze", "engage"],
  },
  {
    id: "tag-11",
    name: "Home & Living",
    color: "bg-emerald-500",
    useCases: ["analyze", "orchestrate"],
  },
  {
    id: "tag-12",
    name: "Interior Design",
    color: "bg-violet-500",
    useCases: ["analyze", "engage"],
  },
  {
    id: "tag-13",
    name: "Electronics",
    color: "bg-slate-500",
    useCases: ["analyze", "orchestrate"],
  },
  {
    id: "tag-14",
    name: "Tech Reviews",
    color: "bg-zinc-500",
    useCases: ["analyze", "engage"],
  },
];
