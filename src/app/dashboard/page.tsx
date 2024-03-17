// EventPage.tsx
import { auth, clerkClient } from "@clerk/nextjs";
import { Metadata } from "next";
import React from 'react';
import prisma from "@/lib/db";
import JobPortal from "@/components/JobPortal";

export const metadata: Metadata = {
  title: 'CrackedDevInterviewer.AI - Job Dashboard'
}

const Dashboard = async () => {
  const {userId} = auth();

  const userlist = await clerkClient.users.getUserList();
  const currentUser = userlist.find(user => user.id === userId);
  const userName = `${currentUser?.firstName} ${currentUser?.lastName}` || undefined;
  
  if (!userId) throw Error("userId undefined");
  const EveryAssessment = await prisma.assess.findMany({ where: { userId } });
  const EveryResult = await prisma.result.findMany({  where: { userId },
    include: {
      questions: {
        include: {
          strengths: true,
          improvements: true,
        },
      },
      analytics: true,
    }, });
  const EveryAutoAssessment = await prisma.automated_Assess.findMany({ });
  const level = (num:string) => {
    if(num=='1') return 'Beginner'
    else if (num=='2') return 'Intermediate'
    else return 'Expert' 
  }

  return (
    <>
      <JobPortal/>
    </>
    
  )
}

export default Dashboard;
