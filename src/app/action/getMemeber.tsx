"use server";

import prisma from "../lib/prisma";

export async function getMemberById(membershipId: string) {
  if (!membershipId) {
    return { success: false, error: "Membership ID is required." };
  }

  try {
    const member = await prisma.member.findUnique({
      where: { membershipId },
    });

    if (!member) {
      return { success: false, error: "No member found with this ID." };
    }

    return { success: true, data: member };
  } catch (error) {
    console.error("Error fetching member:", error);
    return { success: false, error: "Failed to retrieve profile." };
  }
}