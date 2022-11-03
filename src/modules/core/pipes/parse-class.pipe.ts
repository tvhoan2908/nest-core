import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ParseClassPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return plainToInstance(metadata.metatype, value);
  }
}
