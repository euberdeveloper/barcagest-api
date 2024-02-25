import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { setupSwagger } from './swagger.setup';
import { setupPrettyJson } from './pretty.setup';
import { setupValidation } from './validation.setup';
import { setupErrorsHandler } from './errors-handler.setup';
import { setupSerialization } from './serialization.setup';
import { setupCors } from './cors.setup';
import { setupHelmet } from './helmet.setup';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    setupHelmet(app);
    setupCors(app);
    setupValidation(app);
    setupSwagger(app);
    setupSerialization(app);
    setupPrettyJson(app);
    setupErrorsHandler(app);
    await app.listen(3000);
}
bootstrap();
