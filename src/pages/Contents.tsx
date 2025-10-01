import { usePosts } from '@/contexts/PostContext';
import { Card } from '@/components/ui/card';
import { Calendar, Image as ImageIcon } from 'lucide-react';

const Contents = () => {
  const { approvedPosts } = usePosts();

  return (
    <div className="bg-background p-4" style={{ minHeight: 'calc(100vh - 3.5rem)' }}>
      <div className="max-w-screen-xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Contents</h1>
          <p className="text-muted-foreground">
            {approvedPosts.length} approved {approvedPosts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>

        {approvedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvedPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                {post.images.length > 0 && (
                  <div className="relative aspect-video bg-secondary">
                    <img
                      src={post.images[0]}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />
                    {post.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-md flex items-center gap-1 text-xs font-medium">
                        <ImageIcon className="w-3 h-3" />
                        {post.images.length}
                      </div>
                    )}
                  </div>
                )}
                <div className="p-4 space-y-3">
                  <p className="text-foreground whitespace-pre-wrap">{post.caption}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No approved posts yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contents;
