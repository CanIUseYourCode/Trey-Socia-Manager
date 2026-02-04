import { usePosts } from '@/contexts/PostContext';
import { Card } from '@/components/ui/card';
import { Calendar, Image as ImageIcon } from 'lucide-react';

const Contents = () => {
  const { approvedPosts } = usePosts();

  return (
    <div className="bg-background/95 min-h-screen p-8 animate-in fade-in duration-500">
      <div className="max-w-screen-xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-heading font-bold text-foreground">Content Library</h1>
          <p className="text-muted-foreground text-lg">
            {approvedPosts.length} approved {approvedPosts.length === 1 ? 'post' : 'posts'} ready for publishing
          </p>
        </div>

        {approvedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedPosts.map((post) => (
              <Card key={post.id} className="glass-card border-none overflow-hidden group">
                {post.images.length > 0 && (
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    <img
                      src={post.images[0]}
                      alt="Post"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {post.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium text-white">
                        <ImageIcon className="w-3 h-3" />
                        {post.images.length}
                      </div>
                    )}
                  </div>
                )}
                <div className="p-5 space-y-4">
                  <p className="text-foreground whitespace-pre-wrap font-medium">{post.caption}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border/50">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-border/50 bg-card/20">
            <p className="text-muted-foreground font-medium">No approved posts yet. Go to Approvals to approve some!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contents;
