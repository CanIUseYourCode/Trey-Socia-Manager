import { useState, useEffect } from 'react';
import { Post, usePosts } from '@/contexts/PostContext';
import { X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface PostEditorProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const PostEditor = ({ post, isOpen, onClose }: PostEditorProps) => {
  const { updatePost, approvePost, deletePost } = usePosts();
  const [caption, setCaption] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (post) {
      setCaption(post.caption);
      setImages(post.images);
      setCurrentImageIndex(0);
    }
  }, [post]);

  const handleSave = () => {
    if (post) {
      updatePost(post.id, caption, images);
      toast.success('Post updated');
      onClose();
    }
  };

  const handleBlast = () => {
    if (post) {
      approvePost(post.id);
      toast.success('Post approved! 🚀');
      onClose();
    }
  };

  const handleKill = () => {
    if (post) {
      deletePost(post.id);
      toast.success('Post deleted');
      onClose();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 20 - images.length);
      const imageUrls = newImages.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...imageUrls]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (currentImageIndex >= images.length - 1) {
      setCurrentImageIndex(Math.max(0, images.length - 2));
    }
  };

  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4 space-y-4">
          {/* Image Carousel */}
          <div className="space-y-2">
            {images.length > 0 && (
              <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden">
                <img
                  src={images[currentImageIndex]}
                  alt={`Slide ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeImage(currentImageIndex)}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-lg hover:opacity-90 transition-smooth"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {images.length > 1 && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-smooth ${
                          index === currentImageIndex ? 'bg-primary' : 'bg-background/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {images.length < 20 && (
              <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-smooth">
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Add images ({images.length}/20)
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Caption */}
          <div>
            <label className="text-sm font-medium mb-2 block">Caption</label>
            <Textarea
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              placeholder="Write your caption here..."
              className="min-h-[120px] max-h-[400px] resize-none overflow-y-auto"
              style={{ height: 'auto' }}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button onClick={handleSave} variant="outline" className="flex-1">
              Save Changes
            </Button>
            <Button onClick={handleKill} variant="destructive" className="flex-1">
              Kill
            </Button>
            <Button onClick={handleBlast} className="flex-1 bg-success hover:bg-success/90">
              Blast
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditor;
