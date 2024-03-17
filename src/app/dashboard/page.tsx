// EventPage.tsx
import { auth, clerkClient } from "@clerk/nextjs";
import { Metadata } from "next";
import React from 'react';
import prisma from "@/lib/db";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, PencilRuler, ScrollIcon, ScrollTextIcon, SearchCheck, StickyNote, Text, Trophy } from "lucide-react";
import JobPortal from "@/components/JobPortal"

export const metadata: Metadata = {
  title: 'CrackedDevInterviewer.AI - Job Dashboard'
}

const Dashboard = async () => {
  const {userId} = auth();

  const userlist = await clerkClient.users.getUserList();
  const currentUser = userlist.find(user => user.id === userId);
  const userName = `${currentUser?.firstName} ${currentUser?.lastName}` || undefined;
  
  if (!userId) throw Error("userId undefined");
  // const EveryAssessment = await prisma.assess.findMany({ where: { userId } });
  // const EveryResult = await prisma.result.findMany({  where: { userId },
  //   include: {
  //     questions: {
  //       include: {
  //         strengths: true,
  //         improvements: true,
  //       },
  //     },
  //     analytics: true,
  //   }, });
  // const EveryAutoAssessment = await prisma.automated_Assess.findMany({ });
  const level = (num:string) => {
    if(num=='1') return 'Beginner'
    else if (num=='2') return 'Intermediate'
    else return 'Expert' 
  }

  return (
    <div className="flex flex-col max-w-6xl mx-auto mt-10 gap-8 p-4 mb-4">
      <div>
        <h1 className="bg-secondary flex flex-row gap-2 w-fit mb-4 p-2 px-4 shadow-md shadow-black text-lg text-start rounded-lg text-gray-600 dark:text-gray-400 items-center"><ScrollTextIcon className="w-5 h-5"/>Job Board</h1>
        <div className="">
          <JobPortal/>
        </div>
      </div>

    </div>
  )
}

export default Dashboard;
