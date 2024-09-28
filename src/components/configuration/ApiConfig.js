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
  "items": "items"
}


export const productPageDescription = {
  "Camp Furniture": "Durable and versatile labor camp furniture, including steel bunk beds, steel single beds, steel locker cabinets, and steel shoeracks, designed for temporary accommodations and staff quarters.",

  "Bedding Amenities": "High-quality bedding essentials, including medicated and medical mattresses, providing comfort and support for staff accommodation and residential use.",

  "Office Furniture": "Ergonomic and functional office solutions, such as desks, chairs, steel cupboards, file cabinets, and secure storage lockers, tailored for modern workplaces.",

  "School Furniture": "Sturdy and student-friendly furniture, including training chairs and tables, designed to enhance learning environments with durable and versatile designs.",

  "Home Appliances": "Reliable and efficient home essentials, such as water coolers, cast iron stoves, coin-operated washing machines, and pantry furniture like pantry tables and chairs, perfect for everyday needs in staff accommodations and residential settings."
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