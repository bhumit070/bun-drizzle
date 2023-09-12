import {
    TypedSchema,
    ElysiaInstance,
    ExtractPath,
    Handler,
    TypedSchemaToRoute,
} from 'elysia';
import { MergeSchema } from 'elysia/types';

export type LocalHandler<
    Schema extends TypedSchema,
    Instance extends ElysiaInstance,
    Path extends string = string,
> = Handler<
    MergeSchema<
        Schema,
        Instance['schema']
    > extends infer Typed extends TypedSchema<any>
        ? TypedSchemaToRoute<Typed, Instance['meta']['defs']> extends {
              body: infer Body;
              params: infer Params;
              query: infer Query;
              headers: infer Headers;
              response: infer Response;
          }
            ? {
                  body: Body;
                  params: Params extends undefined
                      ? Record<ExtractPath<Path>, string>
                      : Params;
                  query: Query;
                  headers: Headers;
                  response: Response;
              }
            : never
        : never,
    Instance
>;

export type ElysiaCustomContext<
    Schema extends TypedSchema = TypedSchema,
    Instance extends ElysiaInstance = ElysiaInstance,
    Path extends string = string,
> = Parameters<LocalHandler<Schema, Instance, Path>>[0];
