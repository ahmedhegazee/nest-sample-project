import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
//adding validation rules to the dto
export class CreateEpisodeDto {
  @IsString()
  name: string;
  @IsBoolean()
  @IsOptional()
  featured?: boolean;
  //it will throw error without the @Type(() => Date) decorator, transforming the string to date object
  @IsDate()
  @Type(() => Date)
  publishedAt: Date;
}
