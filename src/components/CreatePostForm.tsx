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
    <Card className="p-4">
      <div className="space-y-4">
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="What's on your mind?"
          className="min-h-[80px] resize-none"
        />

        {isExpanded && (
          <>
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <div key={index} className="relative aspect-square bg-secondary rounded-lg overflow-hidden group">
                    <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded opacity-0 group-hover:opacity-100 transition-smooth"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              {images.length < 20 && (
                <label className="flex-1">
                  <Button variant="outline" className="w-full" asChild>
                    <span className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Add Images ({images.length}/20)
                    </span>
                  </Button>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
              <Button onClick={handleSubmit} className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default CreatePostForm;
