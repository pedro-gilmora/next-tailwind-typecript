// pages/api/example.ts
import { api } from "next-controller";
import { createConnection, SelectQueryBuilder } from "typeorm";

export type DeepDictionary = {
    [k: string]: string | number | boolean | Date | DeepDictionary
}


export const routedApi = (route: string) => (target: any) => {
    target.$path = route
}

export default class BaseHandler {

    private createConnection(...entities: Function[]) {
        return createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "PlGM!21.",
            database: "postgres",
            applicationName: "clientApp",
            name: "clientAppConnection",

            entities
        });
    }

    protected async callProc<T>(entity: { new(...args: any[]): T }, procName: string, ...params: any[]) {
        const connection = await this.getConnection(...[entity]);
        return await connection.query(`EXEC ${procName} ${Object.keys(params).map(e => `@p${e}`)}`, params)
    }

    protected async query<T>(entity: { new(...args: any[]): T }, filter?: DeepDictionary | string) {
        try {
            let queryBuilder = await this.getQueryBuilder<T>(entity);
            if (filter)
                queryBuilder = this.filter(filter, queryBuilder);
            try {
                return await queryBuilder.getMany();
            }
            catch (e) {
                throw e
            }
            finally {
                queryBuilder.connection.close()
            }
        } catch (e) {
            throw e
        }
    }

    protected async queryOne<T>(entity: { new(...args: any[]): T }, filter?: DeepDictionary | string) {
        try {
            let queryBuilder = await this.getQueryBuilder<T>(entity);
            if (filter)
                queryBuilder = this.filter(filter, queryBuilder);
            try {
                return await queryBuilder.getOne();
            }
            catch (e) {
                throw e
            }
            finally {
                queryBuilder.connection.close()
            }
        } catch (e) {
            throw e
        }
    }

    private filter<T>(filter: DeepDictionary | string, queryBuilder: SelectQueryBuilder<T>) {
        if(typeof(filter) === 'object')
            Object.entries(filter).forEach(([k, v], i) => {
                queryBuilder = queryBuilder[i === 0 ? 'where' : 'andWhere']({ [k]: v });
            });
        else
         queryBuilder.where(filter)
        return queryBuilder;
    }

    private async getQueryBuilder<T>(entity: (new (...args: any[]) => T)) {
        let connection = await this.getConnection<T>(...[entity]);
        return connection.getRepository(entity).createQueryBuilder(this.camelCaseEntityName(entity));
    }

    private camelCaseEntityName<T>(entity: new (...args: any[]) => T): string {
      return entity.name[0].toLocaleLowerCase() + entity.name.substring(1)
    }

    private async getConnection<T>(...entity: (new (...args: any[]) => T)[]) {
        return await this.createConnection(...entity);
    }
}

