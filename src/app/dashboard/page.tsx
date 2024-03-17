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

      {/* <div>
        <h1 className="bg-secondary flex flex-row gap-2 w-fit mb-4 p-2 px-4 shadow-md shadow-black text-lg text-start rounded-lg text-gray-600 dark:text-gray-400 items-center"><Trophy className="w-5 h-5"/>Hosted Assessments</h1>
        <div className="bg-secondary p-4 rounded-lg shadow-md shadow-black flex flex-col gap-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-black dark:text-white">Company</TableHead>
                  <TableHead className="font-semibold text-black dark:text-white">Job Profile</TableHead>
                  <TableHead className="font-semibold text-black dark:text-white">Job Type</TableHead>
                  <TableHead className="font-semibold text-black dark:text-white">Level</TableHead>
                  <TableHead className="font-semibold text-black dark:text-white">Posted At</TableHead>
                  <TableHead className="font-semibold text-black dark:text-white">AI Automated Interviews</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {EveryAutoAssessment.map((autoAssess)=>(
                  <TableRow key={autoAssess.id}>
                    <TableCell className="whitespace-nowrap text-black dark:text-white">{autoAssess.companyName}</TableCell>
                    <TableCell className="whitespace-nowrap text-black dark:text-white">{autoAssess.jobProfile}</TableCell>
                    <TableCell className="whitespace-nowrap text-black dark:text-white">{autoAssess.jobtype}</TableCell>
                    <TableCell className="whitespace-nowrap text-black dark:text-white">{level(autoAssess.level)}</TableCell>
                    <TableCell className="whitespace-nowrap text-black dark:text-white">{autoAssess.createdAt.toLocaleString()}</TableCell>
                    <TableCell className="whitespace-nowrap text-black dark:text-white">
                    <Link className="flex flex-row text-violet-700 dark:text-violet-400" href={{
                      pathname: '/interviewHosted',
                      query: {
                        id: autoAssess.id,
                      },
                    }}>
                      Interview
                      <ArrowRight className="w-5 h-5 mr-2"/>
                    </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
      </div>

      <div>
        <h1 className="bg-secondary flex flex-row gap-2 w-fit mb-4 p-2 px-4 shadow-md shadow-black text-lg text-start rounded-lg text-gray-600 dark:text-gray-400 items-center"><BookOpenCheck className="w-5 h-5"/> Result Of Self Assessment</h1>
        <div className="bg-secondary p-4 rounded-lg shadow-md shadow-black flex flex-col gap-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-black dark:text-white">Company</TableHead>
                  <TableHead className="font-semibold text-black dark:text-white">Job Profile</TableHead>
                  <TableHead className="font-semibold text-black dark:text-white">Job Type</TableHead>
                  <TableHead className="font-semibold text-black dark:text-white">Level</TableHead>
                  <TableHead className="font-semibold text-black dark:text-white">Created At</TableHead>
                  <TableHead className="font-semibold text-black dark:text-white">Feedbacks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {EveryResult.map((result)=>(
                  <TableRow key={result.id}>
                    <TableCell className="whitespace-nowrap text-black dark:text-white">{result.companyName}</TableCell>
                    <TableCell className="whitespace-nowrap text-black dark:text-white">{result.jobProfile}</TableCell>
                    <TableCell className="whitespace-nowrap text-black dark:text-white">{result.jobtype}</TableCell>
                    <TableCell className="whitespace-nowrap text-black dark:text-white">{level(result.level)}</TableCell>
                    <TableCell className="whitespace-nowrap text-black dark:text-white">{result.createdAt.toLocaleString()}</TableCell>
                    <TableCell className="whitespace-nowrap text-black dark:text-white"><Link href={`feedback?id=${result.id}`} className="flex flex-row text-violet-700 dark:text-violet-400">Feedback <ArrowRight className="ml-2 w-5 h-5"/></Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
      </div> */}

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
