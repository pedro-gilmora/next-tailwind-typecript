import React, {useEffect, useState} from 'react';
import { useApi } from 'next-controller'
import PeopleController from '@api/people';
import { Client } from '@models/client';
import Link from "next/link";

function Index() {
  const [people, setPeople] = useState<Client[] | null>(null);

    useEffect(() => {
      useApi<PeopleController>("people").get({ name: "" }).then(setPeople);
    }, []);

  return (
    <div className="m-6 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <div className="text-xl m-4">People</div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Age
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              State
            </th>
            <th scope="col" style={{width: '250px'}} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {people?.map(({id, name, age}) => (
            <tr key={id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 text-center">
                    {name.split(' ').map(n => n[0].toUpperCase())}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{name}</div>
                    <div className="text-sm text-gray-500">{age}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{age}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex-auto flex space-x-3">
                <Link href={`/person?id=${id}`}>
                  <button className="text-xs py-2 w-1/2 flex items-center justify-center rounded-md bg-blue-600 text-white" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </button>
                </Link>
                <button className="text-xs py-2 w-1/2 flex text-red-500 items-center justify-center rounded-md border border-red-500" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                  </svg>
                  Delete
                </button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Index;
