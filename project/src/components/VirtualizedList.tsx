import React, { useMemo } from 'react';
import { useVirtualization } from '../hooks/useLazyLoading';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
}

function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className = ''
}: VirtualizedListProps<T>) {
  const {
    setContainerRef,
    visibleItems,
    totalHeight,
    offsetY,
    startIndex
  } = useVirtualization(items, containerHeight, itemHeight, overscan);

  const visibleItemsWithIndex = useMemo(() => {
    return visibleItems.map((item, relativeIndex) => ({
      item,
      index: startIndex + relativeIndex
    }));
  }, [visibleItems, startIndex]);

  return (
    <div
      ref={setContainerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItemsWithIndex.map(({ item, index }) => (
            <div
              key={index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VirtualizedList;
