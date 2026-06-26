export default {
  baseURL: "https://backend.sazgt.com/api",
};


export const getHomeUrl = () => {
    return process.env.REACT_APP_BASE_URL;

}

export const imageBase ="https://backend.sazgt.com/storage/images";

export const categoriesFromConfig = [
  "Camp Furniture",
  "Bedding Amenities",
  "Office Furniture",
  "School Furniture",
  "Home Appliances",
  "Outdoor Furnitures",
  "Swimming Pool Furniture"
];

export const subCategoriesFromConfig = {
  "Camp Furniture": [
    "Bunk beds",
    "Single Beds",
    "Steel lockers",
    "Shoe racks",
    "Dining table and chairs"
  ],
  "Bedding Amenities": [],
  "Office Furniture": [
    "Office Chairs",
    "Office Desks",
    "Work Stations",
    "Cabinets",
    "Meeting Tables",
    "Reception Tables",
    "Airport Benches"
  ],
  "School Furniture": [],
  "Home Appliances": [],
  "Outdoor Furnitures": [
    "Sunbeds"
  ],
  "Swimming Pool Furniture": [
    "Sunbeds",
    "Sun Umbrella",
    "Other Products"
  ]

}

export const catDictionory = {
  "camp-furniture": "Camp Furniture",
  "bunk-beds": "Bunk beds",
  "single-beds": "Single Beds",
  "steel-lockers": "Steel lockers",
  "shoe-racks": "Shoe racks",
  "dining-table-and-chairs": "Dining table and chairs",
  "bedding-amenities": "Bedding Amenities",
  "office-furniture": "Office Furniture",
  "office-chairs": "Office Chairs",
  "office-desks": "Office Desks",
  "work-stations": "Work Stations",
  "cabinets": "Cabinets",
  "meeting-tables": "Meeting Tables",
  "reception-tables": "Reception Tables",
  "airport-benches": "Airport Benches",
  "school-furniture": "School Furniture",
  "home-appliances": "Home Appliances",
  "outdoor-furnitures": "Outdoor Furnitures",
  "swimming-pool-furniture": "Swimming Pool Furniture",
  "sunbeds": "Sunbeds",
  "sun-umbrella": "Sun Umbrella",
  "other-products":"Other Products",
  "items": "items",
  "air-conditioners": "items",
  "refrigerators": "items",
  "gas-stoves": "items",
  "microwave-ovens": "items",
  "tvs": "items",
  
}

export const unwantedSubCatMap = [
  "Air Conditioners",
  "Refrigerators",
  "Gas Stoves",
  "Microwave Ovens",
  "TVs"
]

export const productPageDescription = {
  "Camp Furniture": "Durable and versatile labour camp furniture in Dubai and the UAE, including steel bunk beds, steel single beds, steel locker cabinets, and steel shoeracks. Designed for labour camps and temporary staff accommodations, our products provide reliable solutions for labour camp furniture suppliers near you.",

  "Bedding Amenities": "High-quality bedding essentials for labour camp accommodations and residential use, including medicated and medical mattresses. Our mattresses offer superior comfort and support, perfect for staff quarters and labour camp furniture in the UAE.",

  "Office Furniture": "Ergonomic and functional office furniture in Dubai and the UAE, including desks, chairs, steel cupboards, file cabinets, and secure storage lockers. Designed for modern workplaces, our office solutions cater to businesses seeking durable and versatile office furniture in the UAE.",

  "School Furniture": "Sturdy, student-friendly furniture, including training chairs and tables, perfect for enhancing learning environments. Our durable and versatile designs are ideal for schools and educational institutions in Dubai and the UAE.",

  "Home Appliances": "Reliable and efficient home appliances for labour camps and staff accommodations, such as water coolers, cast iron stoves, coin-operated washing machines, and pantry furniture. Our pantry tables and chairs are ideal for labour camp furnishings in Dubai and the UAE.",

  "Outdoor Furnitures": "Durable and weather-resistant outdoor furniture designed for labour camps, staff accommodations, and industrial facilities. Our range includes outdoor tables, shaded seating and sunbeds, built to withstand harsh climate conditions. Ideal for open dining areas, rest zones, and recreational spaces in labour camps across Dubai and the UAE.",

  "Swimming Pool Furniture": "Premium swimming pool furniture designed for hotels, resorts, villas, labour camps, and recreational facilities across Dubai and the UAE. Our collection includes sun loungers, poolside chairs, outdoor tables, umbrellas, and relaxation seating, crafted from durable, weather-resistant materials to withstand the UAE climate. Ideal for pool decks, leisure areas, and outdoor recreation spaces, providing comfort, style, and long-lasting performance."
}


export const getTheCategoryBykebabCase = (kebab) => {
  return catDictionory[kebab];
}

export const toKebabCase = (str) => {
  return str
    .toLowerCase()          // Convert to lowercase
    .replace(/\s+/g, '-')    // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Remove non-alphanumeric characters (optional)
};

export const getSub = (cat) => {
  const subCategories = subCategoriesFromConfig[cat] || [];

  return subCategories[0] ? subCategories[0] : "items";
}

export const getAllSub = (cat) => {
  return subCategoriesFromConfig[cat] || [];
}
