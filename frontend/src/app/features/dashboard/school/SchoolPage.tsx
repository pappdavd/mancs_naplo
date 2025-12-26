import { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, CheckCircle, ChevronDown, ChevronUp, GraduationCap, Medal, Star } from 'lucide-react';
import Button from '../../../../marketing/shared/components/Button';
import { logActivity } from '../../../services/logger';
import { useAuth } from '../../../context/AuthContext';

interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  difficulty: 'kezdő' | 'haladó' | 'mester';
  xp_reward: number;
  is_completed: number; 
}

export const SchoolPage = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
        fetchLessons();
    }
  }, [user]);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(`http://localhost/pawpatrol/api/school/get_lessons.php?user_id=${user?.id}`);
      if (response.data.success) {
        setLessons(response.data.lessons);
      }
    } catch (error) {
      console.error("Hiba a leckék betöltésekor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async (lesson: Lesson) => {
    if (!user) return;

    try {
      const response = await axios.post('http://localhost/pawpatrol/api/school/complete_lesson.php', {
        user_id: user.id,
        lesson_id: lesson.id
      });

      if (response.data.success) {
        setLessons(prev => prev.map(l => l.id === lesson.id ? { ...l, is_completed: 1 } : l));
        
        await logActivity(user.id, 'learning', `Megtanulta: ${lesson.title} (+${lesson.xp_reward} XP)`);
        
        setExpandedId(null);
      }
    } catch (error) {
      console.error("Hiba a mentéskor:", error);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const completedCount = lessons.filter(l => l.is_completed).length;
  const totalXp = lessons.reduce((sum, l) => sum + (l.is_completed ? l.xp_reward : 0), 0);

  if (isLoading) return <div className="p-10 text-center text-gray-500">Tananyag betöltése...</div>;

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. HEADER */}
      {/* JAVÍTVA: bg-linear-to-r */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-10">
            <GraduationCap size={150} />
         </div>
         <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Mancs Kutyasuli 🎓</h1>
            <p className="text-blue-100 max-w-lg">
               Tanítsd meg új trükkökre a kutyusod! Minden lecke után XP jár, amivel szintet léphettek.
            </p>
            
            <div className="mt-6 flex gap-6">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 flex items-center gap-3">
                    <Medal className="text-yellow-300" />
                    <div>
                        <p className="text-xs text-blue-100 uppercase font-bold">Összes XP</p>
                        <p className="text-xl font-bold">{totalXp}</p>
                    </div>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 flex items-center gap-3">
                    <BookOpen className="text-white" />
                    <div>
                        <p className="text-xs text-blue-100 uppercase font-bold">Haladás</p>
                        <p className="text-xl font-bold">{completedCount} / {lessons.length}</p>
                    </div>
                </div>
            </div>
         </div>
      </div>

      {/* 2. LECKÉK LISTÁJA */}
      <h2 className="text-xl font-bold text-gray-800">Elérhető Tananyagok</h2>
      
      <div className="space-y-4">
        {lessons.map((lesson) => (
            <div 
                key={lesson.id} 
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                lesson.is_completed ? 'border-green-200 bg-green-50/30' : 'border-gray-200 shadow-sm hover:shadow-md'
                }`}
            >
                {/* Kártya Fejléc */}
                <div 
                className="p-5 flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(lesson.id)}
                >
                    <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        lesson.is_completed ? 'bg-green-100 text-green-600' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                        {lesson.is_completed ? <CheckCircle size={24} /> : <BookOpen size={24} />}
                    </div>
                    <div>
                        <h3 className={`font-bold text-lg ${lesson.is_completed ? 'text-green-800' : 'text-gray-900'}`}>
                            {lesson.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                                lesson.difficulty === 'kezdő' ? 'bg-green-100 text-green-700' : 
                                lesson.difficulty === 'haladó' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                            }`}>
                                {lesson.difficulty}
                            </span>
                            <span className="flex items-center gap-1 text-orange-500 font-medium">
                                <Star size={12} fill="currentColor" /> {lesson.xp_reward} XP
                            </span>
                        </div>
                    </div>
                    </div>
                    <div className="text-gray-400">
                    {expandedId === lesson.id ? <ChevronUp /> : <ChevronDown />}
                    </div>
                </div>

                {/* Kártya Tartalom */}
                {expandedId === lesson.id && (
                    <div className="px-5 pb-5 pt-0 animate-in slide-in-from-top-2 duration-200">
                    <hr className="border-gray-100 mb-4" />
                    <p className="text-gray-600 italic mb-4">"{lesson.description}"</p>
                    
                    <div className="bg-gray-50 p-4 rounded-xl text-gray-700 text-sm leading-relaxed mb-6">
                        <h4 className="font-bold text-gray-900 mb-2">Hogyan csináld:</h4>
                        {lesson.content}
                    </div>

                    {!lesson.is_completed ? (
                        <Button 
                            variant="primary" 
                            className="w-full justify-center bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => handleComplete(lesson)}
                        >
                            Megtanultuk! (+{lesson.xp_reward} XP)
                        </Button>
                    ) : (
                        <div className="text-center p-3 bg-green-100 text-green-700 rounded-xl font-bold flex items-center justify-center gap-2">
                            <CheckCircle size={20} /> Már megtanultátok!
                        </div>
                    )}
                    </div>
                )}
            </div>
        ))}
      </div>

    </div>
  );
};