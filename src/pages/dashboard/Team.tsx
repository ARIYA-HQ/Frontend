import { useState, useEffect } from 'react';
import UpgradeModal from '../../components/ui/UpgradeModal';
import { useEntitlement } from '../../contexts/EntitlementContext';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../components/ui/PageHeader';
import PremiumCard from '../../components/ui/PremiumCard';
import { Button } from '../../components/ui/Button';
import { TEAM_MEMBERS, TEAM_ROLES } from '../../data/mockTeam';

const Team = () => {
  const { checkEntitlement } = useEntitlement();
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('ariya_team_members');
    return saved ? JSON.parse(saved) : TEAM_MEMBERS;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false); // Added
  const [editingMember, setEditingMember] = useState<any>(null);
  const [inviteForm, setInviteForm] = useState({ email: '', role: 'Coordinator' });

  useEffect(() => {
    localStorage.setItem('ariya_team_members', JSON.stringify(members));
  }, [members]);

  // Presence Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMembers((prev: any) =>
        prev.map((m: any) =>
          Math.random() > 0.8
            ? { ...m, status: m.status === 'Active' ? 'Away' : 'Active' }
            : m
        )
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredMembers = members.filter((m: any) =>
  (m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRemoveMember = (id: number) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setMembers((prev: any[]) => prev.filter((m: any) => m.id !== id));
    }
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();

    const newMember = {
      id: Math.max(0, ...members.map((m: any) => m.id)) + 1,
      name: inviteForm.email.split('@')[0], // Simulate name from email
      role: inviteForm.role,
      email: inviteForm.email,
      avatar: `https://ui-avatars.com/api/?name=${inviteForm.email}&background=random`,
      status: 'Pending',
      permissions: ['Guest Lists', 'Task Management'], // Default for now
      lastActive: 'Invitation Sent'
    };

    setMembers((prev: any) => [...prev, newMember]);
    setShowInviteModal(false);
    setInviteForm({ email: '', role: 'Coordinator' });
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col gap-10 dark:bg-gray-900 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader
        breadcrumb="Professional Dashboard"
        title="Team Management"
        subtitle="Manage your collaborators, planners, and permissions"
        actions={
          <Button
            onClick={() => {
              const entitlement = checkEntitlement('add_team_member');
              if (!entitlement.allowed) {
                setShowUpgradeModal(true);
                return;
              }
              setShowInviteModal(true);
            }}
            className="h-12 px-8 rounded-2xl shadow-xl shadow-orange-100 dark:shadow-none bg-[#D0771E] text-white"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Invite Member
          </Button>
        }
      />

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PremiumCard className="p-8 border-gray-100 dark:border-gray-800 flex items-center gap-6 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-[#D0771E]">
            <ShieldCheckIcon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Team Size</p>
            <h4 className="text-2xl font-black text-[#1D2939] dark:text-white">{members.length} Members</h4>
          </div>
        </PremiumCard>
        <PremiumCard className="p-8 border-gray-100 dark:border-gray-800 flex items-center gap-6 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600">
            <PlusIcon className="w-7 h-7 " />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Active Now</p>
            <h4 className="text-2xl font-black text-[#1D2939] dark:text-white">3 Online</h4>
          </div>
        </PremiumCard>
        <PremiumCard className="p-8 border-gray-100 dark:border-gray-800 flex items-center gap-6 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600">
            <EnvelopeIcon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Pending Invites</p>
            <h4 className="text-2xl font-black text-[#1D2939] dark:text-white">
              {members.filter((m: any) => m.status === 'Pending').length} Pending
            </h4>
          </div>
        </PremiumCard>
      </div>

      {/* Member List */}
      <PremiumCard className="p-0 overflow-hidden border-gray-100 dark:border-gray-800">
        <div className="p-8 border-b border-gray-50 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative group w-full md:w-96">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D0771E] transition-colors" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent rounded-xl text-xs font-black placeholder:text-gray-400 dark:text-white focus:ring-2 focus:ring-[#D0771E]/20 focus:bg-white dark:focus:bg-gray-900 focus:border-[#D0771E] transition-all outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F3F0EB]/30 dark:bg-gray-800/50">
                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Member</th>
                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Role</th>
                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Last Active</th>
                <th className="px-10 py-5 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800">
              {filteredMembers.map((member: any) => (
                <tr key={member.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors group bg-white dark:bg-gray-900">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <div className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-tight">{member.name}</div>
                        <div className="text-[9px] font-medium text-gray-400 dark:text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-[8px] font-black uppercase tracking-widest text-[#D0771E]">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{member.status}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest italic">{member.lastActive}</td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-2 text-gray-400">
                      <button
                        onClick={() => setEditingMember(member)}
                        className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors hover:text-[#D0771E]"
                      >
                        <ShieldCheckIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors hover:text-[#D0771E]">
                        <EnvelopeIcon className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleRemoveMember(member.id)} className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors hover:text-rose-500">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PremiumCard>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D2939]/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <PremiumCard className="w-full max-w-xl animate-in zoom-in-95 duration-300 bg-white dark:bg-gray-900 border-none shadow-2xl p-0 overflow-hidden">
            <div className="px-10 py-10 bg-[#F3F0EB]/30 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1D2939] dark:text-white">Invite Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="p-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl transition-colors">
                <PlusIcon className="w-6 h-6 rotate-45 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSendInvite} className="p-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteForm.email}
                  onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })}
                  className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-black text-[#1D2939] dark:text-white"
                  placeholder="colleague@ariyahq.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Assign Role</label>
                <div className="grid grid-cols-1 gap-2">
                  {TEAM_ROLES.map(role => (
                    <div
                      key={role.name}
                      onClick={() => setInviteForm({ ...inviteForm, role: role.name })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${inviteForm.role === role.name ? 'border-[#D0771E] bg-orange-50/30' : 'border-gray-50 dark:border-gray-800 hover:border-gray-100'}`}
                    >
                      <role.icon className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-tight text-[#1D2939] dark:text-white">{role.name}</h4>
                        <p className="text-[9px] font-medium text-gray-400 truncate">{role.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="flex-1 h-14 rounded-2xl" onClick={() => setShowInviteModal(false)}>Cancel</Button>
                <Button type="submit" className="flex-1 h-14 rounded-2xl bg-[#D0771E] text-white">Send Invite</Button>
              </div>
            </form>
          </PremiumCard>
        </div>
      )}

      {/* Edit Role Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D2939]/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <PremiumCard className="w-full max-w-xl animate-in zoom-in-95 duration-300 bg-white dark:bg-gray-900 border-none shadow-2xl p-0 overflow-hidden">
            <div className="px-10 py-10 bg-[#F3F0EB]/30 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1D2939] dark:text-white">Update Role: {editingMember.name}</h3>
              <button onClick={() => setEditingMember(null)} className="p-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl transition-colors">
                <PlusIcon className="w-6 h-6 rotate-45 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select New Role</label>
                <div className="grid grid-cols-1 gap-2">
                  {TEAM_ROLES.map(role => (
                    <div
                      key={role.name}
                      onClick={() => setMembers((prev: any) => prev.map((m: any) => m.id === editingMember.id ? { ...m, role: role.name } : m))}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${editingMember.role === role.name ? 'border-[#D0771E] bg-orange-50/30' : 'border-gray-50 dark:border-gray-800 hover:border-gray-100'}`}
                    >
                      <role.icon className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-tight text-[#1D2939] dark:text-white">{role.name}</h4>
                        <p className="text-[9px] font-medium text-gray-400 truncate">{role.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button className="w-full h-14 rounded-2xl bg-[#D0771E] text-white" onClick={() => setEditingMember(null)}>Save Changes</Button>
              </div>
            </div>
          </PremiumCard>
        </div>
      )}

      {/* The following components are not fully defined in the original code or the provided diff,
          but are included to match the structure implied by the diff's final snippet.
          Assuming `showRoleModal`, `handleRoleUpdate`, `selectedMember` would be defined elsewhere
          if this were a complete refactor. For this specific instruction, only UpgradeModal is directly relevant. */}
      {/* <RoleModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onSave={handleRoleUpdate}
        currentRole={selectedMember?.role || 'Viewer'}
        memberName={selectedMember?.name || ''}
      /> */}

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        featureId="add_team_member"
      />
    </div>
  );
};

export default Team;


