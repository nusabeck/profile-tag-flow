
export type SocialNetwork = 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok';

export interface Profile {
  id: string;
  name: string;
  handle: string;
  network: SocialNetwork;
  avatar: string;
  followers: number;
  tags: string[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export const defaultTags: Tag[] = [
  { id: 'tag-1', name: 'Marketing', color: 'bg-purple-500' },
  { id: 'tag-2', name: 'Personal', color: 'bg-blue-500' },
  { id: 'tag-3', name: 'Sales', color: 'bg-green-500' },
  { id: 'tag-4', name: 'Support', color: 'bg-yellow-500' },
  { id: 'tag-5', name: 'Engineering', color: 'bg-red-500' },
];

export const profiles: Profile[] = [
  {
    id: '1',
    name: 'Tech Innovators',
    handle: '@techinnovate',
    network: 'twitter',
    avatar: 'https://ui-avatars.com/api/?name=Tech+Innovators&background=1DA1F2&color=fff',
    followers: 12500,
    tags: ['tag-1', 'tag-5'],
  },
  {
    id: '2',
    name: 'Tech Innovators',
    handle: 'techinnovators',
    network: 'facebook',
    avatar: 'https://ui-avatars.com/api/?name=Tech+Innovators&background=1877F2&color=fff',
    followers: 8700,
    tags: ['tag-1'],
  },
  {
    id: '3',
    name: 'Modern Marketing',
    handle: '@modernmarketing',
    network: 'instagram',
    avatar: 'https://ui-avatars.com/api/?name=Modern+Marketing&background=E4405F&color=fff',
    followers: 34200,
    tags: ['tag-1', 'tag-4'],
  },
  {
    id: '4',
    name: 'Sales Experts',
    handle: 'sales-experts',
    network: 'linkedin',
    avatar: 'https://ui-avatars.com/api/?name=Sales+Experts&background=0A66C2&color=fff',
    followers: 5300,
    tags: ['tag-3'],
  },
  {
    id: '5',
    name: 'Tutorial Masters',
    handle: 'TutorialMasters',
    network: 'youtube',
    avatar: 'https://ui-avatars.com/api/?name=Tutorial+Masters&background=FF0000&color=fff',
    followers: 87500,
    tags: ['tag-5'],
  },
  {
    id: '6',
    name: 'Quick Tips',
    handle: '@quicktips',
    network: 'tiktok',
    avatar: 'https://ui-avatars.com/api/?name=Quick+Tips&background=000000&color=fff',
    followers: 45600,
    tags: ['tag-1', 'tag-2'],
  },
  {
    id: '7',
    name: 'Design Trends',
    handle: '@designtrends',
    network: 'twitter',
    avatar: 'https://ui-avatars.com/api/?name=Design+Trends&background=1DA1F2&color=fff',
    followers: 9300,
    tags: ['tag-5', 'tag-2'],
  },
  {
    id: '8',
    name: 'Customer Support',
    handle: 'customersupport',
    network: 'facebook',
    avatar: 'https://ui-avatars.com/api/?name=Customer+Support&background=1877F2&color=fff',
    followers: 2400,
    tags: ['tag-4'],
  },
];
