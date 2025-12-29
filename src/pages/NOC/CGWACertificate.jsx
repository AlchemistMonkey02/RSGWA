import React, { forwardRef } from 'react';

const CGWACertificate = forwardRef(({ data }, ref) => {
    if (!data) return null;

    // Format date
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div ref={ref} className="cgwa-certificate" style={{ 
            width: '210mm', 
            minHeight: '297mm', 
            margin: '0 auto',
            background: 'white',
            padding: '20mm',
            fontFamily: 'Arial, sans-serif',
            fontSize: '11pt',
            lineHeight: '1.4',
            color: '#000'
        }}>
            {/* Header - Bilingual */}
            <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #000', paddingBottom: '15px' }}>
                <div style={{ fontSize: '10pt', fontWeight: 'bold', marginBottom: '8px' }}>
                    भारत सरकार<br />
                    GOVERNMENT OF INDIA
                </div>
                <div style={{ fontSize: '10pt', fontWeight: 'bold', marginBottom: '8px' }}>
                    जल शक्ति मंत्रालय<br />
                    MINISTRY OF JAL SHAKTI
                </div>
                <div style={{ fontSize: '10pt', fontWeight: 'bold', marginBottom: '8px' }}>
                    जल संसाधन विभाग,<br />
                    DEPARTMENT OF WATER RESOURCES,<br />
                    RIVER DEVELOPMENT & GANGA REJUVENATION
                </div>
                <div style={{ fontSize: '12pt', fontWeight: 'bold', marginTop: '10px' }}>
                    केंद्रीय भूमि जल प्राधिकरण<br />
                    CENTRAL GROUND WATER AUTHORITY
                </div>
                <div style={{ fontSize: '14pt', fontWeight: 'bold', marginTop: '15px', border: '2px solid #000', padding: '8px', display: 'inline-block' }}>
                    सत्यमेव जयते<br />
                    भूजल निकासी हेतु अनापति प्रमाण पत्र<br />
                    NO OBJECTION CERTIFICATE (NOC) FOR GROUND WATER ABSTRACTION
                </div>
            </div>

            {/* QR Code Placeholder */}
            <div style={{ position: 'absolute', top: '20mm', right: '20mm', width: '60px', height: '60px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8pt' }}>
                [QR Code]
            </div>

            {/* Project Details Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '10pt' }}>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold', width: '30%' }}>PROJECT NAME</td>
                        <td style={{ border: '1px solid #000', padding: '8px', width: '70%' }}>{data.project?.name || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>PROJECT ADDRESS</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>
                            {data.project?.address || 'N/A'}, PIN CODE {data.project?.pinCode || 'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>STATE</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{data.project?.state || 'RAJASTHAN'}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>DISTRICT</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{data.project?.district || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>TOWN/BLOCK</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{data.project?.block || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>COMMUNICATION ADDRESS</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{data.project?.communicationAddress || data.project?.address || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>ADDRESS OF CGWB REGIONAL OFFICE</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{data.regionalOffice || '6-A, Jhalana Doongri, Jaipur 302004, Rajasthan.'}</td>
                    </tr>
                </tbody>
            </table>

            {/* NOC Details */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '10pt' }}>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold', width: '25%' }}>1. NOC NO.</td>
                        <td style={{ border: '1px solid #000', padding: '8px', width: '25%' }}>{data.nocNumber || 'NOC/IND/RJ/2025/XXXX'}</td>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold', width: '25%' }}>2. DATE OF ISSUANCE</td>
                        <td style={{ border: '1px solid #000', padding: '8px', width: '25%' }}>{formatDate(data.issueDate) || formatDate(new Date())}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>3. APPLICATION NO.</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{data.applicationNumber || 'IND/RJ/2025/XXXX'}</td>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>4. APPLICATION TYPE</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{data.applicationType || 'Industry'}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>5. PROJECT STATUS</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{data.projectStatus || 'Existing Project'}</td>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>6. NOC TYPE</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{data.nocType || 'New'}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>7. VALID FROM</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{formatDate(data.validFrom) || formatDate(new Date())}</td>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>8. VALID UP TO</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{formatDate(data.validTo) || formatDate(new Date(Date.now() + 365*2*24*60*60*1000))}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>9. WATER QUALITY TYPE</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{data.waterQuality || 'Fresh Water'}</td>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>10. AREA TYPE CATEGORY</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{data.areaCategory || 'Over Exploited (GWRE - 2024)'}</td>
                    </tr>
                </tbody>
            </table>

            {/* Ground Water Abstraction Permitted */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '11pt' }}>11. Ground Water Abstraction Permitted</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10pt' }}>
                    <thead>
                        <tr style={{ background: '#f0f0f0' }}>
                            <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left' }}>GW Abstraction</th>
                            <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>m³/day</th>
                            <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>m³/year</th>
                            <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left' }}>Dewatering</th>
                            <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>m³/day</th>
                            <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>m³/year</th>
                            <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left' }}>Total</th>
                            <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>m³/day</th>
                            <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>m³/year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{data.abstraction?.groundwater?.daily || '0.00'}</td>
                            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{data.abstraction?.groundwater?.annual || '0.00'}</td>
                            <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{data.abstraction?.dewatering?.daily || '0.00'}</td>
                            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{data.abstraction?.dewatering?.annual || '0.00'}</td>
                            <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{data.abstraction?.total?.daily || '0.00'}</td>
                            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{data.abstraction?.total?.annual || '0.00'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Details of Ground Water Abstraction Structures */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '11pt' }}>12. Details of Ground Water Abstraction /Dewatering Structures</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt' }}>
                    <thead>
                        <tr style={{ background: '#f0f0f0' }}>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }} colSpan="5">EXISTING</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }} colSpan="5">PROPOSED</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }} colSpan="5">TOTAL</th>
                        </tr>
                        <tr style={{ background: '#f0f0f0' }}>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>DW</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>DCB</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>BW</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>TW</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>Pu</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>DW</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>DCB</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>BW</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>TW</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>Pu</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>DW</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>DCB</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>BW</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>TW</th>
                            <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>Pu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>{data.structures?.existing?.dw || 0}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>{data.structures?.existing?.dcb || 0}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>{data.structures?.existing?.bw || 0}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>{data.structures?.existing?.tw || 0}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>{data.structures?.existing?.pu || 0}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>{data.structures?.proposed?.dw || 0}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>{data.structures?.proposed?.dcb || 0}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>{data.structures?.proposed?.bw || 0}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>{data.structures?.proposed?.tw || 0}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>{data.structures?.proposed?.pu || 0}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center', fontWeight: 'bold' }}>{(data.structures?.existing?.dw || 0) + (data.structures?.proposed?.dw || 0)}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center', fontWeight: 'bold' }}>{(data.structures?.existing?.dcb || 0) + (data.structures?.proposed?.dcb || 0)}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center', fontWeight: 'bold' }}>{(data.structures?.existing?.bw || 0) + (data.structures?.proposed?.bw || 0)}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center', fontWeight: 'bold' }}>{(data.structures?.existing?.tw || 0) + (data.structures?.proposed?.tw || 0)}</td>
                            <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center', fontWeight: 'bold' }}>{(data.structures?.existing?.pu || 0) + (data.structures?.proposed?.pu || 0)}</td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ fontSize: '9pt', marginTop: '8px', fontStyle: 'italic' }}>
                    *DW-Dug Well; DCB-Dug-cum-Bore Well; BW-Bore Well; TW-Tube Well; Pu-Pumps;
                </div>
            </div>

            {/* Validity Conditions */}
            <div style={{ marginBottom: '20px', fontSize: '10pt' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    Validity of this NOC shall be subject to mandatory compliance of the following conditions:
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Phase I (within 30 days)</div>
                    <div style={{ marginLeft: '15px', marginBottom: '8px' }}>
                        1. Installation of tamper proof digital water flow meter with telemetry on all the abstraction structure(s) is mandatory for all users seeking No Objection Certificate. Intimation regarding their installation shall be updated in Self-Compliance Module (Phase-I) of BhuNeer APP portal within 30 days of grant of No Objection Certificate.
                    </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Phase II (within 11 months)</div>
                    <div style={{ marginLeft: '15px' }}>
                        <div style={{ marginBottom: '8px' }}>
                            1. Proponents shall mandatorily get water flow meter calibrated from an authorized agency once in a year.
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                            2. Construction of purpose-built observation wells (piezometers) for ground water level monitoring is mandatory as per Section 14 of Guidelines. Water level data shall be made available to CGWA through web portal. Detailed guidelines for construction of piezometers are given in Annexure-II of the notified guidelines.
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                            3. Proponents shall monitor quality of ground water from all the abstraction structure(s) once in a year. Water samples from bore wells/ tube wells / dug wells shall be collected during April/May every year and analyzed in NABL accredited or Govt. approved laboratories for basic parameters (cations and anions), heavy metals, pesticides/ organic compounds etc. Water quality data shall be made available to CGWA through the web portal.
                        </div>
                    </div>
                    <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                        All the above-mentioned mandatory compliance conditions are to be filed online in BHUNEER APP (https://cgwa-bhuneer.mowr.gov.in) timely.
                    </div>
                </div>
            </div>

            {/* General Conditions */}
            <div style={{ marginBottom: '20px', fontSize: '9pt' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '10pt' }}>General Conditions:</div>
                <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                    <li style={{ marginBottom: '6px' }}>Application for renewal can be submitted online from 90 days before the expiry of NOC. Ground water withdrawal, if any, after expiry of NOC shall be illegal & liable for legal action as per provisions of Environment (Protection) Act, 1986 and amendment thereto, if any.</li>
                    <li style={{ marginBottom: '6px' }}>This NOC is subject to prevailing Central/State Government rules/laws/norms or Court orders related to construction of tube well/ground water abstraction structure / recharge or conservation structure/discharge of effluents or any such matter as applicable.</li>
                    <li style={{ marginBottom: '6px' }}>This NOC is being issued without any prejudice to the directions of the Hon'ble NGT/court orders in cases related to ground water or any other related matters.</li>
                    <li style={{ marginBottom: '6px' }}>No additional ground water abstraction and/or de-watering structures shall be constructed for this purpose without prior approval of the Central Ground Water Authority (CGWA).</li>
                    <li style={{ marginBottom: '6px' }}>The proponent shall seek prior permission from CGWA for any increase in quantum of groundwater abstraction as permitted in NOC.</li>
                    <li style={{ marginBottom: '6px' }}>Proponents shall install roof top rain water harvesting in the premise as per the existing building bye laws.</li>
                    <li style={{ marginBottom: '6px' }}>Proponents, who have installed/constructed rain water harvesting and artificial recharge structures shall continue to regularly maintain the water conservation structures.</li>
                    <li style={{ marginBottom: '6px' }}>The project proponent shall take all necessary measures to prevent contamination of ground water in the premises failing which the firm shall be responsible for any consequences arising thereupon.</li>
                    <li style={{ marginBottom: '6px' }}>Industries which are likely to cause ground water pollution, e.g. Tanning, Slaughter Houses, Dye, Chemical/ Petrochemical, Coal washeries, pharmaceutical, other hazardous units etc. (as per CPCB list), no recharge measures shall be taken up by such firms inside the plant premises. The runoff generated from the rooftop shall be stored and put to beneficial use by the firm. The firm need to undertake necessary well head protection measures to ensure prevention of ground water pollution as per Annexure III of the notified guidelines</li>
                    <li style={{ marginBottom: '6px' }}>Wherever feasible, requirement of water for greenbelt (horticulture) shall be met from recycled / treated waste water.</li>
                    <li style={{ marginBottom: '6px' }}>Wherever the NOC is for abstraction of saline water and the existing wells (s) is /are yielding fresh water, the same shall be sealed and new tubewell(s) tapping saline water zone shall be constructed within 3 months of the issuance of NOC. The firm shall also ensure safe disposal of saline residue, if any.</li>
                    <li style={{ marginBottom: '6px' }}>Unexpected variations in inflow of ground water into the mine pit, if any, shall be reported to the concerned Regional Director, Central Ground Water Board.</li>
                    <li style={{ marginBottom: '6px' }}>This NOC does not absolve the proponents of their obligation / requirement to obtain other statutory and administrative clearances from appropriate authorities.</li>
                    <li style={{ marginBottom: '6px' }}>This NOC does not imply that other statutory / administrative clearances shall be granted to the project by the concerned authorities. Such authorities would consider the project on merits and take decisions independently of the NOC.</li>
                    <li style={{ marginBottom: '6px' }}>In case of change of ownership, new owner of the industry will have to apply for incorporation of necessary changes in the No Objection Certificate with documentary proof within 6 months of taking over possession of the premises.</li>
                    <li style={{ marginBottom: '6px' }}>In case of new infrastructure projects having ground water abstraction of more than 20 m3/day, the firm/entity shall ensure implementation of dual water supply system in the projects.</li>
                    <li style={{ marginBottom: '6px' }}>In case of infrastructure projects, paved/parking area must be covered with interlocking/perforated tiles or other suitable measures to ensure groundwater infiltration/harvesting.</li>
                    <li style={{ marginBottom: '6px' }}>In case of coal and other base metal mining projects, the project proponent shall use the advance dewatering technology (by construction of series of dewatering abstraction structures) to avoid contamination of surface water.</li>
                    <li style={{ marginBottom: '6px' }}>In the self-compliance report, the PP shall submit details of Drilling Agency/ Agencies, which has/ have constructed BW(s)/ TW(s) along with undertaking to the effect that all necessary measures have been taken as per directions of Hon'ble Supreme Court provided in Annexure-VII of guidelines dated 24.09.2020 in respect of abandoned/ failed BW(s)/ TW(s)/Piezometer(s), if any. The PP is advised to engage registered drilling agency/agencies. In the event of any mishap/ unfortunate incident due to negligence in taking measures for prevention of accident due to falling in Bore Well, both PP and concerned drilling agency shall jointly be held responsible and penal action as per extant Government rules shall be taken.</li>
                    <li style={{ marginBottom: '6px' }}>Non-compliance of the conditions mentioned above is likely to result in the cancellation of NOC and legal action against the proponent. In case of violation of any NOC conditions, the applicant shall be liable to pay the penalties as per Section 16 of Guidelines</li>
                </ol>
            </div>

            {/* Footer with Signature */}
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '9pt' }}>
                <div>
                    <div style={{ border: '1px solid #ccc', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', fontSize: '8pt', textAlign: 'center' }}>
                        [QR Code]
                    </div>
                    <div style={{ fontSize: '8pt', fontFamily: 'monospace' }}>UID: {data.nocNumber || 'NOC/IND/RJ/2025/XXXX'}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ height: '60px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <div style={{ borderBottom: '1px solid #000', paddingBottom: '4px', minWidth: '200px', textAlign: 'center', fontFamily: 'serif', fontSize: '12pt', fontWeight: 'bold' }}>
                            Digital Signature
                        </div>
                    </div>
                    <div style={{ fontWeight: 'bold', borderTop: '1px solid #000', paddingTop: '8px', display: 'inline-block' }}>
                        Authorized Signatory
                    </div>
                    <div style={{ fontSize: '9pt', marginTop: '4px' }}>CENTRAL GROUND WATER AUTHORITY</div>
                    <div style={{ fontSize: '8pt', marginTop: '2px' }}>{data.project?.state || 'Rajasthan'} Regional Office</div>
                </div>
            </div>

            <div style={{ marginTop: '20px', fontSize: '8pt', textAlign: 'center', color: '#666', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                Scanned with OKEN Scanner<br />
                This is a system generated certificate and does not require a physical signature. Issued under Section 8 of the Environment (Protection) Act, 1986.
            </div>
        </div>
    );
});

CGWACertificate.displayName = 'CGWACertificate';

export default CGWACertificate;

