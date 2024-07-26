"use client";

import Link from "next/link";
import axios from "axios";
import { useState } from "react";

export default function organizerDashboard() {

    


  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="text-5xl font-bold">Dashboard</h1>
      </div>
      <div>
        <h2>Your Events</h2>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Number of Attendees</th>
              <th>Location</th>
              <th>Start Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
                <th>num</th>
                <td><Link href="">dummy</Link></td>
                <td>dummy</td>
                <td>dummy</td>
                <td>dummy</td>
                <td>dummy</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
