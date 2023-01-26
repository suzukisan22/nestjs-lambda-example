import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  if (process.env.ENVIRONMENT == 'local') {
    // TODO: API Gatewayの仕様と合わせるために一旦直書き
    app.setGlobalPrefix('dev');
    return await app.listen(3000)
  }
  await app.init()

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

if (process.env.ENVIRONMENT == 'local') {
  bootstrap()
}
