import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-black">Date</TableHead>
                        <TableHead className="text-black">Job Role</TableHead>
                        <TableHead className="text-black">Company</TableHead>
                        <TableHead className="text-right text-black">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? 
                        <TableRow><TableCell colSpan="4" className="text-black">You haven't applied any job yet.</TableCell></TableRow> 
                        : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell className="text-black">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-black">{appliedJob.job?.title}</TableCell>
                                <TableCell className="text-black">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right text-black">
                                    <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
