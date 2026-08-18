export type ChronicleMarkerGroup = {
  label: string;
  items: string[];
};

export type ChronicleChapter = {
  id: string;
  number: number;
  kicker: string;
  title: string;
  paragraphs: string[];
  markers?: ChronicleMarkerGroup[];
  callout?: string;
  list?: string[];
  afterList?: string[];
  emphasized?: string[];
};

export function formatChapterIndex(index: number) {
  return String(index).padStart(2, "0");
}

export const chronicleDescription =
  "A journey of ancestry, migration, settlement, and cultural memory across the Indian subcontinent — tracing the roots of the Gorsi clan, the communities they built, and the traditions and stories passed down through generations.";

export const chronicleIntro = [
  "The history of the Gorsi clan is part of the wider story of the Gujjar people of South Asia. Across generations, Gorsi families have lived, migrated, settled, farmed, raised livestock, served their communities, and preserved traditions across the Punjab, Kashmir and surrounding regions.",
  "Much of this history survives through a combination of historical records, colonial-era ethnographic accounts, local traditions, family histories and oral memory. Gorsi Nama brings these sources together as an evolving chronicle — one that can grow as our community discovers and contributes more of its past.",
] as const;

export const chronicleChapters: ChronicleChapter[] = [
  {
    id: "wider-gujjar-story",
    number: 1,
    kicker: "The Wider Gujjar Story",
    title: "Origins of the Gujjar People",
    paragraphs: [
      "The origins of the Gujjar people remain a subject of historical debate.",
      "Historical scholarship has proposed several explanations for the emergence of the Gurjara/Gujjar identity. Some older writers associated the Gujjars with Central Asian migrations and groups such as the Kushans or other peoples who entered northwestern South Asia. Other historians have argued for a more complex development within the Indian subcontinent, involving local populations, migration, political change and the formation of new regional identities.",
      "What can be established with greater confidence is that Gurjara/Gujjar identities were present in northern India by the early medieval period, and that Gujjar communities subsequently became widely distributed across northern and northwestern South Asia.",
      "The precise relationship between the ancient Gurjaras mentioned in early historical sources and every modern Gujjar clan should therefore be treated carefully rather than assumed.",
    ],
  },
  {
    id: "gujjars-of-punjab",
    number: 2,
    kicker: "The Gujjars of Punjab",
    title: "A People Spread Across the Region",
    paragraphs: [
      "Over centuries, Gujjar communities became established throughout the Punjab and neighbouring regions.",
      "By the colonial period, Gujjars were found across a large part of Punjab, including areas corresponding today to Punjab in Pakistan and India, Kashmir, Rawalpindi, Jhelum, Gujrat, Lahore, Sialkot, Gurdaspur and other districts.",
      "Their traditional livelihoods varied by region. Many communities combined pastoralism, agriculture and livestock keeping, while others became increasingly settled cultivators and landholders.",
      "Historical accounts also describe Gujjar society as being organized into numerous clans or gotras, through which families maintained their ancestral identity and social relationships.",
    ],
    markers: [
      {
        label: "Recorded across",
        items: [
          "Punjab (Pakistan and India)",
          "Kashmir",
          "Rawalpindi",
          "Jhelum",
          "Gujrat",
          "Lahore",
          "Sialkot",
          "Gurdaspur",
        ],
      },
    ],
  },
  {
    id: "the-gorsi-clan",
    number: 3,
    kicker: "The Gorsi Clan",
    title: "Gorsi Among the Gujjar Clans",
    paragraphs: [
      "Gorsi appears in historical records as one of the recognized clans of the Gujjar community.",
      "Nineteenth- and early twentieth-century sources documenting the peoples of Punjab list Gorsi alongside other established Gujjar clans, including Khatana, Chechi, Kasana, Kalas, Bhamla and others.",
      "An important point for our own chronicle is that these records demonstrate that Gorsi was an established Gujjar clan by the nineteenth century, but they do not by themselves provide a complete account of when or where the clan first emerged.",
      "That earlier history remains an area for continued research.",
    ],
    markers: [
      {
        label: "Recorded alongside",
        items: ["Khatana", "Chechi", "Kasana", "Kalas", "Bhamla"],
      },
    ],
  },
  {
    id: "punjab-and-kashmir",
    number: 4,
    kicker: "Gorsi Across Punjab & Kashmir",
    title: "Villages, Valleys and New Settlements",
    paragraphs: [
      "Historical and ethnographic material places Gorsi families in different parts of the Punjab and adjoining regions.",
      "Records from the colonial period identify Gorsi communities in several districts, including Gujrat, Rawalpindi, Jhelum, Gurdaspur, Ludhiana, Jalandhar, Lahore and other parts of the wider Punjab region.",
      "Gorsi-related place names also survive in the region. For example, Gorsi is recorded as a locality in Gujrat District, while Gorsian is recorded as a village in Rawalpindi District.",
      "In Jammu and Kashmir, modern ethnographic material also records Gorsi as one of the Gujjar gotras.",
      "Together, these records point toward a geographically dispersed clan whose history developed through generations of movement and settlement.",
    ],
    markers: [
      {
        label: "Districts in the colonial record",
        items: [
          "Gujrat",
          "Rawalpindi",
          "Jhelum",
          "Gurdaspur",
          "Ludhiana",
          "Jalandhar",
          "Lahore",
        ],
      },
      {
        label: "Place names that survive",
        items: [
          "Gorsi, Gujrat District",
          "Gorsian, Rawalpindi District",
          "Jammu and Kashmir",
        ],
      },
    ],
  },
  {
    id: "kotha-gujjran",
    number: 5,
    kicker: "Kotha Gujjran",
    title: "A Place Remembered in Gorsi Tradition",
    paragraphs: [
      "Among the places remembered in our community's history is Kotha Gujjran, in present-day Gujrat District, Punjab, Pakistan.",
      "The village is located near Kharian and remains a predominantly Gujjar settlement. Historical and local accounts describe generations of families connected with agriculture, land and military service, followed in more recent decades by migration to cities and overseas communities.",
      "Community oral tradition holds that Gorsi families have been connected with Kotha Gujjran for generations, and that earlier generations lived a more mobile or forest-based life before establishing permanent settlements.",
    ],
    callout:
      "This part of the story should currently be treated as oral history rather than a firmly dated historical fact.",
    afterList: [
      "Gorsi Nama will continue collecting family records, elders' accounts, land documents, photographs and other evidence to better establish this chapter.",
    ],
  },
  {
    id: "pastoral-to-settlement",
    number: 6,
    kicker: "From Pastoral Life to Settlement",
    title: "Changing Ways of Life",
    paragraphs: [
      "Like many Gujjar communities across northern South Asia, Gorsi families experienced gradual changes in their way of life.",
      "Pastoralism and livestock remained important in many communities, while agriculture and permanent settlement became increasingly significant.",
      "Over generations, families established villages, cultivated land, entered military and government service, pursued education and moved into towns and cities.",
      "The transition was not a single event. It was a gradual transformation shaped by geography, political change, economic opportunity and the choices of individual families.",
    ],
  },
  {
    id: "colonial-record",
    number: 7,
    kicker: "The Colonial Record",
    title: "Gorsi in the Historical Sources",
    paragraphs: [
      "The nineteenth and early twentieth centuries provide some of the earliest relatively detailed written records about the Gorsi clan.",
      "British Indian census and ethnographic works recorded Gorsi among the Gujjar clans of Punjab. H. A. Rose's *A Glossary of the Tribes and Castes of the Punjab and North-West Frontier Province*, based on earlier census work by Denzil Ibbetson and E. D. MacLagan, is one important source.",
      "These records are valuable, but they must also be read critically. They were produced by colonial administrators who categorized communities according to the administrative and ethnographic ideas of their time.",
    ],
    callout:
      "For Gorsi Nama, these documents are sources to examine — not the final definition of our identity.",
  },
  {
    id: "partition-1947",
    number: 8,
    kicker: "1947 and a Changing Punjab",
    title: "Partition and the New Map",
    paragraphs: [
      "The Partition of British India in 1947 transformed the geography of Punjab.",
      "Communities that had lived across the same historical region suddenly found themselves separated by an international border.",
      "For Gujjar families, as for many other communities, this period brought migration, displacement, separation and new settlements.",
      "Families moved between villages, towns and regions, while others remained in their ancestral homes.",
      "The Gorsi story after 1947 therefore became increasingly connected with both continuity and migration.",
    ],
  },
  {
    id: "community-today",
    number: 9,
    kicker: "The Gorsi Community Today",
    title: "From Villages to the World",
    paragraphs: [
      "Today, Gorsi families can be found across Pakistan, India, Kashmir and communities around the world.",
      "The traditional village remains an important part of Gorsi identity, but the community has expanded far beyond its ancestral settlements.",
      "Education, business, agriculture, public service, professional careers and migration have created new paths for successive generations.",
      "Many families now have relatives living in Europe, the Middle East, North America and elsewhere, creating a Gorsi community that is increasingly global.",
    ],
    markers: [
      {
        label: "A community across",
        items: [
          "Pakistan",
          "India",
          "Kashmir",
          "Europe",
          "the Middle East",
          "North America",
        ],
      },
    ],
    emphasized: ["The geography has changed.", "The connection remains."],
  },
  {
    id: "living-heritage",
    number: 10,
    kicker: "Our Living Heritage",
    title: "The Story Is Still Being Written",
    paragraphs: [
      "The history of Gorsi is not contained in a single book.",
      "It lives in:",
    ],
    list: [
      "the stories told by our elders",
      "old family photographs",
      "handwritten records",
      "land documents",
      "village histories",
      "graves and monuments",
      "family trees",
      "migration stories",
      "traditional songs and sayings",
      "memories passed from one generation to another",
    ],
    afterList: [
      "Some chapters are documented.",
      "Some survive only through oral tradition.",
      "And some are still waiting to be discovered.",
      "Gorsi Nama exists to bring these fragments together.",
    ],
  },
];

export const chronicleToc = chronicleChapters.map(({ id, number, kicker }) => ({
  id,
  number,
  kicker,
}));
