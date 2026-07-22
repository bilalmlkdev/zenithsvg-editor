import  { useState } from 'react';
import { BookmarkPlus, X } from 'lucide-react';

export default function SaveModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const date = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    onSave({
      name: name.trim(),
      description: description.trim(),
      date,
    });

    setName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 space-y-5 dark:bg-zinc-900 dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-600">
              <BookmarkPlus className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Save Icon</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
              Icon Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rocket Launch"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition shadow-sm"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
              Description <span className="text-gray-400 font-normal lowercase">(optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Header navigation icon"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none transition shadow-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-purple-600 text-white hover:bg-purple-700 transition shadow-sm"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
