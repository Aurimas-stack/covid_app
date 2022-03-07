export const fetchTotal = (): Promise<Response> => {
  return fetch(
    "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
        "x-rapidapi-key": "c745030bd5msh840be0eeb1d3a7dp161562jsn29910ef0bba7",
      },
    }
  );
};

export const fetchCountryReport = (iso: string): Promise<Response> => {
  return fetch(
    `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/covid-ovid-data/sixmonth/${iso}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
        "x-rapidapi-key": "c745030bd5msh840be0eeb1d3a7dp161562jsn29910ef0bba7",
      },
    }
  );
};
