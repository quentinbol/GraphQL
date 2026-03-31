import React, { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import StudentCard from '../components/StudentCard';
import AddStudentForm from '../components/AddStudentForm';
import StudentDetail from '../components/StudentDetail';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, BookOpen, AlertCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

export type Tab = 'list' | 'add';

const Dashboard: React.FC = () => {
  const { students, studentCount, loading, error, refetch } = useStudents();
  const [activeTab, setActiveTab] = useState<Tab>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.includes(search)
  );

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'list' && (
          <div className="p-6 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Student Registry</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {studentCount} student{studentCount !== 1 ? 's' : ''} enrolled
                </p>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ID…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1.5 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </div>
                    <Skeleton className="h-1.5 w-full rounded" />
                  </div>
                ))}
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
            {!loading && !error && (
              <div className="flex gap-5 items-start">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground gap-3">
                      <BookOpen className="h-8 w-8 opacity-40" />
                      <p className="text-sm">No students found.</p>
                    </div>
                  ) : (
                    filtered.map((s) => (
                      <StudentCard
                        key={s.id}
                        student={s}
                        onSelect={handleSelect}
                        isSelected={selectedId === s.id}
                      />
                    ))
                  )}
                </div>

                {selectedId && (
                  <StudentDetail
                    studentId={selectedId}
                    onClose={() => setSelectedId(null)}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Enroll a Student</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Add a new student to the system
              </p>
            </div>
            <AddStudentForm
              onSuccess={() => {
                refetch();
                setTimeout(() => setActiveTab('list'), 1600);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
