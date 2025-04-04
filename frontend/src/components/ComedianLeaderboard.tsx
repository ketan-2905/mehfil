
import { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useDataStore, Comedian } from '@/services/DataService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GlassCard from '@/components/ui-components/GlassCard';
import AnimatedElement from '@/components/ui-components/AnimatedElement';

type SortField = 'name' | 'rating';
type SortDirection = 'asc' | 'desc';

const ComedianLeaderboard = () => {
  const comedians = useDataStore(state => state.comedians);
  const [sortField, setSortField] = useState<SortField>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedComedians = [...comedians].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortDirection === 'asc'
        ? a.averageRating - b.averageRating
        : b.averageRating - a.averageRating;
    }
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={16} className="fill-comedy-orange text-comedy-orange" />);
    }
    
    if (halfStar) {
      stars.push(
        <span key="half" className="relative flex">
          <Star size={16} className="text-muted-foreground" />
          <Star size={16} className="absolute top-0 left-0 overflow-hidden w-1/2 fill-comedy-orange text-comedy-orange" />
        </span>
      );
    }
    
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-muted-foreground" />);
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <AnimatedElement animation="slide-up" delay={300}>
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold mb-4">Comedian Leaderboard</h2>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-white/5">
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name
                  {sortField === 'name' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>Genre</TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('rating')}
              >
                <div className="flex items-center">
                  Rating
                  {sortField === 'rating' && (
                    sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedComedians.map((comedian, index) => (
              <TableRow key={comedian.id} className="hover:bg-white/5">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{comedian.name}</TableCell>
                <TableCell>{comedian.genre}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {renderStars(comedian.averageRating)}
                    <span className="text-sm">({comedian.averageRating})</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </AnimatedElement>
  );
};

export default ComedianLeaderboard;
