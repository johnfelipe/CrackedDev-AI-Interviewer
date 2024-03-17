"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";

type jobType = {
  id: string;
  title: string;
  description: string;
  company: string;
  technologies: string[];
  main_technology: string;
  job_type: string;
  max_payment_usd: number;
  location_iso: string;
  applications: number;
  views: number;
  apply_url: string;
};

const JobPortal: FC = () => {
  const [data, setData] = useState<jobType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/getJobListing")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      {data && data.map((job: jobType) => (
          <Card key={job.id} className="cursor-pointer shadow-md shadow-black bg-secondary transition-shadow hover:shadow-lg">
            <CardHeader onClick={() => setShowEditDialog(true)}>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription onClick={() => setShowEditDialog(true)}>
                {createdUpdatedAtTimestamp}
                {wasUpdated && " (updated)"}
              </CardDescription>
            </CardHeader>
            <CardContent onClick={() => setShowEditDialog(true)} className="mb-0 pb-0">
              <div className="mb-4">
                <p className="font-bold text-gray-600 dark:text-gray-400">Company : <span className="text-primary font-normal">{assessment.companyName}</span></p>
              </div>
              
            </CardContent>
            <h2 className="mb-2 text-2xl">{job.title}</h2>
            <p className="mb-2">{job.description}</p>
            <p className="mb-2">Company: {job.company}</p>
            <p className="mb-2">Technologies: {job.technologies.join(", ")}</p>
            <p className="mb-2">Main Technology: {job.main_technology}</p>
            <p className="mb-2">Job Type: {job.job_type}</p>
            <p className="mb-2">Salary: {job.max_payment_usd} USD</p>
            <p className="mb-2">Location: {job.location_iso || "Remote"}</p>
            <p className="mb-2">Applications: {job.applications}</p>
            <p className="mb-2">Views: {job.views}</p>
            <Link href={job.apply_url} className="text-blue-500 hover:underline">Apply Here</Link>
          </Card>
        ))}
    </div>
  );
};
export default JobPortal;
