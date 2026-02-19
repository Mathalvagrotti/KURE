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
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      {/* No-print Action Bar */}
      <div className="no-print max-w-5xl mx-auto mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={20} /> Voltar para Checklist
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Printer size={20} /> Imprimir / Salvar PDF
        </button>
      </div>

      {/* Printable Area */}
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg print:shadow-none print:w-full">
        
        {/* Header */}
        <div className="border-b-2 border-slate-800 pb-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">CHECK LIST DE FINALIZAÇÃO</h1>
              <p className="text-slate-600 font-semibold">DEPARTAMENTO DE QUALIDADE FLEXIMEDICAL</p>
            </div>
            {/* Logo Placeholder */}
            <div className="flex flex-col items-center">
               <div className="flex items-center text-blue-800 font-bold italic text-2xl">
                 <span className="text-green-500 mr-1 text-3xl">✚</span> Fleximedical
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-gray-50 p-4 rounded border border-gray-200">
            <div>
              <span className="block text-xs font-bold text-gray-500 uppercase">Cliente</span>
              <span className="font-semibold">{data.header.clientName || '-'}</span>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-500 uppercase">Data</span>
              <span className="font-semibold">{data.header.date || '-'}</span>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-500 uppercase">Veículo</span>
              <span className="font-semibold">{data.header.unitType} - {data.header.plateOrId}</span>
            </div>
             <div>
              <span className="block text-xs font-bold text-gray-500 uppercase">Responsável</span>
              <span className="font-semibold">{data.header.inspectorName || '-'}</span>
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="space-y-6">
          {CHECKLIST_DATA.map((section) => (
            <div key={section.id} className="print-break-inside-avoid">
              <div className="bg-slate-800 text-white font-bold p-2 px-4 uppercase text-sm mb-1">
                {section.title}
              </div>
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 w-12 text-center">Item</th>
                    <th className="border border-gray-300 p-2 text-left">Descrição</th>
                    <th className="border border-gray-300 p-2 w-12 text-center">SIM</th>
                    <th className="border border-gray-300 p-2 w-12 text-center">NÃO</th>
                    <th className="border border-gray-300 p-2 w-12 text-center">N/C</th>
                    <th className="border border-gray-300 p-2 w-1/3 text-left">Observação</th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((item) => {
                    const resp = data.responses[item.id];
                    return (
                      <tr key={item.id}>
                        <td className="border border-gray-300 p-2 text-center font-mono text-xs">{item.id}</td>
                        <td className="border border-gray-300 p-2">
                          {resp?.customDescription || item.description}
                          {resp?.quantity && (
                            <div className="text-xs font-bold text-blue-700 mt-1">
                              {item.quantityLabel}: {resp.quantity}
                            </div>
                          )}
                        </td>
                        <td className="border border-gray-300 p-2 text-center text-lg">
                          {resp?.status === 'SIM' ? '●' : ''}
                        </td>
                        <td className="border border-gray-300 p-2 text-center text-lg text-red-600">
                          {resp?.status === 'NAO' ? '●' : ''}
                        </td>
                        <td className="border border-gray-300 p-2 text-center text-lg text-gray-500">
                          {resp?.status === 'NC' ? '●' : ''}
                        </td>
                        <td className="border border-gray-300 p-2 text-xs italic text-gray-600">
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
                            <div key={`${item.id}-p-${pIdx}`} className="border p-1 rounded">
                                <img src={photo} className="w-full h-32 object-contain" alt="Evidence" />
                                <div className="text-[10px] text-center mt-1">Item {item.id}</div>
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
            <div className="flex flex-col gap-8">
                <p>São Paulo, {data.header.city ? `${data.header.city}, ` : ''} _______ de _______________________ de 20______</p>
                
                <div className="w-full max-w-md mx-auto border-t border-black mt-8 pt-2 text-center">
                    RESPONSÁVEL PELA VISTORIA
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ReportView;
