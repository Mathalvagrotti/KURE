import React, { useRef } from 'react';
import { Camera, Check, X, Ban, Trash2 } from 'lucide-react';
import { ChecklistItemDef, ItemResponse, InspectionStatus } from '../types';

interface Props {
  definition: ChecklistItemDef;
  response: ItemResponse;
  onUpdate: (response: ItemResponse) => void;
}

const ChecklistItem: React.FC<Props> = ({ definition, response, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStatusChange = (newStatus: InspectionStatus) => {
    onUpdate({ ...response, status: newStatus });
  };

  const handleTextChange = (field: 'observation' | 'quantity' | 'customDescription', value: string) => {
    onUpdate({ ...response, [field]: value });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onUpdate({
          ...response,
          photos: [...response.photos, base64String]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...response.photos];
    newPhotos.splice(index, 1);
    onUpdate({ ...response, photos: newPhotos });
  };

  const statusBtnClass = (active: boolean, type: 'SIM' | 'NAO' | 'NC') => {
    const base = "flex items-center justify-center p-2 rounded transition-all duration-200 border ";
    if (!active) return base + "bg-white border-gray-300 text-gray-400 hover:bg-gray-50";
    
    switch (type) {
      case 'SIM': return base + "bg-green-100 border-green-500 text-green-700 font-bold shadow-sm";
      case 'NAO': return base + "bg-red-100 border-red-500 text-red-700 font-bold shadow-sm";
      case 'NC': return base + "bg-gray-100 border-gray-500 text-gray-700 font-bold shadow-sm";
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 hover:border-purple-200 transition-colors">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        
        {/* Description Side */}
        <div className="flex-1">
          <div className="flex items-start gap-2">
            <span className="font-mono text-sm font-semibold text-slate-400 min-w-[30px]">{definition.id}</span>
            <div className="w-full">
              {definition.isEditable ? (
                 <input
                 type="text"
                 placeholder="Descreva o item ou equipamento..."
                 className="w-full border-b border-gray-300 focus:border-purple-500 outline-none text-slate-800 font-medium pb-1 mb-1 transition-colors"
                 value={response.customDescription || ''}
                 onChange={(e) => handleTextChange('customDescription', e.target.value)}
               />
              ) : (
                <p className="text-slate-800 font-medium">{definition.description}</p>
              )}
              
              {definition.quantityLabel && (
                <div className="mt-2 flex items-center gap-2">
                  <label className="text-xs font-bold uppercase text-slate-500">{definition.quantityLabel}:</label>
                  <input
                    type="number"
                    className="border border-gray-300 rounded px-2 py-1 w-24 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none"
                    value={response.quantity || ''}
                    onChange={(e) => handleTextChange('quantity', e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Side */}
        <div className="flex flex-col gap-3 min-w-[200px]">
          {/* Status Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={() => handleStatusChange('SIM')} 
              className={`flex-1 ${statusBtnClass(response.status === 'SIM', 'SIM')}`}
              aria-label="Sim"
            >
              <Check size={18} className="mr-1" /> Sim
            </button>
            <button 
              onClick={() => handleStatusChange('NAO')} 
              className={`flex-1 ${statusBtnClass(response.status === 'NAO', 'NAO')}`}
              aria-label="Não"
            >
              <X size={18} className="mr-1" /> Não
            </button>
            <button 
              onClick={() => handleStatusChange('NC')} 
              className={`flex-1 ${statusBtnClass(response.status === 'NC', 'NC')}`}
              aria-label="Não Consta"
            >
              <Ban size={18} className="mr-1" /> N/C
            </button>
          </div>

          {/* Observation & Photo Trigger */}
          <div className="relative">
            <textarea
              placeholder="Observações..."
              className="w-full border border-gray-300 rounded p-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none resize-none transition-all"
              rows={2}
              value={response.observation || ''}
              onChange={(e) => handleTextChange('observation', e.target.value)}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 text-gray-400 hover:text-purple-600 transition-colors p-1"
              title="Adicionar Foto"
            >
              <Camera size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
        </div>
      </div>

      {/* Photo Preview Gallery */}
      {response.photos.length > 0 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {response.photos.map((photo, idx) => (
            <div key={idx} className="relative group flex-shrink-0">
              <img 
                src={photo} 
                alt={`Evidence ${idx + 1}`} 
                className="h-20 w-20 object-cover rounded border border-gray-300"
              />
              <button
                onClick={() => removePhoto(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-90 hover:opacity-100 transition-opacity"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChecklistItem;