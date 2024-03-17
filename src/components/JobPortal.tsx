"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";

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

const Page: FC = () => {
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
      {loading && <p className="text-blue-500">Loading...</p>}
      {data && (
        <div className="p-4 rounded-md mt-4">
          <h1 className="mb-5 text-4xl">Jobs</h1>
          {data.map((job: jobType) => (
            <div
              key={job.id}
              className="m-5 rounded-md border border-gray-300 p-5"
            >
              <h2 className="mb-2 text-2xl">{job.title}</h2>
              <p className="mb-2">{job.description}</p>
              <p className="mb-2">Company: {job.company}</p>
              <p className="mb-2">
                Technologies: {job.technologies.join(", ")}
              </p>
              <p className="mb-2">Main Technology: {job.main_technology}</p>
              <p className="mb-2">Job Type: {job.job_type}</p>
              <p className="mb-2">Salary: {job.max_payment_usd} USD</p>
              <p className="mb-2">Location: {job.location_iso || "Remote"}</p>
              <p className="mb-2">Applications: {job.applications}</p>
              <p className="mb-2">Views: {job.views}</p>
              <Link
                href={job.apply_url}
                className="text-blue-500 hover:underline"
              >
                Apply Here
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Page;
