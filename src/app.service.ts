import { Injectable, NotFoundException } from '@nestjs/common';
import { GetDataResponse, GetAllDataResponse, PostDataResponse, DeleteDataResponse, StoredData } from './proto/generated/app';

@Injectable()
export class AppService {
  private dataStorage: Map<string, string> = new Map();

  getData(id: string): GetDataResponse {
    if (!this.dataStorage.has(id)) {
      throw new NotFoundException(`Data not found for ID: ${id}`);
    }
    const data = this.dataStorage.get(id)!;
    return { data };
  }

  getAllData(): GetAllDataResponse {
    const dataList: StoredData[] = Array.from(this.dataStorage.entries()).map(([id, data]) => ({
      id,
      data,
    }));
    return { data: dataList };
  }

  postData(data: string): PostDataResponse {
    const id = Date.now().toString();
    this.dataStorage.set(id, data);
    return { message: 'Data saved', id };
  }

  deleteData(id: string): DeleteDataResponse {
    if (!this.dataStorage.has(id)) {
      throw new NotFoundException(`Data not found for ID: ${id}`);
    }
    this.dataStorage.delete(id);
    return { message: `Data with ID: ${id} has been deleted` };
  }
}
