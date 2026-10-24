/**
 * Proposed HemaTrix system relationships for the engineering demonstration.
 * Manual specimen transfers are listed for explanation only. They are not
 * permanent fluid connections to the reusable instrument.
 */
export const CONNECTION_KINDS = Object.freeze({
  pressure: Object.freeze({ label: 'Pressure and control', color: '#8778b6' }),
  optical: Object.freeze({ label: 'Optical path', color: '#b58a24' }),
  data: Object.freeze({ label: 'Data', color: '#3c7fa4' }),
  power: Object.freeze({ label: 'Power', color: '#667078' })
});

/** Ordered parts of the proposed dry docking interface; no dimensions or pressures are specified. */
export const DOCK_INTERFACE = Object.freeze([
  {
    id: 'bay-valve',
    name: 'Bay valve assembly',
    view: 'dock',
    side: 'reusable',
    description: 'A separately controlled valve selects the local dry-air branch for one installed bay. It controls the proposed actuation supply rather than carrying patient or donor specimen.',
    interfacesWith: ['air-manifold', 'bay-dock']
  },
  {
    id: 'bay-dock',
    name: 'Dry cartridge docking block',
    view: 'dock',
    side: 'reusable',
    description: 'The docking block locates the inserted cartridge and mates the proposed dry actuation ports. Biological specimen remains within the sealed disposable assay path.',
    interfacesWith: ['bay-valve', 'dock-seal']
  },
  {
    id: 'dock-seal',
    name: 'Dry-interface seal',
    view: 'dock',
    side: 'reusable',
    description: 'The proposed interface gasket seals the dry actuation connection when the cartridge is seated. Its material, sealing performance and service life require engineering validation.',
    interfacesWith: ['bay-dock', 'cartridge-membrane']
  },
  {
    id: 'cartridge-membrane',
    name: 'Disposable actuation membrane',
    view: 'dock',
    side: 'disposable',
    description: 'A proposed flexible wall in the single-use cartridge responds to actuation from its dry side to control the internal assay fluid. The membrane separates the dry actuator interface from the contained specimen-contact channel; this separation remains a design premise requiring validation.',
    interfacesWith: ['dock-seal', 'cartridge']
  }
].map(part => Object.freeze({ ...part, interfacesWith: Object.freeze(part.interfacesWith) })));

export const CONNECTIONS = Object.freeze([
  {
    id: 'pressure-dock',
    kind: 'pressure',
    label: 'Pneumatic pressure and control',
    from: 'pumps',
    to: 'bays',
    description: 'The proposed fluid-control assembly applies controlled pressure at the sealed cartridge docking interface. Specimen-contact fluid paths remain inside the single-use cartridge.',
    color: '#8778b6'
  },
  {
    id: 'optical-capture',
    kind: 'optical',
    label: 'Reaction-window imaging',
    from: 'wells',
    to: 'optics',
    description: 'Controlled illumination and the camera reveal the reaction-window pattern for assay-specific interpretation and qualified review. The illustrated optical path is a proposed engineering arrangement.',
    color: '#b58a24'
  },
  {
    id: 'camera-data',
    kind: 'data',
    label: 'Captured image data',
    from: 'optics',
    to: 'processor',
    description: 'The camera sends the captured image and instrument status to the processing board. The software associates this evidence with the identified specimen and testing bay.',
    color: '#3c7fa4'
  },
  {
    id: 'display-data',
    kind: 'data',
    label: 'Operator display data',
    from: 'processor',
    to: 'screen',
    description: 'The processing board supplies test progress, quality-control findings and review status to the operator display. A displayed analytical result is not an independent transfusion authorisation.',
    color: '#3c7fa4'
  },
  {
    id: 'power-processor',
    kind: 'power',
    label: 'Processing-board power',
    from: 'power',
    to: 'processor',
    description: 'The proposed internal power supply provides a regulated electrical supply to the processing and control electronics.',
    color: '#667078'
  },
  {
    id: 'power-optics',
    kind: 'power',
    label: 'Optical-assembly power',
    from: 'power',
    to: 'optics',
    description: 'The proposed internal power distribution supplies the camera and controlled illumination assembly.',
    color: '#667078'
  },
  {
    id: 'power-control',
    kind: 'power',
    label: 'Fluid-control power',
    from: 'power',
    to: 'pumps',
    description: 'The proposed internal power distribution supplies the pressure and fluid-control actuators. This electrical path carries no patient or donor specimen.',
    color: '#667078'
  },
  {
    id: 'system-air-supply',
    kind: 'pressure',
    label: 'Core dry-air supply',
    from: 'pumps',
    to: 'air-manifold',
    description: 'Within one analyser, the proposed pressure assembly supplies a local dry-air manifold. Neither patient specimen nor donor specimen circulates in this reusable manifold.',
    color: '#8778b6'
  },
  {
    id: 'system-air-branch',
    kind: 'pressure',
    label: 'Independent bay actuation branch',
    from: 'air-manifold',
    to: 'bay-valve',
    description: 'A branch from the local dry-air manifold serves each installed bay valve. The controller selects the indicated branch; a shared supply fault would require assessment of every affected bay.',
    color: '#8778b6'
  },
  {
    id: 'system-dock-actuation',
    kind: 'pressure',
    label: 'Dry docking actuation',
    from: 'bay-valve',
    to: 'bay-dock',
    description: 'The selected bay valve applies controlled actuation at the seated cartridge docking interface. The proposed dry ports act on isolated disposable membrane regions rather than providing a reusable blood-fluid circuit.',
    color: '#8778b6'
  },
  {
    id: 'system-data-trunk',
    kind: 'data',
    label: 'Local control backplane',
    from: 'processor',
    to: 'backplane',
    description: 'The analyser controller exchanges bay commands, captured-image records and status through its local data backplane. Each record remains associated with its identified bay and specimen.',
    color: '#3c7fa4'
  },
  {
    id: 'system-data-branch',
    kind: 'data',
    label: 'Bay imaging data branch',
    from: 'backplane',
    to: 'optics',
    description: 'A local backplane branch connects each installed bay imaging assembly. Imaging commands travel to the bay, while captured images and bay status return to the controller.',
    color: '#3c7fa4'
  },
  {
    id: 'system-power-trunk',
    kind: 'power',
    label: 'Local electrical distribution',
    from: 'power',
    to: 'backplane',
    description: 'The analyser power supply feeds its local electrical distribution backplane. This is an internal electrical connection, separate from pneumatic actuation and disposable specimen paths.',
    color: '#667078'
  },
  {
    id: 'system-power-branch',
    kind: 'power',
    label: 'Bay electrical supply branch',
    from: 'backplane',
    to: 'optics',
    description: 'An electrical branch supplies the installed bay imaging and associated control assembly. Electrical ratings, connector design and protection requirements are not specified by this classroom model.',
    color: '#667078'
  },
  {
    id: 'cluster-data-link',
    kind: 'data',
    label: 'Inter-analyser data link',
    from: 'backplane',
    to: 'backplane',
    via: 'module-coupler',
    description: 'Two complete analyser units exchange queue and result-status information through the proposed network-coupler interfaces. Each unit retains its own power supply and local dry-air system; this inter-unit connection carries data only, with no specimen or shared pneumatic circulation.',
    color: '#3c7fa4'
  },
  {
    id: 'dock-seal-interface',
    kind: 'pressure',
    label: 'Seated dry-port seal',
    from: 'bay-dock',
    to: 'dock-seal',
    description: 'The proposed docking surfaces compress the dry-interface seal around the cartridge actuation ports. The sealing arrangement must be validated before any claim of instrument performance.',
    color: '#8778b6'
  },
  {
    id: 'membrane-actuation',
    kind: 'pressure',
    label: 'Isolated membrane actuation',
    from: 'dock-seal',
    to: 'cartridge-membrane',
    description: 'Dry-side actuation is transmitted to the disposable membrane region. The intended specimen-contact flow remains behind the cartridge barrier, not in the reusable valve, manifold or docking block.',
    color: '#8778b6'
  },
  {
    id: 'manual-patient-cells',
    kind: 'manual',
    label: 'Load patient red-cell aliquot',
    from: 'patient-cells',
    to: 'cartridge',
    description: 'The operator manually loads an identified, prepared recipient red-cell aliquot into its cartridge inlet when the selected assay requires it. The prepared container is not permanently tubed to the analyser.',
    color: '#8b4a59'
  },
  {
    id: 'manual-patient-plasma',
    kind: 'manual',
    label: 'Load patient plasma aliquot',
    from: 'patient-plasma',
    to: 'cartridge',
    description: 'The operator manually loads an identified, prepared recipient plasma aliquot into its separate cartridge inlet. This is a specimen fraction, not a transfusion plasma bag or a permanent fluid supply.',
    color: '#8b4a59'
  },
  {
    id: 'manual-donor-cells',
    kind: 'manual',
    label: 'Load donor red-cell aliquot',
    from: 'donor-cells',
    to: 'cartridge',
    description: 'The operator manually loads prepared red cells from the selected, traceable donor unit for an indicated crossmatch. The donor aliquot remains separate until its intended reaction with recipient plasma.',
    color: '#8b4a59'
  }
].map(connection => Object.freeze(connection)));

/** Return the relationships associated with a selectable component. */
export function connectionFor(componentId) {
  const id = String(componentId || '').trim();
  const component = /^bay-\d+$/.test(id) ? 'bays' : id.startsWith('reaction:') ? 'wells' : id;
  return CONNECTIONS.filter(connection => connection.from === component || connection.to === component || connection.via === component);
}

export const connectionsFor = connectionFor;
