import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStudents } from "@/hooks/useStudents";
import { Tab } from "@/pages/Dashboard";
import { Separator } from "@radix-ui/react-separator";
import { GraduationCap, UserPlus, Users } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (tab: Tab) => void }) => {

    const { students, studentCount } = useStudents();

    const seniorCount = students.filter(s => s.academicStanding === 'Senior').length;
    const juniorCount = students.filter(s => s.academicStanding === 'Junior').length;
    const sophCount = students.filter(s => s.academicStanding === 'Sophomore').length;
    const freshCount = students.filter(s => s.academicStanding === 'Freshman').length;

    return (
        <aside className="w-56 shrink-0 border-r flex flex-col bg-card">
            <div className="p-5 flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <p className="font-semibold text-sm leading-tight">Student MS</p>
                    <p className="text-[10px] text-muted-foreground font-mono">SOEN 487</p>
                </div>
            </div>

            <Separator />

            <nav className="p-3 space-y-1 flex-1">
                <Button
                    variant={activeTab === 'list' ? 'secondary' : 'ghost'}
                    className="w-full justify-start gap-2.5 h-9"
                    onClick={() => setActiveTab('list')}
                >
                    <Users className="h-4 w-4" />
                    All Students
                    <Badge variant="secondary" className="ml-auto text-xs px-1.5">
                        {studentCount}
                    </Badge>
                </Button>

                <Button
                    variant={activeTab === 'add' ? 'secondary' : 'ghost'}
                    className="w-full justify-start gap-2.5 h-9"
                    onClick={() => setActiveTab('add')}
                >
                    <UserPlus className="h-4 w-4" />
                    Enroll Student
                </Button>
            </nav>

            <Separator />

            <div className="p-4 space-y-2.5">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    Standing
                </p>
                {[
                    { label: 'Senior', count: seniorCount, cls: 'bg-rose-500' },
                    { label: 'Junior', count: juniorCount, cls: 'bg-amber-500' },
                    { label: 'Sophomore', count: sophCount, cls: 'bg-blue-500' },
                    { label: 'Freshman', count: freshCount, cls: 'bg-emerald-500' },
                ].map(({ label, count, cls }) => (
                    <div key={label} className="flex items-center gap-2 text-xs">
                        <span className={`w-2 h-2 rounded-full ${cls}`} />
                        <span className="text-muted-foreground flex-1">{label}</span>
                        <span className="font-mono font-medium">{count}</span>
                    </div>
                ))}
            </div>
        </aside>
    )
}

export default Sidebar;