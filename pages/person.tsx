import PeopleHandler from "@api/people";
import { Client } from "@models/client";
import { useApi } from "next-controller";
import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"


export default function Person(){
    const id = +useRouter().query.id,
        [person, setPerson] = useState<Client | null>(null);
    
    useEffect(() => {
        useApi<PeopleHandler>("people").get({id}).then(setPerson)
    },[])

    return <div>
        {person ?   <div className="flex items-center justify-center h-screen">
    
            <div className="bg-gray-100 text-gray-500 font-bold rounded-lg border shadow-lg">
                <a className="p-4">Edit client: {person.name}</a>
                <hr style={{appearance: 'none'}} />
                <form>
                    <input value={person.name} onInput={({target}: any) => setPerson(() => Object.assign(person, {name: target.value}))}/>
                </form>
            </div>
            
        </div> : undefined}
    </div>
}