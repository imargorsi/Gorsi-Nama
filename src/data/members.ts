export type PlaceholderMember = {
  id: string;
  name: string;
  membershipId: string;
  image?: string;
};

export const placeholderMembers: PlaceholderMember[] = [
  { id: "haji-abdul-rahman", name: "Haji Abdul Rahman", membershipId: "201" },
  { id: "samina-bano", name: "Samina Bano", membershipId: "202" },
  { id: "ar-gorsi", name: "AR Gorsi", membershipId: "203" },
  { id: "nadia-gorsi", name: "Nadia Gorsi", membershipId: "204" },
  { id: "imran-gorsi", name: "Imran Gorsi", membershipId: "205" },
  { id: "farah-gorsi", name: "Farah Gorsi", membershipId: "206" },
  { id: "khalid-gorsi", name: "Khalid Gorsi", membershipId: "207" },
  { id: "ayesha-gorsi", name: "Ayesha Gorsi", membershipId: "208" },
  { id: "tariq-gorsi", name: "Tariq Gorsi", membershipId: "209" },
  { id: "sana-gorsi", name: "Sana Gorsi", membershipId: "210" },
  { id: "usman-gorsi", name: "Usman Gorsi", membershipId: "211" },
  { id: "mehwish-gorsi", name: "Mehwish Gorsi", membershipId: "212" },
];

export function getPlaceholderMember(id: string) {
  return placeholderMembers.find((member) => member.id === id);
}
