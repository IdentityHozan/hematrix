import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SVGRenderer, SVGObject } from 'three/addons/renderers/SVGRenderer.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { CONNECTIONS } from './connections.js';
import { describeEvidence } from './demo-model.js';
export { CONNECTIONS, CONNECTION_KINDS, connectionFor, connectionsFor, DOCK_INTERFACE } from './connections.js';

export const COMPONENTS = [
  {
    "id": "enclosure",
    "name": "Protective enclosure",
    "does": "Houses the assay, electronics and two independent testing bays.",
    "why": "A compact benchtop body protects the proposed fluidic and optical assemblies.",
    "process": "The Core design target is approximately 45 × 35 × 30 cm and under 18 kg. Neither has been measured on a manufactured instrument.",
    "dimension": "45 × 35 × 30 cm; under 18 kg. Proposed Core design targets; expanded dimensions unverified.",
    "simpleName": "Machine body",
    "simpleDoes": "Protects the testing bays and electronics."
  },
  {
    "id": "screen",
    "name": "Operator touchscreen",
    "does": "Shows specimen identity, bay progress and review status.",
    "why": "The operator must see which cartridge and patient record belong together.",
    "process": "An analytical result enters qualified review; this display does not independently authorise transfusion.",
    "simpleName": "Screen",
    "simpleDoes": "Shows progress, results and review status."
  },
  {
    "id": "bays",
    "name": "Independent cartridge bays",
    "does": "Locates and locks an identified single-use cartridge beneath its optical reader.",
    "why": "Separate test positions let eligible requests begin independently.",
    "process": "Each bay has its own camera, light, two mechanical actuators, motor driver, heater and temperature probe. Shared reader power and electronics remain relevant system dependencies.",
    "simpleName": "Testing bays",
    "simpleDoes": "Each bay holds a separate kit for one test."
  },
  {
    "id": "optics",
    "name": "Camera and illumination assembly",
    "does": "Illuminates the reaction windows and captures their optical pattern.",
    "why": "Controlled imaging makes dispersed, agglutinated and uncertain patterns visible for interpretation.",
    "process": "Image quality and assay controls must pass. Optical clumping alone does not detect every clinically significant antibody.",
    "simpleName": "Camera and light",
    "simpleDoes": "Lights the test chambers and records their reactions."
  },
  {
    "id": "pumps",
    "name": "Dry linear actuators",
    "does": "Two local linear actuators operate one bay’s cartridge mechanisms through dry contact pads.",
    "why": "Each bay needs its own controlled mechanical movement.",
    "process": "Appendix A2 lists two dry linear actuators and one dual motor driver for each bay. The motors act through the silicone dry interface pad; specimen and reagent liquids remain inside the disposable cartridge.",
    "view": "dock",
    "simpleName": "Small motors",
    "simpleDoes": "Two small motors operate the kit through dry contact pads."
  },
  {
    "id": "processor",
    "name": "Processing and control board",
    "does": "Coordinates timing, bay status, optical capture and the local event record.",
    "why": "All test evidence must remain attached to the correct specimen and donor identifiers.",
    "process": "Local records can remain available during a network outage, while hospital transmission stays pending.",
    "simpleName": "Computer board",
    "simpleDoes": "Keeps each image and result linked to the correct sample."
  },
  {
    "id": "power",
    "name": "Power supply",
    "does": "Converts mains input to the internal instrument supply rails.",
    "why": "Optics, control electronics and actuators require stable electrical power.",
    "process": "Portability means relocation between suitably equipped laboratories. The concept still requires electrical power and trained staff.",
    "simpleName": "Power supply",
    "simpleDoes": "Supplies electricity to this reader and its bays."
  },
  {
    "id": "thermal",
    "name": "Core cooling fan",
    "does": "Circulates air around the shared reader electronics.",
    "why": "The reusable electronics need suitable operating conditions.",
    "process": "The shared build lists a cooling fan. Each bay separately contains its own heater, temperature probe and heater power switch.",
    "simpleName": "Cooling fan",
    "simpleDoes": "Moves air around the reader electronics."
  },
  {
    "id": "structure",
    "name": "Internal support frame",
    "does": "Aligns bays, optics and fluid-control interfaces.",
    "why": "Repeatable positioning keeps each reaction window within the imaging field.",
    "process": "A rigid support chassis separates the assay dock from serviceable electronics.",
    "simpleName": "Support frame",
    "simpleDoes": "Keeps the kit, camera and other parts in place."
  },
  {
    "id": "cartridge",
    "name": "Single-use microfluidic cartridge",
    "does": "Contains separate sample, reagent, reaction and waste regions.",
    "why": "The assay route must match the requested Type & Screen, Complete Routine or Match Only scope.",
    "process": "A fresh, identified cartridge is used for one indicated test. After use, the sealed specimen-contact paths and waste remain inside the disposable kit. Reuse is blocked in the demonstration. Geometry and chemistry require development and validation.",
    "specification": "Single-use sealed assay kit; scope-specific reaction regions. No validated cartridge dimensions are specified.",
    "simpleName": "Single-use kit",
    "simpleDoes": "Holds the samples, test materials, liquid paths and waste."
  },
  {
    "id": "inlet",
    "name": "Patient sample inlet",
    "does": "Receives an identified patient specimen.",
    "why": "Recipient red cells support forward grouping; recipient plasma supports reverse grouping, screening and crossmatching.",
    "process": "Existing laboratory equipment prepares the separate patient red-cell and plasma fractions. Staff identify and load them into the selected kit.",
    "simpleName": "Sample inlet",
    "simpleDoes": "Receives the identified, prepared sample."
  },
  {
    "id": "channels",
    "name": "Separated red-cell and plasma routes",
    "does": "Directs metered specimen fractions to their relevant reaction wells.",
    "why": "Typing reagents react with patient red cells; screening and crossmatching use patient plasma.",
    "process": "Red denotes a red-cell route. Amber denotes plasma. Animation follows the modelled channel geometry.",
    "simpleName": "Liquid paths",
    "simpleDoes": "Keeps each sample on its required route inside the kit."
  },
  {
    "id": "reagents",
    "name": "Metered reagent reservoirs",
    "does": "Supplies the selected reagent or reference cells to an isolated test region.",
    "why": "Forward grouping, reverse grouping and screening use different materials.",
    "process": "Assay-specific reagent/reference-cell reservoirs are preloaded into the single-use kit. The operator loads only the required prepared specimen fractions. Lot, expiry and control responses must be acceptable.",
    "specification": "Preloaded, metered, isolated assay reagents; not transfusion products.",
    "simpleName": "Test materials",
    "simpleDoes": "Contains the materials needed for each reaction."
  },
  {
    "id": "wells",
    "name": "Reaction and optical windows",
    "does": "Holds each isolated assay reaction for controlled imaging.",
    "why": "A positive Anti-A typing reaction and a reactive donor crossmatch have different meanings.",
    "process": "Typing reactivity supports antigen identification. Crossmatch reactivity requires holding the donor unit and investigating.",
    "simpleName": "Test chambers",
    "simpleDoes": "Holds the reactions that the camera records."
  },
  {
    "id": "waste",
    "name": "Sealed waste region",
    "does": "Collects spent sample and reagent within the disposable cartridge.",
    "why": "Waste must remain separate from reagent storage and finished reaction windows.",
    "process": "Spent assay fluid remains in the sealed single-use kit. A used cartridge cannot be refilled or reused. The proposed containment geometry still requires validation.",
    "specification": "Sealed post-assay waste; disposable cartridge lifecycle.",
    "simpleName": "Used liquid",
    "simpleDoes": "Keeps leftover liquid sealed inside the used kit."
  },
  {
    "id": "patient-cells",
    "name": "Patient red-cell fraction",
    "does": "Supplies prepared recipient red cells to forward ABO and RhD typing.",
    "why": "Patient red cells are required to test for A, B and D antigen reactions.",
    "process": "This is a prepared specimen fraction. It remains separate from recipient plasma and donor red cells until its own indicated reactions. It is not a transfusion component.",
    "specification": "Required for Type & Screen and Complete Routine; omitted from Match Only.",
    "simpleName": "Patient red cells",
    "simpleDoes": "Used to check the patient’s main blood-group markers."
  },
  {
    "id": "patient-plasma",
    "name": "Patient plasma fraction",
    "does": "Supplies prepared recipient plasma to reverse grouping, antibody screening and indicated crossmatching.",
    "why": "Recipient antibodies are assessed using the appropriate reagent cells or selected donor red cells.",
    "process": "This small prepared specimen fraction is not a transfusion plasma bag. Its gold pathway remains separate from the patient-cell route.",
    "specification": "Required by all three demonstrated cartridge scopes.",
    "simpleName": "Patient plasma",
    "simpleDoes": "Used to check antibodies and a selected donor when requested."
  },
  {
    "id": "donor-cells",
    "name": "Donor red-cell fraction",
    "does": "Supplies prepared red cells from the selected, identified donor unit.",
    "why": "Donor-specific crossmatching combines recipient plasma with these donor cells in the crossmatch chamber.",
    "process": "Donor red cells remain in their isolated red route until the intended crossmatch reaction. Matching ABO/RhD labels alone do not establish compatibility.",
    "specification": "Required for Complete Routine and Match Only; omitted from Type & Screen.",
    "simpleName": "Donor red cells",
    "simpleDoes": "Used to check the selected donor against the patient’s plasma."
  },
  {
    "id": "backplane",
    "name": "Power and data backplane",
    "view": "inside",
    "does": "Carries electrical power and communication between the Core and its installed bays.",
    "why": "Each local motor driver, heater and camera needs the appropriate electrical connection.",
    "process": "Keyed electrical couplers link expansion bays within one reader. Each complete reader retains its own power supply; two readers exchange data only.",
    "specification": "Proposed connection layout; no connector part number or electrical rating is claimed.",
    "simpleName": "Power and data board",
    "simpleDoes": "Connects each bay to the reader’s electricity and computer."
  },
  {
    "id": "air-manifold",
    "name": "Local actuator support",
    "view": "inside",
    "does": "Positions two dry mechanical actuators within one testing bay.",
    "why": "The actuator heads must align with that bay’s dry cartridge contact surfaces.",
    "process": "This support carries local mechanical hardware. The rear interconnect carries power and data; cartridge liquids remain in the single-use wet path.",
    "specification": "Local dry mechanical layout based on the updated product bill of materials.",
    "simpleName": "Motor support",
    "simpleDoes": "Holds the two small motors inside one bay."
  },
  {
    "id": "module-coupler",
    "name": "Expansion power and data couplers",
    "view": "inside",
    "does": "Joins the electrical interfaces between the Core and added bay modules.",
    "why": "The added bays need power and communication links.",
    "process": "The couplers connect power and data within one reader. A separate data cable connects two complete readers, each with its own power supply.",
    "simpleName": "Expansion plugs",
    "simpleDoes": "Connects power and data when more bays are added."
  },
  {
    "id": "bay-valve",
    "name": "Dual motor-driver board",
    "view": "dock",
    "does": "Controls the two dry linear actuators in one bay.",
    "why": "The bay’s cartridge mechanism needs controlled local movement.",
    "process": "Appendix A2 specifies one dual motor driver and two dry linear actuators per bay. Control and power reach the board electrically.",
    "simpleName": "Motor control",
    "simpleDoes": "Controls the two small motors in one bay."
  },
  {
    "id": "bay-dock",
    "name": "Cartridge dock and guide rails",
    "view": "dock",
    "does": "Locates and locks the cartridge, aligning its dry contact surfaces and optical windows.",
    "why": "The actuator pads, heater and camera must meet the intended kit positions.",
    "process": "The locating stop and insertion switches support positioning checks. Fitting the inspection model does not load, run or change an assay.",
    "simpleName": "Kit holder",
    "simpleDoes": "Guides the kit into place and locks it for testing."
  },
  {
    "id": "dock-seal",
    "name": "Silicone dry interface pad",
    "view": "dock",
    "does": "Transfers local actuator movement to the cartridge contact surface.",
    "why": "A dry contact interface keeps the reusable drive separate from the specimen-contact paths.",
    "process": "The updated bill of materials lists a silicone dry interface pad for each bay. The flat contact pad meets the kit surface during inspection fitting.",
    "simpleName": "Soft contact pad",
    "simpleDoes": "Passes the motor’s movement to the kit through a dry surface."
  },
  {
    "id": "cartridge-membrane",
    "name": "Sealed cartridge contact surface",
    "view": "dock",
    "does": "Receives dry mechanical contact from the bay’s actuator pad.",
    "why": "The bay must operate the cartridge mechanism while its liquid paths stay disposable.",
    "process": "The contact surface is part of the sealed kit. Mechanical actuation is illustrated as a proposed layout; the detailed internal cartridge mechanism remains an engineering-development task.",
    "simpleName": "Kit contact surface",
    "simpleDoes": "Receives the motor’s movement while liquids stay inside the kit."
  },
  {
    "id": "donor",
    "name": "Identified donor-unit inlet",
    "does": "Routes donor red cells to the donor-specific crossmatch chamber.",
    "why": "A matching ABO/RhD label does not by itself establish donor-unit compatibility.",
    "process": "Recipient plasma is tested against red cells from the selected, traceable donor unit.",
    "simpleName": "Donor sample inlet",
    "simpleDoes": "Receives prepared cells from the selected donor unit."
  },
  {
    "id": "heater",
    "name": "Bay heating element",
    "simpleName": "Heater",
    "does": "Controls the kit’s temperature for the selected test.",
    "simpleDoes": "Controls the kit’s temperature for the selected test.",
    "why": "The assay requires appropriate controlled conditions.",
    "process": "Appendix A2 lists one heater and a heater power switch per bay. Operating limits depend on the developed assay method.",
    "view": "dock"
  },
  {
    "id": "temperature-probe",
    "name": "Bay temperature probe",
    "simpleName": "Temperature sensor",
    "does": "Measures the temperature near the kit.",
    "simpleDoes": "Measures the temperature near the kit.",
    "why": "The software needs temperature feedback to check the heating conditions.",
    "process": "Appendix A2 lists a temperature probe for every bay. No measured temperature accuracy is claimed.",
    "view": "dock"
  },
  {
    "id": "limit-switch",
    "name": "Cartridge insertion limit switches",
    "simpleName": "Kit position switches",
    "does": "Checks whether the kit has reached its intended dock positions.",
    "simpleDoes": "Checks whether the kit has reached its intended dock positions.",
    "why": "The drive and camera should operate on a correctly positioned kit.",
    "process": "Appendix A2 lists two insertion limit switches per bay. This model illustrates their placement, not validated detection performance.",
    "view": "dock"
  }
];

const P = {shell:0xe9e8e3, light:0xfaf9f6, burgundy:0x7d2435, dark:0x24282b, metal:0xb6bdc0, red:0x94152b, amber:0xb47808, green:0x527a69, blue:0x7394a7};
const WELL_IDS={'Anti-A':'anti-a','Anti-B':'anti-b','Anti-D':'anti-d','A1 cells':'reverse-a1','B cells':'reverse-b','Screen I':'screen-i','Screen II':'screen-ii','Screen III':'screen-iii','Crossmatch':'crossmatch','Control +':'positive-control','Control −':'negative-control'};
const comp = id => COMPONENTS.find(c=>c.id===id);

export class ProductViewer {
  constructor(container, {onSelect=()=>{}}={}) {
    this.container=container; this.onSelect=onSelect; this.state={config:2,elapsed:0,running:false,stage:0,cartridge:'complete',mode:'device',exploded:false,cutaway:false,flow:false,activeBays:[],selectedBay:1,sampleLoaded:false,inserted:false,insertionProgress:0,loadedFractions:{patientCells:false,patientPlasma:false,donorCells:false},bayStates:[],showDimensions:false,kitUsed:false,showConnections:false,connectionKind:null,connectionScope:'system',dockSeparated:true,explanationMode:false};
    this.parts=[]; this.flows=[]; this.bayLamps=[]; this.selectables=[]; this.reactionWells=[]; this.loadedCartridges=[]; this.sampleTubes=[]; this.patientInlets=[]; this.screens=[]; this.loadingTrays=[]; this.labelPoints=[]; this.wasteRegions=[]; this.bayAnchors=[]; this.deviceUnits=[]; this.corePorts=[]; this.bayPorts=new Map(); this.connectionEdges=[]; this.inspectionCovers=[]; this.systemUnits=[]; this.systemEdges=[]; this.dockInspection=null; this.textures=[]; this.logoTexture=null; this.disposed=false;
    this.raycaster=new THREE.Raycaster(); this.pointer=new THREE.Vector2(); this.clock=new THREE.Clock();
    const canvas=document.createElement('canvas');let context=null;
    try{context=canvas.getContext('webgl2',{antialias:true,failIfMajorPerformanceCaveat:true});}catch{}
    if(context){
      this.renderer=new THREE.WebGLRenderer({canvas,context,antialias:true,powerPreference:'high-performance'});
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
      this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=.95;
      this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    }else{
      this.software=true;this.renderer=new SVGRenderer();this.renderer.setQuality('low');this.renderer.setPrecision(2);this.renderer.overdraw=.25;
    }
    this.renderer.setClearColor(0xf0efec,1);this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.renderer.domElement.setAttribute('aria-label','Interactive 3D HemaTrix model. Drag to rotate, scroll to zoom, right-drag to pan.');
    this.renderer.domElement.setAttribute('role','img');
    this.renderer.domElement.style.cssText='width:100%;height:100%;display:block;touch-action:none';
    container.appendChild(this.renderer.domElement);
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color(0xf0efec);
    this.camera=new THREE.PerspectiveCamera(36,1,.1,120);
    this.controls=new OrbitControls(this.camera,this.renderer.domElement);this.controls.enableDamping=true;this.controls.dampingFactor=.075;
    this.controls.minDistance=3;this.controls.maxDistance=35;this.controls.maxPolarAngle=Math.PI*.48;
    this.controls.target.set(0,1,0);
    this.scene.add(new THREE.HemisphereLight(0xffffff,0x7b858b,1.0));if(this.software)this.scene.add(new THREE.AmbientLight(0x939b9f,.65));
    const key=new THREE.DirectionalLight(0xffffff,this.software?.75:2.15);key.position.set(-5,10,6);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-18;key.shadow.camera.right=18;key.shadow.camera.top=18;key.shadow.camera.bottom=-18;key.shadow.normalBias=.025;key.shadow.bias=-.0002;this.scene.add(key);
    const fill=new THREE.DirectionalLight(0xffffff,this.software?.25:.7);fill.position.set(7,4,-5);this.scene.add(fill);
    this.floor=new THREE.Mesh(new THREE.PlaneGeometry(100,100),new THREE.MeshStandardMaterial({color:0xf0efec,roughness:.95}));this.floor.rotation.x=-Math.PI/2;this.floor.position.y=-.02;this.floor.receiveShadow=true;this.scene.add(this.floor);
    this.root=new THREE.Group();this.scene.add(this.root);
    this._pointerDown=e=>{this.down=[e.clientX,e.clientY];};this._pointerUp=e=>{if(this.down&&Math.hypot(e.clientX-this.down[0],e.clientY-this.down[1])<5)this.pick(e);};
    this.renderer.domElement.addEventListener('pointerdown',this._pointerDown);this.renderer.domElement.addEventListener('pointerup',this._pointerUp);
    this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(container);
    this.build();this.resize();this.setView('reset');this.animate();
  }
  mat(color,extra={}) {return new THREE.MeshStandardMaterial({color,roughness:.48,metalness:.08,...extra});}
  tag(object,id) {object.userData.component=id;this.selectables.push(object);return object;}
  box(parent,size,pos,color,id,round=.04,extra={}) {
    const geom=round&&!this.software?new RoundedBoxGeometry(...size,2,round):new THREE.BoxGeometry(...size);
    const mesh=new THREE.Mesh(geom,this.mat(color,extra));mesh.position.set(...pos);mesh.castShadow=true;mesh.receiveShadow=true;
    if(id)this.tag(mesh,id);parent.add(mesh);return mesh;
  }
  cylinder(parent,radius,height,pos,color,id,extra={}) {
    const mesh=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,height,this.software?8:24),this.mat(color,extra));mesh.position.set(...pos);mesh.castShadow=true;mesh.receiveShadow=true;if(id)this.tag(mesh,id);parent.add(mesh);return mesh;
  }
  part(parent,id,offset=[0,0,0]) {const group=new THREE.Group();parent.add(group);group.userData.component=id;group.userData.origin=group.position.clone();group.userData.explode=new THREE.Vector3(...offset);this.parts.push(group);return group;}
  text(parent,text,pos,{width=1.7,height=.28,size=48,color='#3d4143',background=null,rotate=false}={}) {
    if(this.software){
      const node=document.createElementNS('http://www.w3.org/2000/svg','text');node.textContent=text;node.setAttribute('text-anchor','middle');node.setAttribute('dominant-baseline','central');node.setAttribute('fill',color);node.setAttribute('font-family','Arial,sans-serif');node.setAttribute('font-weight','600');node.setAttribute('font-size',String(Math.max(6,Math.min(13,size/5))));node.style.pointerEvents='none';
      const label=new SVGObject(node);label.position.set(...pos);label.userData.labelNormal=new THREE.Vector3(0,rotate?1:0,rotate?0:1);label.userData.labelHeight=height*.72;label.userData.labelWidth=width*.95;parent.add(label);return label;
    }
    const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=Math.round(1024*height/width);const c=canvas.getContext('2d');
    if(background){c.fillStyle=background;c.fillRect(0,0,canvas.width,canvas.height);}c.fillStyle=color;c.textAlign='center';c.textBaseline='middle';let fontSize=canvas.height*.72;c.font=`600 ${fontSize}px Arial, sans-serif`;const measured=c.measureText(text).width;if(measured>canvas.width*.95){fontSize*=canvas.width*.95/measured;c.font=`600 ${fontSize}px Arial, sans-serif`;}c.fillText(text,512,canvas.height/2);
    const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;this.textures.push(tex);
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:THREE.DoubleSide}));mesh.position.set(...pos);if(rotate)mesh.rotation.x=-Math.PI/2;parent.add(mesh);return mesh;
  }
  frontLogo(parent,position){
    const width=.5,height=width*788/665;
    if(this.software){
      const node=document.createElementNS('http://www.w3.org/2000/svg','g'),picture=document.createElementNS('http://www.w3.org/2000/svg','image');
      picture.setAttribute('href',`${import.meta.env.BASE_URL}assets/hematrix-logo.svg`);picture.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',`${import.meta.env.BASE_URL}assets/hematrix-logo.svg`);picture.setAttribute('x','0');picture.setAttribute('y','0');picture.setAttribute('width','1');picture.setAttribute('height','1');picture.setAttribute('preserveAspectRatio','none');picture.style.pointerEvents='none';node.appendChild(picture);
      const logo=new SVGObject(node);logo.position.set(...position);logo.userData.logoImage=picture;logo.userData.logoSize={width,height};logo.userData.labelNormal=new THREE.Vector3(0,0,1);parent.add(logo);return logo;
    }
    if(!this.logoTexture){
      const texture=new THREE.TextureLoader().load(`${import.meta.env.BASE_URL}assets/hematrix-logo.png`,loaded=>{if(this.disposed)loaded.dispose();});texture.colorSpace=THREE.SRGBColorSpace;
      // Use the exact supplied PNG pixels, cropped to the same 665 × 788 viewBox as the SVG.
      texture.repeat.set(665/2048,788/1535);texture.offset.set(154/2048,(1535-89-788)/1535);this.logoTexture=texture;
    }
    const logo=new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map:this.logoTexture,transparent:true,alphaTest:.005,depthWrite:false,toneMapped:false}));logo.position.set(...position);this.tag(logo,'enclosure');parent.add(logo);return logo;
  }
  tube(parent,points,radius,color,id='channels',opacity=1) {
    const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),false,'catmullrom',.12);
    const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,this.software?12:64,radius,this.software?4:8,false),this.mat(color,{roughness:.25,transparent:opacity<1,opacity,depthWrite:opacity>=1}));if(id)this.tag(mesh,id);parent.add(mesh);return {curve,mesh};
  }
  channel(parent,points,color,start=.15,end=.72) {
    const {curve}=this.tube(parent,points,.059,new THREE.Color(color).lerp(new THREE.Color(0x30373b),.24),'channels',.58);
    const fluid=this.tube(parent,points,.041,color,'channels').mesh;fluid.geometry.setDrawRange(0,0);
    const beads=[];for(let i=0;i<3;i++){const bead=new THREE.Mesh(new THREE.SphereGeometry(.044,8,6),this.mat(color,{roughness:.5}));bead.visible=false;parent.add(bead);beads.push(bead);}
    this.flows.push({curve,fluid,start,end,beads,bay:this.buildingBay||null,fraction:this.activeFraction||null,segments:this.software?12:64,radial:this.software?4:8,fullIndex:this.software?fluid.geometry.index.array.slice():null,fillCount:-1});
  }
  build() {
    if(this.fallback)return;
    this.clearRoot();this.parts=[];this.flows=[];this.bayLamps=[];this.selectables=[];this.reactionWells=[];this.loadedCartridges=[];this.sampleTubes=[];this.patientInlets=[];this.screens=[];this.loadingTrays=[];this.labelPoints=[];this.wasteRegions=[];this.bayAnchors=[];this.deviceUnits=[];this.corePorts=[];this.bayPorts=new Map();this.connectionEdges=[];this.inspectionCovers=[];this.systemUnits=[];this.systemEdges=[];this.dockInspection=null;
    if(this.state.mode==='cartridge')this.buildCartridge(this.root,this.state.cartridge);
    else if(this.state.mode==='optics')this.buildOptics();
    else if(this.state.mode==='dock')this.buildDock();
    else this.buildDevice();
    this.buildConnectionLayer();this.buildSystemConnectionLayer();this.selectComponent(this.state.selectedComponent||null);this.updateMachineDisplays(true);
  }
  clearRoot(){
    if(!this.root)return;
    this.root.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});
    this.root.clear();for(const tex of this.textures)tex.dispose();this.textures=[];
    if(this.selection){this.scene.remove(this.selection);this.selection.geometry.dispose();this.selection.material.dispose();this.selection=null;}
  }
  buildDevice(){
    const units=this.state.config===16?2:1;const perUnit=this.state.config===16?8:this.state.config;
    for(let u=0;u<units;u++){
      this.buildingUnit=u;const unit=new THREE.Group();unit.position.z=u===0?0:-4.6;this.root.add(unit);this.deviceUnits.push({object:unit,index:u});this.buildCore(unit,u*8);
      const expansion=(perUnit-2)/2;
      for(let m=0;m<expansion;m++)this.buildModule(unit,3.06+m*1.64,u*8+2+m*2);
      this.buildSystemInfrastructure(unit,u,perUnit);
    }
    this.buildingUnit=0;this.buildPreparedInputs(this.root);
    this.center=new THREE.Vector3((Math.max(perUnit-2,0)/2)*.82-.7,1.25,units===2?-2.3:.3);this.span=perUnit===2?7.0:perUnit===4?7.8:10.7;
  }
  buildCore(parent,bayStart){
    const chassis=this.part(parent,'structure',[0,-.03,0]);
    this.box(chassis,[4.5,.23,3.4],[0,.23,0],P.dark,'structure',.07);
    this.box(chassis,[4.35,.2,3.25],[0,.4,0],P.metal,'structure');
    for(const x of [-1.8,1.8])for(const z of [-1.25,1.25])this.cylinder(chassis,.19,.18,[x,.07,z],P.dark,'structure');
    const enclosure=this.part(parent,'enclosure',[0,1.45,-.35]);enclosure.userData.shell=true;
    this.box(enclosure,[.16,2.55,3.4],[-2.17,1.7,0],P.shell,'enclosure',.05);
    this.box(enclosure,[.16,2.55,3.4],[2.17,1.7,0],P.shell,'enclosure',.05);
    this.box(enclosure,[4.5,.18,3.4],[0,3,0],P.light,'enclosure',.07);
    this.box(enclosure,[4.2,2.4,.16],[0,1.75,-1.62],P.shell,'enclosure');
    this.box(enclosure,[4.25,1.35,.16],[0,2.3,1.63],P.light,'enclosure',.05);
    this.box(enclosure,[4.26,.16,.16],[0,.52,1.65],P.burgundy,'enclosure',.02);
    // Rear service panel, grille and electrical interfaces.
    this.box(enclosure,[2.7,1.6,.06],[-.2,1.7,-1.73],0xd2d5d3,'enclosure',.025);
    for(let i=0;i<10;i++)this.box(enclosure,[.045,.75,.02],[-1.15+i*.16,1.85,-1.77],0x7b8283,'thermal',.007);
    this.box(enclosure,[.3,.23,.05],[1.35,.9,-1.76],P.dark,'power',.015);
    for(const x of [-1.86,1.86])for(const y of [.8,2.7]){const s=this.cylinder(enclosure,.045,.025,[x,y,1.73],0x888f91,'enclosure');s.rotation.x=Math.PI/2;}
    const display=this.part(parent,'screen',[0,.4,1.1]);display.userData.shell=true;display.userData.connectionVisible=true;display.userData.connectionUnit=this.buildingUnit;
    this.box(display,[3.15,1.19,.13],[-.45,2.2,1.77],0x202a30,'screen',.06);
    const anchor=new THREE.Object3D();anchor.position.set(-.45,2.2,1.845);display.add(anchor);
    const screenEntry={anchor,width:2.99,height:1.055,bayStart};
    if(this.software){
      this.box(display,[2.99,1.055,.012],[-.45,2.2,1.843],0x10232a,'screen',0);
      const make=(value,y,height,color)=>this.text(display,value,[-.45,y,1.857],{width:2.78,height,size:50,color});
      screenEntry.labels={header:make('HEMATRIX',2.65,.12,'#b5c9cf'),title:make('Load patient sample',2.43,.23,'#f4f8f7'),status:make('IDLE',2.23,.13,'#b5c9cf'),lines:[make('',2.06,.13,'#e9f2ef'),make('',1.9,.13,'#e9f2ef'),make('',1.74,.13,'#e9f2ef')]};
    }else{
      const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=480;
      const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;this.textures.push(texture);
      const face=new THREE.Mesh(new THREE.PlaneGeometry(2.99,1.055),new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));face.position.set(-.45,2.2,1.845);display.add(face);this.tag(face,'screen');screenEntry.texture=texture;screenEntry.canvas=canvas;
    }
    this.screens.push(screenEntry);
    this.frontLogo(display,[1.58,2.5,1.746]);
    this.text(display,'HemaTrix',[1.58,2.04,1.746],{width:.76,height:.15,size:61,color:'#642033'});
    this.text(display,'CORE',[1.58,1.84,1.746],{width:.61,height:.1,size:38,color:'#394548'});
    this.box(display,[.18,.04,.02],[1.58,1.68,1.74],P.green,'screen',.012);
    this.addLabel(enclosure,'enclosure','Core enclosure',[2.2,2.6,.2]);this.addLabel(display,'screen','Live instrument display',[-.45,2.2,1.85]);
    const docks=this.part(parent,'bays',[0,0,1.05]);
    for(let b=0;b<2;b++){
      const x=b===0?-1.03:1.03;const bayId=bayStart+b+1;const bayBody=new THREE.Group();bayBody.userData.bay=bayId;docks.add(bayBody);this.addLabel(bayBody,`bay-${bayId}`,`Bay ${String(bayId).padStart(2,'0')}`,[x,1.08,1.5],{bay:bayId});this.bayAnchors.push({object:bayBody,bay:bayId});this.bayPorts.set(bayId,{unit:this.buildingUnit,pressure:this.port(bayBody,[x,.97,-1.02]),dockingWindow:this.port(bayBody,[x,.87,.29])});
      this.box(bayBody,[1.85,.13,2.86],[x,.58,-.04],P.dark,'bays',.025);
      for(const side of [-1,1])this.box(bayBody,[.09,.8,2.86],[x+side*.88,.98,-.04],P.dark,'bays',.018);
      this.box(bayBody,[1.85,.8,.08],[x,.98,-1.44],P.dark,'bays',.018);
      this.box(bayBody,[1.67,.22,.055],[x,1.23,1.43],0x343b3e,'bays',.018);
      this.box(bayBody,[1.67,.11,.055],[x,.7,1.43],0x343b3e,'bays',.018);
      const tray=this.box(bayBody,[1.52,.065,2.55],[x,.68,.02],0x8c9395,'bays',.015);
      const trayLip=this.box(bayBody,[1.5,.075,.06],[x,.71,1.36],0x7a878d,'bays',.012);
      this.loadingTrays.push({object:tray,origin:tray.position.clone(),bay:bayStart+b+1},{object:trayLip,origin:trayLip.position.clone(),bay:bayStart+b+1});
      this.box(bayBody,[.31,.13,.075],[x+.63,1.05,1.49],0x979da0,'bays',.018);
      this.text(bayBody,`BAY ${bayStart+b+1}`,[x,1.25,1.47],{width:.8,height:.13,size:42,color:'#e4e7e4'});
      const lamp=this.box(bayBody,[.35,.045,.027],[x,.78,1.48],P.green,'bays',.012);this.bayLamps.push({mesh:lamp,index:bayStart+b});
      // Loaded cartridge remains mechanically seated under the optical assembly.
      const cart=new THREE.Group();cart.position.set(x,.73,.29);cart.scale.setScalar(.31);cart.rotation.y=Math.PI/2;bayBody.add(cart);const scope=this.scopeForBay(bayId);this.loadedCartridges.push({object:cart,origin:cart.position.clone(),bay:bayId,scope});this.buildingBay=bayId;this.buildCartridge(cart,scope,true);this.buildingBay=null;
    }
    const optics=this.part(parent,'optics',[0,.95,.1]);
    for(const [cameraIndex,x] of [-1.03,1.03].entries()){
      const ports=this.bayPorts.get(bayStart+cameraIndex+1);ports.optical=this.port(optics,[x,1.445,.04]);ports.cameraData=this.port(optics,[x+.34,1.86,-.13]);ports.cameraPower=this.port(optics,[x-.33,1.82,-.13]);
      for(const side of [-1,1])this.box(optics,[.12,.12,1.7],[x+side*.66,1.5,-.04],0x829198,'optics',.02);
      this.box(optics,[1.45,.12,.12],[x,1.5,-.83],0x829198,'optics',.02);
      this.box(optics,[.7,.38,.68],[x,1.83,.04],0x3e484d,'optics',.035);
      const lens=this.cylinder(optics,.2,.18,[x,1.56,.04],0x1f2529,'optics');
      this.cylinder(optics,.13,.035,[x,1.45,.04],0x8eb7c5,'optics',{metalness:.6,roughness:.1});
    }
    const board=this.part(parent,'processor',[1.15,.4,-.55]);
    this.box(board,[.11,1.45,1.65],[1.86,1.54,-.44],0x315f50,'processor',.02);
    this.box(board,[.09,.4,.4],[1.77,1.7,-.4],0x252b2e,'processor',.008);
    for(let i=0;i<4;i++)this.box(board,[.11,.1,.22],[1.76,1.2+i*.2,-.88],0xd2bc7e,'processor',.005);
    const power=this.part(parent,'power',[-1,.25,-.3]);this.box(power,[.58,1.35,1.5],[-1.67,1.35,-.45],0xaeb5b6,'power',.03);
    for(let i=0;i<7;i++)this.box(power,[.025,.45,.045],[-1.985,1.65,-.95+i*.16],0x606b71,'power',.003);
    const thermal=this.part(parent,'thermal',[0,.35,-.35]);
    this.box(thermal,[.84,.84,.12],[0,2.18,-1.47],0x53636b,'thermal',.035);
    const fan=this.cylinder(thermal,.32,.04,[0,2.18,-1.395],0x293940,'thermal');fan.rotation.x=Math.PI/2;
    for(let index=0;index<4;index++){const blade=this.box(thermal,[.11,.36,.025],[Math.sin(index*Math.PI/2)*.14,2.18+Math.cos(index*Math.PI/2)*.14,-1.365],0x9aabb1,'thermal',.01);blade.rotation.z=-index*Math.PI/2+.35;}
    this.corePorts[this.buildingUnit]={frameParts:[chassis,display,optics,board,power,thermal],displayAssembly:display,processorData:this.port(board,[1.78,1.85,-.38]),processorPower:this.port(board,[1.78,1.14,-.68]),screen:this.port(display,[-.45,2.2,1.69]),power:this.port(power,[-1.36,1.25,-.45])};
    for(const [object,id,name,pos] of [[chassis,'structure','Internal support frame',[0,.42,0]],[optics,'optics','Camera and ring illumination',[0,1.9,.05]],[board,'processor','Processing board',[1.85,1.6,-.4]],[power,'power','Power supply',[-1.65,1.4,-.4]],[thermal,'thermal','Core cooling fan',[0,2.4,-1.4]]])this.addLabel(object,id,name,pos,{internal:true});

  }
  buildModule(parent,x,bayStart){
    const body=this.part(parent,'bays',[.35,0,.2]);
    const shell=this.box(body,[1.55,2.73,3.35],[x,1.61,0],P.shell,'bays',.07);this.inspectionCovers.push(shell);
    this.box(body,[1.57,.18,3.4],[x,.25,0],P.dark,'structure',.04);
    for(let b=0;b<2;b++){
      const y=.9+b*.97;const bayId=bayStart+b+1;const bayBody=new THREE.Group();bayBody.userData.bay=bayId;body.add(bayBody);this.addLabel(bayBody,`bay-${bayId}`,`Bay ${String(bayId).padStart(2,'0')}`,[x,y,1.77],{bay:bayId});this.bayAnchors.push({object:bayBody,bay:bayId});this.bayPorts.set(bayId,{unit:this.buildingUnit,pressure:this.port(bayBody,[x,y-.04,.24]),dockingWindow:this.port(bayBody,[x,y-.1,.94])});
      const fascia=this.box(bayBody,[1.29,.73,.075],[x,y,1.71],P.dark,'bays',.025);this.inspectionCovers.push(fascia);
      this.box(bayBody,[1.13,.065,1.95],[x,y-.23,.69],0x6f797d,'bays',.012);
      const cartridge=new THREE.Group();cartridge.position.set(x,y-.2,.94);cartridge.scale.setScalar(.245);cartridge.rotation.y=Math.PI/2;bayBody.add(cartridge);const scope=this.scopeForBay(bayId);this.loadedCartridges.push({object:cartridge,origin:cartridge.position.clone(),bay:bayId,scope});this.buildingBay=bayId;this.buildCartridge(cartridge,scope,true);this.buildingBay=null;
      const opticalHead=this.part(bayBody,'optics',[0,.36,-.08]);this.box(opticalHead,[.38,.27,.42],[x,y+.29,.94],0x3b4950,'optics',.025);this.cylinder(opticalHead,.1,.13,[x,y+.09,.94],0x29353c,'optics');this.cylinder(opticalHead,.074,.025,[x,y+.015,.94],0x78a1b2,'optics',{roughness:.1});const ports=this.bayPorts.get(bayId);ports.optical=this.port(opticalHead,[x,y,.94]);ports.cameraData=this.port(opticalHead,[x+.19,y+.29,.85]);ports.cameraPower=this.port(opticalHead,[x-.19,y+.29,.85]);
      this.text(bayBody,`BAY ${bayStart+b+1}`,[x,y+.14,1.76],{width:.83,height:.15,size:42,color:'#e4e7e4'});
      const lamp=this.box(bayBody,[.26,.04,.025],[x,y-.19,1.77],P.green,'bays',.008);this.bayLamps.push({mesh:lamp,index:bayStart+b});
    }
    this.text(body,'EXPANSION',[x,2.55,1.72],{width:1.13,height:.15,size:40,color:'#6e7372'});
    this.box(body,[1.53,.13,.05],[x,.48,1.71],P.burgundy,'enclosure',.005);
  }
  port(parent,position){const point=new THREE.Object3D();point.position.set(...position);parent.add(point);return point;}
  inspectionDestination(part){
    const origin=part.userData.origin||new THREE.Vector3();const selectedUnit=this.bayPorts.get(Number(this.state.selectedBay||1))?.unit||0;
    if(this.state.showConnections&&this.state.cutaway&&part.userData.connectionVisible&&part.userData.connectionUnit===selectedUnit)return origin.clone().add(new THREE.Vector3(0,1.45,-1.4));
    return origin.clone().addScaledVector(part.userData.explode||new THREE.Vector3(),this.state.exploded?1:0);
  }
  connectionFrameBounds(){
    const selected=Number(this.state.selectedBay||1),bay=this.bayPorts.get(selected),core=this.corePorts[bay?.unit||0];if(!core)return null;this.root.updateMatrixWorld(true);
    const points=Object.values(this.connectionEndpoints()).flat().filter(Boolean),bounds=new THREE.Box3().setFromPoints(points);
    const anticipatedBox=object=>{const box=new THREE.Box3().setFromObject(object);let ancestor=object;while(ancestor&&ancestor!==this.root){if(ancestor.userData.origin&&ancestor.parent){const target=this.inspectionDestination(ancestor),now=ancestor.position;const delta=ancestor.parent.localToWorld(target.clone()).sub(ancestor.parent.localToWorld(now.clone()));box.translate(delta);}ancestor=ancestor.parent;}return box;};
    for(const part of core.frameParts||[])bounds.union(anticipatedBox(part));
    const cartridge=this.loadedCartridges.find(item=>item.bay===selected),record=this.bayState(selected);if(cartridge&&record?.kitPresent!==false){const box=anticipatedBox(cartridge.object),inserted=record?.inserted??this.state.inserted,insertion=inserted?1:THREE.MathUtils.clamp(Number(record?.insertionProgress??this.state.insertionProgress)||0,0,1);const target=cartridge.origin.clone().add(new THREE.Vector3(0,0,1.6*(1-insertion)));const delta=cartridge.object.parent.localToWorld(target).sub(cartridge.object.parent.localToWorld(cartridge.object.position.clone()));box.translate(delta);bounds.union(box);}
    return bounds.expandByScalar(.3);
  }
  connectionEndpoints(){
    const selected=Number(this.state.selectedBay||1),bay=this.bayPorts.get(selected),core=this.corePorts[bay?.unit||0];if(!bay||!core)return {};
    this.root.updateMatrixWorld(true);const record=this.bayState(selected),inserted=record?.inserted??this.state.inserted;
    const window=inserted&&record?.kitPresent!==false&&bay.reaction?bay.reaction:bay.dockingWindow;
    const point=object=>object?.getWorldPosition(new THREE.Vector3());
    return {'pressure-dock':[point(bay.actuatorFaces?.[0]),point(bay.padPorts?.[0])],'optical-capture':[point(window),point(bay.optical)],'camera-data':[point(bay.cameraData),point(core.processorData)],'display-data':[point(core.processorData),point(core.screen)],'power-processor':[point(core.power),point(core.processorPower)],'power-optics':[point(core.power),point(bay.cameraPower)],'power-control':[point(core.power),point(bay.driverPower)]};
  }
  buildConnectionLayer(){
    this.connectionLayer=new THREE.Group();this.connectionLayer.visible=false;this.root.add(this.connectionLayer);
    for(const metadata of CONNECTIONS.filter(item=>['pressure-dock','optical-capture','camera-data','display-data','power-processor','power-optics','power-control'].includes(item.id))){
      const group=new THREE.Group();this.connectionLayer.add(group);const optical=metadata.kind==='optical';
      const material=optical?new THREE.LineDashedMaterial({color:metadata.color,dashSize:.07,gapSize:.045,transparent:true,opacity:.95,depthTest:false}):new THREE.MeshBasicMaterial({color:metadata.color,transparent:true,opacity:.95,depthTest:false,toneMapped:false});
      const geometry=optical?new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3(0,.01,0)]):new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(),new THREE.Vector3(0,.01,0)),8,.027,4,false);
      const path=optical?new THREE.Line(geometry,material):new THREE.Mesh(geometry,material);group.add(path);path.renderOrder=5;
      const ends=[];for(let i=0;i<2;i++){const endpoint=new THREE.Mesh(new THREE.SphereGeometry(.052,this.software?6:10,6),new THREE.MeshBasicMaterial({color:metadata.color,toneMapped:false,depthTest:false}));endpoint.renderOrder=6;group.add(endpoint);ends.push(endpoint);}
      const arrow=new THREE.Mesh(new THREE.ConeGeometry(.06,.15,6),new THREE.MeshBasicMaterial({color:metadata.color,toneMapped:false,depthTest:false}));arrow.renderOrder=6;group.add(arrow);
      this.connectionEdges.push({metadata,group,path,ends,arrow,curve:null,last:null});
    }
  }
  connectionCurve(metadata,from,to){
    if(metadata.kind==='optical'||metadata.kind==='pressure')return new THREE.LineCurve3(from.clone(),to.clone());
    const a=from.clone(),b=to.clone();let points;
    if(metadata.kind==='pressure'){
      const rear=Math.min(a.z,b.z)-.35;points=[a,new THREE.Vector3(a.x,a.y+.12,rear),new THREE.Vector3(b.x,b.y+.12,rear),b];
    }else if(metadata.kind==='power'){
      const low=Math.min(a.y,b.y)-.34;points=[a,new THREE.Vector3(a.x,low,a.z-.14),new THREE.Vector3(b.x,low,b.z-.14),b];
    }else{
      const high=Math.max(a.y,b.y)+.23;points=[a,new THREE.Vector3(a.x,high,a.z-.25),new THREE.Vector3(b.x,high,b.z-.25),b];
    }
    return new THREE.CatmullRomCurve3(points,false,'catmullrom',.1);
  }
  updateConnections(){
    if(!this.connectionLayer)return;
    const show=!!this.state.showConnections&&this.state.mode==='device'&&!!this.state.cutaway;
    // Both scopes show the electrical backplane and local mechanical drives. The selected scope narrows the visible branches.
    this.connectionLayer.visible=false;this.updateSystemConnections(show);
  }

  connectionAnchors(){
    if(this.systemLayer?.visible)return this.systemEdges.filter(edge=>edge.curve).map(edge=>{const point=this.projectPoint(edge.curve.getPoint(.5));return {...edge.metadata,label:this.state.explanationMode?(edge.metadata.technicalLabel||edge.metadata.label):edge.metadata.label,id:edge.id,x:point.x,y:point.y,visible:edge.group.visible&&point.visible,bay:edge.bay};});if(!this.connectionLayer?.visible)return [];this.camera.updateMatrixWorld(true);return this.connectionEdges.filter(edge=>edge.curve).map(edge=>{const point=this.projectPoint(edge.curve.getPoint(.52));return {...edge.metadata,label:this.state.explanationMode?(edge.metadata.technicalLabel||edge.metadata.label):edge.metadata.label,x:point.x,y:point.y,visible:edge.group.visible&&point.visible};});
  }
  buildLocalBayHardware(bayId){
    const bay=this.bayPorts.get(bayId),kit=this.loadedCartridges.find(item=>item.bay===bayId);if(!bay||!kit)return;
    const parent=bay.pressure.parent,s=kit.object.scale.x,x=kit.origin.x,y=kit.origin.y+.24*s,contactZ=kit.origin.z-2.55*s;
    const mount=this.part(parent,'air-manifold',[0,.03,-.03]),actuators=this.part(parent,'pumps',[0,.06,-.04]),driver=this.part(parent,'bay-valve',[0,.08,-.06]),pads=this.part(parent,'dock-seal');
    this.box(mount,[.48,.065,.46],[x,y-.12,contactZ-.28],0x8b9ca2,'air-manifold',.018);
    this.box(driver,[.27,.045,.28],[x-.34,y+.10,contactZ-.33],0x315e52,'bay-valve',.012);
    for(const side of [-1,1])this.box(driver,[.075,.05,.13],[x-.34+side*.075,y+.145,contactZ-.33],0x283a42,'bay-valve',.006);
    bay.driverData=this.port(driver,[x-.45,y+.13,contactZ-.43]);bay.driverPower=this.port(driver,[x-.45,y+.13,contactZ-.25]);bay.driverOutputs=[];bay.actuatorInputs=[];bay.actuatorFaces=[];bay.padPorts=[];
    for(const [index,side] of [-1,1].entries()){
      const mx=x+side*.115,color=index?0xa4b5c4:0x92aaa9;
      this.box(actuators,[.15,.14,.24],[mx,y,contactZ-.38],0x42555e,'pumps',.012);
      const barrel=this.cylinder(actuators,.052,.18,[mx,y,contactZ-.19],0xaabac0,'pumps',{metalness:.35});barrel.rotation.x=Math.PI/2;
      const shaft=this.cylinder(actuators,.02,.12,[mx,y,contactZ-.09],0xd9e3e3,'pumps',{metalness:.65,roughness:.24});shaft.rotation.x=Math.PI/2;
      this.box(actuators,[.105,.10,.025],[mx,y,contactZ-.0405],0x84989f,'pumps',.008);
      this.box(pads,[.11,.11,.028],[mx,y,contactZ-.014],color,'dock-seal',.008,{roughness:.9,metalness:0});
      // The receiving patch belongs to the moving disposable kit; no liquid crosses this dry contact.
      this.box(kit.object,[.024/s,.12/s,.11/s],[2.55-.012/s,.24,side*.115/s],color,'cartridge-membrane',.016);
      bay.driverOutputs.push(this.port(driver,[x-.34+side*.07,y+.13,contactZ-.20]));bay.actuatorInputs.push(this.port(actuators,[mx,y+.06,contactZ-.48]));bay.actuatorFaces.push(this.port(actuators,[mx,y,contactZ-.028]));bay.padPorts.push(this.port(pads,[mx,y,contactZ]));
    }
    const heater=this.part(parent,'heater'),probe=this.part(parent,'temperature-probe'),switches=this.part(parent,'limit-switch');
    const heaterY=kit.origin.y-.037;
    this.box(heater,[.77,.035,1.07],[x,heaterY,kit.origin.z],0xb5a48c,'heater',.014,{metalness:.22});
    this.box(heater,[.15,.035,.18],[x+.48,heaterY-.035,contactZ+.12],0x315e52,'heater',.006);this.box(heater,[.075,.075,.08],[x+.48,heaterY+.015,contactZ+.12],0x2b3941,'heater',.004);
    const tip=this.cylinder(probe,.015,.16,[x+.39,heaterY+.018,kit.origin.z+.20],0xd4dddd,'temperature-probe',{metalness:.65});tip.rotation.z=Math.PI/2;
    this.box(probe,[.065,.045,.07],[x+.48,heaterY+.018,kit.origin.z+.20],0x344952,'temperature-probe',.006);
    bay.heaterPower=this.port(heater,[x+.48,heaterY+.015,contactZ+.12]);bay.probeData=this.port(probe,[x+.50,heaterY+.018,kit.origin.z+.20]);
    const kitHalfWidth=1.625*s;for(const side of [-1,1]){this.box(switches,[.075,.08,.11],[x+side*(kitHalfWidth+.065),kit.origin.y+.035,contactZ+.11],0x2c3f47,'limit-switch',.008);this.box(switches,[.025,.025,.10],[x+side*(kitHalfWidth-.005),kit.origin.y+.08,contactZ+.11],0xc2d1d5,'limit-switch',.004);}
    bay.switchData=this.port(switches,[x+kitHalfWidth+.065,kit.origin.y+.08,contactZ+.11]);
    const ringParent=bay.optical.parent,ringPoint=bay.optical.position;
    const ring=new THREE.Mesh(new THREE.RingGeometry(.13,.235,this.software?12:24),this.mat(0x416452,{side:THREE.DoubleSide,roughness:.6}));ring.rotation.x=-Math.PI/2;ring.position.set(ringPoint.x,ringPoint.y-.01,ringPoint.z);this.tag(ring,'optics');ringParent.add(ring);
    for(let led=0;led<8;led++){const angle=led*Math.PI/4;this.box(ringParent,[.032,.018,.032],[ringPoint.x+Math.cos(angle)*.18,ringPoint.y-.021,ringPoint.z+Math.sin(angle)*.18],0xfffef0,'optics',.004,{emissive:0xb7ac86,emissiveIntensity:.20});}
    for(const [object,id,name,pos] of [[actuators,'pumps','Dry linear actuators',[x,y+.13,contactZ-.28]],[driver,'bay-valve','Dual motor driver',[x-.34,y+.18,contactZ-.33]],[pads,'dock-seal','Silicone dry interface pad',[x,y,contactZ]],[heater,'heater','Bay heater',[x+.25,heaterY,kit.origin.z]],[probe,'temperature-probe','Temperature probe',[x+.48,heaterY+.05,kit.origin.z+.20]],[switches,'limit-switch','Insertion limit switches',[x+.43,kit.origin.y+.12,contactZ+.11]],[mount,'air-manifold','Local actuator support',[x,y-.1,contactZ-.28]]])this.addLabel(object,id,name,pos,{internal:true,bay:bayId});
  }
  buildSystemInfrastructure(parent,unitIndex,capacity){
    const backplane=this.part(parent,'backplane',[0,0,-.12]),segments=[[-1.7,capacity>2?2.15:1.7]];for(let module=0;module<(capacity-2)/2;module++){const x=3.06+module*1.64;segments.push([x-.68,x+.68]);}
    const end=segments.at(-1)[1];
    for(const [left,right] of segments){const width=right-left,mid=(left+right)/2;this.box(backplane,[width,.38,.085],[mid,.8,-1.48],0x31584d,'backplane',.012);this.box(backplane,[width,.025,.025],[mid,.9,-1.42],0x3c7fa4,'backplane',.003);this.box(backplane,[width,.025,.025],[mid,.68,-1.42],0x8a969b,'backplane',.003);}
    for(let index=0;index<segments.length-1;index++){const left=segments[index][1],right=segments[index+1][0],x=(left+right)/2,width=right-left,coupler=this.part(parent,'module-coupler');this.box(coupler,[width,.15,.14],[x,.91,-1.48],0x3c7fa4,'module-coupler',.012);this.box(coupler,[width,.14,.14],[x,.69,-1.48],0x667078,'module-coupler',.012);this.box(coupler,[.07,.55,.12],[x,.8,-1.56],0x737f85,'module-coupler',.008);this.addLabel(coupler,'module-coupler','Power and data coupler',[x,.94,-1.45],{internal:true});}
    const infrastructure={index:unitIndex,parent,backplane,dataStart:this.port(backplane,[-1.7,.9,-1.42]),powerStart:this.port(backplane,[-1.7,.68,-1.42]),dataEnd:this.port(backplane,[end,.9,-1.42]),powerEnd:this.port(backplane,[end,.68,-1.42]),branches:[]};
    for(let number=0;number<capacity;number++){const id=unitIndex*8+number+1,bay=this.bayPorts.get(id);if(!bay)continue;this.buildLocalBayHardware(id);const x=bay.pressure.position.x+(number>=2?(number%2===0?-.12:.12):0);infrastructure.branches.push({id,bay,dataTap:this.port(backplane,[x,.9,-1.42]),powerTap:this.port(backplane,[x,.68,-1.42])});}
    this.addLabel(backplane,'backplane','Power and data backplane',[(end-1.7)/2,.81,-1.4],{internal:true});this.systemUnits.push(infrastructure);
  }

  buildSystemConnectionLayer(){
    this.systemLayer=new THREE.Group();this.root.add(this.systemLayer);this.systemLayer.visible=false;
    const add=(metadataId,from,to,{unit=0,bay=null,straight=false,route=null}={})=>{
      const metadata=CONNECTIONS.find(item=>item.id===metadataId);if(!metadata||!from||!to)return;const group=new THREE.Group();this.systemLayer.add(group);const physical=metadata.kind==='pressure';const material=physical?new THREE.MeshBasicMaterial({color:metadata.color,transparent:true,opacity:.7,depthTest:false,toneMapped:false}):new THREE.LineBasicMaterial({color:metadata.color,transparent:true,opacity:.7,depthTest:false,linewidth:1.7});const path=physical?new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(),new THREE.Vector3(0,.01,0)),4,.025,4,false),material):new THREE.Line(new THREE.BufferGeometry(),material);path.renderOrder=5;group.add(path);
      const dots=[];for(let end=0;end<2;end++){const dot=new THREE.Mesh(new THREE.SphereGeometry(.035,6,4),new THREE.MeshBasicMaterial({color:metadata.color,toneMapped:false,depthTest:false,transparent:true}));dot.renderOrder=6;group.add(dot);dots.push(dot);}
      this.systemEdges.push({id:`${metadataId}-u${unit}-b${bay??'bus'}-${this.systemEdges.length}`,metadata,from,to,unit,bay,straight,route,group,path,dots,physical,curve:null,last:null});
    };
    for(const system of this.systemUnits){const unit=system.index,core=this.corePorts[unit];
      add('system-data-trunk',core.processorData,system.dataStart,{unit});add('system-data-trunk',system.dataStart,system.dataEnd,{unit,straight:true});add('system-power-trunk',core.power,system.powerStart,{unit});add('system-power-trunk',system.powerStart,system.powerEnd,{unit,straight:true});add('display-data',core.processorData,core.screen,{unit});
      for(const branch of system.branches){const options={unit,bay:branch.id};
        add('local-driver-data',branch.dataTap,branch.bay.driverData,options);add('local-driver-power',branch.powerTap,branch.bay.driverPower,options);
        add('system-air-supply',branch.bay.driverOutputs[0],branch.bay.actuatorInputs[0],{...options,straight:true});add('system-air-branch',branch.bay.driverOutputs[1],branch.bay.actuatorInputs[1],{...options,straight:true});
        for(let index=0;index<2;index++)add('system-dock-actuation',branch.bay.actuatorFaces[index],branch.bay.padPorts[index],{...options,straight:true});
        add('system-data-branch',branch.dataTap,branch.bay.cameraData,options);add('system-power-branch',branch.powerTap,branch.bay.cameraPower,options);add('heater-power',branch.powerTap,branch.bay.heaterPower,options);add('temperature-data',branch.bay.probeData,branch.dataTap,options);add('optical-capture',branch.bay.dockingWindow,branch.bay.optical,{...options,straight:true});
      }
    }
    if(this.systemUnits.length===2){const a=this.systemUnits[0],b=this.systemUnits[1];add('cluster-data-link',a.dataStart,b.dataStart,{unit:-1,route:(from,to)=>new THREE.CatmullRomCurve3([from,new THREE.Vector3(-2.7,from.y,from.z),new THREE.Vector3(-2.7,to.y,to.z),to],false,'catmullrom',.06)});}
  }
  updateSystemConnections(show){
    if(!this.systemLayer)return;this.systemLayer.visible=show;if(!show)return;this.root.updateMatrixWorld(true);const selected=Number(this.state.selectedBay||1),selectedUnit=this.bayPorts.get(selected)?.unit||0,filter=this.state.connectionKind;
    for(const edge of this.systemEdges){const from=edge.from.getWorldPosition(new THREE.Vector3()),to=edge.to.getWorldPosition(new THREE.Vector3()),signature=[...from.toArray(),...to.toArray()].map(v=>v.toFixed(3)).join(',');
      if(signature!==edge.last){edge.last=signature;edge.curve=edge.route?edge.route(from,to):edge.straight?new THREE.LineCurve3(from,to):this.connectionCurve(edge.metadata,from,to);edge.path.geometry.dispose();edge.path.geometry=edge.physical?new THREE.TubeGeometry(edge.curve,edge.straight?4:10,.025,4,false):new THREE.BufferGeometry().setFromPoints(edge.curve.getPoints(edge.straight?1:12));edge.dots[0].position.copy(from);edge.dots[1].position.copy(to);}
      const selectedBranch=edge.bay===selected,local=edge.unit===selectedUnit||edge.unit===-1,kindMatch=!filter||filter==='all'||filter===edge.metadata.kind;const opacity=kindMatch?(selectedBranch?1:local?.62:.24):.13;edge.path.material.opacity=opacity;edge.path.material.linewidth=selectedBranch&&kindMatch?3:1.6;edge.dots.forEach(dot=>{dot.material.opacity=opacity;dot.scale.setScalar(selectedBranch?1.65:1);});edge.group.visible=this.state.connectionScope!=='selected'||(edge.unit===selectedUnit&&(edge.bay===null||edge.bay===selected));
    }
  }
  systemFrameBounds(){
    this.root.updateMatrixWorld(true);const bounds=this.connectionFrameBounds()||new THREE.Box3();for(const unit of this.deviceUnits)bounds.union(new THREE.Box3().setFromObject(unit.object));for(const edge of this.systemEdges){const from=edge.from.getWorldPosition(new THREE.Vector3()),to=edge.to.getWorldPosition(new THREE.Vector3());bounds.expandByPoint(from);bounds.expandByPoint(to);if(edge.route)for(const point of edge.route(from,to).getPoints(12))bounds.expandByPoint(point);}return bounds.expandByScalar(.25);
  }

  buildDock(){
    // Illustrative local dry-mechanical bay. Model units are not specifications.
    const dock=new THREE.Group();this.root.add(dock);
    const frame=this.part(dock,'bay-dock');
    this.box(frame,[2.8,.18,2.30],[0,.16,.62],0x46535a,'bay-dock',.055);
    this.box(frame,[2.42,.12,2.14],[0,.30,.63],0xaebbc0,'bay-dock',.025);
    // A low rear cross-member supports dry hardware without hiding the shafts.
    this.box(frame,[2.35,.18,.20],[0,.40,-.11],0x6c7e87,'bay-dock',.025);
    for(const side of [-1,1]){
      this.box(frame,[.17,.13,1.95],[side*.76,.42,.80],0x657985,'bay-dock',.018);
      this.box(frame,[.09,.023,1.87],[side*.76,.4735,.80],0xd5dfe1,'bay-dock',.007);
      this.box(frame,[.13,.34,.10],[side*.85,.64,.098],0xbfcacd,'bay-dock',.016);
    }
    // Two local electric linear actuators terminate in solid, flat contact heads.
    const actuators=this.part(dock,'pumps'),pads=this.part(dock,'dock-seal');
    const contactColors=[0x92aaa9,0xa4b5c4];
    for(const [index,x] of [-.30,.30].entries()){
      this.box(actuators,[.27,.27,.42],[x,.60,-.75],0x465761,'pumps',.025);
      const barrel=this.cylinder(actuators,.108,.48,[x,.60,-.42],0xa8b8bd,'pumps',{metalness:.35,roughness:.4});barrel.rotation.x=Math.PI/2;
      const shaft=this.cylinder(actuators,.039,.40,[x,.60,-.10],0xd5e0e0,'pumps',{metalness:.7,roughness:.22});shaft.rotation.x=Math.PI/2;
      const head=this.cylinder(actuators,.105,.040,[x,.60,.100],0x83979d,'pumps',{metalness:.18,roughness:.5});head.rotation.x=Math.PI/2;
      // Head front z=.120, silicone front z=.148: no hole or fluid connection.
      const pad=this.cylinder(pads,.109,.028,[x,.60,.134],contactColors[index],'dock-seal',{roughness:.93,metalness:0});pad.rotation.x=Math.PI/2;
    }
    // Dual motor-driver board and separate heater power switch are dry electronics.
    const driver=this.part(dock,'bay-valve');
    this.box(driver,[.59,.055,.47],[-.86,.91,-.54],0x315f53,'bay-valve',.015);
    for(const x of [-1.01,-.71]){
      this.box(driver,[.17,.075,.20],[x,.971,-.54],0x293a42,'bay-valve',.012);
      this.box(driver,[.16,.105,.09],[x,.973,-.76],0x8d9ca2,'bay-valve',.009);
    }
    for(const [index,x] of [-.30,.30].entries())this.tube(driver,[[-.86+index*.19,.94,-.34],[-.59+index*.15,.82,-.24],[x,.73,-.57],[x,.70,-.77]],.023,index?0x7988aa:0x566778,'bay-valve');
    const connector=this.part(dock,'backplane');
    this.box(connector,[.58,.39,.25],[.76,.65,-.77],0x35464d,'backplane',.035);
    this.box(connector,[.48,.27,.035],[.76,.65,-.912],0xc3d0d0,'backplane',.012);
    for(const [x,color] of [[.63,0x667078],[.88,0x3c7fa4]]){
      const contact=this.cylinder(connector,.052,.075,[x,.65,-.948],color,'backplane',{metalness:.3,roughness:.35});contact.rotation.x=Math.PI/2;
    }
    this.tube(connector,[[.63,.55,-.80],[.46,.38,-.78],[-.87,.38,-.78],[-.87,.88,-.73]],.024,0x667078,'backplane');
    const heater=this.part(dock,'heater');
    this.box(heater,[1.24,.060,1.28],[0,.445,.92],0xb1a188,'heater',.018,{metalness:.25,roughness:.6});
    this.box(heater,[1.20,.010,1.23],[0,.480,.92],0x88877d,'heater',.008,{roughness:.9});
    this.box(heater,[.35,.045,.32],[.88,.37,-.37],0x315e51,'heater',.012);
    this.box(heater,[.16,.16,.17],[.88,.465,-.37],0x2c3940,'heater',.014);
    this.tube(heater,[[.63,.55,-.80],[.90,.38,-.65],[.90,.40,-.37],[.59,.43,.45]],.023,0x667078,'heater');
    const probe=this.part(dock,'temperature-probe');
    const probeTip=this.cylinder(probe,.028,.25,[.69,.455,.91],0xd5dddd,'temperature-probe',{metalness:.7,roughness:.25});probeTip.rotation.z=Math.PI/2;
    this.box(probe,[.12,.075,.10],[.84,.455,.91],0x344952,'temperature-probe',.015);
    this.tube(probe,[[.89,.455,.91],[1.04,.35,.91],[1.04,.35,-.60],[.88,.64,-.80]],.017,0x3c7fa4,'temperature-probe');
    const switches=this.part(dock,'limit-switch'),switchActuators=[];
    for(const side of [-1,1]){
      this.box(switches,[.17,.13,.22],[side*1.01,.565,.27],0x303f47,'limit-switch',.018);
      this.box(switches,[.045,.055,.17],[side*.917,.608,.27],0xc9d6da,'limit-switch',.006);
      const contact=this.box(switches,[.055,.055,.075],[side*.88,.607,.24],0x9eb4b9,'limit-switch',.010);
      switchActuators.push({object:contact,side});
    }
    const cartridge=new THREE.Group();dock.add(cartridge);cartridge.userData.component='cartridge';
    for(const side of [-1,1])this.box(cartridge,[.10,.055,1.70],[side*.76,.454,.88],0xc6d2d6,'bay-dock',.010);
    this.box(cartridge,[1.78,.25,1.60],[0,.610,1.00],0xdde8e4,'cartridge',.045,{transparent:true,opacity:.22,depthWrite:false,roughness:.18});
    this.box(cartridge,[1.78,.035,1.60],[0,.7525,1.00],0xd6e5e1,'cartridge',.035,{transparent:true,opacity:.16,depthWrite:false,roughness:.15});
    // Rear sealed wall begins exactly at the silicone pad contact plane z=.148.
    this.box(cartridge,[1.80,.36,.060],[0,.60,.178],0xe0e7e6,'cartridge',.025,{transparent:true,opacity:.34,depthWrite:false,roughness:.25});
    const kitSurface=new THREE.Group();cartridge.add(kitSurface);kitSurface.userData.component='cartridge-membrane';
    for(const [index,x] of [-.30,.30].entries()){
      // This legacy component ID now means sealed kit contact surface, not an air membrane.
      this.box(kitSurface,[.235,.215,.026],[x,.60,.161],contactColors[index],'cartridge-membrane',.025,{roughness:.83,metalness:0});
    }
    // All wet routes and residual fluid stay wholly beyond the sealed kit wall.
    this.tube(cartridge,[[-.30,.680,.29],[-.48,.680,.44],[-.48,.680,1.34],[-.18,.680,1.50]],.026,0x9a253b,'cartridge');
    this.tube(cartridge,[[.30,.680,.29],[.48,.680,.44],[.48,.680,1.34],[.18,.680,1.50]],.026,0xb98a24,'cartridge');
    for(const x of [-.34,.34]){
      this.cylinder(cartridge,.17,.035,[x,.721,.87],0x68818b,'cartridge',{roughness:.35});
      this.cylinder(cartridge,.135,.013,[x,.747,.87],x<0?0xb4757b:0xd2b46a,'cartridge',{roughness:.3});
    }
    this.box(cartridge,[.24,.12,.31],[.58,.63,1.53],0x587d71,'cartridge',.025);
    const lock=new THREE.Group();lock.position.set(1.06,.69,.78);frame.add(lock);lock.userData.component='bay-dock';
    const pivot=this.cylinder(lock,.085,.17,[0,0,0],0x879ba5,'bay-dock');pivot.rotation.z=Math.PI/2;
    this.box(lock,[.13,.10,.48],[0,.05,.19],0x4c5a65,'bay-dock',.025);
    this.box(lock,[.19,.13,.15],[0,.05,.43],0x7e959c,'bay-dock',.025);
    const optics=this.part(dock,'optics');
    for(const side of [-1,1])this.box(optics,[.13,1.58,.18],[side*1.12,1.09,.60],0x8fa1aa,'optics',.020);
    this.box(optics,[2.37,.13,.24],[0,1.90,.60],0x8fa1aa,'optics',.025);
    this.box(optics,[.62,.35,.55],[0,1.71,.83],0x303f48,'optics',.040);
    this.cylinder(optics,.17,.20,[0,1.45,.83],0x25323a,'optics',{roughness:.3});
    this.cylinder(optics,.115,.035,[0,1.335,.83],0x76a1b5,'optics',{metalness:.45,roughness:.12});
    const ringBoard=new THREE.Mesh(new THREE.RingGeometry(.185,.355,this.software?16:32),this.mat(0x3b6254,{side:THREE.DoubleSide,roughness:.65}));ringBoard.rotation.x=-Math.PI/2;ringBoard.position.set(0,1.304,.83);this.tag(ringBoard,'optics');optics.add(ringBoard);
    for(let i=0;i<10;i++){const angle=i*Math.PI/5;this.box(optics,[.046,.025,.046],[Math.cos(angle)*.267,1.292,.83+Math.sin(angle)*.267],0xfffdf0,'optics',.006,{emissive:0xe5ddbf,emissiveIntensity:.25,roughness:.4});}
    this.tube(connector,[[.88,.75,-.80],[1.01,1.03,-.63],[1.01,1.84,.43],[.30,1.84,.61]],.023,0x3c7fa4,'backplane');
    this.tube(connector,[[.63,.75,-.80],[.83,1.01,-.68],[.83,1.79,.42],[-.30,1.79,.61]],.023,0x667078,'backplane');
    const opticalBeam=new THREE.Group();dock.add(opticalBeam);
    const rays=[];for(const x of [-.34,.34])for(const z of [.59,1.10])rays.push(new THREE.Vector3(0,1.315,.83),new THREE.Vector3(x,.760,z));
    const rayLines=new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(rays),new THREE.LineDashedMaterial({color:0xbfa96d,dashSize:.055,gapSize:.035,transparent:true,opacity:.55}));rayLines.computeLineDistances();opticalBeam.add(rayLines);
    // Eight main labels; the probe and rear plug remain independently selectable.
    this.addLabel(frame,'bay-dock','Guide rails and lock',[-.85,.51,1.23]);
    this.addLabel(actuators,'pumps','Actuators',[0,.76,-.62]);
    this.addLabel(pads,'dock-seal','Silicone pads',[-.30,.60,.148]);
    this.addLabel(kitSurface,'cartridge-membrane','Sealed kit surface',[.30,.60,.148]);
    this.addLabel(driver,'bay-valve','Motor driver',[-.86,1.02,-.54]);
    this.addLabel(heater,'heater','Heater',[.48,.49,.95]);
    this.addLabel(switches,'limit-switch','Insertion switches',[1.01,.66,.27]);
    this.addLabel(optics,'optics','Camera and light',[0,1.86,.91]);
    const assembled=new THREE.Vector3(),separated=new THREE.Vector3(0,0,1.5),isSeparated=this.state.dockSeparated!==false;
    cartridge.position.copy(isSeparated?separated:assembled);lock.rotation.x=isSeparated?-.75:0;opticalBeam.visible=!isSeparated;
    this.dockInspection={cartridge,assembled,separated,lock,opticalBeam,switchActuators};this.center=new THREE.Vector3(0,1.0,1.05);this.span=4.75;
  }
  updateDockInspection(){
    if(!this.dockInspection||this.state.mode!=='dock')return;
    const inspection=this.dockInspection,separated=this.state.dockSeparated!==false,target=separated?inspection.separated:inspection.assembled;
    inspection.cartridge.position.lerp(target,.18);inspection.lock.rotation.x=THREE.MathUtils.lerp(inspection.lock.rotation.x,separated?-.75:0,.18);
    const fitted=!separated&&inspection.cartridge.position.distanceTo(inspection.assembled)<.025;inspection.opticalBeam.visible=fitted;
    for(const contact of inspection.switchActuators||[]){contact.object.position.x=THREE.MathUtils.lerp(contact.object.position.x,contact.side*(fitted?.93:.88),.18);contact.object.material.color.setHex(fitted?0x71988a:0x9eb4b9);}
  }

  scopeForBay(bay){return this.bayState(bay)?.cartridge||(bay===Number(this.state.selectedBay||1)?this.state.cartridge:'complete');}
  bayState(bay){return (this.state.bayStates||[]).find(item=>Number(item.bay)===Number(bay));}
  fractionState(bay){const record=bay?this.bayState(bay):null;if(record?.loadedFractions)return record.loadedFractions;if(!bay||bay===Number(this.state.selectedBay||1))return this.state.loadedFractions||{};return {};}
  requiredFractions(scope=this.state.cartridge){return scope==='type'?['patientCells','patientPlasma']:scope==='match'?['patientPlasma','donorCells']:['patientCells','patientPlasma','donorCells'];}
  addLabel(parent,id,name,pos,options={}){const anchor=new THREE.Object3D();anchor.position.set(...pos);parent.add(anchor);this.labelPoints.push({anchor,id,name,unit:this.buildingUnit||0,bay:this.buildingBay||null,...options});return anchor;}
  buildPreparedInputs(parent){
    const required=this.requiredFractions();const data={patientCells:{id:'patient-cells',label:'PATIENT RED CELLS',color:P.red,cap:P.burgundy},patientPlasma:{id:'patient-plasma',label:'PATIENT PLASMA',color:P.amber,cap:0xb7831b},donorCells:{id:'donor-cells',label:'DONOR RED CELLS',color:P.red,cap:0x2b4c61}};
    required.forEach((key,index)=>{
      const item=data[key],tube=new THREE.Group();tube.position.set(-4.12+index*.84,0,2.05);tube.userData.component=item.id;parent.add(tube);
      this.box(tube,[.68,.14,.68],[0,.14,0],0x56656b,item.id,.04);
      this.cylinder(tube,.17,1.05,[0,.75,0],0xadc3ca,item.id,{transparent:true,opacity:.23,roughness:.1,depthWrite:false});
      const liquid=this.cylinder(tube,.12,.65,[0,.61,0],item.color,item.id,{roughness:.4});
      this.cylinder(tube,.195,.17,[0,1.36,0],item.cap,item.id);
      this.box(tube,[.25,.34,.024],[0,.85,.166],0xf4f2e9,item.id,.006);
      this.box(tube,[.64,.30,.038],[0,.27,.365],0xffffff,item.id,.012,{roughness:.75,metalness:0});
      const nameLines=key==='patientCells'?['Patient','Red cells']:key==='patientPlasma'?['Patient','Plasma']:['Donor','Red cells'];
      this.text(tube,nameLines[0],[0,.335,.388],{width:.58,height:.105,size:48,color:'#17232a'});
      this.text(tube,nameLines[1],[0,.205,.388],{width:.58,height:.105,size:48,color:'#17232a'});
      this.sampleTubes.push({object:liquid,base:.285,height:.65,key});this.addLabel(tube,item.id,item.label.toLowerCase().replace(/^./,c=>c.toUpperCase()),[0,1.3,.18]);
    });
  }
  displayData(){
    if(this.state.machineDisplay)return {...this.state.machineDisplay,lines:(this.state.machineDisplay.lines||[]).slice(0,3)};
    if(this.state.elapsed>=600)return {title:'Analysis complete',status:'QUALIFIED REVIEW REQUIRED',lines:['Inspect reactions and controls','No clinical result released'],progress:1,tone:'warning'};
    if(this.state.running)return {title:'Processing specimen',status:'ANALYSIS IN PROGRESS',lines:['Reaction chambers under observation',`Bay ${this.state.selectedBay||1}`],progress:this.state.elapsed/600,tone:'neutral'};
    if(this.state.inserted)return {title:'Cartridge inserted',status:'READY TO RUN',lines:['Patient specimen loaded','Select Run test to begin'],progress:0,tone:'neutral'};
    if(this.state.sampleLoaded)return {title:'Sample loaded',status:'INSERT CARTRIDGE',lines:['Identified specimen in patient inlet','Cartridge remains outside the bay'],progress:0,tone:'neutral'};
    return {title:'Load patient sample',status:'IDLE',lines:['Identify the patient specimen','Load sample, then insert cartridge'],progress:0,tone:'neutral'};
  }
  updateMachineDisplays(force=false){
    const data=this.displayData();const tone={neutral:'#9dcbd3',success:'#8ce1b2',warning:'#ffcf79',danger:'#ff9d9b'}[data.tone]||'#9dcbd3';
    const progress=THREE.MathUtils.clamp(Number(data.progress)||0,0,1);const signature=JSON.stringify([data.title,data.status,data.lines,Math.round(progress*100),data.tone,this.state.selectedBay]);
    for(const entry of this.screens){
      if(!force&&entry.signature===signature)continue;entry.signature=signature;
      if(entry.labels){
        entry.labels.header.node.textContent=`HEMATRIX  /  BAY ${this.state.selectedBay||1}`;
        entry.labels.title.node.textContent=String(data.title||'');entry.labels.status.node.textContent=String(data.status||'');entry.labels.status.node.setAttribute('fill',tone);
        entry.labels.lines.forEach((label,i)=>{label.node.textContent=String(data.lines?.[i]||'');});
      }else{
        const c=entry.canvas.getContext('2d');c.fillStyle='#10232a';c.fillRect(0,0,1200,480);
        const line=(text,y,font,color)=>{c.fillStyle=color;c.font=font;c.fillText(String(text||''),42,y,1110);};
        line(`HEMATRIX   /   BAY ${this.state.selectedBay||1}`,44,'600 27px Arial','#a9c2c9');
        line(data.title,118,'600 54px Arial','#f4f8f7');line(data.status,171,'600 31px Arial',tone);
        (data.lines||[]).slice(0,3).forEach((text,i)=>line(text,239+i*65,'500 36px Arial','#e8f0ed'));
        c.fillStyle='#29434b';c.fillRect(42,449,1116,8);c.fillStyle=tone;c.fillRect(42,449,1116*progress,8);entry.texture.needsUpdate=true;
      }
    }
  }
  projectPoint(point){const projected=point.clone().project(this.camera);const width=this.container.clientWidth,height=this.container.clientHeight;return {x:(projected.x+1)*width/2,y:(1-projected.y)*height/2,visible:projected.z>-1&&projected.z<1&&Math.abs(projected.x)<1.1&&Math.abs(projected.y)<1.1};}
  labelAnchors(){
    if(!this.root)return [];this.root.updateMatrixWorld(true);this.camera.updateMatrixWorld(true);const selectedBay=Number(this.state.selectedBay||1),selectedUnit=selectedBay>8?1:0;const positions=[];
    for(const item of this.labelPoints){
      let visible=true,ancestor=item.anchor;while(ancestor){if(!ancestor.visible)visible=false;ancestor=ancestor.parent;}
      const closed=this.state.mode==='device'&&!this.state.cutaway&&!this.state.exploded;
      if(item.internal&&closed){const outsideKit=item.id==='cartridge'&&item.bay===selectedBay&&!this.state.inserted;visible=visible&&outsideKit;}
      if(item.id==='wells'&&this.state.mode==='cartridge')visible=false;
      if(item.bay&&item.bay!==selectedBay&&!/^bay-\d+$/.test(item.id))visible=false;
      if(item.internal&&item.unit!==selectedUnit&&this.state.mode==='device'&&!item.bay)visible=false;
      const worldPosition=item.anchor.getWorldPosition(new THREE.Vector3());if(/^bay-\d+$/.test(item.id)&&closed){const normal=new THREE.Vector3(0,0,1).transformDirection(item.anchor.matrixWorld);if(normal.dot(this.camera.position.clone().sub(worldPosition))<=0)visible=false;}const position=this.projectPoint(worldPosition);const definition=comp(item.id),used=item.id==='waste'&&(this.state.kitUsed||this.bayState(item.bay)?.used);const name=used?(this.state.explanationMode?'Sealed waste in used cartridge':'Used kit waste'):definition?(this.state.explanationMode?definition.name:definition.simpleName):item.id.startsWith('reaction:')?describeEvidence({id:item.id.slice(9),name:item.name},{explanationMode:!!this.state.explanationMode}).title:item.name;positions.push({id:item.id,name,x:position.x,y:position.y,visible:visible&&position.visible,bay:item.bay,key:`${item.id}-${item.bay||'assembly'}-${item.unit}-${positions.length}`});
    }
    return positions;
  }
  dimensionAnchors(){
    if(!this.camera||this.state.mode!=='device'||!this.state.showDimensions)return [];this.camera.updateMatrixWorld(true);const note=this.state.config>2?'Core only; expanded dimensions unverified.':'Proposed Core design target; not measured.';
    const dimensions=[{text:'45 cm Core width target',a:[-2.25,.04,2.02],b:[2.25,.04,2.02]},{text:'35 cm Core depth target',a:[2.52,.04,-1.7],b:[2.52,.04,1.7]},{text:'30 cm Core height target',a:[-2.7,.02,2.02],b:[-2.7,3.09,2.02]}];
    return dimensions.map(item=>{const a=this.projectPoint(new THREE.Vector3(...item.a)),b=this.projectPoint(new THREE.Vector3(...item.b));return {text:item.text,note,x:(a.x+b.x)/2,y:(a.y+b.y)/2,visible:a.visible&&b.visible,line:{x1:a.x,y1:a.y,x2:b.x,y2:b.y}};});
  }
  screenAnchor(){
    const screen=this.screens[0];if(!screen||this.state.mode!=='device')return {x:0,y:0,left:0,top:0,width:0,height:0,visible:false};
    this.root.updateMatrixWorld(true);this.camera.updateMatrixWorld(true);const center=screen.anchor.getWorldPosition(new THREE.Vector3());const normal=new THREE.Vector3(0,0,1).transformDirection(screen.anchor.matrixWorld);let visible=normal.dot(this.camera.position.clone().sub(center))>0;let ancestor=screen.anchor;while(ancestor){if(!ancestor.visible)visible=false;ancestor=ancestor.parent;}
    const width=this.container.clientWidth,height=this.container.clientHeight;
    const corners=[[-1,-1],[-1,1],[1,1],[1,-1]].map(([x,y])=>screen.anchor.localToWorld(new THREE.Vector3(x*screen.width/2,y*screen.height/2,0)).project(this.camera)).map(v=>({x:(v.x+1)*width/2,y:(1-v.y)*height/2,z:v.z}));
    const left=Math.min(...corners.map(c=>c.x)),top=Math.min(...corners.map(c=>c.y)),right=Math.max(...corners.map(c=>c.x)),bottom=Math.max(...corners.map(c=>c.y));
    return {x:(left+right)/2,y:(top+bottom)/2,left,top,width:right-left,height:bottom-top,visible:visible&&corners.every(c=>c.z>-1&&c.z<1),corners};
  }
  buildCartridge(parent,type='complete',mini=false){
    const isMatch=type==='match',hasDonor=type!=='type';
    const slab=this.part(parent,'cartridge',[0,-.12,0]);
    this.box(slab,[5.1,.16,3.25],[0,.18,0],0xdce3e1,'cartridge',.08,{roughness:.6,metalness:.02});
    const cover=this.part(parent,'cartridge',[0,.9,-2.5]);cover.userData.cover=true;
    this.box(cover,[5.02,.035,3.16],[0,.31,0],0xd7e6e5,'cartridge',.045,{transparent:true,opacity:.055,roughness:.1,depthWrite:false});
    this.box(slab,[.17,.18,2.6],[-2.48,.22,0],P.burgundy,'cartridge',.02);
    for(const x of [-2.22,2.22])for(const z of [-1.38,1.38])this.cylinder(slab,.055,.04,[x,.30,z],0xa5afae,'cartridge');
    if(!mini){
      this.text(slab,type==='type'?'TYPE & SCREEN':isMatch?'MATCH ONLY':'COMPLETE ROUTINE',[.28,.359,-1.35],{width:3.65,height:.22,size:55,color:'#632c37',rotate:true});
      this.text(slab,'TEST AREAS',[.25,.357,1.39],{width:2.8,height:.15,size:34,color:'#6b7776',rotate:true});
    }
    const inletData={patientCells:{id:'patient-cells',x:-2.04,z:-.65,color:P.red},patientPlasma:{id:'patient-plasma',x:-2.04,z:.55,color:P.amber},donorCells:{id:'donor-cells',x:2.16,z:-.1,color:P.red}};
    for(const key of this.requiredFractions(type)){
      const item=inletData[key],inlet=this.part(parent,item.id,[key==='donorCells'?.4:-.4,.12,0]);
      this.cylinder(inlet,.19,.15,[item.x,.39,item.z],P.shell,item.id);
      const liquid=this.cylinder(inlet,.125,.04,[item.x,.49,item.z],item.color,item.id);this.patientInlets.push({object:liquid,key,bay:this.buildingBay||null,color:item.color});
      this.addLabel(inlet,item.id,comp(item.id).name.replace('fraction','inlet'),[item.x,.51,item.z],{internal:mini,bay:this.buildingBay||null});
    }
    const routes=this.part(parent,'channels',[0,.1,0]);
    const wells=this.part(parent,'wells',[0,.2,0]);if(this.buildingBay&&this.bayPorts.has(this.buildingBay))this.bayPorts.get(this.buildingBay).reaction=this.port(wells,[0,.45,.15]);
    const reagent=this.part(parent,'reagents',[.15,.55,-.1]);
    const makeWell=(x,z,label,kind='plasma',react=false)=>{
      const color=kind==='cells'?P.red:P.amber;
      this.cylinder(wells,.235,.07,[x,.36,z],0x5b7078,'wells',{roughness:.35});
      const liquid=this.cylinder(wells,.19,.028,[x,.408,z],color,'wells',{roughness:.4});
      this.cylinder(reagent,.098,.12,[x+.28,.45,z-.29],0xe7dec7,'reagents',{roughness:.3});
      this.channel(routes,[[x+.28,.45,z-.29],[x+.28,.4,z-.12],[x,.4,z]],0xc7bc8b,.35,.65);
      if(!mini&&this.state.nativeLabels)this.text(wells,describeEvidence({id:WELL_IDS[label],name:label},{explanationMode:!!this.state.explanationMode}).title,[x,.362,z+.32],{width:.69,height:.14,size:43,color:'#172d33',rotate:true});
      const cells=[];for(let j=0;j<(this.software&&mini?4:12);j++){const cell=this.cylinder(wells,.026,.012,[x+Math.sin(j*2.4)*(react?.065:.12),.429,z+Math.cos(j*2.4)*(react?.065:.12)],P.red,'wells');cells.push(cell);}this.reactionWells.push({label,cells,x,z,defaultPositive:react,liquid,bay:this.buildingBay||null});if(!mini){const reactionIds=WELL_IDS;this.addLabel(wells,`reaction:${reactionIds[label]||label}`,label,[x,.45,z],{reaction:true});}
    };
    if(!isMatch){
      // The operator loads prepared fractions into separate, identified inlets.
      this.box(routes,[.42,.08,.34],[-1.65,.34,-.65],0xbfa9a9,'channels',.03);
      this.box(routes,[.42,.08,.34],[-1.65,.34,.55],0xc9bb94,'channels',.03);
      this.activeFraction='patientCells';this.channel(routes,[[-2.04,.405,-.65],[-1.65,.4,-.65],[-1.4,.4,-.5],[.85,.4,-.5]],P.red,.04,.53);
      this.activeFraction='patientPlasma';this.channel(routes,[[-2.04,.405,.55],[-1.65,.4,.55],[-1.23,.4,.55],[-1.23,.4,-.08],[.82,.4,-.08]],P.amber,.05,.58);
      this.channel(routes,[[-1.23,.4,.55],[-1.23,.4,.65],[.84,.4,.65]],P.amber,.2,.6);this.activeFraction=null;
      for(const x of [-.85,0,.85]){this.channel(routes,[[x,.4,-.5],[x,.4,-.76]],P.red,.34,.62);this.channel(routes,[[x,.4,.65],[x,.4,.93]],P.amber,.36,.65);this.box(routes,[.095,.065,.065],[x,.4,-.61],0x8d9e97,'channels',.009);this.box(routes,[.095,.065,.065],[x,.4,.77],0x8d9e97,'channels',.009);}
      for(const x of [-.85,0]){this.channel(routes,[[x,.4,-.08],[x,.4,.15]],P.amber,.35,.64);this.box(routes,[.095,.065,.065],[x,.4,.015],0x8d9e97,'channels',.009);}
      const xs=[-.85,0,.85];['Anti-A','Anti-B','Anti-D'].forEach((l,i)=>makeWell(xs[i],-.76,l,'cells',i===0||i===2));
      ['A1 cells','B cells'].forEach((l,i)=>makeWell(xs[i],.15,l,'plasma',i===1));
      ['Screen I','Screen II','Screen III'].forEach((l,i)=>makeWell(xs[i],.93,l,'plasma'));
      if(!mini&&this.state.nativeLabels){this.text(routes,'RED CELLS',[-1.65,.359,-.62],{width:.83,height:.115,size:37,color:'#8a2939',rotate:true});this.text(routes,'PLASMA',[-1.68,.359,.14],{width:.72,height:.115,size:39,color:'#99732f',rotate:true});}
    }else{
      this.activeFraction='patientPlasma';this.channel(routes,[[-2.04,.41,.55],[-1.55,.4,.55],[-1.2,.4,.1],[.65,.4,.1]],P.amber,.05,.55);this.activeFraction=null;
      this.box(routes,[.43,.07,.42],[-1.35,.35,-.28],0xd9dfd6,'channels',.025,{transparent:true,opacity:.7});
      if(!mini)this.text(routes,'EARLIER TESTS MUST BE VALID',[-.45,.357,-1.03],{width:3.25,height:.15,size:39,color:'#626b64',rotate:true});
      makeWell(.65,.1,'Crossmatch','plasma');makeWell(-.5,.1,'Control −','plasma');makeWell(-.5,.88,'Control +','plasma',true);
    }
    if(hasDonor){
      if(!isMatch){makeWell(1.78,.53,'Crossmatch','plasma');makeWell(-1.65,-.97,'Control +','plasma',true);}
      const target=isMatch?[.65,.4,.1]:[1.78,.4,.53];
      this.activeFraction='donorCells';this.channel(routes,[[2.16,.43,-.1],[2.36,.4,.12],[2.36,.4,.53],target],P.red,.24,.65);this.activeFraction=null;
      if(!isMatch)this.channel(routes,[[.82,.4,-.08],[1.3,.4,-.08],[1.3,.4,.53],[1.78,.4,.53]],P.amber,.35,.68);
    }else{
      makeWell(1.77,.53,'Control +','plasma',true);
    }
    if(!isMatch)makeWell(1.78,-.62,'Control −','plasma');
    const waste=this.part(parent,'waste',[.4,.1,.2]);
    this.box(waste,[.72,.09,.37],[1.8,.35,1.2],0x607d73,'waste',.035);
    const spent=this.box(waste,[.6,.035,.26],[1.8,.414,1.2],0x6c2731,'waste',.02);this.wasteRegions.push({object:spent,bay:this.buildingBay||null});
    this.channel(routes,[[isMatch?.65:1.78,.4,.53],[1.78,.4,.89],[1.8,.4,1.2]],0x987b70,.8,1);
    for(const [object,id,name,pos] of [[slab,'cartridge','Single-use assay cartridge',[0,.2,0]],[routes,'channels','Isolated specimen routes',[-.9,.42,.05]],[reagent,'reagents','Preloaded assay reagents',[.3,.5,-.4]],[wells,'wells','Reaction and optical windows',[.25,.45,.4]],[waste,'waste','Sealed single-use waste',[1.8,.43,1.2]]])this.addLabel(object,id,name,pos,{internal:mini,bay:this.buildingBay||null});
    if(!mini){if(this.state.nativeLabels)this.text(waste,'WASTE',[1.82,.411,1.2],{width:.61,height:.12,size:43,color:'#eff3eb',rotate:true});this.center=new THREE.Vector3(0,.2,0);this.span=5.6;}
  }
  buildOptics(){
    const support=this.part(this.root,'structure',[0,-.1,0]);this.box(support,[5,.22,3.5],[0,.12,0],0xd8dddb,'structure',.07);
    for(const x of [-1.7,1.7])this.box(support,[.13,3.1,.16],[x,1.8,-.9],P.metal,'structure',.015);
    this.box(support,[3.55,.15,.3],[0,3.27,-.9],P.metal,'structure',.025);
    const optics=this.part(this.root,'optics',[0,1.1,0]);
    this.box(optics,[1.45,.8,1.1],[0,2.77,-.1],P.dark,'optics',.07);
    this.text(optics,'CAMERA',[0,2.83,.46],{width:1.26,height:.16,size:44,color:'#e1e6df'});
    this.cylinder(optics,.32,.4,[0,2.2,-.1],0x4b565c,'optics');this.cylinder(optics,.23,.07,[0,1.98,-.1],0x7ba2b0,'optics',{metalness:.6,roughness:.07});
    const ring=new THREE.Mesh(new THREE.RingGeometry(.32,.92,this.software?16:32),this.mat(0x3f6352,{side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(0,1.76,-.1);this.tag(ring,'optics');optics.add(ring);
    for(let index=0;index<12;index++){const angle=index*Math.PI/6;this.box(optics,[.075,.035,.075],[Math.cos(angle)*.63,1.73,-.1+Math.sin(angle)*.63],0xfffdf0,'optics',.009,{emissive:0xa79a70,emissiveIntensity:.25});}
    this.text(optics,'WHITE LIGHT',[0,1.77,.76],{width:2.64,height:.18,size:43,color:'#6e7365'});
    const wells=this.part(this.root,'wells',[0,.2,.6]);this.box(wells,[3,.16,2],[0,.52,-.1],0xdce7e1,'wells',.08,{transparent:true,opacity:.62,roughness:.15});
    this.cylinder(wells,.65,.05,[0,.65,-.1],0xecd3c4,'wells',{transparent:true,opacity:.5});
    for(let i=0;i<34;i++){
      const k=i<20?i: i-20;const cx=i<20?-.21:.27;const zc=i<20?-.19:.13;
      const angle=k*2.399;const radius=.035*Math.sqrt(k);this.cylinder(wells,.055,.024,[cx+Math.cos(angle)*radius,.69,zc+Math.sin(angle)*radius],P.red,'wells');
    }
    this.text(wells,'TEST CHAMBER',[0,.54,1.05],{width:3.25,height:.18,size:42,color:'#6e3b43'});
    const points=[];for(const x of [-.64,.64])for(const z of [-.74,.54])points.push(new THREE.Vector3(0,1.94,-.1),new THREE.Vector3(x,.74,z));
    const lines=new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0xb9a66c,transparent:true,opacity:.55}));this.root.add(lines);
    this.addLabel(support,'structure','Optical support frame',[-1.7,2,-.9]);this.addLabel(optics,'optics','Camera sensor and LED illumination',[0,2.7,.4]);this.addLabel(wells,'wells','Illustrative reaction window',[0,.75,-.1]);
    this.center=new THREE.Vector3(0,1.3,0);this.span=5.9;
  }
  update(next={}){
    const scopeSignature=JSON.stringify((next.bayStates||this.state.bayStates||[]).map(item=>[item.bay,item.cartridge]));const bayScopesChanged=scopeSignature!==this.bayScopeSignature;this.bayScopeSignature=scopeSignature;
    const rebuild=bayScopesChanged||(next.mode&&next.mode!==this.state.mode)||(next.config&&Number(next.config)!==this.state.config)||(next.cartridge&&next.cartridge!==this.state.cartridge)||(next.mode==='dock'&&next.selectedBay&&Number(next.selectedBay)!==Number(this.state.selectedBay));
    const selectedBayChange=next.selectedBay&&Number(next.selectedBay)!==Number(this.state.selectedBay);const scopeChange=next.connectionScope&&next.connectionScope!==this.state.connectionScope;const viewChange=next.view&&next.view!==this.state.view;const cutawayChange='cutaway'in next&&next.cutaway!==this.state.cutaway;
    this.state={...this.state,...next};this.state.config=Number(this.state.config)||2;
    if(this.fallback){this.showFallback();return;}
    if(rebuild){this.build();this.setView(next.view||'reset');}
    if(viewChange||cutawayChange||scopeChange||(selectedBayChange&&this.state.view==='connections'))this.setView(next.view||'reset');
    if('selectedComponent'in next)this.selectComponent(next.selectedComponent);
    this.updateReactionWells();this.updateMachineDisplays();
  }
  updateReactionWells(){
    const norm=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]/g,'');
    for(const well of this.reactionWells){
      const record=well.bay?this.bayState(well.bay):null;const selected=!well.bay||well.bay===Number(this.state.selectedBay||1);const data=Array.isArray(record?.reactions)?record.reactions:selected&&Array.isArray(this.state.reactions)?this.state.reactions:[];
      const label=norm(well.label);const aliases={a1cells:'reversea1',bcells:'reverseb',control:'',controlminus:'negativecontrol',controlplus:'positivecontrol'};const expectedId=well.label==='Control −'?'negativecontrol':well.label==='Control +'?'positivecontrol':aliases[label]||label;const reaction=data.find(r=>[r.name,r.reagent,r.id].some(value=>{const n=norm(value);return n===label||n===expectedId||(label==='crossmatch'&&n.includes('crossmatch'))||(label==='screeni'&&(n==='screen1'||n==='screeningcell1'))||(label==='screenii'&&(n==='screen2'||n==='screeningcell2'))||(label==='screeniii'&&(n==='screen3'||n==='screeningcell3'));}));
      const positive=reaction?reaction.positive:well.defaultPositive;
      const invalid=reaction&&positive===null;const ready=!!reaction&&reaction.ready!==false;
      for(let j=0;j<well.cells.length;j++){
        const radius=positive?.056:.12;well.cells[j].position.set(well.x+Math.sin(j*2.399)*radius,.429,well.z+Math.cos(j*2.399)*radius);
        well.cells[j].material.color.setHex(invalid?0x9b9385:P.red);well.cells[j].visible=ready;
      }
      well.liquid.material.color.setHex(!ready?0xd5d9d2:invalid?0xb1a99a:positive?0xba5f58:0xd8bba0);
    }
  }
  setMode(mode){this.update({mode});}
  setView(view='reset'){
    if(this.fallback)return;
    if(view==='connections'&&this.state.mode==='device'){
      const system=this.state.connectionScope!=='selected',bounds=system?this.systemFrameBounds():this.connectionFrameBounds();if(bounds&&!bounds.isEmpty()){
        const center=bounds.getCenter(new THREE.Vector3()),direction=(system?new THREE.Vector3(.35,1.15,-1.6):new THREE.Vector3(.6,.9,1.4)).normalize(),right=new THREE.Vector3(0,1,0).cross(direction).normalize(),up=direction.clone().cross(right).normalize(),tangent=Math.tan(THREE.MathUtils.degToRad(this.camera.fov/2));let distance=6.5;
        for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){const relative=new THREE.Vector3(x,y,z).sub(center),depth=relative.dot(direction);distance=Math.max(distance,depth+Math.abs(relative.dot(right))/(tangent*Math.max(.35,this.camera.aspect)*.8),depth+Math.abs(relative.dot(up))/(tangent*.8));}
        this.camera.position.copy(center).addScaledVector(direction,distance);this.controls.target.copy(center);this.controls.update();return;
      }
    }
    if(view==='screen'&&this.screens[0]){const target=this.screens[0].anchor.getWorldPosition(new THREE.Vector3());this.camera.position.copy(target).add(new THREE.Vector3(0,.02,Math.max(3.3,1.72/(Math.tan(THREE.MathUtils.degToRad(this.camera.fov/2))*this.camera.aspect))));this.controls.target.copy(target);this.controls.update();return;}
    const target=this.center||new THREE.Vector3(0,1,0);const d=(this.span||6)*(this.state.mode==='device'?1.45:1.4)*Math.max(1,1.32/Math.max(.5,this.camera.aspect));
    const dir={front:[0,.3,1],side:[1,.28,.06],rear:[0,.34,-1],top:[.01,1,.01],reset:this.state.mode==='dock'?[1,.7,1.5]:this.state.mode==='cartridge'?[.12,1,.32]:this.state.cutaway?[.55,1.05,1.1]:[.45,.32,1.35]}[view]||[.9,.62,1.05];
    const v=new THREE.Vector3(...dir).normalize().multiplyScalar(d);this.camera.position.copy(target).add(v);this.controls.target.copy(target);this.controls.update();
  }
  selectComponent(id){
    this.state.selectedComponent=id;
    if(this.fallback)return;
    if(this.selection){this.scene.remove(this.selection);this.selection.geometry.dispose();this.selection.material.dispose();this.selection=null;}
    this.root.traverse(o=>{if(o.isMesh&&o.material?.emissive){let ancestor=o;while(ancestor&&!ancestor.userData.bay)ancestor=ancestor.parent;const selected=id&&(o.userData.component===id||id===`bay-${ancestor?.userData.bay}`);o.material.emissive.setHex(selected?0x42121e:0x000000);o.material.emissiveIntensity=selected?.25:0;}});
  }
  pick(event){
    const rect=this.renderer.domElement.getBoundingClientRect();this.pointer.set(((event.clientX-rect.left)/rect.width)*2-1,-((event.clientY-rect.top)/rect.height)*2+1);
    this.raycaster.setFromCamera(this.pointer,this.camera);const hits=this.raycaster.intersectObjects(this.root.children,true);
    for(const hit of hits){let object=hit.object;let ancestor=object,hidden=false;while(ancestor){if(!ancestor.visible)hidden=true;ancestor=ancestor.parent;}if(hidden)continue;while(object&&!object.userData.component)object=object.parent;if(object){let bayObject=hit.object;while(bayObject&&!bayObject.userData.bay)bayObject=bayObject.parent;const internalSelection=(this.state.cutaway||this.state.mode==='dock')&&object.userData.component!=='bays';const id=bayObject&&!internalSelection?`bay-${bayObject.userData.bay}`:object.userData.component;this.selectComponent(id);this.onSelect(id,comp(id)||{id,name:`Bay ${String(bayObject?.userData.bay||'').padStart(2,'0')}`});return;}}
  }
  resize(){if(this.fallback||this.disposed)return;const width=Math.max(1,this.container.clientWidth);const height=Math.max(1,this.container.clientHeight);this.camera.aspect=width/height;this.camera.updateProjectionMatrix();this.renderer.setSize(width,height,false);if(this.state.mode==='device'&&this.state.showConnections&&this.state.view==='connections')this.setView('connections');else if(this.state.mode==='dock')this.setView(this.state.view&&this.state.view!=='connections'?this.state.view:'reset');}
  animate(){
    if(this.disposed||this.fallback)return;this.frame=requestAnimationFrame(()=>this.animate());
    const dt=Math.min(this.clock.getDelta(),.05);const time=this.clock.elapsedTime;if(this.software&&time-(this.lastSoftwareFrame||0)<.10){this.controls.update();return;}this.lastSoftwareFrame=time;
    const connectionInspection=!!(this.state.showConnections&&this.state.cutaway&&this.state.mode==='device'),selectedUnit=this.bayPorts.get(Number(this.state.selectedBay||1))?.unit||0;
    for(const unit of this.deviceUnits)unit.object.visible=!connectionInspection||this.state.connectionScope!=='selected'||unit.index===selectedUnit;
    for(const sample of this.sampleTubes)sample.object.parent.visible=!connectionInspection;
    for(const part of this.parts){const dest=this.inspectionDestination(part);part.position.lerp(dest,Math.min(1,dt*6));if(part.userData.shell||part.userData.cover)part.visible=!this.state.cutaway||!!(connectionInspection&&part.userData.connectionVisible&&part.userData.connectionUnit===selectedUnit);}
    this.updateDockInspection();
    for(const cover of this.inspectionCovers)cover.visible=!this.state.cutaway;
    let progress=Number(this.state.elapsed||0)/600;
    if(typeof this.state.flow==='number')progress=this.state.flow>1?this.state.flow/600:this.state.flow;
    else if(this.state.flow&&progress===0)progress=(time*.08)%1;
    progress=Math.max(0,Math.min(1,progress));
    for(const flow of this.flows){
      const record=flow.bay?this.bayState(flow.bay):null;let flowProgress=record?Number(record.elapsed||0)/600:progress;if(flow.bay===Number(this.state.selectedBay||1)&&this.state.flow&&!record?.running&&Number(this.state.elapsed)>Number(record?.elapsed||0))flowProgress=progress;const running=record?record.running:this.state.running;const fractions=this.fractionState(flow.bay);
      if(flow.fraction&&fractions[flow.fraction]===false&&!this.state.flow)flowProgress=0;
      const p=THREE.MathUtils.clamp((flowProgress-flow.start)/(flow.end-flow.start),0,1),count=Math.floor(p*flow.segments)*flow.radial*6;
      if(this.software){if(count!==flow.fillCount){flow.fluid.geometry.setIndex(new THREE.BufferAttribute(flow.fullIndex.slice(0,count),1));flow.fillCount=count;}flow.fluid.visible=count>0;}else flow.fluid.geometry.setDrawRange(0,count);
      for(let i=0;i<flow.beads.length;i++){const bead=flow.beads[i];bead.visible=p>.02&&(running||this.state.flow);if(bead.visible){const t=((time*.18+i*.28)%1)*p;bead.position.copy(flow.curve.getPointAt(THREE.MathUtils.clamp(t,0,1)));}}
    }
    for(const {mesh,index} of this.bayLamps){
      const bay=index+1,record=this.bayState(bay),selected=bay===Number(this.state.selectedBay||1);const running=record?.running||(selected&&this.state.running)||(this.state.activeBays||[]).includes(bay);const used=record?.used||record?.kitUsed||(selected&&this.state.kitUsed);const status=String(record?.status||'').toLowerCase();const invalid=/invalid|hold|fault|investigat/.test(status);const ready=/review|authoris|handover/.test(status)||used&&!running;
      const color=invalid?0x973142:running?P.burgundy:ready?0xb8872d:record?.inserted?P.green:0x7d8b8e;mesh.material.color.setHex(color);mesh.material.emissive.setHex(running?0x471220:0x000000);mesh.material.emissiveIntensity=.18;
    }
    for(const cart of this.loadedCartridges){
      const record=this.bayState(cart.bay),selected=cart.bay===Number(this.state.selectedBay||1);const active=(this.state.activeBays||[]).includes(cart.bay);cart.object.visible=(record?.kitPresent!==false)&&(selected||active||!!record?.inserted||!!record?.used||!!record?.kitId);
      cart.object.position.copy(cart.origin);const inserted=record?record.inserted:selected&&this.state.inserted;const insertion=inserted?1:THREE.MathUtils.clamp(Number(record?.insertionProgress??(selected?this.state.insertionProgress:0))||0,0,1);if(selected||record?.kitId)cart.object.position.z+=1.6*(1-insertion);
    }
    for(const tray of this.loadingTrays){const record=this.bayState(tray.bay),selected=tray.bay===Number(this.state.selectedBay||1);tray.object.position.copy(tray.origin);if(selected||record?.kitId){const insertion=(record?.inserted||(selected&&this.state.inserted))?1:THREE.MathUtils.clamp(Number(record?.insertionProgress??this.state.insertionProgress)||0,0,1);tray.object.position.z+=1.6*(1-insertion);}}
    const selectedFractions=this.fractionState(null);for(const sample of this.sampleTubes){const target=selectedFractions[sample.key]?.14:1;sample.object.scale.y=THREE.MathUtils.lerp(sample.object.scale.y,target,.13);sample.object.position.y=sample.base+sample.height*sample.object.scale.y/2;}
    for(const inlet of this.patientInlets){const fractions=this.fractionState(inlet.bay);inlet.object.material.color.setHex(fractions[inlet.key]?inlet.color:0xd5dedb);}
    for(const waste of this.wasteRegions){const record=waste.bay?this.bayState(waste.bay):null,selected=!waste.bay||waste.bay===Number(this.state.selectedBay||1);const elapsed=record?.elapsed??(selected?this.state.elapsed:0),used=record?.used||record?.kitUsed||(selected&&this.state.kitUsed);waste.object.visible=!!used||elapsed>450;waste.object.material.color.setHex(used?0x632733:0x937244);waste.object.scale.y=used?Math.max(.2,Math.min(1,elapsed/600)):.2;}
    this.updateConnections();this.controls.update();
    if(this.software){
      this.root.updateMatrixWorld(true);const location=new THREE.Vector3(),normal=new THREE.Vector3(),rotation=new THREE.Quaternion();
      this.root.traverse(object=>{if(!object.isSVGObject)return;object.getWorldPosition(location);object.getWorldQuaternion(rotation);normal.copy(object.userData.labelNormal).applyQuaternion(rotation);const direction=this.camera.position.clone().sub(location);object.visible=normal.dot(direction.normalize())>.06;
      if(object.userData.logoImage){
        const {width,height}=object.userData.logoSize,center=this.projectPoint(location);const corner=(x,y)=>this.projectPoint(object.localToWorld(new THREE.Vector3(x,y,0)));const topLeft=corner(-width/2,height/2),topRight=corner(width/2,height/2),bottomLeft=corner(-width/2,-height/2);
        object.userData.logoImage.setAttribute('transform',`matrix(${topRight.x-topLeft.x} ${topRight.y-topLeft.y} ${bottomLeft.x-topLeft.x} ${bottomLeft.y-topLeft.y} ${topLeft.x-center.x} ${topLeft.y-center.y})`);return;
      }
      const distance=Math.max(1,this.camera.position.distanceTo(location));const pixels=this.container.clientHeight/(2*distance*Math.tan(THREE.MathUtils.degToRad(this.camera.fov/2)));const font=Math.max(1,Math.min(42,(object.userData.labelHeight||.1)*pixels,(object.userData.labelWidth||1.7)*pixels/Math.max(1,object.node.textContent.length*.61)));object.node.setAttribute('font-size',font.toFixed(1));});
    }
    this.renderer.render(this.scene,this.camera);
  }
  showFallback(){
    const type=this.state?.cartridge||'complete';this.container.innerHTML=`<div style="display:flex;min-height:320px;height:100%;align-items:center;justify-content:center;padding:28px;box-sizing:border-box;background:#f0efec;color:#343b3d;font-family:Arial,sans-serif"><div style="max-width:430px"><p style="font-size:12px;letter-spacing:1px;color:#7d2435">HEMATRIX ENGINEERING VIEW</p><h3 style="font-weight:500;font-size:24px">3D graphics unavailable</h3><p style="line-height:1.65">The interactive test engine remains available. The ${type==='type'?'Type & Screen':type==='match'?'Match Only':'Complete Routine'} cartridge uses identified sample inlets, separated assay pathways, controlled reaction windows and sealed waste.</p><p style="line-height:1.65">Use the component list to inspect the proposed device architecture. A WebGL-capable browser enables rotation, cutaway and exploded views.</p></div></div>`;
  }
  dispose(){
    this.disposed=true;cancelAnimationFrame(this.frame);this.observer?.disconnect();this.controls?.dispose();
    if(this.renderer){this.renderer.domElement.removeEventListener('pointerdown',this._pointerDown);this.renderer.domElement.removeEventListener('pointerup',this._pointerUp);this.clearRoot();this.logoTexture?.dispose();this.logoTexture=null;this.floor.geometry.dispose();this.floor.material.dispose();this.renderer.dispose?.();this.renderer.domElement.remove();}
  }
}
