"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  Camera,
  ImagePlus,
  Mail,
  Pencil,
  Save,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");

  const user = session?.user;

  // Initialize editable fields from the current session.
  useEffect(() => {
    if (user) {
      setEditName(user.name || "");
      setEditImage(user.image || "");
    }
  }, [user]);

  // Cancel editing.
  const handleCancel = () => {
    setEditName(user?.name || "");
    setEditImage(user?.image || "");
    setIsEditing(false);
  };

  // Update profile.
  const handleUpdateProfile = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (editImage.trim()) {
      try {
        new URL(editImage.trim());
      } catch {
        toast.error("Please enter a valid image URL.");
        return;
      }
    }

    try {
      setIsSaving(true);

      const { error } = await authClient.updateUser({
        name: editName.trim(),
        image: editImage.trim() || null,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile.");
        return;
      }

      // Refresh the session to get the updated user information.
      await authClient.getSession();

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
      </div>
    );
  }

 if (!user) {
   return (
     <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
       <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
         <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
           <UserRound
             size={32}
             className="text-green-600 dark:text-green-400"
           />
         </div>

         <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
           Login Required
         </h2>

         <p className="mb-7 text-sm leading-6 text-gray-500 dark:text-gray-400">
           Please sign in to access your profile and manage your account
           information.
         </p>

         <Link href="/login" className="block">
           <Button className="w-full rounded-lg bg-green-600 py-6 text-base font-semibold text-white transition-colors hover:bg-green-700">
             Please Login First
           </Button>
         </Link>
       </div>
     </div>
   );
 }

  const profileDetails = [
    {
      label: "Full Name",
      value: user?.name || "Not provided",
      icon: UserRound,
    },
    {
      label: "Email Address",
      value: user?.email || "Not provided",
      icon: Mail,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 transition-colors duration-300 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-md font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
            My Account
          </p>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {/* Profile Banner */}
          <div className="relative h-40 bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700 sm:h-48">
            <div className="absolute -bottom-12 left-6 sm:left-10">
              <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-green-100 shadow-lg dark:border-gray-900 dark:bg-green-950 sm:h-32 sm:w-32">
                {(isEditing ? editImage : user?.image) ? (
                  <Image
                    src={(isEditing ? editImage : user?.image)!}
                    alt={user?.name || "Profile"}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-green-800 dark:text-green-300">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}
              </div>

              {isEditing && (
                <div className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-green-600 text-white shadow-md dark:border-gray-900">
                  <Camera size={17} />
                </div>
              )}
            </div>
          </div>

          {/* Profile Header Information */}
          <div className="flex flex-col gap-4 px-6 pb-6 pt-16 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pt-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.name || "User"}
              </h2>

              <p className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Mail size={15} />
                {user?.email}
              </p>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
                <ShieldCheck size={14} />
                Community Member
              </div>
            </div>

            <button
              type="button"
              onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
              {isEditing ? <X size={16} /> : <Pencil size={16} />}
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>
          </div>

          {/* Personal Information */}
          <div className="border-t border-gray-200 px-6 py-7 dark:border-gray-800 sm:px-10">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Personal Information
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {isEditing
                  ? "Update your personal information below."
                  : "Your basic account information."}
              </p>
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="fullName"
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 py-3 pl-10 pr-4 text-sm text-gray-500 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    />
                  </div>

                  <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                    Email address cannot be changed here.
                  </p>
                </div>

                {/* Profile Image URL */}
                <div>
                  <label
                    htmlFor="profileImage"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Profile Picture URL
                  </label>

                  <div className="relative">
                    <ImagePlus
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="profileImage"
                      type="url"
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      placeholder="https://example.com/profile.jpg"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                    />
                  </div>

                  <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                    Paste an image URL to update your profile picture.
                  </p>
                </div>

                {/* Save and Cancel Buttons */}
                <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 dark:border-gray-800 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60">
                    <Save size={16} />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {profileDetails.map((detail) => {
                  const Icon = detail.icon;

                  return (
                    <div
                      key={detail.label}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                      <div className="mb-3 flex items-center gap-2 text-green-600 dark:text-green-400">
                        <Icon size={18} />
                        <span className="text-xs font-semibold uppercase tracking-wide">
                          {detail.label}
                        </span>
                      </div>

                      <p className="break-words text-sm font-semibold text-gray-900 dark:text-white">
                        {detail.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Account Information */}
          <div className="border-t border-gray-200 px-6 py-7 dark:border-gray-800 sm:px-10">
            <h3 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
              Account Information
            </h3>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Account Status
                </p>

                <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
