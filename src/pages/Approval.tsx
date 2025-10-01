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
    <div className="min-h-screen bg-background pb-20 md:pb-4 md:pt-20">
      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Approval</h1>
          <p className="text-muted-foreground">Create and manage your posts</p>
        </div>

        <CreatePostForm />

        {pendingPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => handleCardClick(post)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No pending posts. Create your first one!</p>
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
