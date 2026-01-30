'use client';

/**
 * Resource List Component
 *
 * Client component for interactive filtering and pagination
 * Uses TRPC for data fetching
 */

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/trpc/client';
import { SearchBar } from '../filtering/search-bar';
import { FilterPanel } from '../filtering/filter-panel';

type Props = {
  categoryPath?: string;
  initialSearch?: string;
  initialTags?: string[];
  initialSort?: string;
};

export function ResourceList({ categoryPath, initialSearch, initialTags, initialSort }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter state
  const [search, setSearch] = useState(initialSearch || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags || []);
  const [sortBy, setSortBy] = useState<'createdAt' | 'priceInCents' | 'title'>(
    (initialSort as 'createdAt' | 'priceInCents' | 'title') || 'createdAt'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Fetch resources with infinite query
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.resources.getResources.useInfiniteQuery(
      {
        categoryPath,
        search: search.length >= 2 ? search : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        limit: 20,
        sortBy,
        sortOrder,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        staleTime: 5 * 1000, // 5 seconds
      }
    );

  // Fetch filter options
  const { data: filterOptions } = api.resources.getFilterOptions.useQuery(
    { categoryPath },
    { staleTime: 60 * 1000 } // 1 minute
  );

  // Flatten paginated results
  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page.products) || [];
  }, [data]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Update search param
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }

    // Update tags param
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    } else {
      params.delete('tags');
    }

    // Update sort param
    if (sortBy !== 'createdAt' || sortOrder !== 'desc') {
      params.set('sort', `${sortBy}-${sortOrder}`);
    } else {
      params.delete('sort');
    }

    // Update URL without reloading page
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  }, [search, selectedTags, sortBy, sortOrder, router, searchParams]);

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Handle clear all filters
  const handleClearFilters = () => {
    setSearch('');
    setSelectedTags([]);
    setSortBy('createdAt');
    setSortOrder('desc');
  };

  // Check if any filters are active
  const hasActiveFilters = search.length >= 2 || selectedTags.length > 0;

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Filter Panel */}
      {filterOptions && (
        <div className="mb-8">
          <FilterPanel
            availableTags={filterOptions.tags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={(newSortBy, newSortOrder) => {
              setSortBy(newSortBy);
              setSortOrder(newSortOrder);
            }}
            onClearAll={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mb-6 flex flex-wrap gap-2">
          {search && (
            <button
              onClick={() => setSearch('')}
              className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 hover:bg-purple-200"
            >
              Search: &quot;{search}&quot;
              <span className="text-lg leading-none">×</span>
            </button>
          )}
          {selectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 hover:bg-purple-200"
            >
              {tag}
              <span className="text-lg leading-none">×</span>
            </button>
          ))}
        </div>
      )}

      {/* Results Count */}
      {!isLoading && products.length > 0 && (
        <p className="mb-6 text-sm text-stone-600">
          {products.length} {products.length === 1 ? 'resource' : 'resources'} found
        </p>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="py-12 text-center">
          <p className="text-lg text-stone-600">loading resources...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="border-l-2 border-red-300 py-12 pl-8">
          <p className="text-lg text-red-600">failed to load resources. please try again.</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && products.length === 0 && (
        <div className="border-l-2 border-stone-300 py-12 pl-8">
          <p className="text-lg text-stone-600">
            {hasActiveFilters
              ? 'no resources match your filters. try adjusting your search.'
              : 'no resources available in this category yet.'}
          </p>
        </div>
      )}

      {/* Resources List */}
      {!isLoading && !isError && products.length > 0 && (
        <div className="space-y-16">
          {products.map((product, index) => {
            const price = (product.priceInCents / 100).toFixed(2);
            const currencySymbol = product.currency === 'AUD' ? 'A$' : '$';
            const primaryCategory = product.categories.find((c) => c.isPrimary)?.category;

            return (
              <article key={product.id} className="group">
                <Link href={`/resources/${product.slug}`} className="block">
                  {/* Resource Number */}
                  <p className="mb-4 font-mono text-sm font-medium text-stone-400">
                    {String(index + 1).padStart(2, '0')}
                  </p>

                  {/* Title */}
                  <h2 className="mb-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-stone-900 transition-colors group-hover:text-stone-600">
                    {product.title}
                  </h2>

                  {/* Description */}
                  <p className="mb-6 text-lg leading-relaxed text-stone-600">
                    {product.description}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                    {primaryCategory && (
                      <div>
                        <span className="font-medium text-stone-400">category</span>
                        <span className="ml-3 text-stone-700">{primaryCategory.name}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-stone-400">format</span>
                      <span className="ml-3 text-stone-700">{product.format}</span>
                    </div>
                    <div>
                      <span className="font-medium text-stone-400">price</span>
                      <span className="ml-3 text-stone-700">
                        {currencySymbol}
                        {price}
                      </span>
                    </div>
                    {product.featured && (
                      <div>
                        <span className="ml-auto inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                          featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {product.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block rounded-full bg-stone-100 px-2 py-1 text-xs text-stone-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Divider */}
                  {index < products.length - 1 && (
                    <div className="mt-16 h-px bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200" />
                  )}
                </Link>
              </article>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && (
        <div className="mt-12 text-center">
          <button
            onClick={() => void fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-full border-2 border-stone-900 bg-white px-8 py-3 font-semibold text-stone-900 transition-all hover:bg-stone-900 hover:text-white disabled:opacity-50"
          >
            {isFetchingNextPage ? 'loading...' : 'load more'}
          </button>
        </div>
      )}
    </div>
  );
}
