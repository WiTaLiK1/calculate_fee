// services
import calculateCommissions from './services/calculateCommissions.js';
// storage
import input from './storage/input.json';

async function bootstrap() {
  const result = await calculateCommissions(input);

  result.forEach((value) => {
    console.log(value);
  });
}

bootstrap();
