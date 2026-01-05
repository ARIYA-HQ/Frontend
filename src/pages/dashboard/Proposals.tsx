import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import PremiumCard from '../../components/ui/PremiumCard';
import { PremiumSearch } from '../../components/ui/PremiumInput';
import { Button } from '../../components/ui/Button';
import {
  PlusIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  CalendarIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { MOCK_PROPOSALS } from '../../data/mockProposals';
import type { Proposal } from '../../data/mockProposals';
import ProposalModal from '../../components/proposals/ProposalModal';

const Proposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Filter Logic
  const filteredProposals = proposals.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats Logic
  const totalValue = proposals.reduce((acc, curr) => acc + curr.value, 0);
  const acceptedCount = proposals.filter(p => p.status === 'accepted').length;
  const pendingCount = proposals.filter(p => ['sent', 'viewed'].includes(p.status)).length;

  // Handlers
  const handleAdd = () => {
    setEditingProposal(null);
    setIsModalOpen(true);
  };

  const handleEdit = (proposal: Proposal) => {
    setEditingProposal(proposal);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this proposal?')) {
      setProposals(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSave = (proposalData: Partial<Proposal>) => {
    if (editingProposal) {
      setProposals(prev => prev.map(p =>
        p.id === editingProposal.id ? { ...p, ...proposalData } as Proposal : p
      ));
    } else {
      const newProposal: Proposal = {
        ...proposalData,
        id: `prop-${Date.now()}`,
        status: proposalData.status || 'draft',
        value: Number(proposalData.value),
        items: 1,
        tags: []
      } as Proposal;
      setProposals(prev => [newProposal, ...prev]);
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, statusId: string) => {
    e.preventDefault();
    if (!draggedId) return;

    // Map column ID to Proposal status
    let newStatus: Proposal['status'];
    if (statusId === 'sent') newStatus = 'sent'; // Default to sent for that column
    else if (statusId === 'accepted') newStatus = 'accepted';
    else if (statusId === 'declined') newStatus = 'declined';
    else newStatus = 'draft';

    setProposals(prev => prev.map(p =>
      p.id === draggedId ? { ...p, status: newStatus } : p
    ));
    setDraggedId(null);
  };

  const getStatusColumn = (status: Proposal['status']) => {
    if (['sent', 'viewed'].includes(status)) return 'sent';
    return status;
  };

  const columns = [
    { id: 'draft', label: 'Drafts', icon: DocumentTextIcon, color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-800' },
    { id: 'sent', label: 'Sent / Viewed', icon: ClockIcon, color: 'text-[#D0771E]', bg: 'bg-[#D0771E]/5 dark:bg-[#D0771E]/10' },
    { id: 'accepted', label: 'Accepted', icon: CheckCircleIcon, color: 'text-green-500', bg: 'bg-green-500/5 dark:bg-green-500/10' },
    { id: 'declined', label: 'Declined', icon: XMarkIconSmall, color: 'text-red-500', bg: 'bg-red-500/5 dark:bg-red-500/10' }
  ];

  return (
    <div className="max-w-[1600px] mx-auto pb-20 h-full flex flex-col">
      <div className="w-full px-8 flex-1 flex flex-col">
        <PageHeader
          breadcrumb="Professional Dashboard"
          title="Proposals"
          subtitle="Manage your client proposals pipeline"
          actions={
            <Button
              variant="primary"
              onClick={handleAdd}
              className="bg-[#D0771E] hover:bg-[#b86619] text-white h-12 rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20 dark:shadow-none flex items-center gap-2 transition-all"
            >
              <PlusIcon className="w-4 h-4" />
              Create Proposal
            </Button>
          }
        />

        <div className="flex flex-col lg:flex-row gap-8 flex-1">
          {/* Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0 space-y-8">
            {/* Search */}
            <div className="sticky top-8 space-y-6">
              <PremiumCard className="p-4 border-gray-100/50 dark:border-gray-700/50 shadow-none bg-transparent dark:bg-transparent">
                <div className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-4 px-2">Filter</div>
                <PremiumSearch
                  placeholder="Search proposals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </PremiumCard>

              {/* Stats */}
              <PremiumCard className="p-6 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6">Pipeline</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#D0771E]/10 rounded-lg text-[#D0771E]">
                        <BanknotesIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Value</span>
                    </div>
                    <span className="text-lg font-black text-gray-900 dark:text-white">${totalValue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                        <CheckCircleIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Won</span>
                    </div>
                    <span className="text-lg font-black text-gray-900 dark:text-white">{acceptedCount}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-600">
                        <ClockIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Pending</span>
                    </div>
                    <span className="text-lg font-black text-gray-900 dark:text-white">{pendingCount}</span>
                  </div>
                </div>
              </PremiumCard>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex gap-6 min-w-[800px] h-full">
              {columns.map(col => (
                <div
                  key={col.id}
                  className="flex-1 flex flex-col min-w-[280px]"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, col.id)}
                >
                  {/* Column Header */}
                  <div className={`p-4 rounded-t-2xl border-b border-transparent ${col.bg}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <col.icon className={`w-4 h-4 ${col.color}`} />
                        <span className={`text-xs font-black uppercase tracking-widest ${col.color}`}>{col.label}</span>
                      </div>
                      <span className="text-[10px] font-black bg-white dark:bg-black/20 px-2 py-1 rounded-md text-gray-500">
                        {filteredProposals.filter(p => getStatusColumn(p.status) === col.id).length}
                      </span>
                    </div>
                  </div>

                  {/* Column Content */}
                  <div className={`p-4 rounded-b-2xl bg-gray-50/50 dark:bg-gray-800/30 flex-1 space-y-4 transition-colors ${draggedId ? 'bg-gray-100/50 dark:bg-gray-700/20 box-border border-2 border-dashed border-gray-200 dark:border-gray-700' : ''}`}>
                    {filteredProposals
                      .filter(p => getStatusColumn(p.status) === col.id)
                      .map(proposal => (
                        <div
                          key={proposal.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, proposal.id)}
                          className="cursor-move"
                        >
                          <PremiumCard
                            className={`p-5 border-gray-200 dark:border-gray-700 hover:border-[#D0771E]/50 dark:hover:border-[#D0771E]/50 transition-all group relative ${draggedId === proposal.id ? 'opacity-50' : ''}`}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">{proposal.clientName}</span>
                              <span className="text-xs font-black text-gray-900 dark:text-white">${proposal.value.toLocaleString()}</span>
                            </div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">{proposal.title}</h4>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50">
                              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                <CalendarIcon className="w-3.5 h-3.5" />
                                {new Date(proposal.dueDate).toLocaleDateString()}
                              </div>
                              <div className="flex gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleEdit(proposal); }}
                                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-400 hover:text-[#D0771E]"
                                >
                                  <PencilSquareIcon className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => handleDelete(proposal.id, e)}
                                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-400 hover:text-red-500"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </PremiumCard>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        proposal={editingProposal}
      />
    </div>
  );
};

// Helper Icon for Declined column
const XMarkIconSmall = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default Proposals;
