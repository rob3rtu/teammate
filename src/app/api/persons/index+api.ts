export function GET(request: Request) {
  const data = ["Person 1", "Person 2", "Person 3", "Person 4"];

  return Response.json(data);
}
