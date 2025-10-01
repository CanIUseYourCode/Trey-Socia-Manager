import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Post {
  id: string;
  caption: string;
  images: string[];
  createdAt: Date;
  status: 'pending' | 'approved';
}

interface PostContextType {
  pendingPosts: Post[];
  approvedPosts: Post[];
  addPost: (caption: string, images: string[]) => void;
  updatePost: (id: string, caption: string, images: string[]) => void;
  approvePost: (id: string) => void;
  deletePost: (id: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [pendingPosts, setPendingPosts] = useState<Post[]>([]);
  const [approvedPosts, setApprovedPosts] = useState<Post[]>([]);

  const addPost = (caption: string, images: string[]) => {
    const newPost: Post = {
      id: Date.now().toString(),
      caption,
      images,
      createdAt: new Date(),
      status: 'pending',
    };
    setPendingPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (id: string, caption: string, images: string[]) => {
    setPendingPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, caption, images } : post
      )
    );
  };

  const approvePost = (id: string) => {
    const post = pendingPosts.find((p) => p.id === id);
    if (post) {
      setApprovedPosts((prev) => [{ ...post, status: 'approved' }, ...prev]);
      setPendingPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const deletePost = (id: string) => {
    setPendingPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PostContext.Provider
      value={{
        pendingPosts,
        approvedPosts,
        addPost,
        updatePost,
        approvePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within PostProvider');
  }
  return context;
};
