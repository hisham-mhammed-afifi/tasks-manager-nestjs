import bootstrap from '../src/main';

export default async function handler(req, res) {
  const app = await bootstrap();
  app(req, res); // Pass the request and response to the Express server
}
