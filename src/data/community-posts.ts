import type { CommunityCategoryId } from "@/components/community/community-categories";

export interface CommunityPost {
  id: string;
  authorId?: string;
  authorName: string;
  createdAt: string;
  categoryId: CommunityCategoryId;
  body: string;
  tags: string[];
  images: string[];
  likeCount: number;
  saveCount: number;
  linkUrl?: string;
}

function hoursAgo(hours: number) {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

// Placeholder preview posts for the Community Pulse / Feed UI.
// Post rows are not persisted yet. Composer photos go to R2 — see doc/community-feed.md.
export const communityPosts: CommunityPost[] = [
  {
    id: "post-1",
    authorName: "Haji Abdul Rahman",
    createdAt: hoursAgo(2),
    categoryId: "our-stories",
    body: "My grandfather used to tell us stories about our village in Poonch. Life was simple, but people were full of love and respect for each other.",
    tags: ["Memories", "Poonch", "Gorsi", "Family"],
    images: ["/history__image__3.jpg"],
    likeCount: 24,
    saveCount: 8,
  },
  {
    id: "post-2",
    authorName: "Samina Bano",
    createdAt: hoursAgo(5),
    categoryId: "places-communities",
    body: "Beautiful view of our ancestral village during spring. Nothing beats the peace of our mountains.",
    tags: ["VillageLife", "Mountains", "Poonch", "Gorsi"],
    images: ["/history__image__4.jpg", "/fortimage.jpg", "/people.jpg"],
    likeCount: 78,
    saveCount: 21,
  },
  {
    id: "post-3",
    authorName: "AR Gorsi",
    createdAt: hoursAgo(8),
    categoryId: "history-heritage",
    body: "The Gorsi clan is a subgroup of the Gujjars. We settled across Punjab, Azad Kashmir, and Khyber Pakhtunkhwa — carrying a pastoral and agricultural tradition forward.",
    tags: ["History", "Heritage", "Gorsi"],
    images: ["/oldhsitory.jpg"],
    likeCount: 41,
    saveCount: 16,
  },
  {
    id: "post-4",
    authorName: "Nadia Gorsi",
    createdAt: hoursAgo(14),
    categoryId: "discussions",
    body: "How did your family keep Gojri alive at home? I would love to hear the phrases, lullabies, or stories that were passed down — even a few words matter.",
    tags: ["Gojri", "Language", "Family"],
    images: ["/people.jpg"],
    likeCount: 33,
    saveCount: 11,
  },
  {
    id: "post-5",
    authorName: "Imran Gorsi",
    createdAt: hoursAgo(20),
    categoryId: "language-traditions",
    body: "Weddings, harvest days, and the small courtesies at the door — these are the traditions that still make a Gorsi house feel like home, wherever we live now.",
    tags: ["Traditions", "Family", "Gorsi"],
    images: ["/writing.jpg"],
    likeCount: 19,
    saveCount: 6,
  },
  {
    id: "post-6",
    authorName: "Farah Gorsi",
    createdAt: hoursAgo(28),
    categoryId: "our-stories",
    body: "A photograph from my father's first journey to the city. He kept this print in a tin box with our family papers. I am sharing it so it is not only a drawer memory.",
    tags: ["OldPhotos", "Migration", "Memories"],
    images: ["/history_img.png"],
    likeCount: 52,
    saveCount: 18,
  },
  {
    id: "post-7",
    authorName: "Saeed Gorsi",
    createdAt: hoursAgo(32),
    categoryId: "places-communities",
    body: "The evening bazaar in our town still smells of fresh bread and woodsmoke. I walk it whenever I am home, and it feels like the same street my uncles knew.",
    tags: ["VillageLife", "Punjab", "Memories"],
    images: ["/fortimage.jpg", "/history__image__4.jpg"],
    likeCount: 27,
    saveCount: 9,
  },
  {
    id: "post-8",
    authorName: "Ayesha Gorsi",
    createdAt: hoursAgo(40),
    categoryId: "history-heritage",
    body: "We found this ledger in my grandmother's trunk — names, herds, and a few lines of Gojri in the margins. Small records, big belonging.",
    tags: ["Heritage", "OldPhotos", "Family"],
    images: ["/history2.png"],
    likeCount: 61,
    saveCount: 22,
  },
  {
    id: "post-9",
    authorName: "Bilal Gorsi",
    createdAt: hoursAgo(48),
    categoryId: "language-traditions",
    body: "If you still greet elders the old way, write the phrase below. I am collecting the greetings we use from Poonch to the cities.",
    tags: ["Gojri", "Traditions", "Gorsi"],
    images: ["/hero.jpg"],
    likeCount: 38,
    saveCount: 14,
  },
  {
    id: "post-10",
    authorName: "Maryam Gorsi",
    createdAt: hoursAgo(56),
    categoryId: "our-stories",
    body: "My mother kept this photograph on the mantel. Every Eid she would tell us who was standing where, and why the youngest always sat in front.",
    tags: ["Family", "Memories", "OldPhotos"],
    images: ["/emoire.webp"],
    likeCount: 44,
    saveCount: 13,
  },
  {
    id: "post-11",
    authorName: "Tariq Gorsi",
    createdAt: hoursAgo(64),
    categoryId: "discussions",
    body: "What should a first visit to the ancestral village include? I am taking my children next spring and I want the day to feel complete, not rushed.",
    tags: ["Family", "VillageLife", "Heritage"],
    images: ["/book.jpg"],
    likeCount: 29,
    saveCount: 11,
  },
  {
    id: "post-12",
    authorName: "Hina Gorsi",
    createdAt: hoursAgo(72),
    categoryId: "places-communities",
    body: "From the ridge above town the roofs look like they have always been there. I took this on a quiet Friday after prayers.",
    tags: ["Mountains", "Poonch", "Gorsi"],
    images: ["/default.jpg"],
    likeCount: 36,
    saveCount: 10,
  },
];

export function formatRelativeTime(iso: string) {
  const deltaMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.max(0, Math.floor(deltaMs / 60000));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

export function extractPostLink(body: string, linkUrl?: string) {
  if (linkUrl) return linkUrl;
  const match = body.match(/https?:\/\/[^\s]+/);
  return match?.[0];
}
