export default {
  baseURL: "https://gobartsdev.com/api",
};


export const getHomeUrl = () => {
    return process.env.REACT_APP_BASE_URL;

}

export const imageBase ="https://gobartsdev.com/storage/images";

export const categoriesFromConfig = [
  "Camp Furniture",
  "Bedding Amenities",
  "Office Furniture",
  "School Furniture",
  "Home Appliances"
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
    "Reception Tables"
  ],
  "School Furniture": [],
  "Home Appliances": []

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
  "school-furniture": "School Furniture",
  "home-appliances": "Home Appliances",
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

  "Home Appliances": "Reliable and efficient home appliances for labour camps and staff accommodations, such as water coolers, cast iron stoves, coin-operated washing machines, and pantry furniture. Our pantry tables and chairs are ideal for labour camp furnishings in Dubai and the UAE."
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
  if(subCategoriesFromConfig[cat][0]){
      return subCategoriesFromConfig[cat][0];
  } else {
      return 'items';
  }
}

export const getAllSub = (cat) => {
  return subCategoriesFromConfig[cat];
}