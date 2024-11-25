import { useState, useEffect } from "react";
import { apiSearch } from "../services/search";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          // Fetch results from API
          const response = await apiSearch(query);
          // Ensure the response has types: habit, todo, daily
          onSearch(response.data); // Pass results to parent
        } catch (error) {
          console.error("Error fetching search results:", error);
          onSearch([]); // Clear results on error
        } finally {
          setIsLoading(false);
        }
      } else {
        onSearch([]); // Clear results when the query is empty
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300); // Debounce for better UX
    return () => clearTimeout(debounceTimer); // Cleanup debounce timer
  }, [query, onSearch]);

  return (
    <div className="p-4">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#95af00]"
        placeholder="Search for habits, dailies, or todos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* Loading Indicator */}
      {isLoading && <p className="mt-2 text-sm text-gray-500">Loading...</p>}
    </div>
  );
};

export default Search;
