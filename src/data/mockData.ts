import {
  TUser,
  TCategory,
  TProduct,
  TPage,
  TDocument,
  TSetting,
} from "@/types";

export const mockUsers: TUser[] = [
  {
    id: "1",
    fullName: "Alex Thompson",
    email: "alex@nexus.com",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    fullName: "Sarah Miller",
    email: "sarah@nexus.com",
    role: "ADMIN",
    status: "INACTIVE",
    createdAt: "2024-02-10",
  },
  {
    id: "3",
    fullName: "John Doe",
    email: "john@nexus.com",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: "2024-02-20",
  },
  {
    id: "4",
    fullName: "Emma Wilson",
    email: "emma@nexus.com",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    createdAt: "2024-03-01",
  },
];

export const mockCategories: TCategory[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Modern gadgets and computing devices",
    productCount: 124,
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    name: "Accessories",
    description: "Peripheral items and add-ons",
    productCount: 56,
    createdAt: "2024-01-12",
  },
  {
    id: "3",
    name: "Audio",
    description: "Headphones, speakers and sound systems",
    productCount: 89,
    createdAt: "2024-01-15",
  },
  {
    id: "4",
    name: "Home Appliances",
    description: "Devices for household usage",
    productCount: 32,
    createdAt: "2024-01-18",
  },
  {
    id: "5",
    name: "Wearables",
    description: "Smartwatches and fitness trackers",
    productCount: 41,
    createdAt: "2024-01-20",
  },
  {
    id: "6",
    name: "Gaming",
    description: "Consoles and gaming peripherals",
    productCount: 67,
    createdAt: "2024-01-25",
  },
  {
    id: "7",
    name: "Networking",
    description: "Routers, switches and networking gear",
    productCount: 15,
    createdAt: "2024-02-01",
  },
  {
    id: "8",
    name: "Photography",
    description: "Cameras and lenses",
    productCount: 28,
    createdAt: "2024-02-05",
  },
];

export const mockProducts: TProduct[] = [
  {
    id: "1",
    sku: "APL-MBP-M3",
    barcode: "1234567890123",
    name: "MacBook Pro M3",
    description: "The most powerful MacBook Pro ever",
    categoryId: "1",
    categoryName: "Electronics",
    brand: "Apple",
    manufacturer: "Apple Inc.",
    weight: "1.6 kg",
    dimensions: "31.26 x 22.12 x 1.55 cm",
    tags: ["laptop", "apple", "macbook"],
    isFeatured: true,
    basePrice: 2499,
    costPrice: 2000,
    discountPrice: 2299,
    stockUnits: 45,
    lowStockAlert: 10,
    metaTitle: "MacBook Pro M3 - Apple",
    metaDescription: "Buy the new MacBook Pro M3",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    ],
    createdAt: "2024-02-15",
  },
  {
    id: "2",
    sku: "APL-IP15-PRO",
    barcode: "1234567890124",
    name: "iPhone 15 Pro",
    description: "The ultimate iPhone experience",
    categoryId: "1",
    categoryName: "Electronics",
    brand: "Apple",
    manufacturer: "Apple Inc.",
    weight: "187g",
    dimensions: "146.6 x 70.6 x 8.25 mm",
    tags: ["phone", "apple", "iphone"],
    isFeatured: true,
    basePrice: 999,
    costPrice: 750,
    stockUnits: 120,
    lowStockAlert: 20,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    ],
    createdAt: "2024-02-18",
  },
  {
    id: "3",
    sku: "LOG-MX-MS3S",
    barcode: "1234567890125",
    name: "Logitech MX Master 3S",
    description: "Advanced wireless mouse for productivity",
    categoryId: "2",
    categoryName: "Accessories",
    brand: "Logitech",
    manufacturer: "Logitech Inc.",
    weight: "141g",
    dimensions: "12.49 x 8.43 x 5.1 cm",
    tags: ["mouse", "logitech", "wireless"],
    isFeatured: false,
    basePrice: 99,
    costPrice: 60,
    stockUnits: 5,
    lowStockAlert: 10,
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    ],
    createdAt: "2024-02-20",
  },
];

export const mockPages: TPage[] = [
  {
    id: "1",
    title: "About Us",
    slug: "about-us",
    content: "<h1>About Us</h1><p>Welcome to our company.</p>",
    status: "PUBLISHED",
    createdAt: "2024-01-10",
    updatedAt: "2024-03-05",
  },
];

export const mockDocuments: TDocument[] = [
  {
    id: "1",
    title: "Q3 Financial Report",
    fileName: "q3-financial-report.pdf",
    fileType: "PDF",
    size: "2.4 MB",
    owner: "Alex Thompson",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-15",
  },
  {
    id: "2",
    title: "Product Roadmap 2024",
    fileName: "product-roadmap-2024.docx",
    fileType: "DOCX",
    size: "1.1 MB",
    owner: "Sarah Miller",
    createdAt: "2024-03-12",
    updatedAt: "2024-03-12",
  },
];

export const mockSettings: TSetting[] = [
  {
    id: "1",
    configKey: "auth_session_timeout",
    description: "Duration of an active user session.",
    configData: { timeout: 3600000 },
    createdAt: "2024-01-01",
    updatedAt: "2024-03-01",
  },
];

export const platformGrowthData = [
  { month: "Jan", users: 2500 },
  { month: "Feb", users: 1800 },
  { month: "Mar", users: 9800 },
  { month: "Apr", users: 7200 },
  { month: "May", users: 5500 },
  { month: "Jun", users: 4800 },
  { month: "Jul", users: 4200 },
];

export const categorySplitData = [
  { name: "Electronics", value: 124, color: "#6366f1" },
  { name: "Accessories", value: 56, color: "#22c55e" },
  { name: "Audio", value: 89, color: "#f59e0b" },
  { name: "Home Appliances", value: 32, color: "#ef4444" },
  { name: "Wearables", value: 41, color: "#8b5cf6" },
];
