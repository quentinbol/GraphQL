import React from 'react';
import { useStudent } from '../hooks/useStudents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { X, GraduationCap, BookOpen, Target } from 'lucide-react';

interface Props {
  studentId: string;
  onClose: () => void;
}

const standingColor: Record<string, string> = {
  Freshman: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Sophomore: 'bg-blue-100 text-blue-700 border-blue-200',
  Junior: 'bg-amber-100 text-amber-700 border-amber-200',
  Senior: 'bg-rose-100 text-rose-700 border-rose-200',
};

const avatarColor: Record<string, string> = {
  Freshman: 'bg-emerald-500',
  Sophomore: 'bg-blue-500',
  Junior: 'bg-amber-500',
  Senior: 'bg-rose-500',
};

const StudentDetail: React.FC<Props> = ({ studentId, onClose }) => {
  const { student, loading, error } = useStudent(studentId);

  if (loading) return (
    <Card className="w-64 shrink-0">
      <CardContent className="p-5 space-y-4">
        <Skeleton className="h-16 w-16 rounded-full mx-auto" />
        <Skeleton className="h-5 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
        <Separator />
        <Skeleton className="h-20 w-full" />
      </CardContent>
    </Card>
  );

  if (error || !student) return (
    <Card className="w-64 shrink-0">
      <CardContent className="p-5 text-center text-sm text-muted-foreground">
        Could not load student data.
      </CardContent>
    </Card>
  );

  const progress = Math.min(Math.round((student.completedCredits / 120) * 100), 100);
  const remaining = Math.max(120 - student.completedCredits, 0);
  const badgeCls = standingColor[student.academicStanding] ?? 'bg-slate-100 text-slate-700';
  const avatarCls = avatarColor[student.academicStanding] ?? 'bg-slate-500';

  return (
    <Card className="w-64 shrink-0 sticky top-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm text-muted-foreground font-normal">Student Profile</CardTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex flex-col items-center gap-3 text-center">
          <Avatar className="h-16 w-16">
            <AvatarFallback className={`text-white text-xl font-bold ${avatarCls}`}>
              {student.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm leading-tight">{student.name}</p>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">ID #{student.id}</p>
          </div>
          <Badge className={`text-xs border ${badgeCls}`} variant="outline">
            {student.academicStanding}
          </Badge>
        </div>

        <Separator />

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="space-y-1">
            <div className="flex justify-center">
              <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p className="text-base font-bold">{student.completedCredits}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">Done</p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-center">
              <Target className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p className="text-base font-bold">{remaining}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">Left</p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-center">
              <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p className="text-base font-bold">{progress}%</p>
            <p className="text-[10px] text-muted-foreground leading-tight">Done</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Degree progress</span>
            <span className="font-mono">{student.completedCredits}/120</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentDetail;
