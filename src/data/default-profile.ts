import { UserProfile, UserStats } from '@/types/portfolio';

export const DEFAULT_PROFILE: UserProfile = {
  username: process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'abhijaysingh2006-tech',
  name: 'Abhijay Singh',
  tagline: 'Student doing B.Tech in Robotics & AI',
  bio: 'Full-stack developer building scalable systems end to end, from interface to architecture. I learn by shipping, and every project on my GitHub is a lesson turned into working software.',
  email: 'abhijaysingh2006@gmail.com',
  linkedin: '', // LinkedIn link omitted as portfolio will be shared directly on LinkedIn
  twitter: '',
  location: 'Bangalore, India',
  avatarUrl: 'https://avatars.githubusercontent.com/u/256784757?v=4',
  role: 'Robotics & AI Student · Full-Stack Systems Engineer',
};

export const DEFAULT_STATS: UserStats = {
  totalRepos: 5,
  totalStars: 18,
  commitsThisYear: 384,
  followers: 6,
  following: 8,
  topLanguages: [
    { name: 'TypeScript', count: 18, color: '#3178C6' },
    { name: 'JavaScript', count: 12, color: '#F7DF1E' },
    { name: 'Python', count: 9, color: '#3572A5' },
    { name: 'HTML', count: 4, color: '#E34C26' },
  ],
};
