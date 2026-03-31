import React from 'react';
import { Student } from '../types/student';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Props {
  student: Student;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const standingColor: Record<string, string> = {
  Freshman:  'bg-emerald-100 text-emerald-700 border-emerald-200',
  Sophomore: 'bg-blue-100 text-blue-700 border-blue-200',
  Junior:    'bg-amber-100 text-amber-700 border-amber-200',
  Senior:    'bg-rose-100 text-rose-700 border-rose-200',
};

const avatarColor: Record<string, string> = {
  Freshman:  'bg-emerald-500',
  Sophomore: 'bg-blue-500',
  Junior:    'bg-amber-500',
  Senior:    'bg-rose-500',
};

const StudentCard: React.FC<Props> = ({ student, onSelect, isSelected }) => {
  const progress = Math.min(Math.round((student.completedCredits / 120) * 100), 100);
  const badgeCls = standingColor[student.academicStanding] ?? 'bg-slate-100 text-slate-700';
  const avatarCls = avatarColor[student.academicStanding] ?? 'bg-slate-500';

  return (
    <Card
      onClick={() => onSelect(student.id)}
      className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
        isSelected ? 'ring-2 ring-primary shadow-md' : ''
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className={`text-white font-semibold text-sm ${avatarCls}`}>
              {student.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm leading-tight truncate">{student.name}</p>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">ID #{student.id}</p>
          </div>
          <Badge className={`text-xs border ${badgeCls} shrink-0`} variant="outline">
            {student.academicStanding}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Completed Credits</span>
            <span className="font-mono font-medium text-foreground">
              {student.completedCredits} / 120
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
