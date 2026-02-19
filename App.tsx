import React, { useState } from 'react';
import { ClipboardList, FileText, Save, Truck } from 'lucide-react';
import { InspectionData, ItemResponse } from './types';
import { CHECKLIST_DATA, UNIT_TYPES } from './constants';
import ChecklistSection from './components/ChecklistSection';
import ReportView from './components/ReportView';

const INITIAL_DATA: InspectionData = {
  header: {
    unitType: UNIT_TYPES[0],
    plateOrId: '',
    clientName: '',
    inspectorName: '',
    date: new Date().toISOString().split('T')[0],
    city: 'São Paulo'
  },
  responses: {}
};

function App() {
  const [data, setData] = useState<InspectionData>(INITIAL_DATA);
  const [view, setView] = useState<'form' | 'report'>('form');

  const handleHeaderChange = (field: keyof typeof INITIAL_DATA.header, value: string) => {
    setData(prev => ({
      ...prev,
      header: { ...prev.header, [field]: value }
    }));
  };

  const handleItemUpdate = (itemResponse: ItemResponse) => {
    setData(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [itemResponse.itemId]: itemResponse
      }
    }));
  };

  const calculateProgress = () => {
    let total = 0;
    let answered = 0;
    CHECKLIST_DATA.forEach(section => {
      section.items.forEach(item => {
        total++;
        if (data.responses[item.id]?.status) answered++;
      });
    });
    return Math.round((answered / total) * 100);
  };

  if (view === 'report') {
    return <ReportView data={data} onBack={() => setView('form')} />;
  }

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      {/* Header */}
      <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500 p-2 rounded-lg shadow-md">
              <Truck size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-none tracking-tight">KURE Check</h1>
              <p className="text-xs text-indigo-200">Vistoria Digital</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm font-bold text-purple-300">{calculateProgress()}% Completo</div>
            <div className="w-24 h-1.5 bg-indigo-800 rounded-full mt-1">
              <div 
                className="h-full bg-purple-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(192,132,252,0.5)]"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        
        {/* Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-5">
          <h2 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <ClipboardList className="text-purple-600" size={20} />
            Dados da Vistoria
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tipo de Unidade</label>
              <select
                className="w-full border border-gray-300 rounded p-2 bg-gray-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                value={data.header.unitType}
                onChange={(e) => handleHeaderChange('unitType', e.target.value)}
              >
                {UNIT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Placa / ID</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                placeholder="ABC-1234"
                value={data.header.plateOrId}
                onChange={(e) => handleHeaderChange('plateOrId', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cliente</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                placeholder="Nome do Cliente"
                value={data.header.clientName}
                onChange={(e) => handleHeaderChange('clientName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Data</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                value={data.header.date}
                onChange={(e) => handleHeaderChange('date', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Responsável pela Vistoria</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                placeholder="Seu Nome"
                value={data.header.inspectorName}
                onChange={(e) => handleHeaderChange('inspectorName', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Checklist Sections */}
        <div>
           {CHECKLIST_DATA.map(section => (
             <ChecklistSection
               key={section.id}
               section={section}
               data={data}
               onUpdateItem={handleItemUpdate}
             />
           ))}
        </div>

      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setView('report')}
          className="flex items-center gap-2 bg-indigo-800 hover:bg-indigo-700 text-white px-6 py-4 rounded-full shadow-xl shadow-indigo-900/30 font-bold transition-all hover:scale-105"
        >
          <FileText size={20} />
          Gerar Relatório
        </button>
      </div>
    </div>
  );
}

export default App;