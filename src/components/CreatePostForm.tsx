import { useState } from 'react';
import { usePosts } from '@/contexts/PostContext';
import { Plus, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const CreatePostForm = () => {
  const { addPost } = usePosts();
  const [caption, setCaption] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 20 - images.length);
      const imageUrls = newImages.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...imageUrls]);
      setIsExpanded(true);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!caption.trim() && images.length === 0) {
      toast.error('Add a caption or images');
      return;
    }

    addPost(caption, images);
    setCaption('');
    setImages([]);
    setIsExpanded(false);
    toast.success('Post created!');
  };

  return (
    <Card className="glass-card border-dashed border-primary/20 p-6">
      <div className="space-y-4">
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="What's on your mind?"
          className="min-h-[80px] resize-none bg-transparent border-muted focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50 transition-all font-medium"
        />

        {isExpanded && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <div key={index} className="relative aspect-square bg-muted rounded-xl overflow-hidden group border border-border/50">
                    <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/60 backdrop-blur-md text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3">
              {images.length < 20 && (
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center gap-2 h-10 w-full rounded-xl border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-medium text-muted-foreground hover:text-primary">
                    <ImageIcon className="w-4 h-4" />
                    Add Images ({images.length}/20)
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
              <Button onClick={handleSubmit} className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CreatePostForm;
