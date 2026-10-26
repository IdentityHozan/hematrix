/**
 * Proposed HemaTrix relationships from the revised reference build.
 * Legacy connection IDs and the internal "pressure" kind are retained for UI
 * compatibility. The represented mechanism is local dry mechanical movement.
 * Specimen fractions are loaded manually; all wet paths remain disposable.
 */
export const CONNECTION_KINDS = Object.freeze({
  pressure: Object.freeze({ label: 'Movement', technicalLabel: 'Local mechanical actuation', color: '#8778b6' }),
  optical: Object.freeze({ label: 'Light and image', technicalLabel: 'Optical path', color: '#b58a24' }),
  data: Object.freeze({ label: 'Data', technicalLabel: 'Electrical control and image data', color: '#3c7fa4' }),
  power: Object.freeze({ label: 'Power', technicalLabel: 'Electrical supply', color: '#667078' })
});

/** Ordered parts of one bay's proposed dry mechanical cartridge interface. */
export const DOCK_INTERFACE = Object.freeze([
  {
    id: 'bay-valve',
    name: 'Bay motor driver',
    simpleName: 'Movement controller',
    view: 'dock',
    side: 'reusable',
    description: 'Each bay has one dual motor-driver board that controls its two 12 V dry linear actuators. The drivers and actuators are local to that bay.',
    simpleDescription: 'This bay controls its own two small mechanical drives.',
    interfacesWith: ['processor', 'backplane', 'pumps']
  },
  {
    id: 'bay-dock',
    name: 'Cartridge dock',
    simpleName: 'Cartridge holder',
    view: 'dock',
    side: 'reusable',
    description: 'The proposed PETG dock locates and holds the disposable cartridge. Two insertion limit switches provide cartridge-position information; liquids remain in the cartridge.',
    simpleDescription: 'The holder positions the cartridge and checks that it is inserted.',
    interfacesWith: ['pumps', 'dock-seal', 'cartridge']
  },
  {
    id: 'dock-seal',
    name: 'Silicone dry contact pad',
    simpleName: 'Dry contact pad',
    view: 'dock',
    side: 'reusable',
    description: 'The proposed silicone interface pad provides dry mechanical contact between the local actuator mechanism and the cartridge contact surface. It is not a reusable liquid pathway.',
    simpleDescription: 'The soft pad transfers movement without carrying sample liquid.',
    interfacesWith: ['pumps', 'bay-dock', 'cartridge-membrane']
  },
  {
    id: 'cartridge-membrane',
    name: 'Cartridge contact surface',
    simpleName: 'Disposable contact surface',
    view: 'dock',
    side: 'disposable',
    description: 'The cartridge presents a dry contact surface to the mechanical interface. The detailed internal cartridge mechanism remains a proposed design; all specimen-contact liquid paths and waste stay inside the disposable cartridge.',
    simpleDescription: 'The reusable drive touches the cartridge exterior; the wet assay paths stay inside.',
    interfacesWith: ['dock-seal', 'cartridge']
  }
].map(part => Object.freeze({ ...part, interfacesWith: Object.freeze(part.interfacesWith) })));

export const CONNECTIONS = Object.freeze([
  {
    id: 'pressure-dock', kind: 'pressure', label: 'Move the cartridge mechanism',
    technicalLabel: 'Local linear-actuator contact', from: 'pumps', to: 'dock-seal',
    description: 'The selected bay uses its own two dry linear actuators to operate the proposed cartridge mechanism through a silicone dry contact pad. The reusable drive carries no sample liquid.',
    simpleDescription: 'Small drives in this bay move the cartridge mechanism through a dry pad.'
  },
  {
    id: 'optical-capture', kind: 'optical', label: 'Read the reaction',
    technicalLabel: 'Camera and ring-light imaging', from: 'wells', to: 'optics',
    description: 'One camera and one white ring-illumination board in each bay record the cartridge reaction windows for software interpretation and qualified review.',
    simpleDescription: 'The bay light and camera record what happened in the reaction chambers.'
  },
  {
    id: 'camera-data', kind: 'data', label: 'Send the reaction image',
    technicalLabel: 'Captured image data', from: 'optics', to: 'processor',
    description: 'The bay camera sends the captured image and status to the processing board. The software associates this evidence with the correct specimen and testing bay.',
    simpleDescription: 'The camera image is linked to the correct sample record.'
  },
  {
    id: 'display-data', kind: 'data', label: 'Show progress and results',
    technicalLabel: 'Operator display data', from: 'processor', to: 'screen',
    description: 'The processing board supplies progress, control findings and review status to the operator display. Staff must review and authorise an eligible result.',
    simpleDescription: 'The screen shows progress and findings for staff review.'
  },
  {
    id: 'power-processor', kind: 'power', label: 'Power the controller',
    technicalLabel: 'Processing-board electrical supply', from: 'power', to: 'processor',
    description: 'The analyser power supply feeds the processing and control electronics.',
    simpleDescription: 'The power supply runs the main controller.'
  },
  {
    id: 'power-optics', kind: 'power', label: 'Power the camera and light',
    technicalLabel: 'Bay imaging electrical supply', from: 'power', to: 'optics',
    description: 'The analyser electrical supply powers the selected bay camera and white ring-illumination board.',
    simpleDescription: 'Electrical power runs the bay camera and light.'
  },
  {
    id: 'power-control', kind: 'power', label: 'Power this bay’s drives',
    technicalLabel: 'Local motor-driver and actuator supply', from: 'power', to: 'pumps',
    description: 'Electrical power reaches the selected bay’s two dry linear actuators through that bay’s dual motor driver. There is no mechanical drive shared across testing bays.',
    simpleDescription: 'Each bay has powered drives of its own.'
  },
  {
    id: 'system-air-supply', kind: 'pressure', label: 'Control the first local drive',
    technicalLabel: 'Bay-local actuator 1 control', from: 'bay-valve', to: 'pumps',
    description: 'One output of the bay’s dual motor-driver board controls the first of its two dry linear actuators. This relationship exists locally in each installed bay.',
    simpleDescription: 'This bay’s movement controller operates its first drive.'
  },
  {
    id: 'system-air-branch', kind: 'pressure', label: 'Control the second local drive',
    technicalLabel: 'Bay-local actuator 2 control', from: 'bay-valve', to: 'pumps',
    description: 'The second output of the same local dual motor driver controls the bay’s second dry linear actuator. Additional bays have their own driver and actuator pair.',
    simpleDescription: 'This bay’s movement controller operates its second drive.'
  },
  {
    id: 'system-dock-actuation', kind: 'pressure', label: 'Transfer movement through the pad',
    technicalLabel: 'Local actuator-to-pad mechanical contact', from: 'pumps', to: 'dock-seal',
    description: 'The selected bay’s actuator mechanism applies movement through its silicone dry contact pad to the cartridge. The proposed connection transfers mechanical motion, not sample liquid.',
    simpleDescription: 'The local drive moves the cartridge mechanism through a dry contact pad.'
  },
  {
    id: 'system-data-trunk', kind: 'data', label: 'Connect the bay controls',
    technicalLabel: 'Local control backplane data', from: 'processor', to: 'backplane',
    description: 'The controller exchanges bay commands, image records and status through the analyser’s electrical data backplane. Every installed bay retains its own mechanical actuators.',
    simpleDescription: 'The data backplane links each bay to the main controller.'
  },
  {
    id: 'system-data-branch', kind: 'data', label: 'Connect this bay’s camera',
    technicalLabel: 'Bay imaging data branch', from: 'backplane', to: 'optics',
    description: 'The electrical data branch carries commands to this bay’s imaging assembly and returns its captured images and status.',
    simpleDescription: 'This bay sends its camera images and status over the data connection.'
  },
  {
    id: 'system-power-trunk', kind: 'power', label: 'Distribute electrical power',
    technicalLabel: 'Local electrical distribution backplane', from: 'power', to: 'backplane',
    description: 'The analyser power supply feeds an electrical distribution backplane. This shared electrical supply does not imply a shared mechanical drive or reusable liquid circuit.',
    simpleDescription: 'The backplane distributes electricity to the installed bays.'
  },
  {
    id: 'system-power-branch', kind: 'power', label: 'Power this bay’s imaging',
    technicalLabel: 'Bay imaging electrical branch', from: 'backplane', to: 'optics',
    description: 'An electrical branch supplies this bay’s camera and white ring-illumination board.',
    simpleDescription: 'This electrical branch runs the bay camera and ring light.'
  },
  {
    id: 'cluster-data-link', kind: 'data', label: 'Link two analyser units',
    technicalLabel: 'Inter-analyser data link', from: 'backplane', to: 'backplane', via: 'module-coupler',
    description: 'Two complete analyser units exchange queue and result-status information through a data connection. Each unit retains its own power supply, and every testing bay has local mechanical drives. No specimen circulates between analysers.',
    simpleDescription: 'The two units share testing information over a data link.'
  },
  {
    id: 'dock-seal-interface', kind: 'pressure', label: 'Seat the dry contact pad',
    technicalLabel: 'Dock-to-pad positioning', from: 'bay-dock', to: 'dock-seal',
    description: 'The proposed cartridge dock positions the silicone dry interface pad for contact with the inserted cartridge. The dock and pad are outside the disposable liquid pathways.',
    simpleDescription: 'The holder positions the pad against the cartridge.'
  },
  {
    id: 'membrane-actuation', kind: 'pressure', label: 'Contact the disposable surface',
    technicalLabel: 'Dry pad-to-cartridge mechanical interface', from: 'dock-seal', to: 'cartridge-membrane',
    description: 'The silicone pad contacts the cartridge’s dry external contact surface. The precise internal mechanism requires development; liquids and residual waste remain in the single-use kit.',
    simpleDescription: 'The dry pad touches the cartridge exterior while liquids stay inside.'
  },
  {
    id: 'local-driver-data', kind: 'data', label: 'Send movement commands',
    technicalLabel: 'Bay-local dual motor-driver commands', from: 'processor', to: 'bay-valve',
    description: 'The controller sends movement commands to the dual motor-driver board in the selected bay. One local driver operates that bay’s two dry linear actuators.',
    simpleDescription: 'The controller tells this bay’s own drives when to move.'
  },
  {
    id: 'local-driver-power', kind: 'power', label: 'Power the local movement controller',
    technicalLabel: 'Bay motor-driver electrical branch', from: 'backplane', to: 'bay-valve',
    description: 'The electrical distribution supplies the selected bay’s dual motor-driver board and its local actuator pair.',
    simpleDescription: 'This electrical branch powers the bay’s movement controller.'
  },
  {
    id: 'heater-power', kind: 'power', label: 'Power the bay heater',
    technicalLabel: 'Switched bay-heater electrical branch', from: 'backplane', to: 'thermal',
    description: 'Each bay has a heater element and a local heater power switch. The temperature probe provides the corresponding temperature measurement for control and checking.',
    simpleDescription: 'A controlled electrical supply runs this bay’s heater.'
  },
  {
    id: 'temperature-data', kind: 'data', label: 'Read the bay temperature',
    technicalLabel: 'Bay temperature-probe measurement', from: 'thermal', to: 'processor',
    description: 'The selected bay’s temperature probe provides its measured temperature to the controller for assay-environment control and checks.',
    simpleDescription: 'The controller checks the temperature in this bay.'
  },
  {
    id: 'manual-patient-cells', kind: 'manual', label: 'Load patient red cells',
    technicalLabel: 'Manual prepared recipient red-cell loading', from: 'patient-cells', to: 'cartridge',
    description: 'Staff manually load an identified, prepared patient red-cell fraction into its cartridge inlet when the selected test requires it. This container is not permanently connected to the analyser.',
    simpleDescription: 'Staff load the prepared patient red cells into the cartridge.'
  },
  {
    id: 'manual-patient-plasma', kind: 'manual', label: 'Load patient plasma',
    technicalLabel: 'Manual prepared recipient plasma loading', from: 'patient-plasma', to: 'cartridge',
    description: 'Staff manually load the identified patient plasma fraction into its separate cartridge inlet. This is a small prepared specimen fraction, not a transfusion plasma bag.',
    simpleDescription: 'Staff load the prepared patient plasma into its own inlet.'
  },
  {
    id: 'manual-donor-cells', kind: 'manual', label: 'Load donor red cells',
    technicalLabel: 'Manual prepared donor red-cell loading', from: 'donor-cells', to: 'cartridge',
    description: 'Staff manually load prepared red cells from the selected, identified donor unit for a requested crossmatch. These donor cells meet patient plasma only in the intended cartridge reaction.',
    simpleDescription: 'Staff load the selected donor’s prepared red cells for crossmatching.'
  }
].map(connection => Object.freeze({ ...connection, color: CONNECTION_KINDS[connection.kind]?.color || '#8b4a59' })));

/** Return the relationships associated with a selectable component. */
export function connectionFor(componentId) {
  const id = String(componentId || '').trim();
  // This old component ID now resolves to the bay-local linear-actuator assembly.
  const component = /^bay-\d+$/.test(id) ? 'bays' : id.startsWith('reaction:') ? 'wells' : id === 'air-manifold' ? 'pumps' : id;
  if (component === 'bays') {
    const bayLinks = new Set(['pressure-dock', 'optical-capture', 'camera-data', 'system-air-supply', 'system-air-branch', 'system-dock-actuation', 'system-data-branch', 'system-power-branch', 'local-driver-data', 'local-driver-power', 'heater-power', 'temperature-data']);
    return CONNECTIONS.filter(connection => bayLinks.has(connection.id));
  }
  return CONNECTIONS.filter(connection => connection.from === component || connection.to === component || connection.via === component);
}

export const connectionsFor = connectionFor;
