"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import NewAssessment from './NewAssessment';
import { Assess } from '@prisma/client';

type Props = {
    infoId: {
      id: string,
      jobProfile: string,
      jobType: string,
      companyName: string,
      jobRequirements: string,
    } 
}

export default function AssessButton({infoId}:Props) {
  const [addDialog, setAddDialog] = useState(false);
  return (
    <>
        <Button className='p-3 shadow-md shadow-black border-none bg-gradient-to-br from-violet-500 to-violet-300 text-white rounded-xl' onClick={()=>setAddDialog(true)}>New Assessment</Button>
        <NewAssessment open={addDialog} setOpen={setAddDialog} infoId={infoId}/>
    </>    
  )
}