"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

// Define the shape of the data we expect for creating/updating
export type MemberInput = {
  membershipId: string;
  fullName: string;
  ward: string;
  phoneNumber: string;
  address: string;
  picture: string;
};

// --- GET ALL MEMBERS ---
export async function getMembers() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: members };
  } catch (error) {
    console.error("Error fetching members:", error);
    return { success: false, error: "Failed to fetch members" };
  }
}

// --- CREATE A MEMBER ---
export async function createMember(data: MemberInput) {
  try {
    const newMember = await prisma.member.create({
      data: {
        ...data,
        verified: false, // Default to false on creation
      },
    });
    
    // This clears the Next.js cache so the page immediately reflects the new data
    revalidatePath("/members"); 
    return { success: true, data: newMember };
  } catch (error) {
    console.error("Error creating member:", error);
    return { success: false, error: "Failed to create member. Membership ID or Phone might already exist." };
  }
}

// --- UPDATE A MEMBER (Includes Verification Toggle) ---
export async function updateMember(id: string, data: Partial<MemberInput> & { verified?: boolean }) {
  try {
    const updatedMember = await prisma.member.update({
      where: { id },
      data,
    });
    
    revalidatePath("/members");
    return { success: true, data: updatedMember };
  } catch (error) {
    console.error("Error updating member:", error);
    return { success: false, error: "Failed to update member" };
  }
}

// --- DELETE A MEMBER ---
export async function deleteMember(id: string) {
  try {
    await prisma.member.delete({
      where: { id },
    });
    
    revalidatePath("/members");
    return { success: true };
  } catch (error) {
    console.error("Error deleting member:", error);
    return { success: false, error: "Failed to delete member" };
  }
}