import { ProductShowcase } from "@/types/product-showcase";

export const productShowcases: ProductShowcase[] = [
  {
    id: "urban-runners",
    category: "Urban Collection",
    title: "City Street Runners",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    user: {
      name: "SneakerNinja",
      avatar: "🥷",
    },
  },
  {
    id: "premium-leather",
    category: "Premium Collection",
    title: "Luxury Leather Craft",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    user: {
      name: "DesignQueen",
      avatar: "👑",
    },
  },
  {
    id: "retro-vintage",
    category: "Limited Edition",
    title: "Retro Vintage Vibes",
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    buttonText: "Design Now",
    buttonAction: "start-design",
    user: {
      name: "RetroKid",
      avatar: "😎",
    },
  },
  // Second set of cards
  {
    id: "sport-performance",
    category: "Performance",
    title: "Athletic Excellence",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    user: {
      name: "SportyFox",
      avatar: "🦊",
    },
  },
  {
    id: "eco-friendly",
    category: "Eco Collection",
    title: "Sustainable Style",
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    user: {
      name: "EcoWarrior",
      avatar: "🌱",
    },
  },
  {
    id: "custom-canvas",
    category: "New",
    title: "Custom Canvas Collection",
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isNew: true,
    user: {
      name: "ArtisticSoul",
      avatar: "🎨",
    },
  },
];
