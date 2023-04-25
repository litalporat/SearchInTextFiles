const domain = "http://localhost:5001/search";

export const httpService = {
  getSearchesCount: async () => {
    const response = await fetch(`${domain}/count`);
    return response.json();
  },
  getSearchResult: async (searchInput) => {
    const response = await fetch(`${domain}/${searchInput}`);
    return response.json();
  },
};
