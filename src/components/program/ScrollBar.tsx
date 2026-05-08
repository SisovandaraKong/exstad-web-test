'use client';

import React, { useEffect, useRef } from "react";

type ScrollableTabsProps = {
  items: { id: number; label: string }[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

const ScrollableTabs: React.FC<ScrollableTabsProps> = ({ items, selectedId, onSelect }) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTab = tabsRef.current.find(tab => tab?.dataset.id === selectedId?.toString());
    if (currentTab && underlineRef.current) {
      const { offsetLeft, offsetWidth } = currentTab;
      underlineRef.current.style.transform = `translateX(${offsetLeft}px)`;
      underlineRef.current.style.width = `${offsetWidth}px`;
    }
  }, [selectedId, items]);

  return (
   <div className="relative overflow-x-auto pb-2 mt-2 scrollbar-hide">
  <div className="flex gap-4 w-max">
    {items.map(item => (
      <button
        key={item.id}
        data-id={item.id}
        className="px-4 py-2 rounded-2xl font-medium whitespace-nowrap flex-shrink-0"
        onClick={() => onSelect(item.id)}
      >
        {item.label}
      </button>
    ))}
    <div
      ref={underlineRef}
      className="absolute bottom-0 h-1 bg-primary transition-all duration-300 rounded"
    />
  </div>
</div>

  );
};

export default ScrollableTabs;
