'use client';

/**
 * Filter Panel Component
 *
 * Horizontal filter chips for tags and sorting
 * Mobile-first design with horizontal scrolling
 */

import { useState } from 'react';

type Props = {
  availableTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  sortBy: 'createdAt' | 'priceInCents' | 'title';
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: 'createdAt' | 'priceInCents' | 'title', sortOrder: 'asc' | 'desc') => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
};

export function FilterPanel({
  availableTags,
  selectedTags,
  onTagToggle,
  sortBy,
  sortOrder,
  onSortChange,
  onClearAll,
  hasActiveFilters,
}: Props) {
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Sort options
  const sortOptions = [
    { value: 'createdAt-desc', label: 'Newest First' },
    { value: 'createdAt-asc', label: 'Oldest First' },
    { value: 'priceInCents-asc', label: 'Price: Low to High' },
    { value: 'priceInCents-desc', label: 'Price: High to Low' },
    { value: 'title-asc', label: 'Title: A to Z' },
    { value: 'title-desc', label: 'Title: Z to A' },
  ];

  const currentSortValue = `${sortBy}-${sortOrder}`;
  const currentSortLabel =
    sortOptions.find((opt) => opt.value === currentSortValue)?.label || 'Newest First';

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split('-') as [
      'createdAt' | 'priceInCents' | 'title',
      'asc' | 'desc',
    ];
    onSortChange(newSortBy, newSortOrder);
    setShowSortDropdown(false);
  };

  return (
    <div className="relative">
      {/* Filter Chips Container */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3">
          {/* Clear All Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-stone-900 bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
              clear all
            </button>
          )}

          {/* Tags Filter */}
          {availableTags.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowTagsDropdown(!showTagsDropdown)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors ${
                  selectedTags.length > 0
                    ? 'border-purple-600 bg-purple-50 text-purple-700'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                Tags
                {selectedTags.length > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                    {selectedTags.length}
                  </span>
                )}
                <svg
                  className={`h-4 w-4 transition-transform ${showTagsDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Tags Dropdown */}
              {showTagsDropdown && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-10" onClick={() => setShowTagsDropdown(false)} />

                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-2xl border-2 border-stone-200 bg-white p-4 shadow-lg">
                    <p className="mb-3 text-sm font-semibold text-stone-900">Filter by tags</p>
                    <div className="max-h-64 space-y-2 overflow-y-auto">
                      {availableTags.map((tag) => (
                        <label
                          key={tag}
                          className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-stone-50"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(tag)}
                            onChange={() => onTagToggle(tag)}
                            className="h-4 w-4 rounded border-stone-300 text-purple-600 focus:ring-purple-600"
                          />
                          <span className="text-sm text-stone-700">{tag}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Sort Filter */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-stone-300"
            >
              Sort: {currentSortLabel}
              <svg
                className={`h-4 w-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Sort Dropdown */}
            {showSortDropdown && (
              <>
                {/* Backdrop */}
                <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-2xl border-2 border-stone-200 bg-white p-2 shadow-lg">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
                        currentSortValue === option.value
                          ? 'bg-purple-50 font-semibold text-purple-700'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
