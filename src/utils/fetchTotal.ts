export const fetchTotal = (): Promise<Response> => {
  return fetch(
    `https://covid-19-statistics.p.rapidapi.com/reports/total`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
        "x-rapidapi-key": "c745030bd5msh840be0eeb1d3a7dp161562jsn29910ef0bba7",
      },
    }
  );
};

export const fetchCountryReport = (iso: string): Promise<Response> => {
  return fetch(`https://covid-19-statistics.p.rapidapi.com/reports?iso=${iso}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
          "x-rapidapi-key": "c745030bd5msh840be0eeb1d3a7dp161562jsn29910ef0bba7"
        }
      })
}