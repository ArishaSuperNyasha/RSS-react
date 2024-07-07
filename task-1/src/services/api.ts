type ApiPromise = Promise<unknown>;

export class Api {
  private static baseUrl =
    'https://api.disneyapi.dev/character';

  private static pageSize = 10;

  public static async getAllChars(
    pageNumber = 1
  ): ApiPromise {
    const params = new URLSearchParams({
      page: `${pageNumber}`,
      pageSize: `${this.pageSize}`,
    });

    return await this.handleResponse(params);
  }

  public static async getCharsByName(
    name: string,
    pageNumber = 1
  ): ApiPromise {
    const params = new URLSearchParams({
      name,
      page: `${pageNumber}`,
      pageSize: `${this.pageSize}`,
    });

    return await this.handleResponse(params);
  }

  private static async handleResponse(
    params: URLSearchParams
  ): ApiPromise {
    const response = await fetch(
      `${this.baseUrl}?${params}`,
      {
        method: 'GET',
      }
    );

    const json = await response.json();
    return json;
  }
}
