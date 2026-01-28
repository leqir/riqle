'use client';

import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
}

export function FilterBar({
  filters,
  activeFilter,
  onFilterChange,
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
}: FilterBarProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchChange?.(value);
  };

  const clearSearch = () => {
    setLocalSearch('');
    onSearchChange?.('');
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;
          return (
            <motion.button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`
                relative px-4 py-2 rounded-full text-sm font-medium
                transition-colors duration-150
                ${
                  isActive
                    ? 'bg-brand-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }
              `.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
              {isActive && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-brand-600 rounded-full -z-10"
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Search Input */}
      {onSearchChange && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="
              w-full sm:w-64 pl-10 pr-10 py-2 rounded-lg
              border-2 border-slate-300
              text-slate-900 placeholder-slate-400
              transition-all duration-200
              focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-0
            "
          />
          {localSearch && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
