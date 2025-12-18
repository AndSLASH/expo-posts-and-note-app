import { useState } from 'react';

export function useSortOrder(defaultOrder: 'asc' | 'desc' = 'desc') {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(defaultOrder);
  const toggleSortOrder = () => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  return { sortOrder, toggleSortOrder };
}
