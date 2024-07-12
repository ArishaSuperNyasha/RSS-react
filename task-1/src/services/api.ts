import { AllCharsData, OneCharData } from './interfaces';

type AllCharsPromise = Promise<AllCharsData>;

type OneCharPromise = Promise<OneCharData>;

export class Api {
  private static baseUrl =
    'https://api.disneyapi.dev/character';

  private static pageSize = 10;

  public static async getAllChars(
    pageNumber = 1
  ): AllCharsPromise {
    const params = new URLSearchParams({
      page: `${pageNumber}`,
      pageSize: `${this.pageSize}`,
    });

    return await this.handleResponse<AllCharsData>({
      params,
    });
  }

  public static async getCharsByName(
    name: string,
    pageNumber = 1
  ): AllCharsPromise {
    const params = new URLSearchParams({
      name,
      page: `${pageNumber}`,
      pageSize: `${this.pageSize}`,
    });

    return await this.handleResponse<AllCharsData>({
      params,
    });
  }

  public static async getCharById(
    idEndpoint: number
  ): OneCharPromise {
    return await this.handleResponse<OneCharData>({
      idEndpoint,
    });
  }

  private static async handleResponse<
    T extends AllCharsData | OneCharData,
  >(configs: {
    params?: URLSearchParams;
    idEndpoint?: number;
  }): Promise<T> {
    const { idEndpoint, params } = configs;
    const urlEnding =
      typeof idEndpoint === 'number'
        ? `/${idEndpoint}`
        : `?${params}`;
    const response = await fetch(
      `${this.baseUrl}${urlEnding}`,
      {
        method: 'GET',
      }
    ).then((res) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
    });

    const json: T = await response.json();

    if (!Array.isArray(json.data)) {
      json.data = [json.data];
    }

    return json;
  }
}
