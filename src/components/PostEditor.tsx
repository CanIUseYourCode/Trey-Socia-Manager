import { useState, useEffect, useRef } from 'react';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (post) {
      setCaption(post.caption);
      setImages(post.images);
      setCurrentImageIndex(0);
    }
  }, [post]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [caption, isOpen]);

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-2 border-b border-border">
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Caption */}
            <div className="space-y-2">
              <label className="text-sm font-medium block">Caption</label>
              <Textarea
                ref={textareaRef}
                value={caption}
                onChange={handleCaptionChange}
                placeholder="Write your caption here..."
                className="min-h-[400px] lg:min-h-[500px] resize-none"
              />
            </div>

            {/* Right Column - Images & Actions */}
            <div className="space-y-4">
              {/* Image Carousel */}
              <div className="space-y-2">
                <label className="text-sm font-medium block">Images</label>
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

              {/* Actions */}
              <div className="space-y-2 pt-4">
                <Button onClick={handleSave} variant="outline" className="w-full">
                  Save Changes
                </Button>
                <Button onClick={handleBlast} className="w-full bg-success hover:bg-success/90">
                  Blast
                </Button>
                <Button onClick={handleKill} variant="destructive" className="w-full">
                  Kill
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditor;
