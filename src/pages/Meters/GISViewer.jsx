import React, { useState } from 'react';
import {
    Maximize2, Minimize2, Layers, Map as MapIcon, Compass,
    Activity, ShieldCheck, AlertTriangle, Search, Filter, Info, X
} from 'lucide-react';

const GISViewer = ({ meters = [] }) => {
    const [selectedMeter, setSelectedMeter] = useState(null);
    const [activeLayer, setActiveLayer] = useState('assets'); // assets, compliance, abstraction
    const [viewMode, setViewMode] = useState('terrain'); // terrain, satellite
    const [searchQuery, setSearchQuery] = useState('');

    // GIS Coordinates to SVG Space mapping (Approximation for Rajasthan)
    // Rajasthan Bounds: Lat 23.3 to 30.1 | Long 69.3 to 78.1
    const mapToSVG = (lat, long) => {
        const x = ((long - 69.3) / (78.1 - 69.3)) * 800;
        const y = 600 - ((lat - 23.3) / (30.1 - 23.3)) * 600;
        return { x, y };
    };

    const districts = [
        { name: 'Jaipur', path: 'M450,250 L480,230 L510,240 L500,280 L460,290 Z', zone: 'Critical' },
        { name: 'Jodhpur', path: 'M250,280 L300,240 L350,270 L340,330 L270,350 Z', zone: 'Semi-Critical' },
        { name: 'Udaipur', path: 'M320,450 L360,420 L400,440 L390,490 L330,500 Z', zone: 'Over-Exploited' },
        { name: 'Bikaner', path: 'M200,150 L280,100 L350,140 L330,220 L220,200 Z', zone: 'Safe' },
        { name: 'Jaisalmer', path: 'M50,200 L150,150 L220,220 L180,350 L80,380 Z', zone: 'Safe' },
        // ... more district path approximations
    ];

    const filteredMeters = meters.filter(m =>
        m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.district?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="gis-explorer animated">
            <div className="gis-sidebar">
                <div className="gis-search-pnl">
                    <h3><Compass size={20} /> GIS Explorer</h3>
                    <div className="gis-search-box">
                        <Search size={16} />
                        <input
                            type="text"
                            placeholder="Find Meter or District..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="gis-layers-pnl">
                    <label>Operational Layers</label>
                    <div className="layer-stack">
                        <button
                            className={`layer-btn ${activeLayer === 'assets' ? 'active' : ''}`}
                            onClick={() => setActiveLayer('assets')}
                        >
                            <MapIcon size={16} /> Active Assets Registry
                        </button>
                        <button
                            className={`layer-btn ${activeLayer === 'compliance' ? 'active' : ''}`}
                            onClick={() => setActiveLayer('compliance')}
                        >
                            <ShieldCheck size={16} /> Groundwater Compliance Zones
                        </button>
                        <button
                            className={`layer-btn ${activeLayer === 'abstraction' ? 'active' : ''}`}
                            onClick={() => setActiveLayer('abstraction')}
                        >
                            <Activity size={16} /> Abstraction Heatmap
                        </button>
                    </div>
                </div>

                <div className="gis-legend">
                    <label>Map Legend</label>
                    <div className="legend-items">
                        <div className="leg-item"><span className="dot critical"></span> Over-Exploited</div>
                        <div className="leg-item"><span className="dot warning"></span> Critical Zone</div>
                        <div className="leg-item"><span className="dot safe"></span> Safe Zone</div>
                    </div>
                </div>

                {selectedMeter && (
                    <div className="meter-details-panel animatedSlideIn">
                        <div className="pnl-header">
                            <h4>{selectedMeter.id}</h4>
                            <button onClick={() => setSelectedMeter(null)}><X size={16} /></button>
                        </div>
                        <div className="pnl-body">
                            <div className="meta-row"><strong>Serial:</strong> <span>{selectedMeter.serialNumber}</span></div>
                            <div className="meta-row"><strong>District:</strong> <span>{selectedMeter.district}</span></div>
                            <div className="meta-row"><strong>Zone:</strong> <span className={`zone-tag ${selectedMeter.zone?.toLowerCase().replace(' ', '-')}`}>{selectedMeter.zone}</span></div>
                            <div className="health-grid">
                                <div className="h-box">
                                    <Activity size={12} />
                                    <span>Signal: {selectedMeter.health?.signal}</span>
                                </div>
                                <div className="h-box">
                                    <ShieldCheck size={12} />
                                    <span>Status: {selectedMeter.status}</span>
                                </div>
                            </div>
                            <button className="btn-action-full">Inspect Telemetry</button>
                        </div>
                    </div>
                )}
            </div>

            <div className={`gis-map-viewport ${viewMode}`}>
                <div className="map-toolbar">
                    <div className="map-type-switch">
                        <button className={viewMode === 'terrain' ? 'active' : ''} onClick={() => setViewMode('terrain')}>Terrain</button>
                        <button className={viewMode === 'satellite' ? 'active' : ''} onClick={() => setViewMode('satellite')}>Satellite</button>
                    </div>
                    <div className="map-actions">
                        <button><Maximize2 size={18} /></button>
                        <button><Minimize2 size={18} /></button>
                    </div>
                </div>

                <div className="svg-container">
                    <svg viewBox="0 0 800 600" className="rajasthan-svg">
                        <defs>
                            <radialGradient id="safeGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.4)" />
                                <stop offset="100%" stopColor="rgba(34, 197, 94, 0.1)" />
                            </radialGradient>
                            <radialGradient id="criticalGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.4)" />
                                <stop offset="100%" stopColor="rgba(239, 68, 68, 0.1)" />
                            </radialGradient>
                        </defs>

                        {/* District Boundaries */}
                        {districts.map((d, i) => (
                            <path
                                key={i}
                                d={d.path}
                                className={`district-path ${d.zone.toLowerCase().replace(' ', '-')}`}
                                fill={activeLayer === 'compliance' ? (d.zone === 'Safe' ? 'url(#safeGrad)' : 'url(#criticalGrad)') : '#f8fafc'}
                                stroke="#cbd5e1"
                                strokeWidth="1"
                            >
                                <title>{d.name} ({d.zone})</title>
                            </path>
                        ))}

                        {/* Asset Markers */}
                        {activeLayer === 'assets' && (
                            filteredMeters.length > 0 ? filteredMeters.map(m => {
                                const { x, y } = mapToSVG(m.geoLat, m.geoLong);
                                return (
                                    <g
                                        key={m.id}
                                        className={`meter-marker ${m.health?.status?.toLowerCase()}`}
                                        transform={`translate(${x}, ${y})`}
                                        onClick={() => setSelectedMeter(m)}
                                    >
                                        <circle r="8" className="marker-ring" />
                                        <circle r="4" className="marker-core" />
                                        {selectedMeter?.id === m.id && <circle r="12" className="marker-pulse" />}
                                    </g>
                                );
                            }) : (
                                <text x="400" y="300" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="600">
                                    No meters found matching list criteria
                                </text>
                            )
                        )}

                        {/* Heatmap Clusters (Abstraction Layer) */}
                        {activeLayer === 'abstraction' && (
                            <g className="heatmap-layer">
                                <circle cx="470" cy="270" r="80" fill="rgba(239, 68, 68, 0.2)" filter="blur(20px)" />
                                <circle cx="300" cy="300" r="100" fill="rgba(249, 115, 22, 0.2)" filter="blur(20px)" />
                            </g>
                        )}
                    </svg>
                </div>

                <div className="map-credits">
                    RGWA Spatial Data Engine v2.0 | District Master 2024
                </div>
            </div>

            <style jsx>{`
                .gis-explorer { display: flex; height: calc(100vh - 80px); background: #f1f5f9; position: relative; }
                
                /* Sidebar Styling */
                .gis-sidebar { width: 320px; background: white; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; z-index: 10; padding: 25px; box-shadow: 10px 0 15px -3px rgba(0,0,0,0.05); }
                .gis-search-pnl h3 { margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px; color: #1e293b; font-size: 1.1rem; }
                .gis-search-box { position: relative; margin-bottom: 30px; }
                .gis-search-box svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; }
                .gis-search-box input { width: 100%; padding: 10px 10px 10px 38px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; outline: none; font-size: 0.9rem; }

                .gis-layers-pnl label { display: block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 12px; letter-spacing: 0.5px; }
                .layer-stack { display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px; }
                .layer-btn { display: flex; align-items: center; gap: 10px; padding: 12px 15px; background: #f8fafc; border: 1.5px solid #f1f5f9; border-radius: 10px; text-align: left; cursor: pointer; color: #475569; font-weight: 600; font-size: 0.85rem; transition: all 0.2s; }
                .layer-btn:hover { background: #eff6ff; border-color: #3b82f6; color: #2563eb; }
                .layer-btn.active { background: #2563eb; border-color: #2563eb; color: white; box-shadow: 0 4px 6px -1px rgba(37,99,235,0.2); }

                .gis-legend label { display: block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 12px; }
                .legend-items { display: flex; flex-direction: column; gap: 8px; margin-bottom: 30px; }
                .leg-item { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #475569; font-weight: 600; }
                .dot { width: 10px; height: 10px; border-radius: 50%; }
                .dot.critical { background: #ef4444; }
                .dot.warning { background: #f97316; }
                .dot.safe { background: #22c55e; }

                /* Meter Detail Panel */
                .meter-details-panel { background: #f8fafc; border: 1px solid #3b82f6; border-radius: 12px; padding: 20px; position: absolute; bottom: 25px; width: 270px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
                .pnl-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
                .pnl-header h4 { margin: 0; color: #1e293b; font-size: 1rem; }
                .meta-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem; }
                .meta-row strong { color: #64748b; }
                .zone-tag { padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
                .zone-tag.critical { background: #fee2e2; color: #991b1b; }
                .zone-tag.over-exploited { background: #fee2e2; color: #991b1b; }
                .zone-tag.semi-critical { background: #fff7ed; color: #9a3412; }
                .health-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0; }
                .h-box { background: white; padding: 8px; border-radius: 6px; display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: #475569; font-weight: 600; }
                .btn-action-full { width: 100%; padding: 10px; background: #1e293b; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; }

                /* Map Viewport */
                .gis-map-viewport { flex: 1; position: relative; background: #e2e8f0; overflow: hidden; display: flex; align-items: center; justify-content: center; }
                .gis-map-viewport.satellite { background: #0f172a; }
                .gis-map-viewport.satellite .district-path { fill: rgba(30, 41, 59, 0.4); stroke: rgba(255,255,255,0.1); }

                .map-toolbar { position: absolute; top: 25px; left: 25px; right: 25px; display: flex; justify-content: space-between; z-index: 5; }
                .map-type-switch { background: white; padding: 4px; border-radius: 10px; display: flex; gap: 4px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
                .map-type-switch button { padding: 6px 15px; border: none; background: transparent; border-radius: 6px; font-size: 0.8rem; font-weight: 700; color: #64748b; cursor: pointer; transition: all 0.2s; }
                .map-type-switch button.active { background: #1e293b; color: white; }
                .map-actions { display: flex; gap: 10px; }
                .map-actions button { width: 40px; height: 40px; background: white; border: none; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #475569; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

                .svg-container { width: 90%; height: 90%; }
                .rajasthan-svg { width: 100%; height: 100%; filter: drop-shadow(0 20px 50px rgba(0,0,0,0.1)); }
                .district-path { transition: all 0.3s; cursor: pointer; vector-effect: non-scaling-stroke; }
                .district-path:hover { fill: #eff6ff; stroke: #3b82f6; stroke-width: 2; transform: scale(1.02); }

                /* Markers */
                .meter-marker { cursor: pointer; transition: all 0.3s; }
                .marker-ring { fill: rgba(37, 99, 235, 0.2); stroke: #3b82f6; stroke-width: 1; }
                .marker-core { fill: #2563eb; }
                .meter-marker.warning .marker-core { fill: #f97316; }
                .meter-marker.warning .marker-ring { fill: rgba(249, 115, 22, 0.2); stroke: #f97316; }
                
                .marker-pulse { fill: transparent; stroke: #2563eb; stroke-width: 2; animation: pulse 1.5s infinite; }
                @keyframes pulse { from { r: 8; opacity: 1; } to { r: 20; opacity: 0; } }

                .map-credits { position: absolute; bottom: 15px; right: 25px; font-size: 0.7rem; color: #94a3b8; font-weight: 600; letter-spacing: 1px; }

                .animated { animation: fadeIn 0.4s ease-out; }
                .animatedSlideIn { animation: slideIn 0.3s ease-out; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default GISViewer;
