import React, { useEffect, useState } from 'react';

import { Category } from '@/types/category';

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/category');
      const categories = await response.json();

      setCategories(categories);
    };

    fetchCategories();
  }, []);

  const handleBackgroundColor = (color: string) => {
    switch (color) {
      case 'purple':
        return { bgColor: 'bg-purple-100', textColor: 'text-purple-800' };
      case 'blue':
        return { bgColor: 'bg-blue-100', textColor: 'text-blue-800' };
      case 'pink':
        return { bgColor: 'bg-pink-100', textColor: 'text-pink-800' };
      default:
        return { bgColor: 'bg-slate-100', textColor: 'text-slate-800' };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {categories.map(category => {
        console.log(category);
        const { bgColor, textColor } = handleBackgroundColor(category.color);
        return (
          <div
            key={category.id}
            className={`${bgColor} h-60 rounded-[40px] p-8`}
          >
            <h2 className={`${textColor} text-2xl font-semibold text-center`}>
              {category.name}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
