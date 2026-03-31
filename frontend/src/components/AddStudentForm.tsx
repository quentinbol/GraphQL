import React, { useState } from 'react';
import { useAddStudent } from '../hooks/useStudents';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, UserPlus, Loader2 } from 'lucide-react';

interface Props {
  onSuccess: () => void;
}

const AddStudentForm: React.FC<Props> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [credits, setCredits] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const { createStudent, loading } = useAddStudent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSuccess(false);

    const completedCredits = parseInt(credits, 10);
    if (!name.trim()) { setFormError('Please enter a student name.'); return; }
    if (isNaN(completedCredits) || completedCredits < 0) {
      setFormError('Please enter a valid number of credits (≥ 0).');
      return;
    }

    try {
      await createStudent({ name: name.trim(), completedCredits });
      setName('');
      setCredits('');
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onSuccess(); }, 1500);
    } catch (err: any) {
      setFormError(err.message ?? 'An unexpected error occurred.');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-primary/10">
            <UserPlus className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Enroll New Student</CardTitle>
            <CardDescription>Add a student to the management system</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Marie Curie"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credits">Completed Credits</Label>
            <Input
              id="credits"
              type="number"
              placeholder="e.g. 45"
              min={0}
              max={200}
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              Freshman &lt;30 · Sophomore 30–59 · Junior 60–89 · Senior ≥90
            </p>
          </div>

          {formError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-emerald-200 bg-emerald-50 text-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <AlertDescription>Student enrolled successfully!</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enrolling...
              </>
            ) : (
              'Enroll Student'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddStudentForm;
