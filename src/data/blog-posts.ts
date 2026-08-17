export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  image: string;
  desc: string;
  firstParagraph: string;
  secondParagraph: string;
  category?: string;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const rawPosts: Omit<BlogPost, "slug">[] = [
  {
    title:
      "Welcome to the Gorsi Community Website – Uniting Heritage with Technology",
    author: "AR Gorsi",
    image: "/history__image__4.jpg",
    category: "Community",
    desc: "In today's world, it's more important than ever to stay connected with our roots.",
    firstParagraph:
      "In today's world, it's more important than ever to stay connected with our roots. Our new website, created by and for the Gorsi community, is a unique platform dedicated to preserving and promoting our shared heritage. Here, you can explore the rich history of the Gorsi tribe, learn about our customs, and discover stories passed down through generations. Members are encouraged to create profiles, add content, and engage with others to build a strong and thriving online community. This is just the beginning, and with your feedback, we aim to add even more features to support and empower our tribe!",
    secondParagraph: "",
  },
  {
    title: "Explore the Vibrant Heritage of the Gorsi and Gujjar Communities",
    author: "AR Gorsi",
    image: "/oldhsitory.jpg",
    category: "Heritage",
    desc: "The Gorsi community, a proud part of the broader Gujjar tribe, has a history rich in tradition, resilience, and culture.",
    firstParagraph:
      "The Gorsi community, a proud part of the broader Gujjar tribe, has a history rich in tradition, resilience, and culture. Our website serves as a digital archive and community space where members can discover articles, photos, and other content celebrating the contributions of the Gorsi and Gujjar communities. From folklore and history to local events and festivals, this platform will connect you to your heritage like never before. Whether you're researching family lineage or simply want to learn more, there's something here for every Gorsi community member.",
    secondParagraph: "",
  },
  {
    title: "Join the Gorsi Community – A Place to Share, Connect, and Grow",
    author: "AR Gorsi",
    image: "/people.jpg",
    category: "Stories",
    desc: "This website was created with a simple mission: to be a space where the Gorsi community can share",
    firstParagraph:
      "This website was created with a simple mission: to be a space where the Gorsi community can share, connect, and grow together. Here, members can create their own profiles, post content related to our community, and engage in discussions. As we expand, we'll be adding new functionalities based on your feedback—like forums for in-depth conversations and AI-driven features to enhance your experience. Join us, share your story, and help build a dynamic online home for the Gorsi tribe.",
    secondParagraph: "",
  },
  {
    title: "What's Next for Our Gorsi Community Website?",
    author: "AR Gorsi",
    image: "/writing.jpg",
    category: "Stories",
    desc: "This is just the beginning of our journey",
    firstParagraph:
      "This is just the beginning of our journey. Our website is a foundation for the Gorsi community to connect, communicate, and collaborate online. Soon, we'll be implementing more interactive features, like discussion forums, for members to dive deeper into conversations on topics important to us. We're also exploring advanced functionalities that AI can offer, including tools to support community-based projects and research on our heritage. Our mission is to ensure that this platform evolves to meet the needs of every Gorsi member. Stay tuned, and let us know what features you'd love to see!",
    secondParagraph: "",
  },
];

export const blogPosts: BlogPost[] = rawPosts.map((post) => ({
  ...post,
  slug: slugify(post.title),
}));

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function readingMinutes(post: BlogPost) {
  const text = [post.desc, post.firstParagraph, post.secondParagraph]
    .filter(Boolean)
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

export function authorInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]!.charAt(0)}${parts[1]!.charAt(0)}`.toUpperCase();
  }
  return (parts[0]?.charAt(0) || "G").toUpperCase();
}
