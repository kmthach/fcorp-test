import { Serializer } from '@elastic/elasticsearch';

export class BookSerializer extends Serializer {
  deserialize(object: any) {
    object = JSON.parse(object);
    console.log(object);
    if (object.hits) {
      return object.hits.hits.map((book) => book._source);
    }
    if (object._source) {
      return object._source;
    }
    return object;
  }
}
