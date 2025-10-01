import { Post } from '@/contexts/PostContext';
import { Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const PostCard = ({ post, onClick }: PostCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-card-hover transition-smooth overflow-hidden"
    >
      {post.images.length > 0 && (
        <div className="relative aspect-square bg-secondary">
          <img
            src={post.images[0]}
            alt="Post preview"
            className="w-full h-full object-cover"
          />
          {post.images.length > 1 && (
            <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium">
              1/{post.images.length}
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <p className="text-sm text-foreground line-clamp-3 mb-3">
          {post.caption || 'No caption'}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
