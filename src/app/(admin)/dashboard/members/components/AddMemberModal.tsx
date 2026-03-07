"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { createMember, MemberInput } from "@/app/action/adminMember";
import { useToast } from "@/app/context/ToastContext";

type AddMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddMemberModal({ isOpen, onClose, onSuccess }: AddMemberModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<MemberInput>({
    membershipId: "",
    fullName: "",
    ward: "",
    phoneNumber: "",
    address: "",
    picture: "", // We still keep this in the state for now, but will upload the file later
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for the file picker UI
  const [fileName, setFileName] = useState("Upload Profile Picture...");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    } else { 
      setFileName("Upload Profile Picture...");
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // NOTE: Here you will eventually add the logic to upload `selectedFile` 
      // to Cloudinary and get back a URL. For now, we simulate passing the formData.
      // e.g. const pictureUrl = await uploadToCloudinary(selectedFile);
      // const result = await createMember({ ...formData, picture: pictureUrl });

      const result = await createMember(formData); 
      
      if (result.success) {
        toast("Member created successfully", "success");
        setFormData({ membershipId: "", fullName: "", ward: "", phoneNumber: "", address: "", picture: "" });
        setFileName("Upload Profile Picture...");
        setSelectedFile(null);
        onSuccess(); 
        onClose();   
      } else {
        toast(result.error || "Failed to create member", "error");
      }
    } catch (err) {
      toast("An unexpected error occurred", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-[var(--color-bg-primary)] rounded-[2rem] w-full max-w-lg overflow-hidden shadow-[var(--color-shadow-default)] border border-[var(--color-border-default)] flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 sm:p-8 border-b border-[var(--color-border-default)] shrink-0">
          <h3 className="font-black uppercase tracking-widest text-xl leading-none text-[var(--color-brand-primary)]">
            Add New Member
          </h3>
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-full border border-[var(--color-border-strong)] flex items-center justify-center shrink-0 hover:bg-[var(--color-bg-surface)] transition-colors text-[var(--color-text-primary)]"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          <form id="add-member-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <input type="text" placeholder="Membership ID" required
                value={formData.membershipId} onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
                className="w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all" />
            </div>
            <div>
              <input type="text" placeholder="Full Name" required
                value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all" />
            </div>
            <div>
              <input type="text" placeholder="Ward" required
                value={formData.ward} onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                className="w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all" />
            </div>
            <div>
              <input type="tel" placeholder="Phone Number" required
                value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all" />
            </div>
            <div>
              <input type="text" placeholder="Address" required
                value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all" />
            </div>
            
            {/* Picture Upload Field */}
            <div
              className={`relative w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] px-6 py-4 rounded-full outline-none focus-within:border-[var(--color-brand-primary)] focus-within:ring-1 focus-within:ring-[var(--color-brand-primary)] transition-all flex items-center justify-between group ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-[var(--color-border-default)]"}`}
            >
              <span className="truncate pr-4 font-medium">{fileName}</span>
              <div className="flex items-center justify-center shrink-0 bg-[var(--color-bg-primary)] group-hover:bg-[var(--color-brand-light)] group-hover:text-[var(--color-brand-primary)] text-[var(--color-text-muted)] rounded-full p-2 h-8 w-8 transition-colors shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>
              <input
                type="file"
                name="picture"
                accept="image/*"
                onChange={handleFileChange}
                className={`absolute inset-0 w-full h-full opacity-0 ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 sm:p-8 border-t border-[var(--color-border-default)] flex gap-3 shrink-0 bg-[var(--color-bg-primary)]">
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 text-xs font-bold uppercase tracking-wider px-6 py-4 rounded-full border border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)] transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="add-member-form"
            disabled={isSubmitting} 
            className="flex-1 bg-[var(--color-brand-primary)] text-[var(--color-on-brand)] text-xs font-bold uppercase tracking-wider px-6 py-4 rounded-full hover:bg-[var(--color-brand-hover)] transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Member"}
          </button>
        </div>

      </div>
    </div>
  );
}