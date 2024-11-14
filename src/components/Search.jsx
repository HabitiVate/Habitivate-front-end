import { useState, useEffect } from 'react';

const Search = ({ habits, dailies, todos }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Function to handle the auto-search logic
  const handleSearch = (query) => {
    const searchResults = [];

    if (query) {
      const queryLowerCase = query.toLowerCase();

      searchResults.push(
        ...habits.filter(habit => habit.name.toLowerCase().includes(queryLowerCase)),
        ...dailies.filter(daily => daily.name.toLowerCase().includes(queryLowerCase)),
        ...todos.filter(todo => todo.name.toLowerCase().includes(queryLowerCase))
      );
    }

    setResults(searchResults);
  };

  // Watch for changes in the input field to trigger search
  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <div className="">
      <input
        type="text"
        className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#95af00]"
        placeholder="Search for habits, dailies, or todos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <div className="mt-4 bg-white border rounded-md shadow-md">
          {results.map((result, index) => (
            <div key={index} className="p-2 border-b last:border-none">
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
