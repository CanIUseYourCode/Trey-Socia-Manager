import { useState } from 'react';
import { usePosts } from '@/contexts/PostContext';
import CreatePostForm from '@/components/CreatePostForm';
import PostCard from '@/components/PostCard';
import PostEditor from '@/components/PostEditor';
import { Post } from '@/contexts/PostContext';

const Approval = () => {
  const { pendingPosts } = usePosts();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleCardClick = (post: Post) => {
    setSelectedPost(post);
    setIsEditorOpen(true);
  };

  return (
    <div className="bg-background/95 min-h-screen p-8 animate-in fade-in duration-500">
      <div className="max-w-screen-xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-heading text-foreground">Pending Approvals</h1>
          <p className="text-muted-foreground text-lg">Review and create content for your audience</p>
        </div>

        <CreatePostForm />

        {pendingPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => handleCardClick(post)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-border/50 bg-card/20">
            <p className="text-muted-foreground font-medium">No pending posts. Create your first one above!</p>
          </div>
        )}
      </div>

      <PostEditor
        post={selectedPost}
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setSelectedPost(null);
        }}
      />
    </div>
  );
};

export default Approval;
