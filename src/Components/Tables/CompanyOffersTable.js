import React from "react";

export default function CompanyOffersTable({ data }) {
    return (
        <>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Nom de l'offre
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Statut
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date publication
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date limite
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Candidatures
                        </th>
                        <th className="w-1/12 px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((job, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 font-semibold">
                                {job.name}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <span className={`py-2 px-6 inline-flex leading-5 font-semibold rounded-full ${job.status === 'Active' ? 'border border-green-500 text-green-500' : 'border border-red-500 text-red-500'
                                    }`}>
                                    {job.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                {job.publicationDate}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                {job.deadline}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <span className={`py-2 px-6 inline-flex leading-5 font-semibold rounded-full ${job.type === 'Stage' ? 'border border-blue-500 text-blue-500' : 'border border-yellow-500 text-yellow-500'
                                    }`}>
                                    {job.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                {job.applications}
                            </td>
                            <td className="border-b border-gray-200">
                                <span>...</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pt-4 pb-8 px-4 flex justify-between items-center">
                <div className="flex items-center gap-x-4">
                    <span>Voir</span>
                    <select className="border p-2">
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    <span>Offres par page</span>
                </div>
                <div className="">
                    {/* Ajouter pagination */}
                </div>
            </div>
        </>
    )
}