'use client';

import { Chapter, Verse } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { BookMarked } from 'lucide-react';
import { useBookmarks, type Bookmark } from '@/hooks/use-bookmarks';
import { useToast } from '@/hooks/use-toast';
import VerseList from './verse-list';

interface ChapterViewProps {
  chapter: Chapter | null;
  verses: Verse[];
}

export default function ChapterView({ chapter, verses }: ChapterViewProps) {
  const { addBookmark, removeBookmark, isBookmarked, bookmarks } = useBookmarks();
  const { toast } = useToast();

  if (!chapter) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Chapter not found</h2>
        <p className="text-muted-foreground">
          The requested chapter could not be loaded. Please try again.
        </p>
      </div>
    );
  }

  const bookmarked = isBookmarked(chapter.number);

  const handleBookmark = () => {
    const bookmark = {
      type: 'chapter' as const,
      chapterId: chapter.number,
      title: `${chapter.englishName} (${chapter.name})`,
    };

    if (bookmarked) {
      const existingBookmark = bookmarks.find((b: Bookmark) => b.chapterId === chapter.number && !b.verseNumber);
      if (existingBookmark) {
        removeBookmark(existingBookmark.id);
        toast({
          title: 'Bookmark removed',
          description: 'The chapter has been removed from your bookmarks.',
        });
      }
    } else {
      addBookmark(bookmark);
      toast({
        title: 'Bookmark added',
        description: 'The chapter has been added to your bookmarks.',
      });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-between">
          <span>
            {chapter.englishName} ({chapter.name})
          </span>
          <Button
            variant={bookmarked ? 'secondary' : 'outline'}
            size="sm"
            onClick={handleBookmark}
          >
            <BookMarked className="h-4 w-4 mr-2" />
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
        </h1>
        <p className="text-muted-foreground">
          {chapter.englishNameTranslation} • {chapter.numberOfAyahs} verses •{' '}
          {chapter.revelationType}
        </p>
      </div>

      <VerseList verses={verses} chapterNumber={chapter.number} />
    </div>
  );
}