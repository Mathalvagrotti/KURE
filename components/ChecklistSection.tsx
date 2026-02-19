import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { ChecklistSectionDef, ItemResponse, InspectionData } from '../types';
import ChecklistItem from './ChecklistItem';

interface Props {
  section: ChecklistSectionDef;
  data: InspectionData;
  onUpdateItem: (itemResponse: ItemResponse) => void;
}

const ChecklistSection: React.FC<Props> = ({ section, data, onUpdateItem }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Calculate completion for summary
  const totalItems = section.items.length;
  const completedItems = section.items.filter(item => data.responses[item.id]?.status).length;
  const isComplete = totalItems === completedItems;

  return (
    <div className="mb-6 border border-indigo-100 rounded-xl overflow-hidden shadow-sm bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 transition-colors ${
          isComplete ? 'bg-green-50 hover:bg-green-100' : 'bg-indigo-900 hover:bg-indigo-800'
        }`}
      >
        <div className="flex items-center gap-3">
          {isComplete && <CheckCircle2 className="text-green-600" size={24} />}
          <h2 className={`text-lg font-bold ${isComplete ? 'text-green-900' : 'text-white'}`}>
            {section.title}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-sm ${isComplete ? 'text-green-700' : 'text-indigo-200'}`}>
            {completedItems}/{totalItems}
          </span>
          {isOpen ? (
            <ChevronUp className={isComplete ? 'text-green-700' : 'text-white'} />
          ) : (
            <ChevronDown className={isComplete ? 'text-green-700' : 'text-white'} />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 bg-gray-50">
          {section.items.map((def) => {
            const currentResponse = data.responses[def.id] || {
              itemId: def.id,
              status: null,
              observation: '',
              photos: []
            };

            return (
              <ChecklistItem
                key={def.id}
                definition={def}
                response={currentResponse}
                onUpdate={onUpdateItem}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChecklistSection;