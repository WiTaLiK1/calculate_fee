// services
const calculateCommissions = require('./services/calculateCommissions');
// storage
const input = require('./storage/input.json');

async function bootstrap() {
  const result = await calculateCommissions(input);

  console.log(result);
}

bootstrap();
