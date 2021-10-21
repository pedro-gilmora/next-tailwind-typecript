// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import BaseHandler from "@lib/base.handler";
import { Client } from "@models/client";
import { api } from "next-controller";

@api
export default class extends BaseHandler{

  public async get<T>(query: T) : Promise<T extends {name: string} ? Client[] : Client>{
    let {id, name} = query as any
    return id 
      ? await this.queryOne(Client, `client.id = ${id }`) 
      : await this.query(Client, `client.name like '%${name}%'`) as any
  }

}