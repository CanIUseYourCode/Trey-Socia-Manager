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
      className="glass-card cursor-pointer border-none overflow-hidden group"
    >
      {post.images.length > 0 && (
        <div className="relative aspect-square bg-muted">
          <img
            src={post.images[0]}
            alt="Post preview"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.images.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-medium text-white">
              1/{post.images.length}
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <p className="text-sm text-foreground line-clamp-3 mb-3 font-medium">
          {post.caption || 'No caption'}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3 text-primary" />
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
