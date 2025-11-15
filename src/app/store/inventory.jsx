import { create } from "zustand";
import { persist } from "zustand/middleware";

// HUSK AT INSTALLERE ZUSTAND MED: npm install zustand For at kunne bruge denne store!
// HUSK AT INSTALLERE ZUSTAND MED: npm install zustand For at kunne bruge denne store!
// HUSK AT INSTALLERE ZUSTAND MED: npm install zustand For at kunne bruge denne store!

// const useStore = create(
//   persist(
//     (set, get) => ({
//       favorite: [],
//       toggleFavorite: (product) => {
//         const current = get().favorite;
//         const exists = current.includes(product);
//         set({
//           favorite: exists
//             ? current.filter((fav) => fav !== product) // Remove if exists
//             : [...current, product], // Add if doesn't exist
//         });
//       },
//     }),
//     {
//       name: "favorite-storage",
//     }
//   )
// );

// export default useStore;

// const inventory = create(
//   persist(
//     (set, get) => ({
//       inInventory: [],
//       toggleInInventory: (productId) => {
//         const current = get().inInventory;
//         const exists = current.includes(productId);
//         set({
//           inInventory: exists
//             ? current.filter((id) => id !== productId) // Remove if exists
//             : [...current, productId], // Add if doesn't exist
//         });
//       },
//     }),
//     {
//       name: "inventory-storage",
//     }
//   )
// );

const inventory = create(
  persist(
    (set, get) => ({
      inInventory: [],
      
      // Add or increment product
      addToInventory: (productId) => {
        const current = get().inInventory;
        const existingItem = current.find(item => item.id === productId);
        
        if (existingItem) {
          // Increment count if exists
          set({
            inInventory: current.map(item =>
              item.id === productId 
                ? { ...item, count: item.count + 1 }
                : item
            )
          });
        } else {
          // Add new item with count 1
          set({
            inInventory: [...current, { id: productId, count: 1 }]
          });
        }
      },
      
      // Decrement or remove product
      removeFromInventory: (productId) => {
        const current = get().inInventory;
        const existingItem = current.find(item => item.id === productId);
        
        if (existingItem) {
          if (existingItem.count === 1) {
            // Remove entirely if count would become 0
            set({
              inInventory: current.filter(item => item.id !== productId)
            });
          } else {
            // Decrement count
            set({
              inInventory: current.map(item =>
                item.id === productId 
                  ? { ...item, count: item.count - 1 }
                  : item
              )
            });
          }
        }
      },
      
      // Optional: Get quantity for a specific product
      getQuantity: (productId) => {
        const item = get().inInventory.find(item => item.id === productId);
        return item ? item.count : 0;
      }
    }),
    {
      name: "inventory-storage",
    }
  )
);

export default inventory;