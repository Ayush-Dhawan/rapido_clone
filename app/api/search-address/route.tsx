import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";

export async function GET(request: any) {
  const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest?q=";
  const { searchParams } = new URL(request.url);

  const sessionToken = randomUUID();

  const searchString = searchParams.get("q");

  const res = await fetch(
    "https://api.mapbox.com/search/searchbox/v1/suggest?q=" +
      searchString +
      "&language=en&limit=3&session_token=0c2ce491-092b-4ba1-88de-0b9ffad0edac&access_token=" +
      process.env.MAPBOX_ACCESS_TOKEN,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const searchResult = await res.json();

  return NextResponse.json({ searchResult });
}
