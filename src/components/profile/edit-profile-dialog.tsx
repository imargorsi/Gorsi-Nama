"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { UserInfo } from "@/context/user-context";
import { EditProfileForm } from "@/components/profile/edit-profile-form";

export function EditProfileDialog({ userInfo }: { userInfo: UserInfo }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        <Pencil />
        Edit Profile
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <EditProfileForm userInfo={userInfo} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
