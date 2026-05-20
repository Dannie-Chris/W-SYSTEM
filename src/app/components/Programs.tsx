import { useState } from 'react';
import { Plus, Edit, Trash2, Users, DollarSign, Calendar } from 'lucide-react';

interface Program {
  id: string;
  name: string;
  description: string;
  beneficiaries: number;
  budget: string;
  utilized: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Inactive' | 'Upcoming';
  eligibility: string[];
}

const programsData: Program[] = [
  {
    id: 'PRG001',
    name: 'Food Assistance Program',
    description: 'Monthly food vouchers and nutrition support for low-income families',
    beneficiaries: 4520,
    budget: '$2,500,000',
    utilized: '$1,875,000',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    eligibility: ['Income below $25,000', 'Family size 3+', 'US Citizen or Legal Resident']
  },
  {
    id: 'PRG002',
    name: 'Housing Support Initiative',
    description: 'Rental assistance and housing subsidies for eligible families',
    beneficiaries: 3210,
    budget: '$4,000,000',
    utilized: '$2,800,000',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    eligibility: ['Income below $30,000', 'Documented housing need', 'Background check']
  },
  {
    id: 'PRG003',
    name: 'Healthcare Access Program',
    description: 'Medical coverage and prescription drug assistance',
    beneficiaries: 2850,
    budget: '$3,200,000',
    utilized: '$2,100,000',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    eligibility: ['No health insurance', 'Income below poverty line', 'Age 18+']
  },
  {
    id: 'PRG004',
    name: 'Education Support Fund',
    description: 'Scholarships and educational materials for students',
    beneficiaries: 1878,
    budget: '$1,800,000',
    utilized: '$950,000',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    eligibility: ['Student status', 'GPA 2.5+', 'Family income below $35,000']
  },
  {
    id: 'PRG005',
    name: 'Senior Care Initiative',
    description: 'Support services and financial aid for senior citizens',
    beneficiaries: 0,
    budget: '$1,500,000',
    utilized: '$0',
    startDate: '2026-06-01',
    endDate: '2027-05-31',
    status: 'Upcoming',
    eligibility: ['Age 65+', 'Income below $20,000', 'Medicare enrolled']
  }
];

export default function Programs() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUtilizationPercentage = (program: Program) => {
    const budget = parseFloat(program.budget.replace(/[$,]/g, ''));
    const utilized = parseFloat(program.utilized.replace(/[$,]/g, ''));
    return Math.round((utilized / budget) * 100);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Programs</h1>
          <p className="text-gray-600 mt-1">Manage welfare assistance programs</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Create Program
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {programsData.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedProgram(program)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(program.status)}`}>
                      {program.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{program.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Beneficiaries</p>
                    <p className="text-sm font-semibold text-gray-900">{program.beneficiaries.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-sm font-semibold text-gray-900">{program.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-semibold text-gray-900">{program.startDate.split('-')[0]}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Budget Utilization</span>
                  <span className="font-semibold text-gray-900">{getUtilizationPercentage(program)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${getUtilizationPercentage(program)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>Utilized: {program.utilized}</span>
                  <span>Remaining: ${(parseFloat(program.budget.replace(/[$,]/g, '')) - parseFloat(program.utilized.replace(/[$,]/g, ''))).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          {selectedProgram ? (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Details</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Program ID</p>
                  <p className="text-sm text-gray-900 mt-1">{selectedProgram.id}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-sm text-gray-900 mt-1">{selectedProgram.name}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedProgram.status)} inline-block mt-1`}>
                    {selectedProgram.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p className="text-sm text-gray-900 mt-1">{selectedProgram.startDate} to {selectedProgram.endDate}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Eligibility Criteria</p>
                  <ul className="mt-2 space-y-1">
                    {selectedProgram.eligibility.map((criterion, index) => (
                      <li key={index} className="text-sm text-gray-900 flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 sticky top-6">
              <div className="text-center text-gray-500 py-12">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Select a program to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
