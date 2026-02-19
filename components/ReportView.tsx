import React from 'react';
import { InspectionData } from '../types';
import { CHECKLIST_DATA } from '../constants';
import { Printer, ArrowLeft } from 'lucide-react';

interface Props {
  data: InspectionData;
  onBack: () => void;
}

const ReportView: React.FC<Props> = ({ data, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-8">
      {/* No-print Action Bar */}
      <div className="no-print max-w-5xl mx-auto mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft size={20} /> Voltar para Checklist
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Printer size={20} /> Imprimir / Salvar PDF
        </button>
      </div>

      {/* Printable Area */}
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg print:shadow-none print:w-full">
        
        {/* Header */}
        <div className="border-b-4 border-indigo-900 pb-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">CHECK LIST DE FINALIZAÇÃO</h1>
              <p className="text-purple-700 font-bold tracking-wider">DEPARTAMENTO DE QUALIDADE KURE</p>
            </div>
            {/* Logo */}
            <div className="flex flex-col items-center">
               <div className="flex items-center text-indigo-900 font-black italic text-3xl tracking-tighter">
                 <span className="text-blue-500 mr-1 text-4xl">✚</span> KURE
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-slate-50 p-4 rounded border border-slate-200">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase">Cliente</span>
              <span className="font-semibold text-slate-800">{data.header.clientName || '-'}</span>
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase">Data</span>
              <span className="font-semibold text-slate-800">{data.header.date || '-'}</span>
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase">Veículo</span>
              <span className="font-semibold text-slate-800">{data.header.unitType} - {data.header.plateOrId}</span>
            </div>
             <div>
              <span className="block text-xs font-bold text-slate-500 uppercase">Responsável</span>
              <span className="font-semibold text-slate-800">{data.header.inspectorName || '-'}</span>
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="space-y-6">
          {CHECKLIST_DATA.map((section) => (
            <div key={section.id} className="print-break-inside-avoid">
              <div className="bg-indigo-900 text-white font-bold p-2 px-4 uppercase text-sm mb-1 rounded-t-sm">
                {section.title}
              </div>
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="border border-gray-300 p-2 w-12 text-center text-indigo-900">Item</th>
                    <th className="border border-gray-300 p-2 text-left text-indigo-900">Descrição</th>
                    <th className="border border-gray-300 p-2 w-12 text-center text-indigo-900">SIM</th>
                    <th className="border border-gray-300 p-2 w-12 text-center text-indigo-900">NÃO</th>
                    <th className="border border-gray-300 p-2 w-12 text-center text-indigo-900">N/C</th>
                    <th className="border border-gray-300 p-2 w-1/3 text-left text-indigo-900">Observação</th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((item) => {
                    const resp = data.responses[item.id];
                    return (
                      <tr key={item.id}>
                        <td className="border border-gray-300 p-2 text-center font-mono text-xs text-slate-500">{item.id}</td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-slate-800">{resp?.customDescription || item.description}</span>
                          {resp?.quantity && (
                            <div className="text-xs font-bold text-purple-700 mt-1">
                              {item.quantityLabel}: {resp.quantity}
                            </div>
                          )}
                        </td>
                        <td className="border border-gray-300 p-2 text-center text-lg">
                          {resp?.status === 'SIM' ? <span className="text-green-600">●</span> : ''}
                        </td>
                        <td className="border border-gray-300 p-2 text-center text-lg">
                          {resp?.status === 'NAO' ? <span className="text-red-600">●</span> : ''}
                        </td>
                        <td className="border border-gray-300 p-2 text-center text-lg">
                          {resp?.status === 'NC' ? <span className="text-slate-400">●</span> : ''}
                        </td>
                        <td className="border border-gray-300 p-2 text-xs italic text-slate-600">
                          {resp?.observation}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Photo Appendix for this section if any */}
              {section.items.some(item => data.responses[item.id]?.photos?.length > 0) && (
                 <div className="mt-2 grid grid-cols-4 gap-2">
                    {section.items.map(item => {
                        const resp = data.responses[item.id];
                        if (!resp || !resp.photos || resp.photos.length === 0) return null;
                        return resp.photos.map((photo, pIdx) => (
                            <div key={`${item.id}-p-${pIdx}`} className="border border-slate-200 p-1 rounded bg-slate-50">
                                <img src={photo} className="w-full h-32 object-contain" alt="Evidence" />
                                <div className="text-[10px] text-center mt-1 font-mono text-slate-500">Item {item.id}</div>
                            </div>
                        ));
                    })}
                 </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Signatures */}
        <div className="mt-12 pt-8 border-t border-gray-300 print-break-inside-avoid">
            <div className="flex flex-col gap-8 text-slate-800">
                <p>São Paulo, {data.header.city ? `${data.header.city}, ` : ''} _______ de _______________________ de 20______</p>
                
                <div className="w-full max-w-md mx-auto border-t border-black mt-8 pt-2 text-center text-sm font-bold">
                    RESPONSÁVEL PELA VISTORIA
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ReportView;