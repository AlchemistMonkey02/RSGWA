import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip, LayersControl, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import {
    Layers, Filter, Info, Maximize2, Map as MapIcon,
    Droplets, AlertTriangle, Activity, Thermometer, Wind
} from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock Data
const GW_LEVEL_TRENDS = [
    { year: '2019', level: 12.5 },
    { year: '2020', level: 13.2 },
    { year: '2021', level: 13.8 },
    { year: '2022', level: 14.1 },
    { year: '2023', level: 14.5 },
];

const CATEGORY_DATA = [
    { name: 'Safe', value: 45, color: '#10b981' },
    { name: 'Semi-Critical', value: 20, color: '#f59e0b' },
    { name: 'Critical', value: 15, color: '#ef4444' },
    { name: 'Over-Exploited', value: 20, color: '#7f1d1d' },
];

const MONITORING_STATIONS = [
    { id: 1, name: 'RJ-JP-001', lat: 26.9124, lng: 75.7873, level: 14.2, status: 'Critical', type: 'Piezometer' },
    { id: 2, name: 'RJ-JP-004', lat: 26.8524, lng: 75.8073, level: 8.5, status: 'Safe', type: 'Dug Well' },
    { id: 3, name: 'RJ-JP-012', lat: 26.9524, lng: 75.7273, level: 22.1, status: 'Over-Exploited', type: 'Tube Well' },
    { id: 4, name: 'RJ-JP-015', lat: 26.8924, lng: 75.8573, level: 11.0, status: 'Semi-Critical', type: 'Piezometer' },
];

const ABSTRACTION_UNITS = [
    { id: 101, name: 'Jodhpur RBU Infrabuild', lat: 26.9220, lng: 75.7570, usage: 1250, type: 'Industrial' },
    { id: 102, name: 'Rajasthan Textiles Ltd', lat: 26.8820, lng: 75.7970, usage: 500, type: 'Industrial' },
    { id: 103, name: 'Apex Hospitals', lat: 26.8320, lng: 75.8270, usage: 150, type: 'Infra' },
];

const GISDashboard = () => {
    const [activeLayer, setActiveLayer] = useState('gw-levels'); // 'gw-levels', 'quality', 'abstraction'
    const [selectedStation, setSelectedStation] = useState(null);

    // Status Color Helper
    const getStatusColor = (status) => {
        switch (status) {
            case 'Safe': return '#10b981';
            case 'Semi-Critical': return '#f59e0b';
            case 'Critical': return '#ef4444';
            case 'Over-Exploited': return '#7f1d1d';
            default: return '#3b82f6';
        }
    };

    return (
        <div className="gis-container relative w-full h-[calc(100vh-100px)] overflow-hidden bg-slate-50 rounded-2xl border border-slate-200">

            {/* FULL SCREEN MAP */}
            <div className="absolute inset-0 z-0">
                <MapContainer
                    center={[26.9124, 75.7873]}
                    zoom={12}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* LAYERS */}
                    {activeLayer === 'gw-levels' && MONITORING_STATIONS.map(st => (
                        <CircleMarker
                            key={st.id}
                            center={[st.lat, st.lng]}
                            pathOptions={{ color: getStatusColor(st.status), fillColor: getStatusColor(st.status), fillOpacity: 0.8 }}
                            radius={12}
                            eventHandlers={{
                                click: () => setSelectedStation(st),
                            }}
                        >
                            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                                <div className="text-xs font-bold">{st.name}</div>
                            </Tooltip>
                        </CircleMarker>
                    ))}

                    {activeLayer === 'quality' && (
                        // Mock Heatmap using Circles for visual effect
                        <>
                            <CircleMarker center={[26.9124, 75.7873]} radius={40} pathOptions={{ color: 'transparent', fillColor: 'red', fillOpacity: 0.3 }} />
                            <CircleMarker center={[26.8524, 75.8073]} radius={35} pathOptions={{ color: 'transparent', fillColor: 'orange', fillOpacity: 0.3 }} />
                        </>
                    )}

                    {activeLayer === 'abstraction' && ABSTRACTION_UNITS.map(unit => (
                        <Marker key={unit.id} position={[unit.lat, unit.lng]}>
                            <Popup>
                                <div className="p-2">
                                    <h4 className="font-bold text-sm">{unit.name}</h4>
                                    <div className="text-xs text-slate-500">{unit.type} • {unit.usage} m³/day</div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* FLOATING LEFT PANEL: CONTROLS */}
            <div className="absolute top-4 left-4 z-[1000] w-80 flex flex-col gap-4 max-h-[90vh] overflow-y-auto custom-scrollbar">

                {/* Layer Switcher */}
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50">
                    <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-3 flex items-center gap-2">
                        <Layers size={14} /> Data Layers
                    </h3>
                    <div className="space-y-2">
                        <button
                            className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all border ${activeLayer === 'gw-levels' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-600'}`}
                            onClick={() => setActiveLayer('gw-levels')}
                        >
                            <div className={`p-2 rounded-lg ${activeLayer === 'gw-levels' ? 'bg-white/20' : 'bg-slate-100'}`}><Activity size={18} /></div>
                            <div>
                                <div className="font-bold text-sm">Water Levels</div>
                                <div className="text-[10px] opacity-80">Real-time Piezometers</div>
                            </div>
                        </button>

                        <button
                            className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all border ${activeLayer === 'quality' ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-600'}`}
                            onClick={() => setActiveLayer('quality')}
                        >
                            <div className={`p-2 rounded-lg ${activeLayer === 'quality' ? 'bg-white/20' : 'bg-slate-100'}`}><Droplets size={18} /></div>
                            <div>
                                <div className="font-bold text-sm">Quality Map</div>
                                <div className="text-[10px] opacity-80">Salinity / Fluoride</div>
                            </div>
                        </button>

                        <button
                            className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all border ${activeLayer === 'abstraction' ? 'bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-500/30' : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-600'}`}
                            onClick={() => setActiveLayer('abstraction')}
                        >
                            <div className={`p-2 rounded-lg ${activeLayer === 'abstraction' ? 'bg-white/20' : 'bg-slate-100'}`}><Wind size={18} /></div>
                            <div>
                                <div className="font-bold text-sm">Abstraction</div>
                                <div className="text-[10px] opacity-80">Industry & Mining</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Legend Card */}
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50">
                    <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Legend</h3>
                    <div className="space-y-2 text-xs font-medium text-slate-600">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#10b981]"></div> Safe (&lt;10m)</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div> Semi-Critical</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ef4444]"></div> Critical</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#7f1d1d]"></div> Over-Exploited</div>
                    </div>
                </div>

            </div>

            {/* FLOATING RIGHT PANEL: ANALYTICS */}
            <div className="absolute top-4 right-4 z-[1000] w-96 flex flex-col gap-4">
                <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-2xl border border-white/50">
                    <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center justify-between">
                        <span>District Analytics</span>
                        <span className="text-[10px] px-2 py-1 bg-slate-100 rounded text-slate-500">JAIPUR</span>
                    </h3>

                    <div className="mb-6">
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Block Classification</h4>
                        <div className="h-[180px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                                        {CATEGORY_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                    </Pie>
                                    <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '11px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Legend iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Water Level Trend (5 Yrs)</h4>
                        <div className="h-[120px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={GW_LEVEL_TRENDS}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="year" fontSize={10} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                    <YAxis fontSize={10} axisLine={false} tickLine={false} domain={['dataMin - 1', 'dataMax + 1']} tick={{ fill: '#64748b' }} />
                                    <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '11px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Line type="monotone" dataKey="level" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: 'white' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* FLOATING BOTTOM: SELECTED DETAIL */}
            {selectedStation && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-2xl">
                    <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/50 flex items-center justify-between animated slideInUp">
                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${selectedStation.status === 'Safe' ? 'bg-green-100 text-green-600' :
                                selectedStation.status === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                                }`}>
                                <Activity size={28} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">{selectedStation.name}</h2>
                                <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                                    <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 text-xs font-semibold">{selectedStation.type}</span>
                                    <span>•</span>
                                    <span>{selectedStation.lat}, {selectedStation.lng}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 pl-8 border-l border-slate-200">
                            <div>
                                <div className="text-[10px] font-bold uppercase text-slate-400">Current Level</div>
                                <div className="text-2xl font-black text-slate-800">{selectedStation.level} <span className="text-sm font-medium text-slate-400">m bgl</span></div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase text-slate-400">Status</div>
                                <div className={`text-base font-bold ${selectedStation.status === 'Safe' ? 'text-green-600' :
                                    selectedStation.status === 'Critical' ? 'text-red-600' : 'text-amber-600'
                                    }`}>{selectedStation.status}</div>
                            </div>
                            <button
                                onClick={() => setSelectedStation(null)}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                            >
                                <X size={16} className="text-slate-500" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 0px; background: transparent; }
                .gis-container { font-family: 'Inter', sans-serif; }
                .leaflet-container { background: #f8fafc; }
            `}</style>
        </div>
    );
};

export default GISDashboard;
