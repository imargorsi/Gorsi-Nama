"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { clearMemberStories } from "@/components/blog/member-stories";
import { clearMemberPosts } from "@/components/community/member-posts";

export function ClearSessionContent() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const previousUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (previousUserId.current && previousUserId.current !== (userId ?? null)) {
      clearMemberPosts();
      clearMemberStories();
    }

    previousUserId.current = userId ?? null;

    if (!isSignedIn) {
      clearMemberPosts();
      clearMemberStories();
    }
  }, [isLoaded, isSignedIn, userId]);

  return null;
}
