import { create } from "zustand";


const usePagesStore = create((set) => ({
  fetchedCount: 0,      // number of products fetched in current API call
  totalCount: 0,        // total products in the category
  setFetchedCount: (count) => set({ fetchedCount: count }),
  setTotalCount: (count) => set({ totalCount: count }),
}));

export default usePagesStore;