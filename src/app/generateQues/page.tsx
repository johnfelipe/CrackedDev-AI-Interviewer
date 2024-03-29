import React from "react";
import prisma from "@/lib/db";
import AssessButton from "@/components/AssessButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function GenerateQues ({searchParams}:{
  searchParams:{
    id: string,
    jobProfile: string,
    jobType: string,
    companyName: string,
    jobRequirements: string,
  }
}){
  console.log(searchParams)
  const infoId = searchParams;
  return (
    <div className="flex flex-col max-w-6xl mx-auto mt-10 gap-8 p-4 mb-4">
        <div className="w-full flex flex-col sm:flex-row gap-4">
        <div className="bg-secondary p-6 rounded-lg shadow-md shadow-black flex flex-col gap-4">
          <h1 className="font-semibold">Join Your Interview</h1>
          <p>Seize your opportunity! Join your interview seamlessly by using the provided meeting ID as a candidate.</p>
          <div>
          <Button className='p-3 shadow-md shadow-black border-none bg-gradient-to-br from-violet-500 to-violet-300 text-white rounded-xl'>
            <Link href={'/joinYourInterview'}>
              Join Your Interviews
            </Link>
          </Button>
          </div>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-md shadow-black gap-4 flex flex-col">
          <h1 className="font-semibold">Self Assessment</h1>
          <p>Improve your interviewee skills, build your personalized interview environment and receive your feedback with analytics.</p>
          <div><AssessButton infoId={infoId}/></div>
        </div>
      </div>
    </div>
  )
}