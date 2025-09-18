import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';

// -------------------- FilterCard Component --------------------
const FilterCard = () => {
  const locations = ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"];
  const industries = ["Frontend Developer", "Backend Developer", "FullStack Developer"];
  const salaries = ["0-40k", "42-1 Lakh", "1 Lakh to 5 Lakh"];

  // Track selected options
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);

  const renderList = (items, selected, setSelected) =>
    items.map((item, index) => (
      <li
        key={index}
        className="flex items-center gap-2 cursor-pointer hover:text-gray-700"
        onClick={() => setSelected(item)}
      >
        <Circle
          size={10}
          className={selected === item ? "text-gray-900" : "text-black"} // dark if selected
        />
        <span className={selected === item ? "font-bold text-gray-900" : "text-black"}>
          {item}
        </span>
      </li>
    ));

  return (
    <div className="filter-card p-4 bg-white rounded-md shadow-md">
      {/* Location Filter */}
      <h3 className="text-lg font-semibold text-black">Location</h3>
      <ul className="mt-2 space-y-1">{renderList(locations, selectedLocation, setSelectedLocation)}</ul>

      {/* Industry Filter */}
      <h3 className="text-lg font-semibold mt-4 text-black">Industry</h3>
      <ul className="mt-2 space-y-1">{renderList(industries, selectedIndustry, setSelectedIndustry)}</ul>

      {/* Salary Filter */}
      <h3 className="text-lg font-semibold mt-4 text-black">Salary</h3>
      <ul className="mt-2 space-y-1">{renderList(salaries, selectedSalary, setSelectedSalary)}</ul>

      {/* Apply Filters Button */}
      <div className="mt-4">
        <Button className="w-full bg-black text-white hover:bg-gray-800 transition duration-300">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

// -------------------- Jobs Page Component --------------------
const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase());
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/* Filter Sidebar */}
          <div className="w-1/5">
            <FilterCard />
          </div>

          {/* Job Listing */}
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
