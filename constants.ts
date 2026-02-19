import { ChecklistSectionDef } from './types';

export const UNIT_TYPES = [
  "Ônibus",
  "Van",
  "Caminhão",
  "Carreta",
  "Carreta com Avanço",
  "Container"
];

export const CHECKLIST_DATA: ChecklistSectionDef[] = [
  {
    id: "01",
    title: "01. ELÉTRICA",
    items: [
      { id: "1.1", description: "Pontos de iluminação foram testados?" },
      { id: "1.2", description: "Pontos de tomada foram testados?" },
      { id: "1.3", description: "Quadro de elétrica está identificado?" },
      { id: "1.4", description: "Acabamento do quadro está instalado com as devidas identificações?" },
      { id: "1.5", description: "Tomadas TUE (tomada de uso especifico) estão identificadas?" },
      { id: "1.6", description: "Placa de sinalização está instalada nos locais de possivel choque elétrico?" },
      { id: "1.7", description: "Gerador foi testado?" },
      { id: "1.8", description: "Transformador foi testado?" },
      { id: "1.9", description: "Foi feito o teste nas luminarias de emergência?" },
      { id: "1.10", description: "Luminárias de embutir estão parafusadas?" },
    ]
  },
  {
    id: "02",
    title: "02. HIDRÁULICA",
    items: [
      { id: "2.1", description: "Bacias sanitárias estão instaladas corretamente?" },
      { id: "2.2", description: "Acessórios da bacia sanitária estão instalados?" },
      { id: "2.3", description: "Torneiras estão instaladas corretamente?" },
      { id: "2.4", description: "Sifão está instalado corretamente?" },
      { id: "2.5", description: "Válvulas estão instaladas corretamente?" },
      { id: "2.6", description: "Pias e louças estão calafetados?" },
      { id: "2.7", description: "Reservatórios estão instalados corretamente?" },
      { id: "2.8", description: "Bomba de pressurização foi testada?" },
    ]
  },
  {
    id: "03",
    title: "03. AR CONDICIONADO/ CLIMATIZAÇÃO",
    items: [
      { id: "3.1", description: "Evaporadoras e condensadoras foram testados?" },
      { id: "3.2", description: "Suporte para controle das evaporadoras foi instalado?" },
      { id: "3.3", description: "Dreno das evaporadoras estão devidamente passados?" },
      { id: "3.4", description: "Controle das evaporadoras estão separados para o cliente?" },
      { id: "3.5", description: "Filtro Hepa foi instalado?" },
    ]
  },
  {
    id: "04",
    title: "04. ACABAMENTOS",
    items: [
      { id: "4.1", description: "Piso está corretamente instalado sem avárias?" },
      { id: "4.2", description: "Cantoneiras para acabamento estão devidamente instaladas?" },
      { id: "4.3", description: "Bate maca foi instalado corretamente respeitando as alturas conforme a RDC50?" },
      { id: "4.4", description: "ACM está instalado corretamente?" },
      { id: "4.5", description: "Calafetação do ACM e do MDF foi executada?" },
      { id: "4.6", description: "Portas estão abrindo e fechando corretamente?" },
      { id: "4.7", description: "Inox instalado no piso está instalado e limpo?" },
      { id: "4.8", description: "Veda fresta das portas foram instaladas?" },
      { id: "4.9", description: "Bolinhas de proteção para portas e marcenaria foram instaladas?" },
    ]
  },
  {
    id: "05",
    title: "05. MECÂNICA E ACESSÓRIOS DO VEÍCULO",
    items: [
      { id: "5.1", description: "Avanços estão funcionando corretamente?" },
      { id: "5.2", description: "Elevador está funcionando corretamente?" },
      { id: "5.3", description: "Porta palco está bem estruturada?" },
      { id: "5.4", description: "Chaves estão separadas para o cliente?" },
      { id: "5.5", description: "Rampa e corrimão foi montada para teste?" },
      { id: "5.6", description: "Todas as peças da rampa e corrimão estão no maleiro para entrega da carreta?", quantityLabel: "Unidades" },
      { id: "5.7", description: "Parafusos estão acompanhando a rampa?" },
      { id: "5.8", description: "Verificar bandô da saia" },
      { id: "5.9", description: "Cabo de alimentação da carreta está incluso?", quantityLabel: "Metros" },
      { id: "5.10", description: "Mangueira de alimentação está instalada corretamente?" },
      { id: "5.11", description: "Cadeiras plastico" }, // Noted as 5.11 in PDF text though layout is messy, keeping consistent
    ]
  },
  {
    id: "06",
    title: "06. ACESSÓRIOS",
    items: [
      { id: "6.1", description: "Cadeira de escritório com rodizio", quantityLabel: "Unidades" },
      { id: "6.2", description: "Cadeira de escritório sem rodizio", quantityLabel: "Unidades" },
      { id: "6.3", description: "Banco mocho", quantityLabel: "Unidades" },
      { id: "6.4", description: "Cadeira de plástico", quantityLabel: "Unidades" },
      { id: "6.5", description: "Lixeiras", quantityLabel: "Unidades" },
      { id: "6.6", description: "Dispenser para álcool em gel", quantityLabel: "Unidades" },
      { id: "6.7", description: "Dispenser para sabonete liquido?", quantityLabel: "Unidades" },
      { id: "6.8", description: "Porta papel toalha", quantityLabel: "Unidades" },
    ]
  },
  {
    id: "07",
    title: "07. ACESSÓRIOS E EQUIPAMENTOS ESPECÍFICOS",
    items: [
      { id: "7.1", description: "Item específico 1", isEditable: true },
      { id: "7.2", description: "Item específico 2", isEditable: true },
      { id: "7.3", description: "Item específico 3", isEditable: true },
      { id: "7.4", description: "Item específico 4", isEditable: true },
      { id: "7.5", description: "Item específico 5", isEditable: true },
    ]
  },
  {
    id: "08",
    title: "08. LIMPEZA",
    items: [
      { id: "8.1", description: "Resto de cola e manchas foram removidas?" },
      { id: "8.2", description: "Manta vinilica foi limpa e aplicado cera?" },
      { id: "8.3", description: "Batante das portas estão limpos?" },
      { id: "8.4", description: "Pelicula do ACM foi retirada?" },
      { id: "8.5", description: "Interno dos móveis estão limpos e sem restos de materias?" },
    ]
  },
  {
    id: "09",
    title: "09. DOCUMENTAÇÃO",
    items: [
      { id: "9.1", description: "Manual da carreta foi emitido?" },
      { id: "9.2", description: "Atestado de capacidade técnica foi emitido?" },
      { id: "9.3", description: "RRT/ART foi emitida?" },
      { id: "9.4", description: "Termo de recebimento foi emitido?" },
      { id: "9.5", description: "Laudo de vistoria de entrega foi emitido?" },
    ]
  }
];
