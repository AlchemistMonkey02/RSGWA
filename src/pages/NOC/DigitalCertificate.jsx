import React, { forwardRef } from 'react';

const DigitalCertificate = forwardRef(({ data }, ref) => {
    if (!data) return null;

    return (
        <div ref={ref} className="certificate-container bg-white text-black p-8 font-serif relative" style={{ width: '210mm', minHeight: '297mm', margin: '0 auto' }}>
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
                <h1 className="text-[150px] font-bold rotate-45 text-slate-900">CGWA</h1>
            </div>

            <div className="relative z-10 border-4 border-double border-slate-800 h-full p-8 flex flex-col justify-between">

                {/* Header */}
                <header className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-4 grayscale opacity-80">
                        <img src="/rajasthan_emblem.png" alt="Emblem" className="w-full h-full object-contain" />
                    </div>
                    <h5 className="text-sm font-bold uppercase tracking-widest mb-1">Government of India</h5>
                    <h4 className="text-base font-bold uppercase mb-1">{data.master.ministry}</h4>
                    <h3 className="text-lg font-bold uppercase underline decoration-2 underline-offset-4 mb-2">{data.master.dept}</h3>
                    <h2 className="text-2xl font-extrabold text-slate-900 border-2 border-slate-900 inline-block px-6 py-2 mt-4">NO OBJECTION CERTIFICATE (NOC)</h2>
                    <p className="mt-2 text-sm font-bold italic">FOR GROUND WATER ABSTRACTION</p>
                </header>

                {/* NOC Details Box */}
                <div className="flex justify-between border border-slate-900 p-4 mb-8 text-sm">
                    <div>
                        <p className="mb-1"><span className="font-bold">NOC Number:</span> {data.master.nocNo}</p>
                        <p><span className="font-bold">Application Number:</span> {data.master.appNo}</p>
                    </div>
                    <div className="text-right">
                        <p className="mb-1"><span className="font-bold">Date of Issue:</span> {data.master.issueDate}</p>
                        <p><span className="font-bold">Valid Until:</span> {data.master.validTo}</p>
                    </div>
                </div>

                {/* Body Content */}
                <div className="space-y-6 text-sm flex-1">
                    <div className="text-justify leading-relaxed">
                        <p className="mb-4">
                            Permission is hereby granted to <span className="font-bold uppercase">{data.project.name}</span> located at <span className="font-bold">{data.project.address}, {data.project.tehsil}, {data.project.district}, {data.project.state} - {data.project.pin}</span> for the abstraction of ground water for <span className="font-bold">{data.master.purpose}</span> purposes.
                        </p>
                        <p className="mb-4">
                            This No Objection Certificate is valid from <span className="font-bold">{data.master.validFrom}</span> to <span className="font-bold">{data.master.validTo}</span> for the abstraction of ground water as per the details given below:
                        </p>
                    </div>

                    {/* Permission Table */}
                    <div>
                        <h4 className="font-bold uppercase mb-2 border-b border-slate-400 pb-1">1. Approved Abstraction Details</h4>
                        <table className="w-full border-collapse border border-slate-900 text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="border border-slate-900 px-3 py-2 text-left">Parameter</th>
                                    <th className="border border-slate-900 px-3 py-2 text-center">m³/day</th>
                                    <th className="border border-slate-900 px-3 py-2 text-center">m³/year</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-slate-900 px-3 py-2">Ground Water Abstraction</td>
                                    <td className="border border-slate-900 px-3 py-2 text-center font-bold">{data.abstraction.groundwater.daily}</td>
                                    <td className="border border-slate-900 px-3 py-2 text-center font-bold">{data.abstraction.groundwater.annual}</td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-900 px-3 py-2">Dewatering</td>
                                    <td className="border border-slate-900 px-3 py-2 text-center">0.00</td>
                                    <td className="border border-slate-900 px-3 py-2 text-center">0.00</td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className="border border-slate-900 px-3 py-2 font-bold">Total Permitted</td>
                                    <td className="border border-slate-900 px-3 py-2 text-center font-bold">{data.abstraction.total.daily}</td>
                                    <td className="border border-slate-900 px-3 py-2 text-center font-bold">{data.abstraction.total.annual}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Structures Table */}
                    <div>
                        <h4 className="font-bold uppercase mb-2 border-b border-slate-400 pb-1">2. Abstraction Structure Inventory</h4>
                        <table className="w-full border-collapse border border-slate-900 text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="border border-slate-900 px-3 py-2 text-left">Structure Type</th>
                                    <th className="border border-slate-900 px-3 py-2 text-center">Existing</th>
                                    <th className="border border-slate-900 px-3 py-2 text-center">Proposed</th>
                                    <th className="border border-slate-900 px-3 py-2 text-center">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-slate-900 px-3 py-2">Bore Wells (BW)</td>
                                    <td className="border border-slate-900 px-3 py-2 text-center">{data.structures.bw.exist}</td>
                                    <td className="border border-slate-900 px-3 py-2 text-center">{data.structures.bw.prop}</td>
                                    <td className="border border-slate-900 px-3 py-2 text-center font-bold">{data.structures.bw.total}</td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-900 px-3 py-2">Tube Wells (TW) / DCB / DW</td>
                                    <td className="border border-slate-900 px-3 py-2 text-center">0</td>
                                    <td className="border border-slate-900 px-3 py-2 text-center">0</td>
                                    <td className="border border-slate-900 px-3 py-2 text-center font-bold">0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Legal Text */}
                    <div className="text-xs text-justify mt-4 leading-tight">
                        <p className="mb-2"><strong>Conditions:</strong></p>
                        <ol className="list-decimal pl-4 space-y-1">
                            <li>Installation of tamper-proof digital water flow meter with telemetry on all abstraction structures is mandatory.</li>
                            <li>Ground water quality monitoring and water level monitoring shall be carried out as per the guidelines.</li>
                            <li>The proponent shall implement rainwater harvesting and artificial recharge measures.</li>
                            <li>This NOC is liable to be cancelled in case of non-compliance of any of the conditions.</li>
                            <li>Application for renewal should be submitted 90 days prior to the expiry of this NOC.</li>
                        </ol>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 flex justify-between items-end">
                    <div>
                        <div className="w-24 h-24 border border-slate-300 flex items-center justify-center p-2">
                            {/* QR Placeholder */}
                            <div className="text-[10px] text-center text-slate-400">Scan to Verify<br />NOC Validity</div>
                        </div>
                        <p className="text-[10px] font-mono mt-2 text-slate-500">UID: {data.master.nocNo}</p>
                    </div>
                    <div className="text-right">
                        <div className="h-16 mb-2 flex flex-col items-end justify-center">
                            <span className="font-script text-xl text-blue-900 block font-bold">DigitalSig_Auth_CGWA</span>
                        </div>
                        <p className="font-bold border-t border-slate-900 pt-2 inline-block">Authorized Signatory</p>
                        <p className="text-xs uppercase">Central Ground Water Authority</p>
                        <p className="text-xs">{data.project.state} Regional Office</p>
                    </div>
                </div>

                <div className="text-center mt-8 text-[10px] text-slate-500 border-t border-slate-200 pt-2">
                    This is a system generated certificate and does not require a physical signature. Issued under Section 8 of the Environment (Protection) Act, 1986.
                </div>
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
                .font-script { font-family: 'Dancing Script', cursive; }
            `}</style>
        </div>
    );
});

export default DigitalCertificate;
