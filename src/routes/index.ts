import { Express } from 'express';
import {
  useExpressServer,
  RoutingControllersOptions,
  getMetadataArgsStorage,
  MetadataArgsStorage,
} from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

import { authorizationChecker } from '@shared/middlewares/AuthorizationChecker';
import { currentUserChecker } from '@shared/middlewares/CurrentUserChecker';

export function routes(app: Express): Express {
  const options: RoutingControllersOptions = {
    validation: true,
    cors: true,
    routePrefix: '/api/v1',
    defaultErrorHandler: false,
    authorizationChecker,
    currentUserChecker,
    controllers: [
      path.join(__dirname, '..', '/modules/**/controllers/*{.ts,.js}'),
    ],
    middlewares: [path.join(__dirname, '..', '/shared/middlewares/*{.ts,.js}')],
  };

  const server: Express = useExpressServer(app, options);

  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas',
  });

  const storage: MetadataArgsStorage = getMetadataArgsStorage();

  const spec = routingControllersToSpec(storage, options, {
    components: {
      schemas,
    },
    security: [{ jwt: [] }],
    info: {
      title: 'Event Finder App',
      version: '1.0.0',
      description: 'This is a REST API for Event Finder App',
    },
  });

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(spec, {
      explorer: true,
    })
  );

  return server;
}
