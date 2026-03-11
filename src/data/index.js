export const PRODUCTS = [
  { id: 1,  name: "Celestial Diamond Ring",    price: 45999,  originalPrice: 52000,  category: "Rings",     stock: 8,  image: "💍", tag: "Bestseller", description: "A stunning solitaire diamond ring crafted in 18k gold, featuring a brilliant-cut 0.75ct diamond set in a classic four-prong setting. Perfect for engagements and special occasions.", material: "18K Gold",                      weight: "3.2g",       rating: 4.9, reviews: 128, images: ["💍","✨","🌟"] },
  { id: 2,  name: "Pearl Drop Earrings",       price: 8999,   originalPrice: 11000,  category: "Earrings",  stock: 15, image: "👑", tag: "New",        description: "Elegant freshwater pearl drop earrings with 14k gold hooks. Each pearl is hand-selected for its lustrous sheen and perfectly round shape.", material: "14K Gold, Freshwater Pearl",    weight: "2.1g",       rating: 4.7, reviews: 89,  images: ["👑","✨","💫"] },
  { id: 3,  name: "Gold Chain Necklace",       price: 32000,  originalPrice: 38000,  category: "Necklaces", stock: 5,  image: "📿", tag: "Premium",    description: "A timeless 22k gold rope chain necklace, 18 inches in length. Handcrafted using traditional Italian techniques for maximum brilliance and durability.", material: "22K Gold",                      weight: "8.5g",       rating: 4.8, reviews: 204, images: ["📿","✨","🌟"] },
  { id: 4,  name: "Diamond Tennis Bracelet",   price: 78500,  originalPrice: 92000,  category: "Bracelets", stock: 3,  image: "✨", tag: "Luxury",     description: "A breathtaking tennis bracelet featuring 42 round brilliant diamonds totaling 3.0 carats, set in a prong setting crafted in 18k white gold.", material: "18K White Gold, Diamonds",      weight: "12.4g",      rating: 5.0, reviews: 67,  images: ["✨","💎","🌟"] },
  { id: 5,  name: "Ruby Floral Earrings",      price: 15500,  originalPrice: 18000,  category: "Earrings",  stock: 10, image: "🌹", tag: "Popular",    description: "Intricate floral stud earrings featuring natural rubies surrounded by diamond halos, set in 18k yellow gold.", material: "18K Gold, Natural Ruby, Diamonds", weight: "4.2g",    rating: 4.6, reviews: 156, images: ["🌹","✨","💫"] },
  { id: 6,  name: "Emerald Pendant",           price: 22000,  originalPrice: 26000,  category: "Necklaces", stock: 7,  image: "💚", tag: "New",        description: "A magnificent emerald pendant featuring a 1.5ct Colombian emerald surrounded by a diamond halo, suspended on an 18k gold chain.", material: "18K Gold, Colombian Emerald",   weight: "5.8g",       rating: 4.8, reviews: 93,  images: ["💚","✨","🌟"] },
  { id: 7,  name: "Sapphire Cocktail Ring",    price: 35000,  originalPrice: 41000,  category: "Rings",     stock: 4,  image: "💙", tag: "Limited",    description: "A bold cocktail ring featuring a 2ct oval Ceylon sapphire flanked by baguette diamonds, set in platinum.", material: "Platinum, Ceylon Sapphire",     weight: "7.1g",       rating: 4.9, reviews: 45,  images: ["💙","✨","💫"] },
  { id: 8,  name: "Gold Bangle Set",           price: 18500,  originalPrice: 22000,  category: "Bracelets", stock: 12, image: "⭕", tag: "Bestseller", description: "A set of three 22k gold bangles with intricate hand-engraved patterns inspired by Mughal architecture.", material: "22K Gold",                      weight: "28g (set)",  rating: 4.7, reviews: 312, images: ["⭕","✨","🌟"] },
  { id: 9,  name: "Diamond Halo Pendant",      price: 56000,  originalPrice: 64000,  category: "Necklaces", stock: 6,  image: "💎", tag: "Premium",    description: "A stunning round brilliant diamond pendant surrounded by a double halo of pave-set diamonds.", material: "18K White Gold, Diamonds",      weight: "4.9g",       rating: 4.9, reviews: 78,  images: ["💎","✨","💫"] },
  { id: 10, name: "Kundan Choker",             price: 12800,  originalPrice: 15500,  category: "Necklaces", stock: 9,  image: "🏵️", tag: "Traditional",description: "A regal Kundan choker necklace handcrafted by master artisans, featuring vibrant precious stones and intricate gold foilwork.", material: "Gold-plated, Kundan Stones",    weight: "45g",        rating: 4.6, reviews: 189, images: ["🏵️","✨","🌟"] },
  { id: 11, name: "Infinity Diamond Band",     price: 28000,  originalPrice: 33000,  category: "Rings",     stock: 11, image: "♾️", tag: "Popular",    description: "A symbol of eternal love - this infinity band features channel-set round diamonds in 14k rose gold.", material: "14K Rose Gold, Diamonds",       weight: "4.5g",       rating: 4.8, reviews: 234, images: ["♾️","✨","💫"] },
  { id: 12, name: "Chandelier Earrings",       price: 9800,   originalPrice: 12000,  category: "Earrings",  stock: 14, image: "🌙", tag: "Trending",   description: "Dramatic chandelier earrings featuring cascading tiers of cubic zirconia in gold-plated sterling silver.", material: "Gold-plated Sterling Silver, CZ", weight: "8.2g",     rating: 4.5, reviews: 167, images: ["🌙","✨","🌟"] },
];

export const CATEGORIES = [
  { id: 1, name: "Rings",     icon: "💍", count: 48, color: "#C9A84C" },
  { id: 2, name: "Earrings",  icon: "👑", count: 72, color: "#9A7A30" },
  { id: 3, name: "Necklaces", icon: "📿", count: 56, color: "#C9A84C" },
  { id: 4, name: "Bracelets", icon: "✨", count: 34, color: "#9A7A30" },
];

export const ORDERS = [
  { id: "#JHA-2401", customer: "Priya Sharma",  product: "Diamond Tennis Bracelet",  amount: 78500, status: "Delivered",  date: "2024-01-15", items: 1 },
  { id: "#JHA-2402", customer: "Anita Verma",   product: "Celestial Diamond Ring",   amount: 45999, status: "Processing", date: "2024-01-16", items: 2 },
  { id: "#JHA-2403", customer: "Meera Patel",   product: "Gold Chain Necklace",      amount: 32000, status: "Shipped",    date: "2024-01-17", items: 1 },
  { id: "#JHA-2404", customer: "Sunita Rao",    product: "Pearl Drop Earrings",      amount: 8999,  status: "Processing", date: "2024-01-17", items: 3 },
  { id: "#JHA-2405", customer: "Kavita Singh",  product: "Emerald Pendant",          amount: 22000, status: "Cancelled",  date: "2024-01-18", items: 1 },
  { id: "#JHA-2406", customer: "Deepika Nair",  product: "Gold Bangle Set",          amount: 18500, status: "Delivered",  date: "2024-01-18", items: 2 },
];

export const CUSTOMERS = [
  { id: 1, name: "Priya Sharma",  email: "priya@email.com",  phone: "9876543210", orders: 5, total: 145000, joined: "2023-06-15" },
  { id: 2, name: "Anita Verma",   email: "anita@email.com",  phone: "9876543211", orders: 3, total: 78000,  joined: "2023-08-22" },
  { id: 3, name: "Meera Patel",   email: "meera@email.com",  phone: "9876543212", orders: 7, total: 234000, joined: "2023-03-10" },
  { id: 4, name: "Sunita Rao",    email: "sunita@email.com", phone: "9876543213", orders: 2, total: 45000,  joined: "2023-11-05" },
  { id: 5, name: "Kavita Singh",  email: "kavita@email.com", phone: "9876543214", orders: 4, total: 98000,  joined: "2023-09-18" },
];

export const COUPONS = [
  { id: 1, code: "JHA10",     discount: 10,  type: "percentage", minOrder: 5000,  status: "Active"  },
  { id: 2, code: "FESTIVE20", discount: 20,  type: "percentage", minOrder: 10000, status: "Active"  },
  { id: 3, code: "FLAT500",   discount: 500, type: "flat",       minOrder: 3000,  status: "Expired" },
];

export const STATUS_COLORS = {
  Processing: "#E8A020",
  Shipped:    "#2563EB",
  Delivered:  "#16A34A",
  Cancelled:  "#DC2626",
};

export const WA_NUMBER = "917982272872";
export const BRAND     = "JHA Jewellery";
export const ADDRESS   = "Plot 12, Sector 18, Noida, Delhi NCR - 201301";
export const PHONE     = "+91 79822 72872";
export const EMAIL     = "hello@jhajewellery.com";
