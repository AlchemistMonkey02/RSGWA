import React, { useState } from 'react';
import {
  Layers,
  Map as MapIcon,
  Search,
  Info,
  Filter,
  Maximize,
  ZoomIn,
  ZoomOut,
  Droplets,
  Zap,
  ShieldCheck,
  Globe,
  Mountain,
  MoreVertical,
  X,
  MousePointer2,
  Ruler
} from 'lucide-react';

const PublicGISViewer = () => {
  const [activeLayers, setActiveLayers] = useState([
    { id: 'classification', opacity: 0.8 },
    { id: 'aquifers', opacity: 0.6 }
  ]);
  const [basemap, setBasemap] = useState('vector'); // vector, satellite, terrain
  const [identifiedFeature, setIdentifiedFeature] = useState(null);
  const [activeTool, setActiveTool] = useState('pan'); // pan, identify, measure

  const toggleLayer = (layerId) => {
    const exists = activeLayers.find(l => l.id === layerId);
    if (exists) {
      setActiveLayers(activeLayers.filter(l => l.id !== layerId));
    } else {
      setActiveLayers([...activeLayers, { id: layerId, opacity: 0.8 }]);
    }
  };

  const updateOpacity = (layerId, newOpacity) => {
    setActiveLayers(activeLayers.map(l =>
      l.id === layerId ? { ...l, opacity: parseFloat(newOpacity) } : l
    ));
  };

  const layersList = [
    { id: 'classification', name: 'Block Classification (2025)', icon: <ShieldCheck size={16} />, color: '#3b82f6' },
    { id: 'aquifers', name: 'Aquifer Systems', icon: <Layers size={16} />, color: '#10b981' },
    { id: 'levels', name: 'Observation Wells', icon: <MapIcon size={16} />, color: '#f59e0b' },
    { id: 'recharge', name: 'Recharge Potential', icon: <Droplets size={16} />, color: '#06b6d4' }
  ];

  // Mock Feature Data for Identify Tool
  const featureData = {
    oe: {
      title: 'Block: Jaipur (OE)',
      status: 'Over-Exploited',
      level: '42.5m bgl',
      trend: '-1.2m / year',
      tds: '1200 mg/L',
      policy: 'No New Industrial NOCs',
      population: '3.2 Lakhs'
    },
    critical: {
      title: 'Block: Jodhpur (Critical)',
      status: 'Critical',
      level: '35.2m bgl',
      trend: '-0.8m / year',
      tds: '1800 mg/L',
      policy: 'Restricted Abstraction',
      population: '1.8 Lakhs'
    },
    semi: {
      title: 'Block: Alwar (Semi-Critical)',
      status: 'Semi-Critical',
      level: '18.4m bgl',
      trend: '-0.3m / year',
      tds: '900 mg/L',
      policy: 'Conditional Permitting',
      population: '2.1 Lakhs'
    },
    safe: {
      title: 'Block: Kota (Safe)',
      status: 'Safe',
      level: '8.5m bgl',
      trend: '+0.1m / year (Improving)',
      tds: '450 mg/L',
      policy: 'Open for Development',
      population: '4.5 Lakhs'
    }
  };

  const handleMapClick = (featureKey) => {
    if (activeTool === 'identify') {
      setIdentifiedFeature(featureData[featureKey]);
    }
  };

  const getBasemapStyle = () => {
    switch (basemap) {
      case 'satellite': return { background: '#0f172a', gridColor: 'rgba(255,255,255,0.1)' };
      case 'terrain': return { background: '#ecfccb', gridColor: 'rgba(0,0,0,0.1)' };
      default: return { background: '#cbd5e1', gridColor: 'rgba(255,255,255,0.3)' };
    }
  };

  const layerStyle = activeLayers.find(l => l.id === 'classification');
  const opacity = layerStyle ? layerStyle.opacity : 0;

  return (
    <div className="gis-viewer">
      {/* Left Control Panel */}
      <div className="side-panel">
        <div className="panel-section">
          <div className="panel-header">
            <Globe size={18} />
            <h3>Base Map</h3>
          </div>
          <div className="basemap-grid">
            <button className={`bm-btn ${basemap === 'vector' ? 'active' : ''}`} onClick={() => setBasemap('vector')}>
              <MapIcon size={24} /> Vector
            </button>
            <button className={`bm-btn ${basemap === 'satellite' ? 'active' : ''}`} onClick={() => setBasemap('satellite')}>
              <Globe size={24} /> Satellite
            </button>
            <button className={`bm-btn ${basemap === 'terrain' ? 'active' : ''}`} onClick={() => setBasemap('terrain')}>
              <Mountain size={24} /> Terrain
            </button>
          </div>
        </div>

        <div className="panel-section">
          <div className="panel-header">
            <Layers size={18} />
            <h3>Operational Layers</h3>
          </div>
          <div className="layer-list">
            {layersList.map(layer => {
              const isActive = activeLayers.find(l => l.id === layer.id);
              return (
                <div key={layer.id} className={`layer-box ${isActive ? 'active' : ''}`}>
                  <div className="lb-header" onClick={() => toggleLayer(layer.id)}>
                    <div className="lb-info">
                      <span style={{ color: layer.color }}>{layer.icon}</span>
                      <span>{layer.name}</span>
                    </div>
                    <div className="lb-check">
                      {isActive && <div className="dot"></div>}
                    </div>
                  </div>
                  {isActive && (
                    <div className="lb-controls">
                      <label>Transparency</label>
                      <input
                        type="range"
                        min="0" max="1" step="0.1"
                        value={isActive.opacity}
                        onChange={(e) => updateOpacity(layer.id, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="panel-section legend-box">
          <h4>Legend</h4>
          <div className="legend-row"><span className="swatch oe"></span> Over-Exploited (>100%)</div>
          <div className="legend-row"><span className="swatch critical"></span> Critical (90-100%)</div>
          <div className="legend-row"><span className="swatch semi"></span> Semi-Critical (70-90%)</div>
          <div className="legend-row"><span className="swatch safe"></span> Safe (&lt;70%)</div>
        </div>
      </div>

      {/* Main Map Canvas */}
      <div className="map-canvas" style={{ background: getBasemapStyle().background }}>
        {/* Background Grid */}
        <div className="map-grid" style={{
          backgroundImage: `linear-gradient(${getBasemapStyle().gridColor} 1px, transparent 1px), linear-gradient(90deg, ${getBasemapStyle().gridColor} 1px, transparent 1px)`
        }}></div>

        {/* Map Tools */}
        <div className="map-toolbar">
          <button
            className={`tool-btn ${activeTool === 'pan' ? 'active' : ''}`}
            title="Pan"
            onClick={() => setActiveTool('pan')}
          >
            <MousePointer2 size={18} />
          </button>
          <button
            className={`tool-btn ${activeTool === 'identify' ? 'active' : ''}`}
            title="Identify Feature"
            onClick={() => setActiveTool('identify')}
          >
            <Info size={18} />
          </button>
          <button
            className={`tool-btn ${activeTool === 'measure' ? 'active' : ''}`}
            title="Measure Distance"
            onClick={() => setActiveTool('measure')}
          >
            <Ruler size={18} />
          </button>
          <div className="divider"></div>
          <button className="tool-btn" title="Zoom In"><ZoomIn size={18} /></button>
          <button className="tool-btn" title="Zoom Out"><ZoomOut size={18} /></button>
          <button className="tool-btn" title="Full Extent"><Maximize size={18} /></button>
        </div>

        {/* Search Overlay */}
        <div className="map-search">
          <Search size={16} />
          <input type="text" placeholder="Find block, village, or well ID..." />
        </div>

        {/* GIS Layers (Shapes) */}
        <div className={`layer-group ${activeTool === 'identify' ? 'cursor-help' : 'cursor-grab'}`}>
          {/* Only showing shapes if classification layer is active */}
          {activeLayers.find(l => l.id === 'classification') && (
            <>
              <div
                className="map-shape oe"
                onClick={() => handleMapClick('oe')}
                style={{ opacity: activeLayers.find(l => l.id === 'classification').opacity }}
              ></div>
              <div
                className="map-shape critical"
                onClick={() => handleMapClick('critical')}
                style={{ opacity: activeLayers.find(l => l.id === 'classification').opacity }}
              ></div>
              <div
                className="map-shape semi"
                onClick={() => handleMapClick('semi')}
                style={{ opacity: activeLayers.find(l => l.id === 'classification').opacity }}
              ></div>
              <div
                className="map-shape safe"
                onClick={() => handleMapClick('safe')}
                style={{ opacity: activeLayers.find(l => l.id === 'classification').opacity }}
              ></div>
            </>
          )}
        </div>

        {/* Identify Popup */}
        {identifiedFeature && (
          <div className="identify-popup animated">
            <div className="popup-header">
              <h4>Feature Details</h4>
              <button onClick={() => setIdentifiedFeature(null)}><X size={16} /></button>
            </div>
            <div className="popup-content">
              <div className="data-row highlight">
                <label>{identifiedFeature.title}</label>
                <span className={`status-badge ${identifiedFeature.status.toLowerCase().split('-')[0]}`}>
                  {identifiedFeature.status}
                </span>
              </div>
              <div className="data-row">
                <label>Water Level:</label>
                <span>{identifiedFeature.level}</span>
              </div>
              <div className="data-row">
                <label>Annual Trend:</label>
                <span>{identifiedFeature.trend}</span>
              </div>
              <div className="data-row">
                <label>TDS (Salinity):</label>
                <span>{identifiedFeature.tds}</span>
              </div>
              <div className="data-row">
                <label>Abstraction Policy:</label>
                <span>{identifiedFeature.policy}</span>
              </div>
            </div>
            <div className="popup-footer">
              <button className="btn-drilldown">View Application History</button>
            </div>
          </div>
        )}

        <div className="map-attribution">
          <span>Lat: 26.9124 N | Lng: 75.7873 E</span>
          <span>Scale: 1:50,000</span>
          <span>© RGWA Geomatics</span>
        </div>
      </div>

      <style jsx>{`
                .gis-viewer { display: flex; height: calc(100vh - 70px); background: #f1f5f9; overflow: hidden; position: relative; font-family: 'Inter', sans-serif; }
                
                .side-panel { width: 340px; background: white; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; overflow-y: auto; z-index: 20; box-shadow: 4px 0 15px rgba(0,0,0,0.05); }
                .panel-section { padding: 20px; border-bottom: 1px solid #f1f5f9; }
                .panel-header { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; color: #1e293b; }
                .panel-header h3 { margin: 0; font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
                
                .basemap-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
                .bm-btn { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; cursor: pointer; color: #64748b; font-size: 0.75rem; font-weight: 600; transition: all 0.2s; }
                .bm-btn:hover { background: #eff6ff; color: #2563eb; }
                .bm-btn.active { border-color: #2563eb; background: #eff6ff; color: #2563eb; box-shadow: 0 0 0 2px #dbeafe; }

                .layer-list { display: flex; flex-direction: column; gap: 10px; }
                .layer-box { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; transition: all 0.2s; }
                .layer-box.active { border-color: #3b82f6; background: #f0f9ff; }
                
                .lb-header { padding: 12px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; background: white; }
                .lb-info { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: #334155; font-weight: 500; }
                .lb-check { width: 18px; height: 18px; border: 2px solid #cbd5e1; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
                .layer-box.active .lb-check { border-color: #3b82f6; background: #3b82f6; }
                .dot { width: 6px; height: 6px; background: white; border-radius: 1px; }

                .lb-controls { padding: 10px 12px; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 5px; }
                .lb-controls label { font-size: 0.7rem; color: #64748b; font-weight: 600; text-transform: uppercase; }
                .lb-controls input { width: 100%; cursor: pointer; accent-color: #3b82f6; }

                .legend-box h4 { margin: 0 0 10px 0; color: #475569; font-size: 0.85rem; }
                .legend-row { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: #64748b; margin-bottom: 6px; }
                .swatch { width: 16px; height: 16px; border-radius: 4px; }
                .swatch.oe { background: #ef4444; }
                .swatch.critical { background: #f97316; }
                .swatch.semi { background: #f59e0b; }
                .swatch.safe { background: #10b981; }

                .map-canvas { flex: 1; position: relative; overflow: hidden; cursor: default; }
                .map-grid { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-size: 40px 40px; opacity: 0.5; pointer-events: none; }

                .map-toolbar { position: absolute; top: 20px; left: 20px; background: white; padding: 5px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 5px; z-index: 10; }
                .tool-btn { width: 36px; height: 36px; border: none; background: white; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #475569; cursor: pointer; transition: all 0.2s; }
                .tool-btn:hover { background: #f1f5f9; color: #0f172a; }
                .tool-btn.active { background: #2563eb; color: white; }
                .divider { height: 1px; background: #e2e8f0; margin: 4px 0; }

                .map-search { position: absolute; top: 20px; left: 80px; background: white; padding: 10px 15px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 10px; width: 300px; z-index: 10; }
                .map-search input { border: none; outline: none; width: 100%; font-size: 0.9rem; }

                .layer-group { position: absolute; width: 100%; height: 100%; }
                .cursor-help { cursor: help; }
                .cursor-grab { cursor: grab; }

                .map-shape { position: absolute; border: 2px solid rgba(255,255,255,0.4); border-radius: 50%; transition: all 0.3s; }
                .map-shape:hover { transform: scale(1.02); z-index: 5; border-color: white; box-shadow: 0 0 20px rgba(0,0,0,0.2); }
                .map-shape.oe { width: 280px; height: 180px; top: 15%; left: 20%; background: #ef4444; border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                .map-shape.critical { width: 220px; height: 260px; top: 30%; left: 50%; background: #f97316; border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
                .map-shape.semi { width: 300px; height: 200px; top: 55%; left: 35%; background: #f59e0b; border-radius: 50% 50% 20% 80% / 25% 80% 20% 75%; }
                .map-shape.safe { width: 180px; height: 140px; top: 60%; left: 10%; background: #10b981; border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%; }

                .identify-popup { position: absolute; top: 100px; right: 20px; width: 320px; background: white; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2); overflow: hidden; z-index: 20; border: 1px solid #e2e8f0; }
                .popup-header { background: #f8fafc; padding: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; }
                .popup-header h4 { margin: 0; font-size: 0.95rem; color: #1e293b; }
                .popup-header button { background: none; border: none; cursor: pointer; color: #94a3b8; }
                
                .popup-content { padding: 20px; display: flex; flex-direction: column; gap: 12px; }
                .data-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; }
                .data-row label { color: #64748b; font-weight: 500; }
                .data-row span { color: #1e293b; font-weight: 600; }
                
                .highlight span { display: block; margin-top: 4px; }
                .status-badge { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; color: white; display: inline-block; }
                .status-badge.over { background: #ef4444; }
                .status-badge.critical { background: #f97316; }
                .status-badge.semi { background: #f59e0b; }
                .status-badge.safe { background: #10b981; }

                .popup-footer { padding: 15px; border-top: 1px solid #f1f5f9; text-align: center; }
                .btn-drilldown { background: #0f172a; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 0.85rem; cursor: pointer; width: 100%; transition: background 0.2s; }
                .btn-drilldown:hover { background: #1e293b; }

                .map-attribution { position: absolute; bottom: 0; width: 100%; background: rgba(255,255,255,0.9); padding: 5px 15px; font-size: 0.75rem; color: #64748b; display: flex; justify-content: space-between; border-top: 1px solid #cbd5e1; }

                .animated { animation: slideIn 0.3s ease-out; }
                @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            `}</style>
    </div>
  );
};

export default PublicGISViewer;
