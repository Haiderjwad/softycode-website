import { motion } from 'motion/react';

export const CardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
    className="card-elevated"
  >
    <div className="h-64 bg-gradient-to-r from-slate-200 to-slate-100 rounded-t-2xl" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
      <div className="h-4 bg-slate-100 rounded-lg w-full" />
      <div className="h-4 bg-slate-100 rounded-lg w-5/6" />
      <div className="h-10 bg-slate-200 rounded-lg w-1/3 mt-6" />
    </div>
  </motion.div>
);

export const TableSkeleton = () => (
  <motion.div
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
    className="space-y-4"
  >
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex gap-4 p-4 bg-slate-100 rounded-lg">
        <div className="w-12 h-12 bg-slate-200 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-1/3" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
    ))}
  </motion.div>
);

export const SkeletonGrid = ({ count = 6 }: { count?: number }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(count)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);
