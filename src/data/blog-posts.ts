import type { BlogCategoryId } from "@/components/blog/blog-categories";
import type { BlogStatus } from "@/components/blog/blog.schemas";
import { slugify } from "@/lib/slugify";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  categoryId: BlogCategoryId;
  tags: string[];
  featuredImage?: string;
  status: BlogStatus;
  authorName: string;
  authorId?: string;
  publishedAt?: string;
  updatedAt: string;
};

const rawPosts: Omit<BlogPost, "slug">[] = [
  {
    id: "seed-welcome",
    title:
      "Welcome to the Gorsi Community Website – Uniting Heritage with Technology",
    authorName: "AR Gorsi",
    featuredImage: "/history__image__4.jpg",
    categoryId: "community",
    tags: ["Gorsi", "Community"],
    excerpt:
      "In today's world, it's more important than ever to stay connected with our roots.",
    content:
      "In today's world, it's more important than ever to stay connected with our roots. Our new website, created by and for the Gorsi community, is a unique platform dedicated to preserving and promoting our shared heritage. Here, you can explore the rich history of the Gorsi tribe, learn about our customs, and discover stories passed down through generations. Members are encouraged to create profiles, add content, and engage with others to build a strong and thriving online community. This is just the beginning, and with your feedback, we aim to add even more features to support and empower our tribe!",
    status: "publish",
    publishedAt: "2024-03-12T10:00:00.000Z",
    updatedAt: "2024-03-12T10:00:00.000Z",
  },
  {
    id: "seed-heritage",
    title: "Explore the Vibrant Heritage of the Gorsi and Gujjar Communities",
    authorName: "AR Gorsi",
    featuredImage: "/oldhsitory.jpg",
    categoryId: "heritage",
    tags: ["Heritage", "Gorsi"],
    excerpt:
      "The Gorsi community, a proud part of the broader Gujjar tribe, has a history rich in tradition, resilience, and culture.",
    content:
      "The Gorsi community, a proud part of the broader Gujjar tribe, has a history rich in tradition, resilience, and culture. Our website serves as a digital archive and community space where members can discover articles, photos, and other content celebrating the contributions of the Gorsi and Gujjar communities. From folklore and history to local events and festivals, this platform will connect you to your heritage like never before. Whether you're researching family lineage or simply want to learn more, there's something here for every Gorsi community member.",
    status: "publish",
    publishedAt: "2024-04-02T10:00:00.000Z",
    updatedAt: "2024-04-02T10:00:00.000Z",
  },
  {
    id: "seed-join",
    title: "Join the Gorsi Community – A Place to Share, Connect, and Grow",
    authorName: "AR Gorsi",
    featuredImage: "/people.jpg",
    categoryId: "family",
    tags: ["Family", "Community"],
    excerpt:
      "This website was created with a simple mission: to be a space where the Gorsi community can share.",
    content:
      "This website was created with a simple mission: to be a space where the Gorsi community can share, connect, and grow together. Here, members can create their own profiles, post content related to our community, and engage in discussions. As we expand, we'll be adding new functionalities based on your feedback—like forums for in-depth conversations and AI-driven features to enhance your experience. Join us, share your story, and help build a dynamic online home for the Gorsi tribe.",
    status: "publish",
    publishedAt: "2024-05-18T10:00:00.000Z",
    updatedAt: "2024-05-18T10:00:00.000Z",
  },
  {
    id: "seed-whats-next",
    title: "What's Next for Our Gorsi Community Website?",
    authorName: "AR Gorsi",
    featuredImage: "/writing.jpg",
    categoryId: "history",
    tags: ["Gorsi", "History"],
    excerpt: "This is just the beginning of our journey.",
    content:
      "This is just the beginning of our journey. Our website is a foundation for the Gorsi community to connect, communicate, and collaborate online. Soon, we'll be implementing more interactive features, like discussion forums, for members to dive deeper into conversations on topics important to us. We're also exploring advanced functionalities that AI can offer, including tools to support community-based projects and research on our heritage. Our mission is to ensure that this platform evolves to meet the needs of every Gorsi member. Stay tuned, and let us know what features you'd love to see!",
    status: "publish",
    publishedAt: "2024-06-09T10:00:00.000Z",
    updatedAt: "2024-06-09T10:00:00.000Z",
  },
];

export const blogPosts: BlogPost[] = rawPosts.map((post) => ({
  ...post,
  slug: slugify(post.title),
}));

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function readingMinutes(post: Pick<BlogPost, "excerpt" | "content">) {
  const words = [post.excerpt, post.content]
    .filter(Boolean)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

export function excerptFromContent(content: string) {
  const text = content.trim().replace(/\s+/g, " ");
  if (text.length <= 180) return text;
  return `${text.slice(0, 177).trimEnd()}…`;
}
