import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ArrowSeparateVertical } from 'iconoir-react';

import { Category } from '@/types/category';
import classNames from '@/utils/classNames';
import Color from './types/color';

type Props = {
  colors: Color[];
  category: Category | null;
  onChange: (color: Color | undefined) => void;
};

export default function CategoryColorSelect({
  colors,
  category,
  onChange,
}: Props) {
  const [selectedColor, setSelectedColor] = useState(
    category ? colors.find(c => c.name === category.color) : colors[0]
  );

  return (
    <Listbox
      value={selectedColor}
      onChange={e => {
        onChange(e);
        setSelectedColor(e);
      }}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            Color
          </Listbox.Label>
          <div className="relative mt-1 mb-4">
            <Listbox.Button className="relative mb-1 w-full cursor-default rounded-md border border-slate-300 bg-white py-2.5 pl-3 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-0">
              <span className="flex items-center">
                <span
                  className={`${selectedColor?.bgColor} inline-block h-2 w-2 flex-shrink-0 rounded-full`}
                />
                <span
                  className="ml-3 block truncate"
                  data-testid="selected-color"
                >
                  {selectedColor?.name}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ArrowSeparateVertical />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-36 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {colors.map(color => (
                  <Listbox.Option
                    key={color.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-slate-100' : '',
                        'relative cursor-default select-none py-2 pl-3 text-slate-900'
                      )
                    }
                    value={color}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={`${color.bgColor} inline-block h-2 w-2 flex-shrink-0 rounded-full`}
                            aria-hidden="true"
                          />
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {color.name}
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
