"use server";

import prisma from "../lib/prisma";


export type DashboardStats = {
  totalMembers: number;
  verifiedMembers: number;
  pendingMembers: number;
  newMembersThisMonth: number;
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  staffUsers: number;
  recentMembers: {
    id: string;
    fullName: string;
    membershipId: string;
    ward: string;
    picture: string;
    verified: boolean;
    createdAt: Date;
  }[];
  membersByWard: {
    ward: string;
    count: number;
  }[];
};

export async function getDashboardStats(): Promise<{
  success: boolean;
  data?: DashboardStats;
  error?: string;
}> {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalMembers,
      verifiedMembers,
      newMembersThisMonth,
      totalUsers,
      activeUsers,
      adminUsers,
      recentMembers,
      wardGroups,
    ] = await Promise.all([
      prisma.member.count(),
      prisma.member.count({ where: { verified: true } }),
      prisma.member.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.member.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          fullName: true,
          membershipId: true,
          ward: true,
          picture: true,
          verified: true,
          createdAt: true,
        },
      }),
      prisma.member.groupBy({
        by: ["ward"],
        _count: { ward: true },
        orderBy: { _count: { ward: "desc" } },
        take: 5,
      }),
    ]);

    return {
      success: true,
      data: {
        totalMembers,
        verifiedMembers,
        pendingMembers: totalMembers - verifiedMembers,
        newMembersThisMonth,
        totalUsers,
        activeUsers,
        adminUsers,
        staffUsers: totalUsers - adminUsers,
        recentMembers,
        membersByWard: wardGroups.map((g) => ({
          ward: g.ward,
          count: g._count.ward,
        })),
      },
    };
  } catch (error) {
    console.error("getDashboardStats error:", error);
    return { success: false, error: "Failed to load dashboard stats" };
  }
}