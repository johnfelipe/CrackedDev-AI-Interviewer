import React from 'react'
import prisma from "@/lib/db";
import { auth, clerkClient } from '@clerk/nextjs';
import { ArrowRight, BookOpenCheck, ScrollTextIcon, Trophy } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AssessmentDisplay from '@/components/AssessmentDisplay';
import Link from 'next/link';


type Props = {}

const JoinYourInterview = async(props: Props) => {
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
    const level = (num:string) => {
      if(num=='1') return 'Beginner'
      else if (num=='2') return 'Intermediate'
      else return 'Expert' 
    }  
  return (
    <div className="flex flex-col max-w-6xl mx-auto mt-10 gap-8 p-4 mb-4">
      <div>
        <h1 className="bg-secondary flex flex-row gap-2 w-fit mb-4 p-2 px-4 shadow-md shadow-black text-lg text-start rounded-lg text-gray-600 dark:text-gray-400 items-center"><BookOpenCheck className="w-5 h-5"/> Result Of AI Interview</h1>
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
                    <TableCell className="whitespace-nowrap text-black dark:text-white"><Link href={`feedback?id=${result.id}`} className="flex flex-row text-violet-700 dark:text-violet-400">Feedback<ArrowRight className="ml-2 w-5 h-5"/></Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
        <div>
        <h1 className="bg-secondary mt-8 flex flex-row gap-2 w-fit mb-4 p-2 px-4 shadow-md shadow-black text-lg text-start rounded-lg text-gray-600 dark:text-gray-400 items-center"><ScrollTextIcon className="w-5 h-5"/>AI Interview Cards</h1>
        <div className="grid gap-4 place-content-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {EveryAssessment.map((assessment) => (
          <AssessmentDisplay assessment={assessment} key={assessment.id} />
        ))}
        </div>
        </div>
      </div>
    </div>
  )
}

export default JoinYourInterview