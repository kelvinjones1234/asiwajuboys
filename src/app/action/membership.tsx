"use server";

import prisma from "../lib/prisma";
import { uploadImage } from "../lib/cloudinary";

function generateMembershipId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createMembership(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const ward = formData.get("ward") as string;
    const address = formData.get("address") as string;
    const picture = formData.get("picture") as File;

    if (!fullName || !phoneNumber || !ward || !address || !picture.name) {
      return { success: false, error: "All fields are required." };
    }

    const existingMember = await prisma.member.findUnique({
      where: { phoneNumber },
    });

    if (existingMember) {
      return {
        success: false,
        error: "A member with this phone number is already registered.",
      };
    }

    const uploadResult = await uploadImage(picture, "members");

    if (!uploadResult || !uploadResult.url) {
      return { success: false, error: "Failed to upload profile picture." };
    }

    const membershipId = generateMembershipId();

    // Capture the created record in a variable
    const newMember = await prisma.member.create({
      data: {
        membershipId,
        fullName,
        phoneNumber,
        ward,
        address,
        picture: uploadResult.url,
      },
    });

    // Return the newMember object alongside the success state
    return {
      success: true,
      message: `Welcome ${fullName}! Your ID card is ready. Redirecting...`,
      member: newMember, 
    };
  } catch (error) {
    console.error("Membership creation error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while submitting your application.",
    };
  }
}