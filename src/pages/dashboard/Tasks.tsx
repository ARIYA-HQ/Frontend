import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CalendarDaysIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';
import PageHeader from '../../components/ui/PageHeader';
import PremiumTabs from '../../components/ui/PremiumTabs';
import PremiumCard from '../../components/ui/PremiumCard';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assignee: string;
  category: string;
}

const Tasks = () => {
  // Mock tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Book venue for wedding',
      description: 'Contact Grand Ballroom for availability and pricing',
      status: 'completed',
      priority: 'high',
      dueDate: '2023-12-01',
      assignee: 'Sarah Johnson',
      category: 'Venue'
    },
    {
      id: 2,
      title: 'Send invitations',
      description: 'Send out 200 wedding invitations',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2023-12-15',
      assignee: 'Michael Brown',
      category: 'Invitations'
    },
    {
      id: 3,
      title: 'Finalize catering menu',
      description: 'Taste test and confirm final menu with caterer',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-01-10',
      assignee: 'John Smith',
      category: 'Food'
    },
    {
      id: 4,
      title: 'Hire photographer',
      description: 'Interview and book wedding photographer',
      status: 'pending',
      priority: 'high',
      dueDate: '2023-11-30',
      assignee: 'Sarah Johnson',
      category: 'Photography'
    },
    {
      id: 5,
      title: 'Plan seating arrangement',
      description: 'Create seating chart for reception',
      status: 'pending',
      priority: 'low',
      dueDate: '2024-02-01',
      assignee: 'David Wilson',
      category: 'Logistics'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('list'); // list or timeline
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    category: 'Logistics',
    priority: 'medium',
    status: 'pending',
    dueDate: new Date().toISOString().split('T')[0],
    assignee: 'Sarah Johnson'
  });

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const handleOpenModal = (task?: Task) => {
    if (task) {
      setEditingTask(task);
      setFormData(task);
    } else {
      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        category: 'Logistics',
        priority: 'medium',
        status: 'pending',
        dueDate: new Date().toISOString().split('T')[0],
        assignee: 'Sarah Johnson'
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...formData } as Task : t));
    } else {
      const newTask = {
        ...formData,
        id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      } as Task;
      setTasks([newTask, ...tasks]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTask = (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const handleToggleComplete = (id: number) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'completed' ? 'pending' : 'completed' };
      }
      return t;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <PageHeader
        breadcrumb="Project Management"
        title="Tasks"
        subtitle="Track every detail of your special day"
        actions={
          <button
            onClick={() => handleOpenModal()}
            className="px-8 py-4 bg-[#D0771E] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg dark:shadow-none flex items-center gap-2 transform active:scale-95"
          >
            <PlusIcon className="w-4 h-4" />
            Add Task
          </button>
        }
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-100 dark:border-gray-700 pb-px">
        <PremiumTabs
          tabs={[
            { id: 'all', label: 'All Tasks' },
            { id: 'pending', label: 'Pending' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' }
          ]}
          activeTab={filter}
          onChange={setFilter}
          className="border-none"
        />

        <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded-2xl flex items-center gap-1 mb-4 md:mb-0">
          {['list', 'timeline'].map((v) => (
            <button
              key={v}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === v
                ? 'bg-white dark:bg-gray-700 text-[#D0771E] shadow-sm dark:shadow-none'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              onClick={() => setView(v as any)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === 'list' ? (
        <PremiumCard hover={false} className="border-none shadow-2xl dark:shadow-none">
          <div className="p-0">
            <div className="overflow-x-auto text-left">
              <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
                <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.2em]">Task Details</th>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.2em]">Category</th>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.2em]">Assignee</th>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.2em]">Schedule</th>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.2em]">Priority</th>
                    <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-50 dark:divide-gray-700">
                  {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                    <tr key={task.id} className="group hover:bg-orange-50/30 dark:hover:bg-orange-900/10 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <button onClick={() => handleToggleComplete(task.id)} className="shrink-0 transition-transform active:scale-95">
                            {task.status === 'completed' ? (
                              <CheckCircleSolid className="h-6 w-6 text-green-500 dark:text-green-400" />
                            ) : (
                              <div className="h-6 w-6 rounded-full border-2 border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 transition-colors" />
                            )}
                          </button>
                          <div>
                            <div className={`text-sm font-bold text-gray-900 dark:text-white transition-all ${task.status === 'completed' ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>{task.title}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium line-clamp-1">{task.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
                        {task.category}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-[8px] font-black dark:text-white">
                            {task.assignee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{task.assignee}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
                          <CalendarDaysIcon className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                          {task.dueDate}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-[10px] font-black uppercase tracking-widest rounded-lg ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-[10px] font-black uppercase tracking-widest rounded-lg ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap text-right text-sm">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleOpenModal(task)} className="p-2 text-gray-400 dark:text-gray-500 hover:text-[#D0771E] bg-white dark:bg-gray-700 rounded-lg shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-600 transition-all">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDeleteTask(task.id)} className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 bg-white dark:bg-gray-700 rounded-lg shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-600 transition-all">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={7} className="px-8 py-12 text-center text-gray-400 dark:text-gray-400 font-medium">No tasks found in this view.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </PremiumCard>
      ) : (
        <PremiumCard hover={false} className="border-none shadow-2xl dark:shadow-none">
          <div className="p-10">
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.3em] mb-8">Calendar Timeline</h3>
            <div className="relative border-l-2 border-orange-100 dark:border-orange-900/30 ml-4 space-y-12">
              {filteredTasks.map((task) => (
                <div key={task.id} className="relative pl-10">
                  <div className={`absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 shadow-md dark:shadow-none flex items-center justify-center ${task.status === 'completed' ? 'bg-green-500' :
                    task.status === 'in-progress' ? 'bg-blue-500' : 'bg-orange-500'
                    }`}>
                    {task.status === 'completed' && <CheckCircleSolid className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[#D0771E] uppercase tracking-widest bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-full mb-2 inline-block">
                      {task.dueDate}
                    </span>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{task.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">{task.description}</p>
                    <div className="mt-4 flex gap-4 text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest">
                      <span>👤 {task.assignee}</span>
                      <span>📂 {task.category}</span>
                      <span className={getPriorityColor(task.priority).split(' ')[1]}>🚩 {task.priority}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PremiumCard>
      )}

      {/* Task Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-8 text-left align-middle shadow-2xl dark:shadow-none transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <Dialog.Title as="h3" className="text-xl font-black text-gray-900 dark:text-white uppercase">
                        {editingTask ? 'Edit Task' : 'Create New Task'}
                      </Dialog.Title>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">Fill in the details for your planning step</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveTask} className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Title</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-medium dark:text-white focus:ring-2 focus:ring-[#D0771E] transition-all"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Confirm guest list"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Description</label>
                      <textarea
                        className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-medium dark:text-white focus:ring-2 focus:ring-[#D0771E] transition-all h-24 resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="What needs to be done?"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Category</label>
                        <select
                          className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-[#D0771E] transition-all appearance-none"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                          <option>Logistics</option>
                          <option>Venue</option>
                          <option>Food</option>
                          <option>Design</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Due Date</label>
                        <input
                          type="date"
                          className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-[#D0771E] transition-all"
                          value={formData.dueDate}
                          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Priority</label>
                        <select
                          className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-[#D0771E] transition-all appearance-none"
                          value={formData.priority}
                          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Status</label>
                        <select
                          className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-sm font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-[#D0771E] transition-all appearance-none"
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full py-4 bg-[#D0771E] text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#B6651A] transition-all shadow-xl dark:shadow-none active:scale-95"
                      >
                        {editingTask ? 'Update Task' : 'Create Task'}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Tasks;