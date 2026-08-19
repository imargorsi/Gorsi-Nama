export type NotablePerson = {
  id: string;
  name: string;
  role: string;
  summary: string;
  image: string;
};

export const notablePeople: NotablePerson[] = [
  {
    id: "ch-rehman-ali",
    name: "CH Rehman Ali",
    role: "Community elder",
    summary:
      "This record is still being gathered. Names and stories of notable Gorsi people will live here as families contribute them.",
    image: "/people.jpg",
  },
  {
    id: "haji-abdul-rahman",
    name: "Haji Abdul Rahman",
    role: "Oral historian",
    summary:
      "Placeholder portrait for the notable-people directory. Join Gujjar Nama to help complete this biography.",
    image: "/history__image__3.jpg",
  },
  {
    id: "samina-bano",
    name: "Samina Bano",
    role: "Community voice",
    summary:
      "Placeholder portrait for the notable-people directory. Records like this will be replaced with verified accounts.",
    image: "/history__image__4.jpg",
  },
  {
    id: "farah-gorsi",
    name: "Farah Gorsi",
    role: "Family archivist",
    summary:
      "Placeholder portrait for the notable-people directory. Photographs and papers from member families will fill these pages.",
    image: "/history_img.png",
  },
];
