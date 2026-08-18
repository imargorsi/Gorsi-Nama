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
  { id: "bilal-gorsi", name: "Bilal Gorsi", membershipId: "213" },
  { id: "rabia-gorsi", name: "Rabia Gorsi", membershipId: "214" },
  { id: "hassan-gorsi", name: "Hassan Gorsi", membershipId: "215" },
  { id: "nida-gorsi", name: "Nida Gorsi", membershipId: "216" },
  { id: "omar-gorsi", name: "Omar Gorsi", membershipId: "217" },
  { id: "zainab-gorsi", name: "Zainab Gorsi", membershipId: "218" },
  { id: "faisal-gorsi", name: "Faisal Gorsi", membershipId: "219" },
  { id: "hina-gorsi", name: "Hina Gorsi", membershipId: "220" },
  { id: "javed-gorsi", name: "Javed Gorsi", membershipId: "221" },
  { id: "maryam-gorsi", name: "Maryam Gorsi", membershipId: "222" },
  { id: "shahid-gorsi", name: "Shahid Gorsi", membershipId: "223" },
  { id: "asma-gorsi", name: "Asma Gorsi", membershipId: "224" },
];

export const memberDirectoryInitialCount = 12;
export const memberDirectoryLoadCount = 4;

export function getPlaceholderMember(id: string) {
  return placeholderMembers.find((member) => member.id === id);
}
